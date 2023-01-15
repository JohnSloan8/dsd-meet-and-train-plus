/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from 'recoil';

import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { currentSessionState } from '@/store/sessions';

function Location() {
  const currentSession = useRecoilValue(currentSessionState);

  return currentSession !== undefined ? (
    <CenteredFlexBox sx={{ height: '100%', alignItems: 'center' }}>
      <Typography align="center" sx={{ fontWeight: 'bold' }} variant="h6">
        {currentSession.location.name}
      </Typography>
    </CenteredFlexBox>
  ) : null;
}

export default Location;
