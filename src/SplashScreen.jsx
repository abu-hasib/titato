import { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import Splash from '/images/splash.png'

export function SplashScreen({ onComplete }) {
  const [fade, setFade] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(0)
    }, 2500)

    const completeTimer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    // <Box
    //   sx={{
    //     position: 'fixed',
    //     top: 0,
    //     left: 0,
    //     width: '100%',
    //     height: '100%',
    //     backgroundColor: '#2c1810',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     opacity: fade,
    //     transition: 'opacity 0.5s ease-out',
    //     zIndex: 1000,
    //     pointerEvents: fade > 0 ? 'auto' : 'none',
    //   }}
    // >
    //   <Box
    //     sx={{
    //       textAlign: 'center',
    //     }}
    //   >
    //     <Box sx={{ fontSize: '4rem', marginBottom: 2 }}>⚔️ 💣</Box>
    //     <Box
    //       sx={{
    //         fontSize: '2.5rem',
    //         fontWeight: 'bold',
    //         color: '#d4af37',
    //         textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
    //       }}
    //     >
    //       ANCIENT CLASH
    //     </Box>
    //   </Box>
    // </Box>
    <Box component={Grid} justifyContent="center" alignItems="center" maxHeight={100} margin="auto">
      <img src={Splash} height="100%" alt="splash" srcset="" />
    </Box>
  )
}
