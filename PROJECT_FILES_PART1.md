# ANCIENT CLASH - TIC TAC TOE GAME

## COMPLETE PROJECT FILES

### FILE STRUCTURE TO CREATE:
```
ancient-clash/
├── src/
│   ├── components/
│   │   ├── SplashScreen.jsx
│   │   ├── SplashScreen.css
│   │   ├── GameBoard.jsx
│   │   ├── GameBoard.css
│   │   ├── Cell.jsx
│   │   ├── Cell.css
│   │   ├── GameStatus.jsx
│   │   ├── GameStatus.css
│   │   ├── GameControls.jsx
│   │   └── GameControls.css
│   ├── utils/
│   │   ├── gameLogic.js
│   │   ├── AI.js
│   │   └── SoundManager.js
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── public/
│   ├── splash.png (YOUR IMAGE HERE)
│   ├── sword-sound.mp3
│   └── bomb-sound.mp3
├── index.html
├── package.json
├── vite.config.js
└── .gitignore

```

## INITIALIZATION STEPS:

1. **Create the base directory:**
   ```
   mkdir ancient-clash
   cd ancient-clash
   ```

2. **Copy all files from the sections below into their respective locations**

3. **Install dependencies:**
   ```
   npm install
   ```

4. **Add sound and image files:**
   - Add `splash.png` to the `public/` folder
   - Add `sword-sound.mp3` to the `public/` folder
   - Add `bomb-sound.mp3` to the `public/` folder

5. **Start the development server:**
   ```
   npm run dev
   ```

6. **Build for production:**
   ```
   npm run build
   ```

---

## FILE CONTENTS

All file contents are provided below. Create each file with the exact content.

### 1. package.json
```json
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
```

### 2. vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### 3. index.html
```html
<!doctype html>
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
```

### 4. .gitignore
```
node_modules
dist
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
.vite
```

### 5. src/main.jsx
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 6. src/index.css
```css
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
```

### 7. src/App.jsx
```javascript
import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import GameStatus from './components/GameStatus'
import { initializeGame, makeMove, resetGame, getWinner, isBoardFull } from './utils/gameLogic'
import { getComputerMove } from './utils/AI'
import { SoundManager } from './utils/SoundManager'
import './App.css'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [board, setBoard] = useState(initializeGame())
  const [isXNext, setIsXNext] = useState(true)
  const [difficulty, setDifficulty] = useState('medium')
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null)

  // Sound manager initialization
  useEffect(() => {
    SoundManager.init()
  }, [])

  // Handle splash screen timeout
  useEffect(() => {
    if (!showSplash) return
    const timer = setTimeout(() => setShowSplash(false), 3000)
    return () => clearTimeout(timer)
  }, [showSplash])

  // Check for game end
  useEffect(() => {
    const currentWinner = getWinner(board)
    if (currentWinner) {
      setWinner(currentWinner)
      setGameOver(true)
    } else if (isBoardFull(board)) {
      setGameOver(true)
    }
  }, [board])

  // Computer's turn
  useEffect(() => {
    if (gameOver || isXNext || showSplash) return

    const timer = setTimeout(() => {
      const moveIndex = getComputerMove(board, difficulty)
      if (moveIndex !== -1) {
        const newBoard = makeMove(board, moveIndex, 'O')
        setBoard(newBoard)
        SoundManager.playBomb()
        setIsXNext(true)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [board, isXNext, gameOver, difficulty, showSplash])

  const handleCellClick = (index) => {
    if (gameOver || !isXNext || board[index] !== null || showSplash) return

    const newBoard = makeMove(board, index, 'X')
    setBoard(newBoard)
    SoundManager.playSword()
    setIsXNext(false)
  }

  const handleReset = () => {
    setBoard(initializeGame())
    setIsXNext(true)
    setGameOver(false)
    setWinner(null)
  }

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty)
    handleReset()
  }

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <div className="app-container">
      <h1 className="title">⚔️ ANCIENT CLASH 💣</h1>
      <GameStatus winner={winner} isXNext={isXNext} gameOver={gameOver} />
      <GameBoard board={board} onCellClick={handleCellClick} />
      <GameControls
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        onReset={handleReset}
      />
    </div>
  )
}
```

### 8. src/App.css
```css
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  background: rgba(42, 25, 15, 0.9);
  border-radius: 15px;
  border: 3px solid #8b6f47;
  box-shadow: 0 0 30px rgba(139, 111, 71, 0.5);
  max-width: 500px;
  backdrop-filter: blur(10px);
}

.title {
  font-size: 2.5rem;
  color: #d4af37;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
}

@media (max-width: 600px) {
  .app-container {
    max-width: 90vw;
    gap: 1.5rem;
  }

  .title {
    font-size: 2rem;
  }
}
```

---

COMPONENT FILES IN NEXT RESPONSE
