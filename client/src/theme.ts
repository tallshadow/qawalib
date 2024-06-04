import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007aff', // Apple's primary blue color
    },
    secondary: {
      main: '#5856d6', // Apple's secondary purple color
    },
    text: {
      primary: '#1d1d1f', // Apple's primary text color
      secondary: '#6e6e73', // Apple's secondary text color
    },
    background: {
      default: '#ffffff', // Apple's default background color
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1d1d1f',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#1d1d1f',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1d1d1f',
      letterSpacing: '.007em',
      lineHeight: '1.1428571429',
      fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#1d1d1f',
    },
    button: {
      textTransform: 'none', // Keep button text normal case
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color:'rgba(0, 0, 0, 0.54)',
          margin: '8px',
          borderRadius: '12px', // Apple's rounded button style
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)', // Subtle hover effect
            backgroundColor: '#f5f5f7', // Apple's light hover color
            color:'#37373a'
          },
          '&:active': {
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.24)', // Active state effect
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ececec', // Apple's navbar background color
          color: '#1d1d1f',
          boxShadow: 'none',
          borderBottom: '1px solid #d2d2d7',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          justifyContent: 'space-between',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1d1d1f',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          borderRadius: 28,
          boxSizing: 'border-box',
          overflow: 'hidden',
          boxShadow:'none'
        },
      },
    },
  },
});

export default theme;
