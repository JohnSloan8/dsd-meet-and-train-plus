/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import SportsIcon from '@mui/icons-material/Sports';
// import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import MTCard from '@/components/MTCard';
import Meta from '@/components/Meta';
// import { CenteredFlexBox } from '@/components/styled';
import Attendance from '@/sections/Attendance';
import Coach from '@/sections/Coach';
import ConnectStrava from '@/sections/ConnectStrava';
import OpenMapCtrl from '@/sections/MapCtrl';
import Performance from '@/sections/Performance';
import TrainingLocation from '@/sections/TrainingLocation';
import TrainingSession from '@/sections/TrainingSession';
import TrainingTime from '@/sections/TrainingTime';
// import Warnings from '@/sections/Warnings';
import Weather from '@/sections/Weather';
import WeekDays from '@/sections/WeekDays';
import { getStravaProfile } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { useStravaProfile } from '@/store/strava-profile';
import { useSessionInPast } from '@/store/trainingSessions';

function Welcome() {
  const { session } = useSession();
  const { stravaProfile, setStravaProfile } = useStravaProfile();
  const [showConnectStrava, setShowConnectStrava] = useState(false);
  const navigate = useNavigate();
  const { sessionInPast } = useSessionInPast();

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

  const welcomeTheme = createTheme({
    palette: {
      text: {
        primary: '#fff',
      },
    },
  });

  return (
    <ThemeProvider theme={welcomeTheme}>
      <Box sx={{ backgroundColor: '#225', minHeight: 'calc(100vh - 56px)' }} px={0.5} pb={2}>
        <Meta title="Welcome" />
        <WeekDays />

        {!sessionInPast ? (
          <Box>
            <Box>
              <Grid container mt={2} mb={1}>
                <Grid item xs={3.5}>
                  <MTCard height={166} title={'coach'} icon={AccessibilityIcon} color={'primary'}>
                    <Coach />
                  </MTCard>
                </Grid>

                <Grid item xs={5}>
                  <Grid item xs={12}>
                    <MTCard height={79} title={'location'} icon={LocationOnIcon} color={'primary'}>
                      <TrainingLocation />
                    </MTCard>
                  </Grid>
                  <Grid item xs={12} mt={1}>
                    <MTCard height={79} title={'time'} icon={AccessTimeIcon} color={'primary'}>
                      <TrainingTime />
                    </MTCard>
                  </Grid>
                </Grid>
                <Grid item xs={3.5}>
                  <MTCard height={166} title={'forecast'} icon={FilterDramaIcon} color={'primary'}>
                    <Weather />
                  </MTCard>
                </Grid>
              </Grid>
            </Box>
            <Box mt={2}>
              <MTCard height={180} title={'route'} icon={MapIcon} color={'secondary'}>
                <Box height={156} width={'100%'} sx={{ position: 'relative' }}>
                  <OpenMapCtrl />
                </Box>
              </MTCard>
            </Box>
            <Box mt={2}>
              <MTCard height={28} title={'session'} icon={SportsIcon} color={'warning'}>
                <TrainingSession />
              </MTCard>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box mt={2}>
              <MTCard height={166} title={'attendance'} icon={PeopleIcon} color={'primary'}>
                <Attendance />
              </MTCard>
            </Box>
            <Box mt={2}>
              <MTCard height={180} title={'routes'} icon={MapIcon} color={'secondary'}>
                <Box height={156} width={'100%'} sx={{ position: 'relative' }}>
                  <OpenMapCtrl />
                </Box>
              </MTCard>
            </Box>
            <Box mt={2}>
              <MTCard height={28} title={'session & paces'} icon={SportsIcon} color={'warning'}>
                <TrainingSession />
              </MTCard>
            </Box>
            <Box mt={2}>
              <MTCard height={230} title={'performance'} icon={EqualizerIcon} color={'info'}>
                <Performance />
              </MTCard>
            </Box>
          </Box>
        )}

        <Box>{showConnectStrava ? <ConnectStrava /> : null}</Box>
      </Box>
    </ThemeProvider>
  );
}

export default Welcome;
