import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import { FullSizeCenteredFlexBox, FullSizeFlexBox } from '@/components/styled';
import { title } from '@/config';
import { supabase } from '@/services/supabase';
import { useSession } from '@/store/auth';
import useSidebar from '@/store/sidebar';

// import { getRandomJoke } from './utils';

function Header() {
  const [, sidebarActions] = useSidebar();

  const { session } = useSession();
  const navigate = useNavigate();

  const logOut = async () => {
    supabase.auth.signOut().then(() => {
      navigate('/log-in', { replace: true });
    });
  };

  // function showNotification() {
  //   notificationsActions.push({
  //     options: {
  //       // Show fully customized notification
  //       // Usually, to show a notification, you'll use something like this:
  //       // notificationsActions.push({ message: ... })
  //       // `message` accepts string as well as ReactNode
  //       // But you also can use:
  //       // notificationsActions.push({ options: { content: ... } })
  //       // to show fully customized notification
  //       content: (
  //         <Alert severity="info">
  //           <AlertTitle>Notification demo (random IT jokes :))</AlertTitle>
  //           {getRandomJoke()}
  //         </Alert>
  //       ),
  //     },
  //   });
  // }

  return (
    <AppBar sx={{ color: 'background.paper' }} elevation={1} position="fixed">
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Grid container>
          <Grid item xs={2}>
            <FullSizeFlexBox sx={{ justifyContent: 'flex-start' }}>
              <IconButton
                onClick={sidebarActions.toggle}
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            </FullSizeFlexBox>
          </Grid>
          <Grid item xs={8}>
            <FullSizeCenteredFlexBox>
              <Button
                onClick={() => {
                  navigate('/');
                }}
                color="primary"
              >
                {title}
              </Button>
            </FullSizeCenteredFlexBox>
          </Grid>
          <Grid item xs={2}>
            <FullSizeFlexBox sx={{ justifyContent: 'flex-end' }}>
              {session ? (
                //   <Chip icon={<FaceIcon />} label="" variant="outlined" />
                // ) : (
                <IconButton
                  onClick={logOut}
                  size="large"
                  edge="end"
                  sx={{ color: 'primary.main' }}
                  aria-label="log in"
                >
                  <LogoutIcon />
                </IconButton>
              ) : (
                <IconButton
                  component={Link}
                  to="/log-in"
                  size="large"
                  edge="end"
                  sx={{ color: 'primary.main' }}
                  aria-label="log in"
                >
                  <LoginIcon />
                </IconButton>
              )}
            </FullSizeFlexBox>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
