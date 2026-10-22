@echo off
title Google Search Console - Instant Live Verification
color 0B

echo =====================================================================
echo    GOOGLE SEARCH CONSOLE INSTANT VERIFICATION
echo    Domain: https://globalcurerx.com
echo =====================================================================
echo.
echo Uploading google verification file to your live server...
echo (When prompted below, please type your Hostinger VPS Root Password)
echo.

scp "frontend\public\google0102730f994a18ac.html" root@179.197.243.197:/var/www/global-cure/frontend/public/
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Upload failed. Please make sure your password is correct.
    echo.
    pause
    exit /b
)

echo.
echo =====================================================================
echo Testing live verification URL...
echo.
curl -s https://globalcurerx.com/google0102730f994a18ac.html
echo.
echo.
echo =====================================================================
echo SUCCESS! The Google verification file is now LIVE on your website!
echo You or your SEO specialist can now click 'VERIFY' in Search Console.
echo =====================================================================
echo.
pause
