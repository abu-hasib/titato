import { Box } from "@mui/material";

export function SplashScreen() {
  return (
    <Box
      sx={{
        backgroundColor: "#2f2926",
        backgroundImage: "url(/images/splash.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "contain",
        height: "100vh"
      }}
    ></Box>
  );
}
