import { atom, useRecoilState } from 'recoil';

import { ActivityModel } from '@/models';

const activitiesState = atom<ActivityModel[]>({
  key: 'activities',
  default: [],
});

const useActivities = () => {
  const [activities, setActivities] = useRecoilState(activitiesState);
  return { activities, setActivities };
};

export { useActivities };
