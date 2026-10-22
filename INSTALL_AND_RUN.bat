@echo off
title Global Cure RX Pharmacy - First Time Setup
color 0A

echo =====================================================================
echo    GLOBAL CURE RX PHARMACY LLC - FIRST TIME SETUP
echo =====================================================================
echo.
echo Installing backend dependencies...
cd /d %~dp0backend
call npm install
echo.
echo Installing frontend dependencies...
cd /d %~dp0frontend
call npm install
echo.
echo Building frontend production build...
call npm run build
echo.
echo =====================================================================
echo Setup Complete! Launching the application now...
echo =====================================================================
echo.
cd /d %~dp0
call START_STORE.bat
