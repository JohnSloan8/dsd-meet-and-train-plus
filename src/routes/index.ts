import HomeIcon from '@mui/icons-material/Home';
// import HowToRegIcon from '@mui/icons-material/HowToReg';
// import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Home]: {
    component: asyncComponentLoader(() => import('@/pages/Home')),
    path: '/',
    title: 'Home',
    icon: HomeIcon,
  },
  [Pages.SignUp]: {
    component: asyncComponentLoader(() => import('@/pages/SignUp')),
    path: '/sign-up',
    // title: 'Sign Up',
    // icon: HowToRegIcon,
  },
  [Pages.LogIn]: {
    component: asyncComponentLoader(() => import('@/pages/LogIn')),
    path: '/log-in',
    // title: 'LogIn',
    // icon: LoginIcon,
  },
  [Pages.Profile]: {
    component: asyncComponentLoader(() => import('@/pages/Profile')),
    path: '/profile',
    title: 'Profile',
    icon: PersonIcon,
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
