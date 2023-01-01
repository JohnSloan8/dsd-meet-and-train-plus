import { atom, selector, useRecoilState } from 'recoil';

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

const selectedAthleteActivity = selector({
  key: 'selected-athlete-activity',
  get: ({ get }) => {
    const activities = get(activitiesState);
    const selectedAthlete = get(selectedAthleteState);

    return activities.find((a) => {
      return a.user_id === selectedAthlete;
    });
  },
});

export { useActivities, useSelectedAthlete, selectedAthleteActivity };
