import { atom, selector, useRecoilState } from 'recoil';

import dayjs from 'dayjs';

import { Database } from '../../../types/supabase';

const sessionsState = atom<Database['public']['Tables']['sessions']['Row'][]>({
  key: 'sessions',
  default: [],
});

const useSessions = () => {
  const [sessions, setSessions] = useRecoilState(sessionsState);
  return { sessions, setSessions };
};

const currentSessionIndexState = atom<number | undefined>({
  key: 'current-session-index',
  default: undefined,
});

const useCurrentSessionIndex = () => {
  const [currentSessionIndex, setCurrentSessionIndex] = useRecoilState(currentSessionIndexState);
  return { currentSessionIndex, setCurrentSessionIndex };
};

const currentSessionState = selector({
  key: 'current-session',
  get: ({ get }) => {
    const sessions = get(sessionsState);
    const currentSessionIndex = get(currentSessionIndexState);

    if (sessions.length !== 0 && currentSessionIndex !== undefined)
      return sessions[currentSessionIndex];
    return undefined;
  },
});

const nextSessionExistsState = selector({
  key: 'next-session-exists',
  get: ({ get }) => {
    const sessions = get(sessionsState);
    const currentSessionIndex = get(currentSessionIndexState);

    if (
      sessions.length !== 0 &&
      currentSessionIndex !== undefined &&
      sessions[currentSessionIndex + 1] !== undefined
    )
      return true;
    return false;
  },
});

const previousSessionExistsState = selector({
  key: 'previous-session-exists',
  get: ({ get }) => {
    const sessions = get(sessionsState);
    const currentSessionIndex = get(currentSessionIndexState);

    if (
      sessions.length !== 0 &&
      currentSessionIndex !== undefined &&
      sessions[currentSessionIndex - 1] !== undefined
    )
      return true;
    return false;
  },
});

const sessionInPastState = selector({
  key: 'session-in-past',
  get: ({ get }) => {
    const currentSession = get(currentSessionState);

    if (
      currentSession !== undefined &&
      dayjs() > dayjs(`${currentSession.date} ${currentSession.time}`)
    )
      return true;
    return false;
  },
});

const SessionAttendanceState = atom<[] | string[]>({
  key: 'session-attendance',
  default: [],
});

const useSessionAttendance = () => {
  const [SessionAttendance, setSessionAttendance] = useRecoilState(SessionAttendanceState);
  return { SessionAttendance, setSessionAttendance };
};

const SessionAttendanceProfilesState = atom<
  Database['public']['Tables']['session_attendances']['Row'][]
>({
  key: 'session-attendance-profiles',
  default: [],
});

const useSessionAttendanceProfiles = () => {
  const [SessionAttendanceProfiles, setSessionAttendanceProfiles] = useRecoilState(
    SessionAttendanceProfilesState,
  );
  return { SessionAttendanceProfiles, setSessionAttendanceProfiles };
};

const daylightState = atom<'d' | 'n'>({
  key: 'daylight-state',
  default: 'd',
});

const useDaylight = () => {
  const [daylight, setDaylight] = useRecoilState(daylightState);
  return { daylight, setDaylight };
};

export {
  useSessions,
  useCurrentSessionIndex,
  currentSessionState,
  nextSessionExistsState,
  previousSessionExistsState,
  useSessionAttendance,
  useSessionAttendanceProfiles,
  useDaylight,
  sessionInPastState,
};
