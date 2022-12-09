import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Welcome',
    icon: HomeIcon,
  },
  [Pages.SignUp]: {
    component: asyncComponentLoader(() => import('@/pages/SignUp')),
    path: '/sign-up',
    title: 'Sign Up',
    icon: HowToRegIcon,
  },
  [Pages.LogIn]: {
    component: asyncComponentLoader(() => import('@/pages/LogIn')),
    path: '/log-in',
    title: 'LogIn',
    icon: LoginIcon,
  },
  [Pages.StravaLink]: {
    component: asyncComponentLoader(() => import('@/pages/StravaLink')),
    path: '/strava-link',
  },

  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
