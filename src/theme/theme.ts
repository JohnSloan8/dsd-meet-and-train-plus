import { blue, green, orange, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
  palette: {
    primary: {
      dark: blue[900],
      main: blue[800],
      light: blue[600],
      wafer: blue[100],
    },
    secondary: {
      light: red[700],
      main: red[800],
    },
    background: {
      default: '#225',
      paper: '#236',
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

const profileTheme = createTheme(mainTheme, {
  palette: {
    text: {
      primary: '#fff',
    },
  },
});

export { mainTheme, profileTheme };
