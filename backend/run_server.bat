@echo off
cd /d "%~dp0"
echo ========================================================
echo        Starting KrishiOS AI Backend Server
echo ========================================================
echo URL: http://127.0.0.1:8000
echo Docs: http://127.0.0.1:8000/docs
echo Weather API: http://127.0.0.1:8000/api/v1/weather/advisory?city=Surat
echo ========================================================
venv\Scripts\uvicorn.exe app.main:app --host 127.0.0.1 --port 8000 --reload
pause
