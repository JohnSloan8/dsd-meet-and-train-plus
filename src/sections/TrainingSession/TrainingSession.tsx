/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { getTrainingSessions } from '@/services/supabase';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeek } from '@/store/week';
import { useWeekDay } from '@/store/weekDay';

function TrainingSession() {
  const { trainingSessions, setTrainingSessions } = useTrainingSessions();
  const { week } = useWeek();
  const { weekDay } = useWeekDay();

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
    <Box backgroundColor="primary.main" pt={3} color="#fff" sx={{ overflowY: 'scroll' }}>
      {trainingSessions !== undefined ? (
        <Box>
          <Box>
            <CenteredFlexBox>
              <LocationOnIcon />
              <Typography align="center" variant="h6">
                {trainingSessions[weekDay].location.name}
              </Typography>
            </CenteredFlexBox>
            <CenteredFlexBox>
              <AccessTimeIcon />
              <Typography ml={0.5} align="center">
                {trainingSessions[weekDay].time.substring(0, 5)}
              </Typography>
            </CenteredFlexBox>
          </Box>
          <Box m={2} p={1} border={2} borderRadius={3} sx={{ borderColor: 'white' }}>
            {trainingSessions[weekDay].session.map((s, i) => (
              <Typography key={i} align="center">
                {`${s.reps !== 1 ? s.reps + 'x' : ''}${
                  s.distance !== undefined ? s.distance : s.time
                } ${s.pace === 'strides' ? 'strides' : '@' + s.pace} ${
                  s.recovery ? s.recovery + ' rec.' : ''
                }`}
              </Typography>
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

export default TrainingSession;
