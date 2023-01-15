/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import * as dayjs from 'dayjs';

import { CenteredFlexBox } from '@/components/styled';
import {
  currentSessionState,
  nextSessionExistsState,
  previousSessionExistsState,
  useCurrentSessionIndex,
} from '@/store/sessions';

function Days() {
  const [currentDateString, setCurrentDateString] = useState();
  const [currentSession] = useRecoilState(currentSessionState);
  const [nextSessionExists] = useRecoilState(nextSessionExistsState);
  const [previousSessionExists] = useRecoilState(previousSessionExistsState);

  const { currentSessionIndex, setCurrentSessionIndex } = useCurrentSessionIndex();

  useEffect(() => {
    if (currentSession !== undefined) {
      setCurrentDateString(dayjs(currentSession.date).format('ddd D MMM'));
    }
  }, [currentSession]);

  return (
    <CenteredFlexBox
      borderTop={1}
      borderColor="primary.light"
      sx={{ position: 'fixed', width: '100%', bottom: 0, zIndex: 1000, backgroundColor: '#225' }}
    >
      {currentSession !== undefined ? (
        <CenteredFlexBox>
          <Box width="50px">
            {previousSessionExists && (
              <IconButton
                onClick={() => {
                  setCurrentSessionIndex(currentSessionIndex - 1);
                }}
              >
                <ArrowCircleLeftIcon sx={{ color: 'white' }} fontSize={'large'} />
              </IconButton>
            )}
          </Box>

          <Typography variant="h6" color="#fff" align="center" minWidth="150px">
            {currentDateString}
          </Typography>

          <Box width="50px">
            {nextSessionExists && (
              <IconButton
                onClick={() => {
                  setCurrentSessionIndex(currentSessionIndex + 1);
                }}
              >
                <ArrowCircleLeftIcon
                  sx={{ transform: `rotate(180deg)`, color: 'white' }}
                  fontSize={'large'}
                />
              </IconButton>
            )}
          </Box>
        </CenteredFlexBox>
      ) : null}
    </CenteredFlexBox>
  );
}

export default Days;
