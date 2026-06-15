@echo off
setlocal enabledelayedexpansion

echo Creating Ancient Clash Project Structure...

cd /d c:\Users\welli\lab\titato

REM Create main directory
if not exist ancient-clash mkdir ancient-clash
cd ancient-clash

REM Create subdirectories
if not exist src mkdir src
if not exist src\components mkdir src\components
if not exist src\utils mkdir src\utils
if not exist public mkdir public

echo ✅ Directory structure created!

REM Now use PowerShell to create the actual files
powershell -NoProfile -ExecutionPolicy Bypass -Command "
# package.json
@'
{
  "name": "ancient-clash",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.8"
  }
}
'@ | Set-Content -Path 'package.json' -Encoding UTF8

# vite.config.js
@'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
'@ | Set-Content -Path 'vite.config.js' -Encoding UTF8

# index.html
@'
<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <title>Ancient Clash - Tic Tac Toe</title>
  </head>
  <body>
    <div id=\"root\"></div>
    <script type=\"module\" src=\"/src/main.jsx\"></script>
  </body>
</html>
'@ | Set-Content -Path 'index.html' -Encoding UTF8

# .gitignore
@'
node_modules/
dist/
.DS_Store
*.local
.env
.env.local
.env.*.local
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.vite/
'@ | Set-Content -Path '.gitignore' -Encoding UTF8

# src/main.jsx
@'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
'@ | Set-Content -Path 'src\main.jsx' -Encoding UTF8

# src/index.css
@'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #2c1810 0%, #4a3728 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f4e4c1;
}

html, body, #root {
  height: 100%;
}
'@ | Set-Content -Path 'src\index.css' -Encoding UTF8

Write-Host '✅ Configuration files created!'
"

echo.
echo ✅ Project setup complete!
echo.
echo Next steps:
echo   1. Copy your splash.png to the public\ folder
echo   2. Copy sword-sound.mp3 to the public\ folder
echo   3. Copy bomb-sound.mp3 to the public\ folder
echo   4. Run: npm install
echo   5. Run: npm run dev
echo.
