# 🎮 ANCIENT CLASH - Tic Tac Toe Game

A medieval-themed tic-tac-toe game built with React, Vite, and Material-UI.

## 🚀 Quick Start

### Option 1: Run with NPM (Development)
```bash
npm install
npm run dev
```
Then open your browser to `http://localhost:5173`

### Option 2: Build for Production
```bash
npm install
npm run build
npm run preview
```

### Option 3: Windows Users
Double-click `build-app.bat` to install dependencies and build.

## 📋 Features

- **Medieval Theme**: Gold and brown color scheme with sword (⚔️) and bomb (💣) emojis
- **3 Difficulty Levels**:
  - Easy: Random moves
  - Medium: Smart strategy with blocking
  - Hard: Unbeatable AI using Minimax algorithm
- **Smooth Animations**: Responsive UI with Material-UI
- **Sound Effects**: Play sword and bomb sounds (requires audio files)
- **Responsive Design**: Works on mobile and desktop

## 🎯 How to Play

1. You are the Sword (⚔️), Computer is the Bomb (💣)
2. Click on an empty cell to make your move
3. Computer responds automatically
4. First to get 3 in a row wins!
5. Click "NEW GAME" to play again

## 📁 Project Structure

```
src/
├── App.jsx              # Main game component
├── SplashScreen.jsx     # 3-second intro screen
├── GameBoard.jsx        # 3x3 game grid
├── Cell.jsx             # Individual game cell
├── GameStatus.jsx       # Status display
├── GameControls.jsx     # Difficulty & new game button
├── gameLogic.js         # Game rules & logic
├── AI.js               # AI difficulty levels
├── SoundManager.js     # Sound effect management
├── main.jsx            # React entry point
├── index.css           # Global styles
└── App.css            # App styles
```

## 🎨 Colors

- **Gold**: #d4af37 (accents, text)
- **Dark Brown**: #2c1810 (background)
- **Medium Brown**: #5d4037 (cells)

## 🔊 Sound Files

To enable sound, add these to the `public/` folder:
- `sword-sound.mp3` - Played when you make a move
- `bomb-sound.mp3` - Played when computer moves

## 🛠️ Technologies

- React 19
- Vite (fast build tool)
- Material-UI (component library)
- JavaScript ES6+

## 📝 License

Created with ❤️ for game lovers everywhere.
