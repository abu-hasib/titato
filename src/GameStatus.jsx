import { Box, Typography } from '@mui/material'

export function GameStatus({ gameState, playerTurn }) {
  const getStatusText = () => {
    if (gameState === 'playing') {
      return playerTurn ? '⚔️ Turn' : '🗡️ Turn'
    }
    if (gameState === 'player-win') return '⚔️ WINS'
    if (gameState === 'computer-win') return '🗡️ WINS!'
    if (gameState === 'draw') return '🛡️ IT\'S A DRAW!'
    return ''
  }

  const getStatusColor = () => {
    if (gameState === 'player-win') return '#4caf50'
    if (gameState === 'computer-win') return '#f44336'
    if (gameState === 'draw') return '#2196f3'
    return '#d4af37'
  }

  return (
    <Box
      sx={{
        padding: { xs: '.2em', sm: '.5em' },
        backgroundColor: '#4a3728',
        border: '2px solid #8b6f47',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '.5rem', sm: '1rem' },
          fontWeight: 'bold',
          color: getStatusColor(),
          textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        {getStatusText()}
      </Typography>
    </Box>
  )
}
