@echo off
title SUNVEXA Launcher
echo ========================================================
echo               SUNVEXA SOLAR APPLICATION
echo ========================================================
echo.
echo Launching Spring Boot Backend (Port 8080)...
start "SUNVEXA Backend (8080)" cmd /k "cd backend && mvn spring-boot:run"

echo Launching React Frontend (Port 5173)...
start "SUNVEXA Frontend (5173)" cmd /k "npm run dev"

echo.
echo ========================================================
echo SUNVEXA is now running permanently at:
echo   - Website UI: http://localhost:5173
echo   - Backend API: http://localhost:8080
echo ========================================================
echo.
pause
