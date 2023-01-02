/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

function Warnings() {
  const { trainingSessions } = useTrainingSessions();

  const { weekDay } = useWeekDay();

  return trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined ? (
    <CenteredFlexBox sx={{ height: '100%', alignItems: 'center' }}>
      <Typography variant="body1" align="center">
        none
      </Typography>
    </CenteredFlexBox>
  ) : null;
}

export default Warnings;
