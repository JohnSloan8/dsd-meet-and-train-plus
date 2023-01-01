/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import Meta from '@/components/Meta';
import Attendance from '@/sections/Attendance';
import ConnectStrava from '@/sections/ConnectStrava';
import OpenMapCtrl from '@/sections/MapCtrl';
import Performance from '@/sections/Performance';
import TrainingSession from '@/sections/TrainingSession';
import WeekDays from '@/sections/WeekDays';
import { getStravaProfile } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { useStravaProfile } from '@/store/strava-profile';

function Welcome() {
  const { session } = useSession();
  const { stravaProfile, setStravaProfile } = useStravaProfile();
  const [showConnectStrava, setShowConnectStrava] = useState(false);

  const navigate = useNavigate();

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
    <>
      <Meta title="Welcome" />
      <WeekDays />
      <TrainingSession />

      <Box height={150} width={'100%'} sx={{ position: 'relative' }}>
        <OpenMapCtrl />
      </Box>

      <Attendance />

      {/* <CenteredFlexBox> */}
      {/* <Box width={'90%'}> */}
      <Performance />
      {/* </Box> */}
      {/* </CenteredFlexBox> */}
      {showConnectStrava ? <ConnectStrava /> : null}
    </>
  );
}

export default Welcome;
