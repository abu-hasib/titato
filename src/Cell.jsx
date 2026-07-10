import { Box, Button } from '@mui/material'

export function Cell({ value, onClick, disabled, mode }) {
  const getEmoji = () => {
    if (value === 'X') return mode === "boring" ? 'X' : '⚔️'
    if (value === 'O') return mode === 'boring' ? 'O' : '🗡️'
    return ''
  }
  const notBoring  = mode !== 'boring'
  return (
    <Button
      onClick={onClick}
      disabled={disabled || value !== null}
      sx={{
        width: { xs: '60px', sm: '80px' },
        height: { xs: '60px', sm: '80px' },
        ...(notBoring && { backgroundColor: value ? '#3e2723' : 'hsl(14, 25%, 29%, .5)' }),
        border: notBoring ? '2px solid #fca136' : '1px solid black',
        fontSize: { xs: '2rem', sm: '2.5rem' },
        color: '#d4af37',
        cursor: value !== null ? 'default' : 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          ...(notBoring && {backgroundColor: value ? '#6d4c41' : '#3e2723'}),
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
