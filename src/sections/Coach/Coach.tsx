/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

function Coach() {
  const { trainingSessions } = useTrainingSessions();

  const { weekDay } = useWeekDay();

  return (
    <Box p={1.5}>
      {trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined ? (
        <Box>
          <CenteredFlexBox p={0}>
            <Avatar
              src={trainingSessions[weekDay].coach.picture}
              sx={{
                border: '2px solid orange',
                width: 72,
                height: 72,
              }}
              alt={trainingSessions[weekDay].coach.name}
            />
          </CenteredFlexBox>

          <Box pt={0.5}>
            <CenteredFlexBox>
              <Typography variant="body2">
                {trainingSessions[weekDay].coach.name.split(' ')[0]}
              </Typography>
            </CenteredFlexBox>
            <CenteredFlexBox>
              <Typography variant="body2" mt={-0.25}>
                {trainingSessions[weekDay].coach.name.split(' ')[1]}
              </Typography>
            </CenteredFlexBox>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

export default Coach;
