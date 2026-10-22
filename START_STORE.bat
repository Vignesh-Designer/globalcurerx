@echo off
title Global Cure RX Pharmacy LLC - Online Store
color 0B

echo =====================================================================
echo    GLOBAL CURE RX PHARMACY LLC - ONLINE STORE
echo =====================================================================
echo.
echo Starting backend server on http://localhost:5000 ...
start "Backend Server (Port 5000)" cmd /k "cd /d %~dp0backend && npm start"

echo Starting frontend server on http://localhost:3000 ...
start "Frontend Server (Port 3000)" cmd /k "cd /d %~dp0frontend && npm start"

timeout /t 3 /nobreak >nul
echo Opening store in your browser...
start "" "http://localhost:3000"

echo.
echo =====================================================================
echo Both servers are running!
echo Store URL: http://localhost:3000
echo Admin URL: http://localhost:3000/admin
echo.
echo To stop the store, simply close the backend and frontend command windows.
echo =====================================================================
pause
