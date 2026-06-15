@echo off
echo Installing dependencies...
call npm install
echo.
echo Building the application...
call npm run build
echo.
echo Build complete! Output is in the 'dist' folder.
pause
