import { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';

import { ThemeProvider } from '@mui/material/styles';

import { mainTheme } from '@/theme/theme';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <RecoilRoot>
      <HelmetProvider>
        <ThemeProvider theme={mainTheme}>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </RecoilRoot>,
  );
}

export default render;
