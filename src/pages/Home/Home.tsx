/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
// import EqualizerIcon from '@mui/icons-material/Equalizer';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import SportsIcon from '@mui/icons-material/Sports';
// import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// import { ThemeProvider } from '@mui/material/styles';
import MTCard from '@/components/MTCard';
import Meta from '@/components/Meta';
import { CenteredFlexBox } from '@/components/styled';
import Profile from '@/controllers/Profile';
import Sessions from '@/controllers/Sessions';
import Attendance from '@/sections/Attendance';
import Coach from '@/sections/Coach';
import ConnectStrava from '@/sections/ConnectStrava';
import Days from '@/sections/Days';
import Location from '@/sections/Location';
import MapCtrl from '@/sections/MapCtrl';
// import Performance from '@/sections/Performance';
import Session from '@/sections/Session';
import Time from '@/sections/Time';
// import Warnings from '@/sections/Warnings';
import Weather from '@/sections/Weather';
import { getStravaProfile } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { sessionInPastState } from '@/store/sessions';
import { currentSessionState } from '@/store/sessions';
import { useStravaProfile } from '@/store/stravaProfile';

// import { welcomeTheme } from '@/theme/theme';

function Home() {
  const { session } = useSession();
  const { stravaProfile, setStravaProfile } = useStravaProfile();
  const [showConnectStrava, setShowConnectStrava] = useState(false);
  const navigate = useNavigate();
  const sessionInPast = useRecoilValue(sessionInPastState);
  const currentSession = useRecoilValue(currentSessionState);

  useEffect(() => {
    if (session) {
      if (stravaProfile === undefined) {
        getStravaProfile(session.user.id).then((d: any) => {
          setStravaProfile(d);
        });
      }
    } else {
      navigate('/log-in', { replace: true });
    }
  }, [session]);

  useEffect(() => {
    if (stravaProfile === undefined) {
      setShowConnectStrava(true);
    } else {
      setShowConnectStrava(false);
    }
  }, [stravaProfile]);

  return session ? (
    // <ThemeProvider theme={welcomeTheme}>
    <Box>
      <Sessions />
      <Profile />
      <Box>
        <CenteredFlexBox>
          <Meta title="Home" />
          <Days />
          <Box px={1} pt={9} pb={8} maxWidth="sm" width="100%">
            {!sessionInPast ? (
              <Box>
                <Box>
                  <Grid container mt={0} mb={1}>
                    <Grid item xs={3.5} pr={0.5}>
                      <MTCard
                        height={166}
                        title={'coach'}
                        icon={AccessibilityIcon}
                        color={'primary'}
                      >
                        <Coach />
                      </MTCard>
                    </Grid>

                    <Grid item xs={5} px={0.5}>
                      <Grid item xs={12}>
                        <MTCard
                          height={79}
                          title={'location'}
                          icon={LocationOnIcon}
                          color={'primary'}
                        >
                          <Location />
                        </MTCard>
                      </Grid>
                      <Grid item xs={12} mt={1}>
                        <MTCard height={79} title={'time'} icon={AccessTimeIcon} color={'primary'}>
                          <Time />
                        </MTCard>
                      </Grid>
                    </Grid>
                    <Grid item xs={3.5} pl={0.5}>
                      <MTCard
                        height={166}
                        title={'forecast'}
                        icon={FilterDramaIcon}
                        color={'primary'}
                      >
                        <Weather />
                      </MTCard>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={2}>
                  <MTCard height={180} title={'route'} icon={MapIcon} color={'secondary'}>
                    <Box height={156} width={'100%'} sx={{ position: 'relative' }}>
                      <MapCtrl />
                    </Box>
                  </MTCard>
                </Box>
                <Box mt={2}>
                  <MTCard
                    height={
                      currentSession !== undefined && Array.isArray(currentSession.session)
                        ? 58 + currentSession.session.length * 28
                        : 24
                    }
                    title={'session'}
                    icon={SportsIcon}
                    color={'info'}
                  >
                    <Box
                      height={
                        currentSession !== undefined && Array.isArray(currentSession.session)
                          ? 34 + currentSession.session.length * 28
                          : 0
                      }
                      width={'100%'}
                      sx={{ position: 'relative' }}
                    >
                      <Session />
                    </Box>
                  </MTCard>
                </Box>
              </Box>
            ) : (
              <Box>
                <Box>
                  <MTCard height={166} title={'attendance'} icon={PeopleIcon} color={'primary'}>
                    <Attendance />
                  </MTCard>
                </Box>
                <Box mt={2}>
                  <MTCard height={180} title={'routes'} icon={MapIcon} color={'secondary'}>
                    <Box height={156} width={'100%'} sx={{ position: 'relative' }}>
                      <MapCtrl />
                    </Box>
                  </MTCard>
                </Box>
                <Box mt={2}>
                  <MTCard
                    height={
                      currentSession !== undefined && Array.isArray(currentSession.session)
                        ? 58 + currentSession.session.length * 28
                        : 24
                    }
                    title={'session & paces'}
                    icon={SportsIcon}
                    color={'warning'}
                  >
                    <Box
                      height={
                        currentSession !== undefined && Array.isArray(currentSession.session)
                          ? 34 + currentSession.session.length * 28
                          : 0
                      }
                      width={'100%'}
                      sx={{ position: 'relative' }}
                    >
                      <Session />
                    </Box>
                  </MTCard>
                </Box>
                {/* <Box mt={2}>
                  <MTCard height={200} title={'performance'} icon={EqualizerIcon} color={'info'}>
                    <Box height={176} width={'100%'} sx={{ position: 'relative' }}>
                      <Performance />
                    </Box>
                  </MTCard>
                </Box> */}
              </Box>
            )}
            <Box>{showConnectStrava ? <ConnectStrava /> : null}</Box>
          </Box>
        </CenteredFlexBox>
      </Box>
    </Box>
  ) : // </ThemeProvider>
  null;
}

export default Home;
