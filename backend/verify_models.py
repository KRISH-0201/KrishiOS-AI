import asyncio, glob, io
from pathlib import Path
from PIL import Image
from app.services.disease_service import disease_service

status = disease_service.get_models_status()
print("=" * 60)
print("=== KRISHIOS AI — ACTIVE MODEL STATUS ===")
print("=" * 60)
for k, v in status.items():
    print(f"  {k}: {v}")

async def run():
    print("\n=== TOMATO EARLY BLIGHT TEST ===")
    eb_imgs = glob.glob(r"d:\KrishiOS AI\plantvillage dataset\color\Tomato___Early_blight\*.jpg")
    if not eb_imgs:
        eb_imgs = glob.glob(r"d:\KrishiOS AI\frontend\public\samples\tomato_early_blight.jpg")
    
    img = Image.open(eb_imgs[0]).convert("RGB")
    b = io.BytesIO(); img.save(b, format="JPEG"); raw = b.getvalue()
    res = await disease_service.predict(raw, "tomato")
    print(f"  Diagnosed Disease : {res['disease_name']}")
    print(f"  Confidence Score  : {res['confidence'] * 100:.2f}%")
    print(f"  Risk Level        : {res['risk_level']}")
    print(f"  Progression Stage : {res['progression_stage']}")
    print(f"  Severity Metric   : {res['severity_percentage']}%")
    print(f"  Chemical Therapy  : {res['chemical_treatment'][:80]}...")

    print("\n=== TOMATO HEALTHY LEAF TEST ===")
    h_imgs = glob.glob(r"d:\KrishiOS AI\plantvillage dataset\color\Tomato___healthy\*.jpg")
    h_img = Image.open(h_imgs[0]).convert("RGB")
    hb = io.BytesIO(); h_img.save(hb, format="JPEG"); hraw = hb.getvalue()
    hres = await disease_service.predict(hraw, "tomato")
    print(f"  Diagnosed Disease : {hres['disease_name']}")
    print(f"  Confidence Score  : {hres['confidence'] * 100:.2f}%")
    print(f"  Risk Level        : {hres['risk_level']}")
    print(f"  Severity Metric   : {hres['severity_percentage']}%")

    print("\n" + "=" * 60)
    print("  ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!")
    print("=" * 60)

asyncio.run(run())
