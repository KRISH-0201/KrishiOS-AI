KrishiOS AI — PlantVillage Tomato Disease Classification Model
==================================================================
Model Architecture: MobileNetV3-Large
Target Crop       : Tomato (Solanum lycopersicum)
Classes Count     : 10
Test Accuracy     : 99.83%
Top-3 Accuracy    : 99.94%
Macro F1-Score    : 99.83%

Files in this archive:
1. best_model.pth          - PyTorch state_dict for MobileNetV3-Large
2. class_mapping.json      - Index to PlantVillage class name mappings
3. model_config.json       - Input size, normalization constants, and metadata
4. training_metrics.json   - Verified evaluation metrics on untouched test set
5. confusion_matrix.png    - High-resolution confusion matrix heatmap
6. training_curves.png     - Loss and accuracy progression graphs
7. inference.py            - Standalone Python inference predictor module
8. requirements.txt        - Minimal Python dependencies for inference
9. README.txt              - Model documentation and specifications

Integration Target:
Extract all files into: D:/KrishiOS AI/backend/models/