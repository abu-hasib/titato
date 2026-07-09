import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  Stack,
  Button,
} from "@mui/material";
import { SplashScreen } from "./SplashScreen";
import { GameBoard } from "./GameBoard";
import { GameStatus } from "./GameStatus";
import { GameControls } from "./GameControls";
import { initializeGame, getWinner, isBoardFull } from "./gameLogic";
import { getComputerMove } from "./AI";
import { SoundManager } from "./SoundManager";
import useSimpleReducer from "./hooks/useSimpleReducer";
import GameTitle from "/images/gametitle.png";
import PlayNow from "/images/cta.png";

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
  const { status, dispatch } = useSimpleReducer({});
  const [showSplash, setShowSplash] = useState(true);
  const [board, setBoard] = useState(initializeGame());
  const [gameState, setGameState] = useState("playing");
  const [playerTurn, setPlayerTurn] = useState(true);
  const [difficulty, setDifficulty] = useState("medium");
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  useEffect(() => {
    SoundManager.init();
    const timer = setTimeout(() => {
      dispatch({ type: "waiting" });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const checkGameEnd = useCallback((currentBoard) => {
    const winner = getWinner(currentBoard);
    if (winner === "X") {
      setGameState("player-win");
      SoundManager.playVictorySound();
      setScores((prev) => ({ ...prev, player1: prev.player1++ }));
      return true;
    }
    if (winner === "O") {
      setGameState("computer-win");
      SoundManager.playVictorySound();
      setScores((prev) => ({ ...prev, player2: prev.player2++ }));
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

  if (status === "starting") {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  } else if (status === "waiting") {
    return (
      <Box
        sx={{
          backgroundImage: "url(/images/bg-image.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          // padding: { xs: "5em", md: "20em" },
          height: "100vh",
        }}
      >
        <Stack alignItems="center" height="90%" justifyContent="space-between">
          <Box>
            <img src={GameTitle} alt="title" width={500} />
          </Box>
          <Box
            component="button"
            type="button"
            onClick={() => dispatch({ type: "playing" })}
            sx={{
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              appearance: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.15s ease, filter 0.15s ease",
              filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.35))",
              transformOrigin: "center",
              "&:hover": {
                transform: "translateY(-3px) rotate(-1deg)",
                filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.42))",
              },
              "&:active": {
                transform: "translateY(4px) rotate(1deg)",
                filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.28))",
              },
            }}
          >
            <img src={PlayNow} alt="Play now" width={500} />
          </Box>
        </Stack>
      </Box>
    );
  } else if (status === "playing") {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundImage: "url(/images/bg-image.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
          <Box
            component="button"
            onClick={() => dispatch({ type: "waiting" })}
            sx={{
              cursor: "pointer",
              background: "transparent",
              transition: "transform 0.15s ease, filter 0.15s ease",
              filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.35))",
              transformOrigin: "center",
              border: "none",
              "&:hover": {
                transform: "translateY(-3px) rotate(-1deg)",
                filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.42))",
              },
              "&:active": {
                transform: "translateY(4px) rotate(1deg)",
                filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.28))",
              },
            }}
            width="50%"
          >
            <img
              src="/images/back.png"
              width={200}
              alt=""
              style={{ rotate: "180deg" }}
            />
          </Box>
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={4} alignItems="center">
              <ScoreBoard score={scores.player1} player="⚔️" />
              <GameStatus gameState={gameState} playerTurn={playerTurn} />
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
          color: "#fca136",
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
