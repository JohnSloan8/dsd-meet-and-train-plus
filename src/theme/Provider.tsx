import { ThemeProvider, createTheme } from '@mui/material/styles';

import theme from './theme';

type CustomThemeProviderProps = {
  children: JSX.Element;
};

function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  return <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;
