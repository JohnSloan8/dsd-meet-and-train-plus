import { blue, green, orange, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
  palette: {
    primary: {
      dark: blue[900],
      main: blue[400],
      light: blue[200],
    },
    secondary: {
      light: red[300],
      main: red[500],
    },
    background: {
      default: '#225',
      paper: '#236',
    },
    info: {
      dark: green[900],
      main: green[500],
      light: green[300],
    },
    warning: {
      dark: orange[900],
      main: orange[700],
      light: orange[500],
    },
    text: {
      primary: '#fff',
      secondary: '#555',
    },
  },
  select: {
    '&:before': {
      borderColor: blue[400],
    },
    '&:after': {
      borderColor: blue[400],
    },
  },
  icon: {
    fill: blue[400],
  },
});

const profileTheme = createTheme(mainTheme, {
  palette: {
    text: {
      primary: '#fff',
    },
  },
});

export { mainTheme, profileTheme };
