import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2B4C7E',
      light: '#3B5998',
      dark: '#1A365D'
    },
    secondary: {
      main: '#1EA896',
      light: '#25C4B0',
      dark: '#158F7E'
    },
    error: {
      main: '#FF6B6B'
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E'
    }
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: {
      fontFamily: 'Poppins, system-ui, sans-serif',
      fontWeight: 600
    },
    h2: {
      fontFamily: 'Poppins, system-ui, sans-serif',
      fontWeight: 600
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px'
        },
        contained: {
          boxShadow: 'none'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }
})

export default responsiveFontSizes(theme) 