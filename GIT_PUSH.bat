@echo off
title Global Cure RX Pharmacy - Git Backup & Push
color 0B

echo =====================================================================
echo    GIT BACKUP & PUSH - GLOBAL CURE RX PHARMACY
echo    Repository: https://github.com/Vignesh-Designer/globalcurerx
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
echo Pushing to GitHub...
git push -u origin main

echo.
echo =====================================================================
echo BACKUP COMPLETE! Your project is safely saved in GitHub:
echo https://github.com/Vignesh-Designer/globalcurerx
echo =====================================================================
pause
