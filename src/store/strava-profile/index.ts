import { atom, useRecoilState } from 'recoil';

import { StravaProfileModel } from '@/models/index';

const stravaProfileState = atom<StravaProfileModel | undefined>({
  key: 'strava-profile',
  default: undefined,
});

const useStravaProfile = () => {
  const [stravaProfile, setStravaProfile] = useRecoilState(stravaProfileState);
  return { stravaProfile, setStravaProfile };
};

export { useStravaProfile };
