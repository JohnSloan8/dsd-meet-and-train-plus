/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { getProfile } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { useProfile } from '@/store/profile';
import { useSessions } from '@/store/sessions';
import { useWeekDay } from '@/store/weekDay';

function MyPaces() {
  const { Sessions } = useSessions();
  const { profile, setProfile } = useProfile();
  const { session } = useSession();

  useEffect(() => {
    if (profile !== undefined) {
      console.log('profile:', profile);
    } else {
      if (session !== null && session.user.id !== undefined) {
        getProfile(session.user.id).then((p: any) => {
          setProfile(p);
        });
      }
    }
  }, [profile]);

  const { weekDay } = useWeekDay();
  return Sessions.length !== 0 && Sessions[weekDay] !== undefined ? (
    <CenteredFlexBox sx={{ height: '100%', alignItems: 'center' }}>
      <Typography variant="body1">no paces</Typography>
    </CenteredFlexBox>
  ) : null;
}

export default MyPaces;
