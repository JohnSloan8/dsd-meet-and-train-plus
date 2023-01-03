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
    <Box p={1}>
      {trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined ? (
        <Box>
          <CenteredFlexBox p={0}>
            <Avatar
              src={trainingSessions[weekDay].coach.picture}
              sx={{
                border: '2px solid orange',
                width: 80,
                height: 80,
              }}
              alt={trainingSessions[weekDay].coach.name}
            />
          </CenteredFlexBox>

          <Box p={1}>
            <CenteredFlexBox>
              <Typography variant="body1">
                {trainingSessions[weekDay].coach.name.split(' ')[0]}
              </Typography>
            </CenteredFlexBox>
            <CenteredFlexBox>
              <Typography variant="body1">
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
