import { atom, useRecoilState } from 'recoil';

import { TrainingSessionAttendanceProfileModel, TrainingSessionModel } from '@/models';

const trainingSessionsState = atom<TrainingSessionModel[]>({
  key: 'training-sessions',
  default: [],
});

const useTrainingSessions = () => {
  const [trainingSessions, setTrainingSessions] = useRecoilState(trainingSessionsState);
  return { trainingSessions, setTrainingSessions };
};

const trainingSessionAttendanceState = atom<[] | string[]>({
  key: 'training-session-attendance',
  default: [],
});

const useTrainingSessionAttendance = () => {
  const [trainingSessionAttendance, setTrainingSessionAttendance] = useRecoilState(
    trainingSessionAttendanceState,
  );
  return { trainingSessionAttendance, setTrainingSessionAttendance };
};

const trainingSessionAttendanceProfilesState = atom<TrainingSessionAttendanceProfileModel[]>({
  key: 'training-session-attendance-profiles',
  default: [],
});

const useTrainingSessionAttendanceProfiles = () => {
  const [trainingSessionAttendanceProfiles, setTrainingSessionAttendanceProfiles] = useRecoilState(
    trainingSessionAttendanceProfilesState,
  );
  return { trainingSessionAttendanceProfiles, setTrainingSessionAttendanceProfiles };
};

export { useTrainingSessions, useTrainingSessionAttendance, useTrainingSessionAttendanceProfiles };
