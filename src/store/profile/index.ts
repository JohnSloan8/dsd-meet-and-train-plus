import { atom, useRecoilState } from 'recoil';

import { Database } from '/types/supabase';

const profileState = atom<Database['public']['Tables']['profiles']['Row'] | undefined>({
  key: 'profile',
  default: undefined,
});

const useProfile = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  return { profile, setProfile };
};

export { useProfile };
