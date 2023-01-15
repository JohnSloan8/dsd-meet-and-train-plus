/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from 'recoil';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { currentSessionState } from '@/store/sessions';

function Coach() {
  const currentSession = useRecoilValue(currentSessionState);

  return (
    <Box p={1.5}>
      {currentSession !== undefined ? (
        <Box>
          <CenteredFlexBox p={0}>
            <Avatar
              src={currentSession.coach.picture}
              sx={{
                border: '2px solid orange',
                width: 72,
                height: 72,
              }}
              alt={currentSession.coach.name}
            />
          </CenteredFlexBox>

          <Box pt={0.5}>
            <CenteredFlexBox>
              <Typography variant="body2">{currentSession.coach.name.split(' ')[0]}</Typography>
            </CenteredFlexBox>
            <CenteredFlexBox>
              <Typography variant="body2" mt={-0.25}>
                {currentSession.coach.name.split(' ')[1]}
              </Typography>
            </CenteredFlexBox>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

export default Coach;
