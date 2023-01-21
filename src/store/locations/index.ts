import { atom, selector, useRecoilState } from 'recoil';

import { currentSessionState } from '@/store/sessions';

import { Database } from '../../../types/supabase';

const locationsState = atom<Database['public']['Tables']['locations']['Row'][]>({
  key: 'locations',
  default: [],
});

const useLocations = () => {
  const [locations, setLocations] = useRecoilState(locationsState);
  return { locations, setLocations };
};

const currentLocationState = selector({
  key: 'current-location',
  get: ({ get }) => {
    const locations = get(locationsState);
    const currentSession = get(currentSessionState);

    if (
      locations.length !== 0 &&
      currentSession !== undefined &&
      currentSession.location_id !== null
    )
      return locations.find((l) => l.id === currentSession.location_id);
    return undefined;
  },
});

export { useLocations, currentLocationState };
