import { blue, green, red } from '@mui/material/colors';

const theme = {
  palette: {
    primary: {
      dark: blue[900],
      main: blue[400],
      light: blue[300],
    },
    secondary: {
      main: red[400],
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    info: {
      dark: green[900],
      main: green[400],
      light: green[300],
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiDivider: {
      styleOverrides: {
        vertical: {
          marginRight: 10,
          marginLeft: 10,
        },
        // TODO: open issue for missing "horizontal" CSS rule
        // in Divider API - https://mui.com/material-ui/api/divider/#css
        middle: {
          marginTop: 10,
          marginBottom: 10,
          width: '80%',
        },
      },
    },
  },
};

export default theme;
