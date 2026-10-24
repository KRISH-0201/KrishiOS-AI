@echo off
echo ============================================================
echo  KrishiOS AI — Install ML Dependencies
echo ============================================================
echo.
echo [1/5] Installing segmentation-models-pytorch...
"d:\KrishiOS AI\backend\venv\Scripts\python.exe" -m pip install segmentation-models-pytorch

echo.
echo [2/5] Installing albumentations...
"d:\KrishiOS AI\backend\venv\Scripts\python.exe" -m pip install albumentations

echo.
echo [3/5] Installing opencv-python...
"d:\KrishiOS AI\backend\venv\Scripts\python.exe" -m pip install opencv-python

echo.
echo [4/5] Installing tqdm...
"d:\KrishiOS AI\backend\venv\Scripts\python.exe" -m pip install tqdm

echo.
echo [5/5] Verifying PyTorch...
"d:\KrishiOS AI\backend\venv\Scripts\python.exe" -c "import torch; print('PyTorch:', torch.__version__, '| CUDA:', torch.cuda.is_available())"

echo.
echo ============================================================
echo  All dependencies installed! Now run:
echo  run_train.bat
echo ============================================================
pause
