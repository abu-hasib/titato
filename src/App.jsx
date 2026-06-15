import { useState, useEffect, useCallback } from 'react'
import { Box, Container, Typography, ThemeProvider, createTheme } from '@mui/material'
import { SplashScreen } from './SplashScreen'
import { GameBoard } from './GameBoard'
import { GameStatus } from './GameStatus'
import { GameControls } from './GameControls'
import { initializeGame, getWinner, isBoardFull } from './gameLogic'
import { getComputerMove } from './AI'
import { SoundManager } from './SoundManager'

const theme = createTheme({
  palette: {
    background: {
      default: '#2c1810',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
})

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [board, setBoard] = useState(initializeGame())
  const [gameState, setGameState] = useState('playing')
  const [playerTurn, setPlayerTurn] = useState(true)
  const [difficulty, setDifficulty] = useState('medium')

  useEffect(() => {
    SoundManager.init()
  }, [])

  const checkGameEnd = useCallback((currentBoard) => {
    const winner = getWinner(currentBoard)
    if (winner === 'X') {
      setGameState('player-win')
      SoundManager.playVictorySound()
      return true
    }
    if (winner === 'O') {
      setGameState('computer-win')
            SoundManager.playVictorySound()
      return true
    }
    if (isBoardFull(currentBoard)) {
      setGameState('draw')
      return true
    }
    return false
  }, [])

  const handleCellClick = useCallback((index) => {
    if (!playerTurn || gameState !== 'playing') return

    if (board[index] !== null) return

    const newBoard = [...board]
    newBoard[index] = 'X'
    SoundManager.playSword()

    if (checkGameEnd(newBoard)) {
      setBoard(newBoard)
      return
    }

    setBoard(newBoard)
    setPlayerTurn(false)

    setTimeout(() => {
      const computerMove = getComputerMove(newBoard, difficulty)
      if (computerMove === -1) return

      const computerBoard = [...newBoard]
      computerBoard[computerMove] = 'O'
      SoundManager.playBomb()

      checkGameEnd(computerBoard)
      setBoard(computerBoard)
      setPlayerTurn(true)
    }, 500)
  }, [board, playerTurn, gameState, difficulty, checkGameEnd])

  const handleNewGame = useCallback(() => {
    setBoard(initializeGame())
    setGameState('playing')
    setPlayerTurn(true)
  }, [])

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty)
  }

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: 'url(/images/splash.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: '16px', sm: '20px' },
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem' },
              fontWeight: 'bold',
              color: '#d4af37',
              textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
              marginBottom: '10px',
              letterSpacing: '2px',
            }}
          >
            ⚔️ ANCIENT CLASH 💣
          </Typography>

          <GameStatus gameState={gameState} playerTurn={playerTurn} />

          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            disabled={!playerTurn || gameState !== 'playing'}
          />

          <GameControls
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            onNewGame={handleNewGame}
          />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
