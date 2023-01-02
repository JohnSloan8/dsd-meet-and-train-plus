/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

function TrainingDate() {
  const { trainingSessions } = useTrainingSessions();

  const { weekDay } = useWeekDay();

  return trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined ? (
    <CenteredFlexBox sx={{ height: '100%', alignItems: 'center' }}>
      <Typography variant="h6" align="center">
        {`${trainingSessions[weekDay].time.substring(0, 5)}`}
      </Typography>
    </CenteredFlexBox>
  ) : null;
}

export default TrainingDate;
