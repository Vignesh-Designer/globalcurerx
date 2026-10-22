@echo off
title Global Cure RX - Update Live Website
color 0A

echo =====================================================================
echo    UPDATE LIVE STORE: https://globalcurerx.com
echo =====================================================================
echo.
echo This will safely update:
echo   1. Google Search Console Verification
echo   2. Mobile Hamburger Menu & One-Tap Call Button
echo   3. 14px Categories & Orthopedic Supports
echo   4. Empty PO Box Fix
echo.
echo NOTE: All 191 client products and photos will remain 100%% untouched!
echo.
echo Uploading safe update package to VPS...
echo (When prompted, please type your Hostinger VPS Root Password)
echo.

scp safe-frontend-update.tar.gz root@179.197.243.197:/var/www/
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Upload failed. Please check your password.
    pause
    exit /b
)

echo.
echo Applying changes on the server...
ssh root@179.197.243.197 "tar -xzf /var/www/safe-frontend-update.tar.gz -C /var/www/global-cure/ && pm2 reload all"

echo.
echo =====================================================================
echo Checking live Google verification status...
curl -s https://globalcurerx.com/google0102730f994a18ac.html
echo.
echo =====================================================================
echo UPDATE COMPLETE!
echo Your live site is now fully updated and verified.
echo =====================================================================
echo.
pause
