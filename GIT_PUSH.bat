@echo off
title Global Cure RX Pharmacy - Git Backup & Push
color 0B

echo =====================================================================
echo    GIT BACKUP & PUSH - GLOBAL CURE RX PHARMACY
echo =====================================================================
echo.

git status --short
echo.
set /p msg="Enter a brief note about what changed (or press Enter for default): "
if "%msg%"=="" set msg=Update: %date% %time%

echo.
echo Adding changes to git...
git add .

echo Committing changes...
git commit -m "%msg%"

echo.
echo Pushing to remote repository...
git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ---------------------------------------------------------------------
    echo If you have not linked a remote repository yet, run this once:
    echo   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
    echo   git push -u origin main
    echo ---------------------------------------------------------------------
)

echo.
echo =====================================================================
echo Done!
echo =====================================================================
pause
