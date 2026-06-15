# ANCIENT CLASH - UTILITY FILES (PART 3)

## UTILITY FILES

### src/utils/gameLogic.js
```javascript
// Game logic utilities
export function initializeGame() {
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
```

### src/utils/AI.js
```javascript
// AI Logic with 3 difficulty levels
import { getWinner, getAvailableMoves, makeMove } from './gameLogic'

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

// Easy: Random move
function getEasyMove(availableMoves) {
  return availableMoves[Math.floor(Math.random() * availableMoves.length)]
}

// Medium: Try to win, block player win, or pick smart
function getMediumMove(board, availableMoves) {
  // Try to win
  for (let move of availableMoves) {
    const testBoard = makeMove(board, move, 'O')
    if (getWinner(testBoard) === 'O') return move
  }

  // Block player from winning
  for (let move of availableMoves) {
    const testBoard = makeMove(board, move, 'X')
    if (getWinner(testBoard) === 'X') return move
  }

  // Prefer center
  if (availableMoves.includes(4)) return 4

  // Prefer corners
  const corners = [0, 2, 6, 8].filter(m => availableMoves.includes(m))
  if (corners.length > 0)
    return corners[Math.floor(Math.random() * corners.length)]

  // Random
  return availableMoves[Math.floor(Math.random() * availableMoves.length)]
}

// Hard: Minimax algorithm (unbeatable)
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

  // Terminal states
  if (winner === 'O') return 10 - depth
  if (winner === 'X') return depth - 10
  if (getAvailableMoves(board).length === 0) return 0

  const availableMoves = getAvailableMoves(board)

  if (isMaximizing) {
    // Computer (O) is maximizing
    let bestScore = -Infinity
    for (let move of availableMoves) {
      const newBoard = makeMove(board, move, 'O')
      const score = minimax(newBoard, depth + 1, false)
      bestScore = Math.max(score, bestScore)
    }
    return bestScore
  } else {
    // Player (X) is minimizing
    let bestScore = Infinity
    for (let move of availableMoves) {
      const newBoard = makeMove(board, move, 'X')
      const score = minimax(newBoard, depth + 1, true)
      bestScore = Math.min(score, bestScore)
    }
    return bestScore
  }
}
```

### src/utils/SoundManager.js
```javascript
// Sound Manager for playing game sounds
export class SoundManager {
  static swordAudio = null
  static bombAudio = null

  static init() {
    // Initialize audio elements with cross-browser support
    try {
      this.swordAudio = new Audio('/sword-sound.mp3')
      this.bombAudio = new Audio('/bomb-sound.mp3')
      
      // Set volume
      this.swordAudio.volume = 0.7
      this.bombAudio.volume = 0.7

      // Preload audio
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

  // Optional: Mute/Unmute functionality
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
```

---

## GETTING SOUND AND IMAGE FILES

### 1. Splash Screen Image
Place your ancient clash-themed image in `public/splash.png`
- Recommended size: 800x600px or higher
- Supported formats: PNG, JPG

### 2. Sound Effects

#### Option A: Use Royalty-Free Sounds (Recommended)

**For Sword Sound:**
- Visit: https://freesound.org/
- Search: "sword clash" or "sword sound"
- Download: Ensure it's Free for use (CC-0 or CC-BY license)
- File: Save as `public/sword-sound.mp3`

**For Bomb Sound:**
- Search: "explosion" or "bomb explosion"
- Download: Royalty-free version
- File: Save as `public/bomb-sound.mp3`

Alternative sources:
- https://www.zapsplat.com/ (Free, no credit required)
- https://pixabay.com/sound-effects/ (Free)

#### Option B: Generate Using Web Tools
- https://jsfxr.net/ - Generate retro game sounds
- Create simple 8-bit sword and explosion sounds

### 3. Directory Structure for Assets
```
ancient-clash/public/
├── splash.png          (Your image)
├── sword-sound.mp3     (Sword sound effect)
└── bomb-sound.mp3      (Bomb explosion sound)
```

---

## QUICK START SUMMARY

1. **Create project structure** - Follow the directory layout in PART 1
2. **Copy all files** - Use content from PART 1, PART 2, and PART 3
3. **Add assets** - Place image and sound files in `public/`
4. **Install dependencies** - `npm install`
5. **Start development** - `npm run dev`
6. **Build for production** - `npm run build`

---

## TROUBLESHOOTING

### Sound not playing?
- Check that `.mp3` files are in the `public/` folder
- Check browser console for errors (F12)
- Some browsers require user interaction before audio can play

### Image not showing?
- Ensure `splash.png` is in the `public/` folder
- Check file name matches exactly (case-sensitive on Linux)
- Try different image format if PNG doesn't work

### Game not starting?
- Run `npm install` to install all dependencies
- Clear browser cache (Ctrl+Shift+Delete)
- Check console for JavaScript errors

---

## FEATURES IMPLEMENTED

✅ **Ancient Clash Theme** - Medieval styling with gold/brown colors
✅ **Sword vs Bomb** - Player (X) vs Computer (O) with emoji icons
✅ **Sound Effects** - Different sounds for sword and bomb moves
✅ **3-Second Splash Screen** - Custom image or fallback display
✅ **AI with 3 Difficulty Levels**:
   - Easy: Random moves
   - Medium: Smart strategy (win/block/center preference)
   - Hard: Unbeatable minimax algorithm
✅ **Responsive Design** - Works on desktop and mobile
✅ **Game Status Display** - Shows current turn and winner
✅ **Difficulty Selector** - Change AI difficulty anytime
✅ **Reset Button** - Start new game instantly

---

Happy coding! ⚔️💣
