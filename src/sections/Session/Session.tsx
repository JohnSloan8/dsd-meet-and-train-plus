/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RestoreIcon from '@mui/icons-material/Restore';
import SpeedIcon from '@mui/icons-material/Speed';
// import TimerIcon from '@mui/icons-material/Timer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { WarningGrid } from '@/components/styled';
import { CenteredFlexBox } from '@/components/styled';
import { getActivities } from '@/services/supabase';
import { useActivities } from '@/store/activities';
import { useProfile } from '@/store/profile';
import { currentSessionState } from '@/store/sessions';

function Session() {
  const { setActivities } = useActivities();
  const [currentSession] = useRecoilState(currentSessionState);
  const navigate = useNavigate();

  const [paces, setPaces] = useState([]);
  const { profile } = useProfile();

  useEffect(() => {
    if (currentSession !== undefined && profile != undefined) {
      const tempPacesList: any = [];
      currentSession.session.map((s) => {
        const tempPaces = {
          reps: s.reps,
          pace: s.pace,
          distance: s.distance ? s.distance : undefined,
          time: s.time ? s.time : undefined,
          recovery: s.recovery ? s.recovery : undefined,
          paceSpeed:
            profile.equivalent_paces !== null &&
            profile.equivalent_paces !== undefined &&
            profile.equivalent_paces[s.pace] !== undefined
              ? profile.equivalent_paces[s.pace]
              : undefined,
        };
        tempPacesList.push(tempPaces);
      });
      setPaces(tempPacesList);
      getActivities(currentSession.id).then((activities: any) => {
        setActivities(activities);
      });
    }
  }, [currentSession, profile]);

  return currentSession !== undefined ? (
    <Box>
      <CenteredFlexBox borderColor={'warning.light'}>
        <Box p={1} width="100%">
          <WarningGrid container>
            <WarningGrid item xs={4} borderRight={1}>
              <CenteredFlexBox pb={0.25}>
                <DirectionsRunIcon fontSize={'small'} />
              </CenteredFlexBox>
            </WarningGrid>
            <WarningGrid item xs={5} borderRight={1}>
              <CenteredFlexBox>
                <SpeedIcon fontSize={'small'} />
              </CenteredFlexBox>
            </WarningGrid>
            {/* <WarningGrid item xs={2} borderRight={1}>
            <CenteredFlexBox>
              <TimerIcon fontSize={'small'} />
            </CenteredFlexBox>
          </WarningGrid> */}
            <WarningGrid item xs={3}>
              <CenteredFlexBox>
                <RestoreIcon fontSize={'small'} />
              </CenteredFlexBox>
            </WarningGrid>
          </WarningGrid>
          {paces.length > 0 &&
            paces.map((p: any, i) => (
              <Box key={i}>
                <WarningGrid container borderTop={1}>
                  <WarningGrid item xs={4} borderRight={1}>
                    {p.reps !== undefined && p.reps > 1 ? (
                      <Typography align="center">{`${p.reps} x ${
                        p.distance ? p.distance : p.time
                      }`}</Typography>
                    ) : (
                      <Typography align="center">{`${
                        p.distance ? p.distance : p.time
                      }`}</Typography>
                    )}
                  </WarningGrid>
                  <WarningGrid item xs={5} borderRight={1}>
                    <Typography align="center">
                      {`${p.pace}${p.paceSpeed ? ' - ' + p.paceSpeed.race_pace_km : ''}`}
                    </Typography>
                  </WarningGrid>
                  {/* <WarningGrid item xs={2} borderRight={1}>
                  <Typography align="center">
                    {p.paceSpeed && p.paceSpeed.race_time ? p.paceSpeed.race_time : null}
                  </Typography>
                </WarningGrid> */}
                  <WarningGrid item xs={3}>
                    <Typography align="center">{p.recovery ? p.recovery : null}</Typography>
                  </WarningGrid>
                </WarningGrid>
              </Box>
            ))}
        </Box>
      </CenteredFlexBox>
      <CenteredFlexBox>
        <Button
          onClick={() => {
            navigate('/profile');
          }}
          sx={{ backgroundColor: 'warning.dark', color: '#fff' }}
        >
          Set Race Target
        </Button>
      </CenteredFlexBox>
    </Box>
  ) : null;
}

export default Session;
