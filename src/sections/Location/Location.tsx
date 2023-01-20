/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from 'recoil';

import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { currentLocationState } from '@/store/locations';

function Location() {
  const currentLocation = useRecoilValue(currentLocationState);

  return currentLocation !== undefined ? (
    <CenteredFlexBox sx={{ height: '100%', alignItems: 'center' }}>
      <Typography align="center" sx={{ fontWeight: 'bold' }} variant="h6">
        {currentLocation.name !== null ? currentLocation.name : ''}
      </Typography>
    </CenteredFlexBox>
  ) : null;
}

export default Location;
