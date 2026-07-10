import { Box } from "@mui/material";
import React from "react";

const GameButton = ({ src, dispatch, type, data }) => {
  return (
    <Box
      component="button"
      type="button"
      onClick={() => dispatch({ type, data })}
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
      <img src={src} alt="Play now" width="100%" />
    </Box>
  );
};

export default GameButton;
