import { Box } from "@mui/material";
import { Cell } from "./Cell";

export function GameBoard({ board, onCellClick, disabled, mode }) {
  if (mode === "boring")
    return (
      <Box
        sx={{
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          // backgroundColor: '#2c1810',
          borderRadius: "8px",
          // border: '3px solid #8b6f47',
          // boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
        }}
      >
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onClick={() => onCellClick(index)}
            disabled={disabled}
            mode={mode}
          />
        ))}
      </Box>
    );
  return (
    <Box
      sx={{
        margin: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: { xs: "8px", sm: "10px" },
        padding: { xs: "16px", sm: "20px" },
        // backgroundColor: '#2c1810',
        borderRadius: "8px",
        // border: '3px solid #8b6f47',
        // boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
      }}
    >
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          disabled={disabled}
          mode={mode}
        />
      ))}
    </Box>
  );
}
