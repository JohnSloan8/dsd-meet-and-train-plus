import { atom, useRecoilState } from 'recoil';

import { extendedDatabase } from '../../../types/extendedSupabase';

const profileState = atom<extendedDatabase['public']['Tables']['profiles']['Row'] | undefined>({
  key: 'profile',
  default: undefined,
});

const useProfile = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  return { profile, setProfile };
};

export { useProfile };
