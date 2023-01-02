/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

function TrainingLocation() {
  const { trainingSessions } = useTrainingSessions();

  const { weekDay } = useWeekDay();

  return trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined ? (
    <CenteredFlexBox sx={{ height: '100%', alignItems: 'center' }}>
      <Typography align="center" sx={{ fontWeight: 'bold' }} variant="h6">
        {trainingSessions[weekDay].location.name}
      </Typography>
    </CenteredFlexBox>
  ) : null;
}

export default TrainingLocation;
