import { atom, selector, useRecoilState } from 'recoil';

import { currentSessionState } from '@/store/sessions';

import { extendedDatabase } from '../../../types/extendedSupabase';

const coachesState = atom<extendedDatabase['public']['Tables']['coaches']['Row'][]>({
  key: 'coaches',
  default: [],
});

const useCoaches = () => {
  const [coaches, setCoaches] = useRecoilState(coachesState);
  return { coaches, setCoaches };
};

const currentCoachState = selector({
  key: 'current-coach',
  get: ({ get }) => {
    const coaches = get(coachesState);
    const currentSession = get(currentSessionState);

    if (coaches.length !== 0 && currentSession !== undefined && currentSession.coach_id !== null)
      return coaches.find((c) => c.id === currentSession.coach_id);
    return undefined;
  },
});

export { useCoaches, currentCoachState };
