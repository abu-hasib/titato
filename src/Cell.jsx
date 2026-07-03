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
        backgroundColor: value ? '#3e2723' : 'hsl(14, 25%, 29%, .5)',
        border: '2px solid #fca136',
        fontSize: { xs: '2rem', sm: '2.5rem' },
        color: '#d4af37',
        cursor: value !== null ? 'default' : 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: value ? '#6d4c41' : '#3e2723',
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
