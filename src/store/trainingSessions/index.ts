import { atom, useRecoilState } from 'recoil';

import { TrainingSessionsModel } from '@/models/index';

const trainingSessionsState = atom<TrainingSessionsModel[] | undefined>({
  key: 'training-sessions',
  default: undefined,
});

const useTrainingSessions = () => {
  const [trainingSessions, setTrainingSessions] = useRecoilState(trainingSessionsState);
  return { trainingSessions, setTrainingSessions };
};

export { useTrainingSessions };
