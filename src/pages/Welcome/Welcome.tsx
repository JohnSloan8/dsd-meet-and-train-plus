/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import SpeedIcon from '@mui/icons-material/Speed';
import SportsIcon from '@mui/icons-material/Sports';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
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
import TrainingDate from '@/sections/TrainingDate';
import TrainingLocation from '@/sections/TrainingLocation';
import TrainingSession from '@/sections/TrainingSession';
import Warnings from '@/sections/Warnings';
import Weather from '@/sections/Weather';
import WeekDays from '@/sections/WeekDays';
import { getStravaProfile } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { useStravaProfile } from '@/store/strava-profile';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

function Welcome() {
  const { session } = useSession();
  const { stravaProfile, setStravaProfile } = useStravaProfile();
  const [showConnectStrava, setShowConnectStrava] = useState(false);
  const navigate = useNavigate();
  const { trainingSessions } = useTrainingSessions();
  const { weekDay } = useWeekDay();

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
    <Box sx={{ backgroundColor: '#225' }} px={0.5} pb={2}>
      <Meta title="Welcome" />
      <WeekDays />
      <Grid container mt={2} mb={1}>
        <Grid item xs={6}>
          <MTCard height={64} title={'location'} icon={LocationOnIcon}>
            <TrainingLocation />
          </MTCard>
        </Grid>
        <Grid item xs={6}>
          <MTCard
            height={64}
            title={
              trainingSessions[weekDay] !== undefined
                ? `${new Date(trainingSessions[weekDay].date).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })}`
                : '-'
            }
            icon={CalendarMonthIcon}
          >
            <TrainingDate />
          </MTCard>
        </Grid>
      </Grid>

      <Grid container mt={1}>
        <Grid item xs={4}>
          <MTCard height={192} title={'coach'} icon={SportsIcon}>
            <Coach />
          </MTCard>
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12}>
              <MTCard height={92} title={'session'} icon={DirectionsRunIcon}>
                <TrainingSession />
              </MTCard>
            </Grid>
            <Grid item xs={12} mt={1}>
              <MTCard height={92} title={'my paces'} icon={WatchIcon}>
                <MyPaces />
              </MTCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container mt={1}>
        <Grid item xs={8}>
          <MTCard height={88} title={'forecast'} icon={FilterDramaIcon}>
            <Weather />
          </MTCard>
        </Grid>
        <Grid item xs={4}>
          <MTCard height={88} title={'warnings'} icon={WarningAmberIcon}>
            <Warnings />
          </MTCard>
        </Grid>
      </Grid>

      <Box mt={1}>
        <MTCard height={174} title={'map'} icon={MapIcon}>
          <Box height={150} width={'100%'} sx={{ position: 'relative' }}>
            <OpenMapCtrl />
          </Box>
        </MTCard>
      </Box>

      <Box mt={1}>
        <MTCard height={192} title={'attendance'} icon={PeopleIcon}>
          <Attendance />
        </MTCard>
      </Box>
      <Box mt={1}>
        <MTCard height={230} title={'performance'} icon={SpeedIcon}>
          <Performance />
        </MTCard>
      </Box>
      {showConnectStrava ? <ConnectStrava /> : null}
    </Box>
  );
}

export default Welcome;
