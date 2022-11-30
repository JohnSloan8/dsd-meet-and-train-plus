import type { Theme } from '@mui/material';

function getPageHeight(theme: Theme) {
  const topSpacing = Number(theme.mixins.toolbar.height) + parseInt(theme.spacing(1));

  return `calc(100vh - ${topSpacing}px)`;
}

export { getPageHeight };
