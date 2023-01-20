/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from 'recoil';

import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { currentSessionState } from '@/store/sessions';

function Time() {
  const currentSession = useRecoilValue(currentSessionState);

  return currentSession !== undefined ? (
    <CenteredFlexBox sx={{ height: '100%', alignItems: 'center' }}>
      <Typography variant="h4" align="center" sx={{ fontFamily: 'digital' }}>
        {currentSession.time !== null && currentSession.time.substring(0, 5)}
      </Typography>
    </CenteredFlexBox>
  ) : null;
}

export default Time;
