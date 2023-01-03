/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import SpeedIcon from '@mui/icons-material/Speed';
import SportsIcon from '@mui/icons-material/Sports';
// import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WatchIcon from '@mui/icons-material/Watch';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import MTCard from '@/components/MTCard';
import Meta from '@/components/Meta';
// import { CenteredFlexBox } from '@/components/styled';
import Attendance from '@/sections/Attendance';
import Coach from '@/sections/Coach';
import ConnectStrava from '@/sections/ConnectStrava';
import OpenMapCtrl from '@/sections/MapCtrl';
import MyPaces from '@/sections/MyPaces';
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

  return (
    <Box sx={{ backgroundColor: '#225', minHeight: 'calc(100vh - 56px)' }} px={0.5} pb={2}>
      <Meta title="Welcome" />
      <WeekDays />

      {!sessionInPast ? (
        <Box>
          <Box>
            <Grid container mt={3} mb={1}>
              <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={12}>
                    <MTCard height={69} title={'location'} icon={LocationOnIcon} color={'primary'}>
                      <TrainingLocation />
                    </MTCard>
                  </Grid>
                  <Grid item xs={12} mt={1}>
                    <MTCard height={69} title={'time'} icon={AccessTimeIcon} color={'primary'}>
                      <TrainingTime />
                    </MTCard>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <MTCard height={146} title={'forecast'} icon={FilterDramaIcon} color={'primary'}>
                  <Weather />
                </MTCard>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container mt={3}>
              <Grid item xs={4}>
                <MTCard height={192} title={'coach'} icon={SportsIcon} color={'warning'}>
                  <Coach />
                </MTCard>
              </Grid>
              <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={12}>
                    <MTCard
                      height={92}
                      title={'session'}
                      icon={DirectionsRunIcon}
                      color={'warning'}
                    >
                      <TrainingSession />
                    </MTCard>
                  </Grid>
                  <Grid item xs={12} mt={1}>
                    <MTCard height={92} title={'my paces'} icon={WatchIcon} color={'warning'}>
                      <MyPaces />
                    </MTCard>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box mt={3}>
            <MTCard height={240} title={'route'} icon={MapIcon} color={'secondary'}>
              <Box height={216} width={'100%'} sx={{ position: 'relative' }}>
                <OpenMapCtrl />
              </Box>
            </MTCard>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box mt={3}>
            <MTCard height={92} title={'session'} icon={DirectionsRunIcon} color={'warning'}>
              <TrainingSession />
            </MTCard>
          </Box>

          <Box mt={1}>
            <MTCard height={200} title={'routes'} icon={MapIcon} color={'secondary'}>
              <Box height={176} width={'100%'} sx={{ position: 'relative' }}>
                <OpenMapCtrl />
              </Box>
            </MTCard>
          </Box>
          <Box mt={1}>
            <MTCard height={106} title={'attendance'} icon={PeopleIcon} color={'info'}>
              <Attendance />
            </MTCard>
          </Box>

          <Box mt={1}>
            <MTCard height={230} title={'performance'} icon={SpeedIcon} color={'primary'}>
              <Performance />
            </MTCard>
          </Box>
        </Box>
      )}

      <Box>{showConnectStrava ? <ConnectStrava /> : null}</Box>
    </Box>
  );
}

export default Welcome;
