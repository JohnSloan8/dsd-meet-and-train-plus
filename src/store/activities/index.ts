import { atom, useRecoilState } from 'recoil';

import { ActivityModel } from '@/models';

const activitiesState = atom<ActivityModel[]>({
  key: 'activities-state',
  default: [],
});

const useActivities = () => {
  const [activities, setActivities] = useRecoilState(activitiesState);
  return { activities, setActivities };
};

const selectedAthleteState = atom<string | undefined>({
  key: 'selected-athlete-state',
  default: undefined,
});

const useSelectedAthlete = () => {
  const [selectedAthlete, setSelectedAthlete] = useRecoilState(selectedAthleteState);
  return { selectedAthlete, setSelectedAthlete };
};

export { useActivities, useSelectedAthlete };
