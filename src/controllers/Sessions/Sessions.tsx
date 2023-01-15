/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import * as dayjs from 'dayjs';

import { getSessions } from '@/services/supabase';
import { useCurrentSessionIndex, useSessions } from '@/store/sessions';

import { findCurrentSessionIndex } from './utils';
import { Database } from '/types/supabase';

const Sessions = () => {
  const { setSessions } = useSessions();
  const { setCurrentSessionIndex } = useCurrentSessionIndex();

  useEffect(() => {
    console.log('in Sessions');
    const date = dayjs();
    const day = date.day();
    const weekStartDateString = date.subtract(7 + day - 1, 'days').format('YYYY-MM-DD');
    const weekEndDateString = date.add(1, 'years').format('YYYY-MM-DD');
    console.log('day:', date.day());
    console.log('weekStartDateString:', weekStartDateString);
    getSessions(weekStartDateString, weekEndDateString).then(
      (s: Database['public']['Tables']['sessions']['Row'][]) => {
        console.log('sessions:', s);
        setSessions(s);

        const currentIndex = findCurrentSessionIndex(date, s);
        console.log('currentIndex:', currentIndex);
        setCurrentSessionIndex(currentIndex);
      },
    );
  }, []);

  return null;
};

export default Sessions;
