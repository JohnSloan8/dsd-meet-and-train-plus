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

// const trainingSessionAttendanceState = atom<TrainingSessionAttendanceModel[] | undefined>({
//   key: 'training-sessionAttendance',
//   default: undefined,
// });

// const useTrainingSessionAttendance = () => {
//   const [trainingSessionAttendance, setTrainingSessionAttendance] = useRecoilState(
//     trainingSessionAttendanceState,
//   );
//   return { trainingSessionAttendance, setTrainingSessionAttendance };
// };

export { useTrainingSessions };
