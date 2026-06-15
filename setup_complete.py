#!/usr/bin/env python3
"""
Ancient Clash - Complete Project Setup Script
This script creates the entire React project structure
"""
import os
import json
import sys

def create_directories(base_path):
    """Create all necessary directories"""
    dirs = [
        base_path,
        os.path.join(base_path, "src"),
        os.path.join(base_path, "src", "components"),
        os.path.join(base_path, "src", "utils"),
        os.path.join(base_path, "public"),
    ]
    
    for dir_path in dirs:
        os.makedirs(dir_path, exist_ok=True)
        print(f"✅ {dir_path}")

def create_file(path, content):
    """Create a file with content"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ {os.path.relpath(path)}")

# Define base path
base_path = r"c:\Users\welli\lab\titato\ancient-clash"

print("=" * 60)
print("🎮 ANCIENT CLASH - PROJECT SETUP")
print("=" * 60)
print("\n📁 Creating directories...")

create_directories(base_path)

print("\n📝 Creating configuration files...")

# package.json
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
print("✅ package.json")

# vite.config.js
vite_config = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
"""
create_file(os.path.join(base_path, "vite.config.js"), vite_config)

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
create_file(os.path.join(base_path, "index.html"), index_html)

# .gitignore
gitignore = """node_modules/
dist/
build/
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
.idea/
.vscode/
"""
create_file(os.path.join(base_path, ".gitignore"), gitignore)

print("\n📝 Creating source files...")

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
create_file(os.path.join(base_path, "src", "main.jsx"), main_jsx)

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
create_file(os.path.join(base_path, "src", "index.css"), index_css)

# src/App.jsx
app_jsx = """import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import GameStatus from './components/GameStatus'
import { initializeGame, makeMove, getWinner, isBoardFull } from './utils/gameLogic'
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
"""
create_file(os.path.join(base_path, "src", "App.jsx"), app_jsx)

# src/App.css
app_css = """.app-container {
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
"""
create_file(os.path.join(base_path, "src", "App.css"), app_css)

print("\n📝 Creating components...")

# SplashScreen.jsx
splash_jsx = """import './SplashScreen.css'

export default function SplashScreen() {
  return (
    <div className="splash-screen">
      <img
        src="/splash.png"
        alt="Ancient Clash"
        className="splash-image"
        onError={(e) => {
          e.target.style.display = 'none'
          document.querySelector('.splash-fallback').style.display = 'flex'
        }}
      />
      <div className="splash-fallback">
        <h1>⚔️ ANCIENT CLASH ⚔️</h1>
        <p>Swords vs Bombs</p>
        <div className="spinner"></div>
      </div>
    </div>
  )
}
"""
create_file(os.path.join(base_path, "src", "components", "SplashScreen.jsx"), splash_jsx)

# SplashScreen.css
splash_css = """.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #2c1810 0%, #4a3728 100%);
  z-index: 1000;
  animation: fadeOut 0.5s ease-in 2.5s forwards;
}

.splash-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.splash-fallback {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
}

.splash-fallback h1 {
  font-size: 3rem;
  color: #d4af37;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
  letter-spacing: 3px;
}

.splash-fallback p {
  font-size: 1.5rem;
  color: #f4e4c1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #8b6f47;
  border-top-color: #d4af37;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    pointer-events: none;
  }
}
"""
create_file(os.path.join(base_path, "src", "components", "SplashScreen.css"), splash_css)

# GameBoard.jsx
gameboard_jsx = """import Cell from './Cell'
import './GameBoard.css'

export default function GameBoard({ board, onCellClick }) {
  return (
    <div className="game-board">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
        />
      ))}
    </div>
  )
}
"""
create_file(os.path.join(base_path, "src", "components", "GameBoard.jsx"), gameboard_jsx)

# GameBoard.css
gameboard_css = """.game-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 15px;
  background: linear-gradient(135deg, #1a0f0a 0%, #3d2817 100%);
  border: 3px solid #8b6f47;
  border-radius: 10px;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
}

@media (max-width: 600px) {
  .game-board {
    gap: 8px;
    padding: 10px;
  }
}
"""
create_file(os.path.join(base_path, "src", "components", "GameBoard.css"), gameboard_css)

# Cell.jsx
cell_jsx = """import './Cell.css'

export default function Cell({ value, onClick }) {
  const getIcon = () => {
    if (value === 'X') return '⚔️'
    if (value === 'O') return '💣'
    return ''
  }

  return (
    <button
      className={`cell ${value ? 'filled' : 'empty'} ${value === 'X' ? 'sword' : value === 'O' ? 'bomb' : ''}`}
      onClick={onClick}
      disabled={value !== null}
    >
      <span className="icon">{getIcon()}</span>
    </button>
  )
}
"""
create_file(os.path.join(base_path, "src", "components", "Cell.jsx"), cell_jsx)

# Cell.css
cell_css = """.cell {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #5d4037 0%, #3e2723 100%);
  border: 2px solid #8b6f47;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}

.cell:hover:not(:disabled) {
  background: linear-gradient(135deg, #7d5d4f 0%, #5e3d2b 100%);
  border-color: #d4af37;
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(212, 175, 55, 0.3);
}

.cell:disabled {
  cursor: not-allowed;
}

.cell.filled {
  background: linear-gradient(135deg, #4d3f38 0%, #2d2520 100%);
}

.cell.sword {
  color: #a8860f;
  text-shadow: 0 0 10px rgba(168, 134, 15, 0.5);
}

.cell.bomb {
  color: #d32f2f;
  text-shadow: 0 0 10px rgba(211, 47, 47, 0.5);
}

.icon {
  display: inline-block;
  animation: placeIcon 0.3s ease-out;
}

@keyframes placeIcon {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

@media (max-width: 600px) {
  .cell {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
  }
}
"""
create_file(os.path.join(base_path, "src", "components", "Cell.css"), cell_css)

# GameStatus.jsx
gamestatus_jsx = """import './GameStatus.css'

export default function GameStatus({ winner, isXNext, gameOver }) {
  const getStatus = () => {
    if (winner === 'X') {
      return '🏆 YOU WIN! (Swords Victory!)'
    }
    if (winner === 'O') {
      return '💀 COMPUTER WINS! (Bombs Dominate!)'
    }
    if (gameOver) {
      return "⚔️ IT'S A DRAW! ⚔️"
    }
    return isXNext ? "⚔️ YOUR TURN (Sword)" : "💣 COMPUTER'S TURN (Bomb)"
  }

  return (
    <div className={`game-status ${gameOver ? 'game-over' : ''}`}>
      <p className="status-text">{getStatus()}</p>
    </div>
  )
}
"""
create_file(os.path.join(base_path, "src", "components", "GameStatus.jsx"), gamestatus_jsx)

# GameStatus.css
gamestatus_css = """.game-status {
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(135deg, #3d2817 0%, #2c1810 100%);
  border: 2px solid #8b6f47;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
}

.game-status.game-over {
  background: linear-gradient(135deg, #5d4037 0%, #3e2723 100%);
  border-color: #d4af37;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
}

.status-text {
  font-size: 1.3rem;
  color: #f4e4c1;
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.game-over .status-text {
  color: #d4af37;
  font-size: 1.5rem;
}

@media (max-width: 600px) {
  .game-status {
    padding: 1rem;
  }

  .status-text {
    font-size: 1rem;
  }

  .game-over .status-text {
    font-size: 1.2rem;
  }
}
"""
create_file(os.path.join(base_path, "src", "components", "GameStatus.css"), gamestatus_css)

# GameControls.jsx
gamecontrols_jsx = """import './GameControls.css'

export default function GameControls({
  difficulty,
  onDifficultyChange,
  onReset,
}) {
  return (
    <div className="game-controls">
      <div className="difficulty-selector">
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="difficulty-select"
        >
          <option value="easy">Easy (Random)</option>
          <option value="medium">Medium (Smart)</option>
          <option value="hard">Hard (Unbeatable)</option>
        </select>
      </div>
      <button onClick={onReset} className="reset-button">
        NEW GAME
      </button>
    </div>
  )
}
"""
create_file(os.path.join(base_path, "src", "components", "GameControls.jsx"), gamecontrols_jsx)

# GameControls.css
gamecontrols_css = """.game-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.difficulty-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.difficulty-selector label {
  color: #f4e4c1;
  font-weight: bold;
  font-size: 1rem;
}

.difficulty-select {
  padding: 0.8rem 1rem;
  background: linear-gradient(135deg, #5d4037 0%, #3e2723 100%);
  color: #f4e4c1;
  border: 2px solid #8b6f47;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.difficulty-select:hover {
  border-color: #d4af37;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
}

.difficulty-select:focus {
  outline: none;
  border-color: #d4af37;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
}

.reset-button {
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #d4af37 0%, #a68d2e 100%);
  color: #2c1810;
  border: 2px solid #8b6f47;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.reset-button:hover {
  background: linear-gradient(135deg, #e4bf47 0%, #b69d3e 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
}

.reset-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(212, 175, 55, 0.3);
}

@media (max-width: 600px) {
  .game-controls {
    gap: 0.5rem;
  }

  .difficulty-selector label {
    font-size: 0.9rem;
  }

  .difficulty-select,
  .reset-button {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
}
"""
create_file(os.path.join(base_path, "src", "components", "GameControls.css"), gamecontrols_css)

print("\n📝 Creating utilities...")

# gameLogic.js (already created in titato/, copy to utils)
gamelogic_js = """export function initializeGame() {
  return Array(9).fill(null)
}

export function makeMove(board, index, player) {
  if (board[index] !== null) return board
  const newBoard = [...board]
  newBoard[index] = player
  return newBoard
}

export function getWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

export function isBoardFull(board) {
  return board.every(cell => cell !== null)
}

export function getAvailableMoves(board) {
  return board
    .map((cell, index) => (cell === null ? index : null))
    .filter(index => index !== null)
}
"""
create_file(os.path.join(base_path, "src", "utils", "gameLogic.js"), gamelogic_js)

# AI.js (already created in titato/, copy to utils)
ai_js = """import { getWinner, getAvailableMoves, makeMove } from './gameLogic'

export function getComputerMove(board, difficulty) {
  const availableMoves = getAvailableMoves(board)

  if (availableMoves.length === 0) return -1

  switch (difficulty) {
    case 'easy':
      return getEasyMove(availableMoves)
    case 'medium':
      return getMediumMove(board, availableMoves)
    case 'hard':
      return getHardMove(board, availableMoves)
    default:
      return getEasyMove(availableMoves)
  }
}

function getEasyMove(availableMoves) {
  return availableMoves[Math.floor(Math.random() * availableMoves.length)]
}

function getMediumMove(board, availableMoves) {
  for (let move of availableMoves) {
    const testBoard = makeMove(board, move, 'O')
    if (getWinner(testBoard) === 'O') return move
  }

  for (let move of availableMoves) {
    const testBoard = makeMove(board, move, 'X')
    if (getWinner(testBoard) === 'X') return move
  }

  if (availableMoves.includes(4)) return 4

  const corners = [0, 2, 6, 8].filter(m => availableMoves.includes(m))
  if (corners.length > 0)
    return corners[Math.floor(Math.random() * corners.length)]

  return availableMoves[Math.floor(Math.random() * availableMoves.length)]
}

function getHardMove(board, availableMoves) {
  let bestScore = -Infinity
  let bestMove = availableMoves[0]

  for (let move of availableMoves) {
    const newBoard = makeMove(board, move, 'O')
    const score = minimax(newBoard, 0, false)
    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }

  return bestMove
}

function minimax(board, depth, isMaximizing) {
  const winner = getWinner(board)

  if (winner === 'O') return 10 - depth
  if (winner === 'X') return depth - 10
  if (getAvailableMoves(board).length === 0) return 0

  const availableMoves = getAvailableMoves(board)

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let move of availableMoves) {
      const newBoard = makeMove(board, move, 'O')
      const score = minimax(newBoard, depth + 1, false)
      bestScore = Math.max(score, bestScore)
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let move of availableMoves) {
      const newBoard = makeMove(board, move, 'X')
      const score = minimax(newBoard, depth + 1, true)
      bestScore = Math.min(score, bestScore)
    }
    return bestScore
  }
}
"""
create_file(os.path.join(base_path, "src", "utils", "AI.js"), ai_js)

# SoundManager.js (already created in titato/, copy to utils)
soundmanager_js = """export class SoundManager {
  static swordAudio = null
  static bombAudio = null

  static init() {
    try {
      this.swordAudio = new Audio('/sword-sound.mp3')
      this.bombAudio = new Audio('/bomb-sound.mp3')
      
      this.swordAudio.volume = 0.7
      this.bombAudio.volume = 0.7

      this.swordAudio.preload = 'auto'
      this.bombAudio.preload = 'auto'
    } catch (error) {
      console.error('Error initializing audio:', error)
    }
  }

  static playSword() {
    if (this.swordAudio) {
      try {
        this.swordAudio.currentTime = 0
        const playPromise = this.swordAudio.play()
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Could not play sword sound:', error)
          })
        }
      } catch (error) {
        console.log('Error playing sword sound:', error)
      }
    }
  }

  static playBomb() {
    if (this.bombAudio) {
      try {
        this.bombAudio.currentTime = 0
        const playPromise = this.bombAudio.play()
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Could not play bomb sound:', error)
          })
        }
      } catch (error) {
        console.log('Error playing bomb sound:', error)
      }
    }
  }

  static setVolume(level) {
    const volume = Math.max(0, Math.min(1, level))
    if (this.swordAudio) this.swordAudio.volume = volume
    if (this.bombAudio) this.bombAudio.volume = volume
  }

  static mute() {
    this.setVolume(0)
  }

  static unmute() {
    this.setVolume(0.7)
  }
}
"""
create_file(os.path.join(base_path, "src", "utils", "SoundManager.js"), soundmanager_js)

print("\n" + "=" * 60)
print("✅ PROJECT STRUCTURE COMPLETE!")
print("=" * 60)
print(f"\n📁 Project location: {base_path}")
print("\n📝 Next steps:")
print("   1. cd " + base_path)
print("   2. npm install")
print("   3. npm run dev")
print("\n⚠️  Before running npm install:")
print("   - Add splash.png to public/ folder")
print("   - Add sword-sound.mp3 to public/ folder")
print("   - Add bomb-sound.mp3 to public/ folder")
print("\n✨ Ready to play Ancient Clash! ⚔️💣")
print("=" * 60)
