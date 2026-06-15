@echo off
setlocal enabledelayedexpansion

cd c:\Users\welli\lab\titato

REM Create project directory
if not exist ancient-clash mkdir ancient-clash
cd ancient-clash

REM Create directory structure
if not exist src mkdir src
if not exist src\components mkdir src\components
if not exist src\utils mkdir src\utils
if not exist public mkdir public

REM Copy utility files
copy ..\gameLogic.js src\utils\gameLogic.js >nul 2>&1
copy ..\AI.js src\utils\AI.js >nul 2>&1
copy ..\SoundManager.js src\utils\SoundManager.js >nul 2>&1

echo Project structure created successfully!
echo.
echo Next steps:
echo 1. Copy your splash.png to the public folder
echo 2. Copy sword-sound.mp3 and bomb-sound.mp3 to the public folder
echo 3. Run: npm install
echo 4. Run: npm run dev
