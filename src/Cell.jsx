import { Box, Button } from '@mui/material'

export function Cell({ value, onClick, disabled }) {
  const getEmoji = () => {
    if (value === 'X') return '⚔️'
    if (value === 'O') return '🗡️'
    return ''
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled || value !== null}
      sx={{
        width: { xs: '80px', sm: '100px' },
        height: { xs: '80px', sm: '100px' },
        backgroundColor: value ? '#3e2723' : '#5d4037',
        border: '2px solid #8b6f47',
        fontSize: { xs: '2rem', sm: '2.5rem' },
        color: '#d4af37',
        cursor: value !== null ? 'default' : 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: value ? '#3e2723' : '#6d4c41',
          transform: value ? 'scale(1)' : 'scale(1.05)',
        },
        '&:disabled': {
          cursor: 'not-allowed',
        },
      }}
    >
      {getEmoji()}
    </Button>
  )
}
