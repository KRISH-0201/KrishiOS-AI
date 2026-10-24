import io
import json
from pathlib import Path
from PIL import Image
import torch
import torch.nn as nn
from torchvision import transforms, models

class TomatoDiseasePredictor:
    def __init__(self, model_dir=None, device=None):
        if model_dir is None:
            self.model_dir = Path(__file__).resolve().parent
        else:
            self.model_dir = Path(model_dir)
        self.device = device or torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        mapping_path = self.model_dir / 'class_mapping.json'
        with open(mapping_path, 'r') as f:
            data = json.load(f)
            self.idx_to_class = {int(k): v for k, v in data['idx_to_class'].items()}
            self.clean_names = data.get('clean_class_names', {})
        self.num_classes = len(self.idx_to_class)
        self.model = models.mobilenet_v3_large(weights=None)
        in_features = self.model.classifier[3].in_features
        self.model.classifier[3] = nn.Linear(in_features, self.num_classes)
        weights_path = self.model_dir / 'best_model.pth'
        state = torch.load(weights_path, map_location=self.device)
        self.model.load_state_dict(state)
        self.model.to(self.device)
        self.model.eval()
        self.transform = transforms.Compose([
            transforms.Resize((256, 256)),
            transforms.CenterCrop((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

    def predict(self, image_input):
        if isinstance(image_input, (str, Path)):
            img = Image.open(image_input).convert('RGB')
        elif isinstance(image_input, bytes):
            img = Image.open(io.BytesIO(image_input)).convert('RGB')
        elif isinstance(image_input, Image.Image):
            img = image_input.convert('RGB')
        else:
            raise ValueError('Unsupported image input type.')
        tensor = self.transform(img).unsqueeze(0).to(self.device)
        with torch.no_grad():
            logits = self.model(tensor)
            probs = torch.softmax(logits, dim=1)[0].cpu().numpy()
        top_idx = int(probs.argmax())
        top_prob = float(probs[top_idx])
        raw_class = self.idx_to_class[top_idx]
        clean_name = self.clean_names.get(raw_class, raw_class)
        top3_indices = probs.argsort()[-3:][::-1]
        top3 = [
            {
                'class_name': self.idx_to_class[int(i)],
                'display_name': self.clean_names.get(self.idx_to_class[int(i)], self.idx_to_class[int(i)]),
                'confidence': round(float(probs[i]), 4)
            }
            for i in top3_indices
        ]
        return {
            'predicted_class': raw_class,
            'display_name': clean_name,
            'confidence': round(top_prob, 4),
            'top_3': top3
        }