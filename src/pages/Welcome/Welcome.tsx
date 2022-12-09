/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

import Meta from '@/components/Meta';
import { CenteredFlexBox } from '@/components/styled';
import { getStravaProfile } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { useStravaProfile } from '@/store/strava-profile';

function Welcome() {
  const { session } = useSession();
  const { stravaProfile, setStravaProfile } = useStravaProfile();

  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      if (stravaProfile === undefined) {
        getStravaProfile(session.user.id).then((d: any) => {
          setStravaProfile(d[0]);
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
  }, [stravaProfile]);

  return (
    <>
      <Meta title="Welcome" />
      {!stravaProfile?.strava_id ? (
        <CenteredFlexBox m={2}>
          <Button
            variant="contained"
            color="warning"
            href="http://www.strava.com/oauth/authorize?client_id=60039&response_type=code&redirect_uri=http://localhost:3000/strava-link&approval_prompt=force&scope=activity:read"
          >
            link strava account
          </Button>
        </CenteredFlexBox>
      ) : null}
    </>
  );
}

export default Welcome;
