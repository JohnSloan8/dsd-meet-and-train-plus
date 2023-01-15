/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { useSessions } from '@/store/sessions';
import { useWeekDay } from '@/store/weekDay';

function Warnings() {
  const { Sessions } = useSessions();

  const { weekDay } = useWeekDay();

  return Sessions.length !== 0 && Sessions[weekDay] !== undefined ? (
    <CenteredFlexBox sx={{ height: '100%', alignItems: 'center' }}>
      <Typography variant="body1" align="center">
        none
      </Typography>
    </CenteredFlexBox>
  ) : null;
}

export default Warnings;
