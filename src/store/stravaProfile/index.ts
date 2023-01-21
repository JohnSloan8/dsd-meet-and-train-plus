import { atom, useRecoilState } from 'recoil';

import { Database } from '../../../types/supabase';

const stravaProfileState = atom<Database['public']['Tables']['strava_profiles']['Row'] | undefined>(
  {
    key: 'strava-profile',
    default: undefined,
  },
);

const useStravaProfile = () => {
  const [stravaProfile, setStravaProfile] = useRecoilState(stravaProfileState);
  return { stravaProfile, setStravaProfile };
};

const stravaProfilesState = atom<Database['public']['Tables']['strava_profiles']['Row'][]>({
  key: 'strava-profiles',
  default: [],
});

const useStravaProfiles = () => {
  const [stravaProfiles, setStravaProfiles] = useRecoilState(stravaProfilesState);
  return { stravaProfiles, setStravaProfiles };
};

export { useStravaProfile, useStravaProfiles };
