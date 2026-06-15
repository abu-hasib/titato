# ANCIENT CLASH - COMPONENT & UTILITY FILES (PART 2)

## COMPONENT FILES

### src/components/SplashScreen.jsx
```javascript
import './SplashScreen.css'

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
```

### src/components/SplashScreen.css
```css
.splash-screen {
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
```

### src/components/GameBoard.jsx
```javascript
import Cell from './Cell'
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
```

### src/components/GameBoard.css
```css
.game-board {
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
```

### src/components/Cell.jsx
```javascript
import './Cell.css'

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
```

### src/components/Cell.css
```css
.cell {
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
```

### src/components/GameStatus.jsx
```javascript
import './GameStatus.css'

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
```

### src/components/GameStatus.css
```css
.game-status {
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
```

### src/components/GameControls.jsx
```javascript
import './GameControls.css'

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
```

### src/components/GameControls.css
```css
.game-controls {
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
```

---

UTILITY FILES IN NEXT RESPONSE
