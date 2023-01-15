import { ThemeProvider } from '@mui/material/styles';

import { mainTheme } from './theme';

type CustomThemeProviderProps = {
  children: JSX.Element;
};

function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  return <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;
