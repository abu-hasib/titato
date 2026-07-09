import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Splash from "/images/splash.png";

export function SplashScreen() {
  return (
    <Box
      sx={{
        backgroundImage: "url(/images/splash.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundSize: "cover",
        height: "100vh",
      }}
    ></Box>
  );
}
