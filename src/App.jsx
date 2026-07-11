import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  Stack,
  Button,
  Grid,
  Select,
  MenuItem,
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
import GameButton from "./components/GameButton";

const theme = createTheme({
  palette: {
    background: {
      default: "#2c1810",
    },
    accent: {
      default: "#fca136",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

function App() {
  const { status, data, dispatch } = useSimpleReducer({});
  const [showSplash, setShowSplash] = useState(true);
  const [board, setBoard] = useState(initializeGame());
  const [gameState, setGameState] = useState("playing");
  const [playerTurn, setPlayerTurn] = useState(true);
  const [difficulty, setDifficulty] = useState("easy");
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const { mode } = data || {};
  const isExplosive = mode === "explosive";
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
      isExplosive && SoundManager.playSword();

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
        isExplosive && SoundManager.playBomb();

        checkGameEnd(computerBoard);
        setBoard(computerBoard);
        setPlayerTurn(true);
      }, 500);
    },
    [board, playerTurn, gameState, difficulty, isExplosive, checkGameEnd],
  );

  const handleNewGame = useCallback(() => {
    setBoard(initializeGame());
    setGameState("playing");
    setPlayerTurn(true);
  }, []);

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const getGame = (mode) => {
    if (!mode) return;
    let game;
    switch (mode) {
      case "explosive":
        game = (
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
                onClick={() => {
                  dispatch({ type: "waiting" });
                  handleNewGame();
                }}
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
                  width={150}
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
                  <GameStatus
                    gameState={gameState}
                    playerTurn={playerTurn}
                    mode={mode}
                  />
                  <ScoreBoard score={scores.player2} player="🗡️" />
                </Stack>
                <GameBoard
                  board={board}
                  onCellClick={handleCellClick}
                  disabled={!playerTurn || gameState !== "playing"}
                  mode={mode}
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
        break;
      case "boring":
        game = (
          <>
            <Container maxWidth="md" component={Box} paddingBlock="1em">
              <Button
                onClick={() => {
                  dispatch({ type: "waiting" });
                  handleNewGame();
                }}
              >
                Go back
              </Button>

              <Box paddingBlock="6em">
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  component={Container}
                  maxWidth="sm"
                  spacing={2}
                >
                  <Stack direction="row" spacing={4} alignItems="center">
                    <ScoreBoard score={scores.player1} player="X" mode={mode} />
                    <GameStatus
                      gameState={gameState}
                      playerTurn={playerTurn}
                      mode={mode}
                    />
                    <ScoreBoard score={scores.player2} player="O" mode={mode} />
                  </Stack>
                  <GameBoard
                    board={board}
                    onCellClick={handleCellClick}
                    disabled={!playerTurn || gameState !== "playing"}
                    mode={mode}
                  />
                </Stack>
              </Box>
            </Container>
          </>
        );
        break;
      default:
        break;
    }
    return game;
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
        <Stack alignItems="center" height="90%">
          <Box>
            <img src={GameTitle} alt="title" width={400} />
          </Box>
          <Box flex={1}>
            <Stack alignItems="center" justifyContent="start">
              <Typography
                alignSelf="start"
                sx={{
                  color: "#d4af37",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  marginBottom: 0,
                  fontWeight: "bold",
                }}
              >
                Choose Mood
              </Typography>
              <Grid container>
                <Box>
                  <GameButton
                    src={PlayNow}
                    dispatch={dispatch}
                    type="waiting"
                    data={{ mode: "explosive" }}
                    styles={{ width: "100%", height: "70px" }}
                  />
                </Box>
                <Box>
                  <GameButton
                    src={PlayNow}
                    dispatch={dispatch}
                    type="waiting"
                    data={{ mode: "boring" }}
                    styles={{ width: "100%", height: "70px" }}
                  />
                </Box>
              </Grid>
              <Box width="100%">
                <Typography
                  sx={{
                    color: "#d4af37",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Difficulty
                </Typography>
                <Select
                  value={difficulty}
                  onChange={(e) => handleDifficultyChange(e.target.value)}
                  sx={{
                    width: "100%",
                    padding: ".2em .5em",
                    height: "2.5em",
                    backgroundColor: "#5d4037",
                    color: "#d4af37",
                    border: "2px solid #8b6f47",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#8b6f47",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d4af37",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#d4af37",
                    },
                  }}
                >
                  <MenuItem value="easy">Easy (Random)</MenuItem>
                  <MenuItem value="medium">Medium (Smart)</MenuItem>
                  <MenuItem value="hard">Hard (Unbeatable)</MenuItem>
                </Select>
              </Box>
            </Stack>
          </Box>
          <Box width={300}>
            <GameButton
              src={PlayNow}
              dispatch={dispatch}
              type="playing"
              styles={{ width: "300px" }}
            />
          </Box>
        </Stack>
      </Box>
    );
  } else if (status === "playing") {
    return getGame(mode);
  }
}

function ScoreBoard({ score, player, mode }) {
  const isBoring = mode === "boring";
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
          ...(!isBoring && { color: "#fca136" }),
          ...(!isBoring && { textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }),
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
