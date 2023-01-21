import { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <RecoilRoot>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </RecoilRoot>,
  );
}

export default render;
