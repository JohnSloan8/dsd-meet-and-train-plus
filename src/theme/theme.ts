import { blue, green, orange, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    primary: {
      dark: blue[900],
      main: blue[800],
      light: blue[600],
    },
    secondary: {
      light: red[700],
      main: red[800],
    },
    info: {
      dark: green[900],
      main: green[800],
      light: green[600],
    },
    warning: {
      dark: orange[900],
      main: orange[800],
      light: orange[600],
    },
    text: {
      primary: '#fff',
      secondary: '#555',
    },
  },
});

const mainTheme = createTheme(baseTheme, {
  palette: {
    background: {
      default: '#ddd',
      paper: '#888',
    },
  },
});

const profileTheme = createTheme(baseTheme, {
  palette: {
    text: {
      primary: '#fff',
    },
    background: {
      default: '#225',
      paper: '#236',
    },
  },
});

const loginTheme = createTheme(baseTheme, {
  palette: {
    background: {
      default: '#fff',
      paper: '#f3f3f3',
    },
  },
});

export { mainTheme, profileTheme, loginTheme };
