// frontend/src/components/AppLoadingScreen.tsx
import { Box, Typography, CircularProgress } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles'; 

export default function AppLoadingScreen() {
  const theme = useTheme(); 

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%), ${theme.palette.background.default}`,
        '@keyframes pulseLogo': {
            '0%, 100%': { opacity: 1, transform: 'scale(1)' },
            '50%': { opacity: 0.85, transform: 'scale(1.02)' },
        },
      }}
    >
      <img 
        
        src="/img/piano_logo.png" 
        alt="Piano World Logo" 
        style={{ 
            width: 'auto', 
            height: '70px', 
            marginBottom: '32px',
            filter: 'invert(100%)', 
            animation: 'pulseLogo 2.5s infinite ease-in-out',
        }}
      />
      <CircularProgress 
        size={50} 
        sx={{ 
          mb: 3, 
          color: 'primary.main' 
        }} 
      />
      <Typography 
        variant="h6" 
        component="h1" 
        color="primary.dark" 
        sx={{ fontWeight: '500', letterSpacing: '0.5px' }}
      >
        Cargando Piano World...
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ mt: 0.5 }}
      >
        Un momento por favor.
      </Typography>
    </Box>
  );
}