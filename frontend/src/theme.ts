// frontend/src/theme.ts
import { createTheme, alpha } from '@mui/material/styles';

const PRIMARY_MAIN = '#14448B'; // Azul oscuro principal para textos y elementos
const SECONDARY_MAIN = '#E99401'; // Naranja/amarillo como acento (del --bs-primary original)
const BACKGROUND_DEFAULT = '#FFFFFF'; // Fondo principal blanco
const BACKGROUND_PAPER = '#F8F9FA'; // Un gris muy claro 
const TEXT_PRIMARY = '#212529';     // Color de texto principal oscuro
const TEXT_SECONDARY = '#6C757D';   // Color de texto secundario gris

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_MAIN,
    },
    secondary: {
      main: SECONDARY_MAIN,
    },
    background: {
      default: BACKGROUND_DEFAULT,
      paper: BACKGROUND_PAPER,
    },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
    },
    customDark: {
      main: '#262626', 
      contrastText: '#FFFFFF',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Outfit", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 900,
      color: PRIMARY_MAIN,
    },
    h2: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 900,
      color: PRIMARY_MAIN,
    },
    h3: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700, 
      color: PRIMARY_MAIN,
    },
    h4: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
      color: PRIMARY_MAIN,
    },
    h5: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
      color: PRIMARY_MAIN,
    },
    h6: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
      color: PRIMARY_MAIN,
    },
    button: {
      textTransform: 'none', 
      fontWeight: 700,
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', 
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px', 
          boxShadow: `0px 4px 12px ${alpha(PRIMARY_MAIN, 0.1)}`,
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: PRIMARY_MAIN,
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: PRIMARY_MAIN,
            },
          },
        },
      },
    },
  },
});


declare module '@mui/material/styles' {
  interface Palette {
    customDark: Palette['primary'];
  }
  interface PaletteOptions {
    customDark?: PaletteOptions['primary'];
  }
}


export default theme;