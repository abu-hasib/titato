import { Box, Typography } from "@mui/material";

export function GameStatus({ gameState, playerTurn, mode }) {
  const isBoring = mode === "boring";
  const getStatusText = () => {
    if (gameState === "playing") {
      return getModeStatusText(isBoring, playerTurn);
    }
    if (gameState === "player-win") return isBoring ? "X Wins" : "⚔️ WINS";
    if (gameState === "computer-win") return isBoring ? "O Wins" : "🗡️ WINS!";
    if (gameState === "draw")
      return isBoring ? "IT'S A DRAW!" : "🛡️ IT'S A DRAW!";
    return "";
  };

  const getModeStatusText = (isBoring, playerTurn) => {
    if (isBoring) {
      return playerTurn ? "X Turn" : "O Turn";
    } else {
      return playerTurn ? "⚔️ Turn" : "🗡️ Turn";
    }
  };

  const getStatusColor = () => {
    if (gameState === "player-win") return "#4caf50";
    if (gameState === "computer-win") return "#f44336";
    if (gameState === "draw") return "#2196f3";
    return "#d4af37";
  };

  return (
    <Box
      sx={{
        padding: { xs: ".2em", sm: ".5em" },
        ...(!isBoring && { backgroundColor: "#4a3728" }),
        ...(!isBoring && { border: "2px solid #8b6f47" }),
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: ".5rem", sm: "1rem" },
          fontWeight: "bold",
          color: !isBoring ? getStatusColor() : "black",
          ...(!isBoring && { textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }),
          // textTransform: 'uppercase',
          letterSpacing: "1px",
        }}
      >
        {getStatusText()}
      </Typography>
    </Box>
  );
}
