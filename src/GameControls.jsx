import { Box, Button, MenuItem, Select, Typography } from "@mui/material";

export function GameControls({ difficulty, onDifficultyChange, onNewGame }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: { xs: "12px", sm: "16px" },
        backgroundColor: "#4a3728",
        borderRadius: "8px",
        border: "2px solid #8b6f47",
      }}
    >
      {/* <Box>
        <Typography
          sx={{
            color: '#d4af37',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            marginBottom: '8px',
            fontWeight: 'bold',
          }}
        >
          Difficulty
        </Typography>
        <Select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          sx={{
            width: '100%',
            backgroundColor: '#5d4037',
            color: '#d4af37',
            border: '2px solid #8b6f47',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#8b6f47',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d4af37',
            },
            '& .MuiSvgIcon-root': {
              color: '#d4af37',
            },
          }}
        >
          <MenuItem value="easy">Easy (Random)</MenuItem>
          <MenuItem value="medium">Medium (Smart)</MenuItem>
          <MenuItem value="hard">Hard (Unbeatable)</MenuItem>
        </Select>
      </Box> */}

      <Button onClick={onNewGame} variant="contained">
        Restart
      </Button>
    </Box>
  );
}
