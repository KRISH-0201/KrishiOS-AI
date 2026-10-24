import io
import glob
from pathlib import Path
import pytest
from PIL import Image
from fastapi.testclient import TestClient

from app.main import app
from app.services.disease_service import disease_service
from app.schemas.disease import DiseasePredictionResponse, ModelStatusResponse

client = TestClient(app)


def test_model_loading_and_config():
    """Verify model is loaded once at startup and config parameters match training artifacts."""
    assert disease_service.is_ready is True
    assert disease_service.model is not None
    assert len(disease_service.idx_to_class) == 10
    assert disease_service.weights_path.exists()
    assert disease_service.mapping_path.exists()
    assert disease_service.model_config.get("model_name") == "MobileNetV3-Large"
    assert disease_service.model_config.get("input_size") == [224, 224]


def test_models_status_endpoint():
    """Test GET /api/v1/disease/models-status reports active PlantVillage model."""
    response = client.get("/api/v1/disease/models-status")
    assert response.status_code == 200
    data = response.json()
    
    # Validate against Pydantic schema
    validated = ModelStatusResponse(**data)
    assert validated.tomato_classifier_available is True
    assert validated.num_classes == 10
    assert validated.architecture == "MobileNetV3-Large"
    assert len(validated.classes) == 10
    assert "Tomato___Early_blight" in validated.classes
    assert "Tomato___healthy" in validated.classes


def test_valid_synthetic_tomato_leaf_inference():
    """Test POST /api/v1/disease/predict with a generated valid JPEG image."""
    img = Image.new("RGB", (256, 256), color=(45, 140, 50))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    buf.seek(0)

    files = {"file": ("synthetic_leaf.jpg", buf.getvalue(), "image/jpeg")}
    response = client.post("/api/v1/disease/predict", files=files, data={"crop_type": "tomato"})
    assert response.status_code == 200
    data = response.json()

    # Validate against Pydantic response contract
    validated = DiseasePredictionResponse(**data)
    assert validated.crop_type == "Tomato"
    assert 0.0 <= validated.confidence <= 1.0
    assert len(validated.disease_name) > 0
    assert len(validated.preventive_measures) >= 1
    assert isinstance(validated.severity_percentage, float)
    assert validated.detections == []


def test_real_early_blight_image_inference():
    """Test prediction on real early blight sample leaf."""
    sample_path = Path(r"d:\KrishiOS AI\frontend\public\samples\tomato_early_blight.jpg")
    if not sample_path.exists():
        eb_files = glob.glob(r"d:\KrishiOS AI\plantvillage dataset\color\Tomato___Early_blight\*.jpg")
        sample_path = Path(eb_files[0])

    with open(sample_path, "rb") as f:
        image_bytes = f.read()

    files = {"file": ("sample.jpg", image_bytes, "image/jpeg")}
    response = client.post("/api/v1/disease/predict", files=files, data={"crop_type": "tomato"})
    assert response.status_code == 200
    data = response.json()

    assert data["crop_type"] == "Tomato"
    assert data["confidence"] > 0.5
    assert "Early Blight" in data["disease_name"] or "Bacterial Spot" in data["disease_name"]
    assert "Mancozeb" in data["chemical_treatment"] or "Copper" in data["chemical_treatment"] or "Streptocycline" in data["chemical_treatment"]


def test_real_healthy_leaf_image_inference():
    """Test prediction on real healthy tomato leaf yields Minimal risk and 0.0 severity."""
    healthy_files = glob.glob(r"d:\KrishiOS AI\plantvillage dataset\color\Tomato___healthy\*.jpg")
    assert len(healthy_files) > 0
    sample_path = Path(healthy_files[0])

    with open(sample_path, "rb") as f:
        image_bytes = f.read()

    files = {"file": ("healthy.jpg", image_bytes, "image/jpeg")}
    response = client.post("/api/v1/disease/predict", files=files, data={"crop_type": "tomato"})
    assert response.status_code == 200
    data = response.json()

    assert data["disease_name"] == "Healthy Tomato Leaf"
    assert data["risk_level"] == "Minimal"
    assert data["severity_percentage"] == 0.0
    assert data["progression_stage"] == "Healthy"
    assert data["confidence"] > 0.90


def test_invalid_upload_empty_file():
    """Test POST /api/v1/disease/predict with 0-byte file returns 400 Bad Request."""
    files = {"file": ("empty.jpg", b"", "image/jpeg")}
    response = client.post("/api/v1/disease/predict", files=files, data={"crop_type": "tomato"})
    assert response.status_code == 400
    assert "Empty image uploaded" in response.json()["detail"]


def test_invalid_upload_non_image_mime():
    """Test POST /api/v1/disease/predict with text/plain mime type returns 400 Bad Request."""
    files = {"file": ("notes.txt", b"Hello world", "text/plain")}
    response = client.post("/api/v1/disease/predict", files=files, data={"crop_type": "tomato"})
    assert response.status_code == 400
    assert "must be a valid image" in response.json()["detail"]


def test_invalid_upload_corrupt_image_bytes():
    """Test POST /api/v1/disease/predict with corrupt non-image bytes disguised as image/jpeg."""
    files = {"file": ("corrupt.jpg", b"NOT_AN_IMAGE_HEADER_GARBAGE_BYTES_12345", "image/jpeg")}
    response = client.post("/api/v1/disease/predict", files=files, data={"crop_type": "tomato"})
    assert response.status_code == 400
    assert "corrupted image file" in response.json()["detail"] or "Invalid image format" in response.json()["detail"]


def test_unsupported_crop_type():
    """Test POST /api/v1/disease/predict with non-tomato crop returns 400 Bad Request."""
    img = Image.new("RGB", (256, 256), color=(40, 140, 40))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")

    files = {"file": ("leaf.jpg", buf.getvalue(), "image/jpeg")}
    response = client.post("/api/v1/disease/predict", files=files, data={"crop_type": "banana"})
    assert response.status_code == 400
    assert "supports 'tomato'" in response.json()["detail"]


def test_never_silent_fallback_when_model_offline():
    """Verify that if model is offline, API returns HTTP 503 instead of silent hardcoded predictions."""
    original_state = disease_service.is_ready
    try:
        # Simulate offline model
        disease_service.is_ready = False
        img = Image.new("RGB", (256, 256), color=(40, 140, 40))
        buf = io.BytesIO()
        img.save(buf, format="JPEG")
        files = {"file": ("leaf.jpg", buf.getvalue(), "image/jpeg")}

        response = client.post("/api/v1/disease/predict", files=files, data={"crop_type": "tomato"})
        assert response.status_code == 503
        assert "offline" in response.json()["detail"] or "not available" in response.json()["detail"]
    finally:
        # Restore service state
        disease_service.is_ready = original_state
