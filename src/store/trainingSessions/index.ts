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

const daylightState = atom<'d' | 'n'>({
  key: 'daylight-state',
  default: 'd',
});

const useDaylight = () => {
  const [daylight, setDaylight] = useRecoilState(daylightState);
  return { daylight, setDaylight };
};

const sessionInPastState = atom<boolean>({
  key: 'session-in-past-state',
  default: false,
});

const useSessionInPast = () => {
  const [sessionInPast, setSessionInPast] = useRecoilState(sessionInPastState);
  return { sessionInPast, setSessionInPast };
};

export {
  useTrainingSessions,
  useTrainingSessionAttendance,
  useTrainingSessionAttendanceProfiles,
  useDaylight,
  useSessionInPast,
};
