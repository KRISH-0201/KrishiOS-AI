@echo off
echo ============================================================
echo  🌾 KrishiOS AI — Full Stack Application Launcher
echo ============================================================
echo.
echo [1/2] Starting Backend FastAPI Server (Port 8000)...
start "KrishiOS Backend" cmd /k "cd /d "%~dp0backend" && run_server.bat"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Vite Server (Port 5173)...
start "KrishiOS Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ============================================================
echo  Both Servers Started!
echo  👉 Web UI  : http://localhost:5173
echo  👉 API Docs: http://localhost:8000/docs
echo ============================================================
pause
