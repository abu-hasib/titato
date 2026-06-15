#!/usr/bin/env python3
import os
import json

base_path = r"c:\Users\welli\lab\titato\ancient-clash"

# Create directories
dirs = [
    base_path,
    os.path.join(base_path, "src"),
    os.path.join(base_path, "src", "components"),
    os.path.join(base_path, "src", "utils"),
    os.path.join(base_path, "public"),
]

for dir_path in dirs:
    os.makedirs(dir_path, exist_ok=True)
    print(f"✅ Created: {dir_path}")

# Create package.json
package_json = {
    "name": "ancient-clash",
    "private": True,
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

with open(os.path.join(base_path, "package.json"), "w") as f:
    json.dump(package_json, f, indent=2)
print("✅ Created: package.json")

# vite.config.js
vite_config = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
"""

with open(os.path.join(base_path, "vite.config.js"), "w") as f:
    f.write(vite_config)
print("✅ Created: vite.config.js")

# index.html
index_html = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ancient Clash - Tic Tac Toe</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
"""

with open(os.path.join(base_path, "index.html"), "w") as f:
    f.write(index_html)
print("✅ Created: index.html")

# .gitignore
gitignore = """node_modules/
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
"""

with open(os.path.join(base_path, ".gitignore"), "w") as f:
    f.write(gitignore)
print("✅ Created: .gitignore")

# src/main.jsx
main_jsx = """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
"""

with open(os.path.join(base_path, "src", "main.jsx"), "w") as f:
    f.write(main_jsx)
print("✅ Created: src/main.jsx")

# src/index.css
index_css = """* {
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
"""

with open(os.path.join(base_path, "src", "index.css"), "w") as f:
    f.write(index_css)
print("✅ Created: src/index.css")

print("\n" + "="*50)
print("✅ BASE PROJECT STRUCTURE CREATED!")
print("="*50)
print("\nNext: Run the full setup script to create React components")
