/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { getProfile } from '@/services/strava';
import { createStravaProfile } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { useStravaProfile } from '@/store/stravaProfile';

function StravaLink() {
  const [searchParams] = useSearchParams();
  const { setStravaProfile } = useStravaProfile();
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const error = searchParams.get('error');

    if (error === null && session !== null) {
      const code = searchParams.get('code');
      if (code !== null) {
        getProfile(code).then((d: any) => {
          createStravaProfile({
            user_id: session.user.id,
            first_name: d.athlete.firstname,
            surname: d.athlete.lastname,
            city: d.athlete.city,
            country: d.athlete.country,
            strava_id: d.athlete.id,
            profile_pic: d.athlete.profile,
            profile_pic_medium: d.athlete.profile_medium,
            sex: d.athlete.sex,
            access_token: d.access_token,
            refresh_token: d.refresh_token,
            token_expires_at: d.expires_at,
          }).then((p: any) => {
            console.log('strava profile:', p);
            setStravaProfile(p[0]);
            navigate('/', { replace: true });
          });
        });
      } else {
        alert('code is null');
      }
    } else {
      alert(`error: ${error}`);
    }
  }, []);

  return (
    <>
      <Meta title="strava link" />
      <Typography variant="h3">Getting Profile...</Typography>
    </>
  );
}

export default StravaLink;
