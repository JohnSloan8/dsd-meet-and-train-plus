import { atom, useRecoilState } from 'recoil';

import { ProfileModel } from '@/models/index';

const profileState = atom<ProfileModel | undefined>({
  key: 'profile',
  default: undefined,
});

const useProfile = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  return { profile, setProfile };
};

export { useProfile };
