/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Meta from '@/components/Meta';
import Attendance from '@/sections/Attendance';
import ConnectStrava from '@/sections/ConnectStrava';
import TrainingSession from '@/sections/TrainingSession';
import Week from '@/sections/Week';
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
      } else {
        console.log('already set Strava Profile:', stravaProfile);
      }
    } else {
      navigate('/log-in', { replace: true });
    }
  }, []);

  useEffect(() => {
    console.log('stravaProfile changed: ', stravaProfile);
    if (stravaProfile === undefined) {
      setShowConnectStrava(true);
    }
  }, [stravaProfile]);

  return (
    <>
      <Meta title="Welcome" />
      <Week />
      <WeekDays />
      <TrainingSession />
      <Attendance />
      {showConnectStrava ? <ConnectStrava /> : null}
    </>
  );
}

export default Welcome;
