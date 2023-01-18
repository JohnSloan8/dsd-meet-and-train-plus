/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { getProfile } from '@/services/supabase';
import { useSession } from '@/store/auth';
import { useProfile } from '@/store/profile';

const Profile = () => {
  const { setProfile } = useProfile();
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      getProfile(session.user.id).then((p) => {
        if (p) {
          setProfile(p);
        }
      });
    }
  }, []);

  return null;
};

export default Profile;
