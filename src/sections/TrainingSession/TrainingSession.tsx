/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { getTrainingSessions } from '@/services/supabase';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeek } from '@/store/week';

function TrainingSession() {
  const { trainingSessions, setTrainingSessions } = useTrainingSessions();
  const { week } = useWeek();

  useEffect(() => {
    if (week !== undefined) {
      getTrainingSessions(week[0], week[1]).then((d: any) => {
        console.log('d', d);
        setTrainingSessions(d);
      });
    }
  }, [week]);

  useEffect(() => {
    console.log('trainingSessions:', trainingSessions);
  }, [trainingSessions]);

  return (
    <CenteredFlexBox>
      <Typography variant="h6">Session</Typography>
      {trainingSessions !== undefined
        ? trainingSessions.map((tS, i) => <Box key={i}>{tS.date}</Box>)
        : null}
    </CenteredFlexBox>
  );
}

export default TrainingSession;
