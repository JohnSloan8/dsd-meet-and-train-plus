/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import dayjs from 'dayjs';

import { getCoaches, getLocations, getSessions } from '@/services/supabase';
import { useCoaches } from '@/store/coaches';
import { useLocations } from '@/store/locations';
import { useCurrentSessionIndex, useSessions } from '@/store/sessions';

import { findCurrentSessionIndex } from './utils';

const Sessions = () => {
  const { sessions, setSessions } = useSessions();
  const { setCoaches } = useCoaches();
  const { setLocations } = useLocations();
  const { setCurrentSessionIndex } = useCurrentSessionIndex();

  useEffect(() => {
    const date = dayjs();
    const day = date.day();
    const weekStartDateString = date.subtract(7 + day - 1, 'days').format('YYYY-MM-DD');
    const weekEndDateString = date.add(1, 'years').format('YYYY-MM-DD');

    getSessions(weekStartDateString, weekEndDateString).then((s) => {
      console.log('sessions:', s);
      if (s !== undefined) {
        setSessions(s);
        const currentIndex = findCurrentSessionIndex(date, s);
        console.log('currentIndex:', currentIndex);
        setCurrentSessionIndex(currentIndex);
      }
    });
  }, []);

  useEffect(() => {
    if (sessions.length !== 0) {
      const coachIDs = sessions.map((s) => s !== null && s.coach_id);
      const uniqueCoachIDs = Array.from(new Set(coachIDs));
      getCoaches(uniqueCoachIDs as number[]).then((c) => {
        if (c !== undefined) {
          setCoaches(c);
        }
      });

      const locationIDs = sessions.map((s) => s !== null && s.location_id);
      const uniqueLocationIDs = Array.from(new Set(locationIDs));
      getLocations(uniqueLocationIDs as number[]).then((l) => {
        if (l !== undefined) {
          setLocations(l);
        }
      });
    }
  }, [sessions]);

  return null;
};

export default Sessions;
