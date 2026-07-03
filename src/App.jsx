import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  Stack,
} from "@mui/material";
import { SplashScreen } from "./SplashScreen";
import { GameBoard } from "./GameBoard";
import { GameStatus } from "./GameStatus";
import { GameControls } from "./GameControls";
import { initializeGame, getWinner, isBoardFull } from "./gameLogic";
import { getComputerMove } from "./AI";
import { SoundManager } from "./SoundManager";

const theme = createTheme({
  palette: {
    background: {
      default: "#2c1810",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [board, setBoard] = useState(initializeGame());
  const [gameState, setGameState] = useState("playing");
  const [playerTurn, setPlayerTurn] = useState(true);
  const [difficulty, setDifficulty] = useState("medium");
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  useEffect(() => {
    SoundManager.init();
  }, []);

  const checkGameEnd = useCallback((currentBoard) => {
    const winner = getWinner(currentBoard);
    if (winner === "X") {
      setGameState("player-win");
      SoundManager.playVictorySound();
      setScores(prev => ({ ...prev, player1: prev.player1++ }));
      return true;
    }
    if (winner === "O") {
      setGameState("computer-win");
      SoundManager.playVictorySound();
      setScores(prev => ({ ...prev, player2: prev.player2++ }));
      return true;
    }
    if (isBoardFull(currentBoard)) {
      setGameState("draw");
      return true;
    }
    return false;
  }, []);

  const handleCellClick = useCallback(
    (index) => {
      if (!playerTurn || gameState !== "playing") return;

      if (board[index] !== null) return;

      const newBoard = [...board];
      newBoard[index] = "X";
      SoundManager.playSword();

      if (checkGameEnd(newBoard)) {
        setBoard(newBoard);
        return;
      }

      setBoard(newBoard);
      setPlayerTurn(false);

      setTimeout(() => {
        const computerMove = getComputerMove(newBoard, difficulty);
        if (computerMove === -1) return;

        const computerBoard = [...newBoard];
        computerBoard[computerMove] = "O";
        SoundManager.playBomb();

        checkGameEnd(computerBoard);
        setBoard(computerBoard);
        setPlayerTurn(true);
      }, 500);
    },
    [board, playerTurn, gameState, difficulty, checkGameEnd],
  );

  const handleNewGame = useCallback(() => {
    setBoard(initializeGame());
    setGameState("playing");
    setPlayerTurn(true);
  }, []);

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: "url(/images/bg-image.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          padding: { xs: "5em", md: "10em" },
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
        >
          {/* <Typography
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
          </Typography> */}

          <Stack direction="row" spacing={4} alignItems="center">
            <ScoreBoard score={scores.player1} player="⚔️" />
            <GameStatus gameState={gameState} />
            <ScoreBoard score={scores.player2} player="🗡️" />
          </Stack>
          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            disabled={!playerTurn || gameState !== "playing"}
          />

          <GameControls
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            onNewGame={handleNewGame}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

function ScoreBoard({ score, player }) {
  return (
    <Box
      sx={{
        padding: { xs: "12px", sm: "16px" },
        backgroundColor: "#4a3728",
        border: "2px solid #8b6f47",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "1rem", sm: "1.3rem" },
          fontWeight: "bold",
          color: "black",
          textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {player} - {score}
      </Typography>
    </Box>
  );
}

export default App;
