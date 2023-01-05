/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { getProfile } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { useProfile } from '@/store/profile';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

function MyPaces() {
  const { trainingSessions } = useTrainingSessions();
  const { profile, setProfile } = useProfile();
  const { session } = useSession();

  useEffect(() => {
    if (profile !== undefined) {
      console.log('profile:', profile);
    } else {
      if (session.user.id !== undefined) {
        getProfile(session.user.id).then((p) => {
          setProfile(p);
        });
      }
    }
  }, [profile]);

  const { weekDay } = useWeekDay();
  return trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined ? (
    <CenteredFlexBox sx={{ height: '100%', alignItems: 'center' }}>
      <Typography variant="body1">no paces</Typography>
    </CenteredFlexBox>
  ) : null;
}

export default MyPaces;
