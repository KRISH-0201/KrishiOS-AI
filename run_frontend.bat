@echo off
echo ============================================================
echo  KrishiOS AI — Launch Frontend Web Application
echo ============================================================
echo.
cd /d "%~dp0frontend"
echo Starting Vite Dev Server on http://localhost:5173 ...
npm run dev
pause
