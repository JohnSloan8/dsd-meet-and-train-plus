import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import routes from '..';

// import { getPageHeight } from './utils';

function Pages() {
  return (
    <Box sx={{ minHeight: '100vh', width: '100%' }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
    </Box>
  );
}

export default Pages;
