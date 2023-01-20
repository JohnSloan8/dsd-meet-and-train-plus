/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from 'recoil';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { currentCoachState } from '@/store/coaches';

function Coach() {
  const currentCoach = useRecoilValue(currentCoachState);

  return (
    <Box p={1.5}>
      {currentCoach !== undefined ? (
        <Box>
          <CenteredFlexBox p={0}>
            <Avatar
              src={currentCoach.picture !== null ? currentCoach.picture : '#'}
              sx={{
                border: '2px solid orange',
                width: 72,
                height: 72,
              }}
              alt={currentCoach.name !== null ? currentCoach.name : ''}
            />
          </CenteredFlexBox>

          <Box pt={0.5}>
            <CenteredFlexBox>
              <Typography variant="body2">
                {currentCoach.name !== null ? currentCoach.name.split(' ')[0] : ''}
              </Typography>
            </CenteredFlexBox>
            <CenteredFlexBox>
              <Typography variant="body2" mt={-0.25}>
                {currentCoach.name !== null ? currentCoach.name.split(' ')[1] : ''}
              </Typography>
            </CenteredFlexBox>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

export default Coach;
