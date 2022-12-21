/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsIcon from '@mui/icons-material/Sports';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { getTrainingSessions } from '@/services/supabase';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeek } from '@/store/week';
import { useWeekDay } from '@/store/weekDay';

function TrainingSession() {
  const { trainingSessions, setTrainingSessions } = useTrainingSessions();
  const { week } = useWeek();
  const { weekDay } = useWeekDay();
  const [sessionString, setSessionString] = useState('');

  useEffect(() => {
    if (week !== undefined) {
      getTrainingSessions(
        week[0].toISOString().substring(0, 10),
        week[1].toISOString().substring(0, 10),
      ).then((d: any) => {
        console.log('d', d);
        setTrainingSessions(d);
      });
    }
  }, [week]);

  useEffect(() => {
    if (trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined) {
      let tempString = '';
      trainingSessions[weekDay].session.map((s, i) => {
        if (s.reps !== 1) {
          tempString += s.reps + 'x';
        }

        if (s.distance !== undefined) {
          tempString += s.distance;
        } else {
          tempString += s.time;
        }

        if (s.pace === 'strides') {
          tempString += ' strides';
        } else {
          tempString += ' @' + s.pace;
        }

        if (s.recovery) {
          tempString += ', ' + s.recovery + ' rec';
        }

        if (i < trainingSessions[weekDay].session.length - 1) {
          tempString += ', ';
        }
      });

      console.log('tempString:', tempString);
      setSessionString(tempString);
    }
  }, [trainingSessions, weekDay]);

  return (
    <Box backgroundColor="primary.main" color="#fff" px={1}>
      {trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined ? (
        <>
          <Grid container>
            <Grid item xs={3}>
              <FullSizeCenteredFlexBox>
                <Avatar
                  src={trainingSessions[weekDay].coach.picture}
                  sx={{
                    border: '2px solid white',
                    width: 72,
                    height: 72,
                  }}
                  alt={trainingSessions[weekDay].coach.name}
                />{' '}
              </FullSizeCenteredFlexBox>
            </Grid>
            <Grid item xs={6}>
              <Box px={1} pt={1} pb={0.5}>
                <CenteredFlexBox py={0.2}>
                  <LocationOnIcon />
                  <Typography ml={1} variant="h6">
                    {trainingSessions[weekDay].location.name}
                  </Typography>
                </CenteredFlexBox>
                <CenteredFlexBox py={0.2}>
                  <AccessTimeIcon />
                  <Typography variant="body1" ml={1}>
                    {trainingSessions[weekDay].time.substring(0, 5)}
                  </Typography>
                </CenteredFlexBox>
                <CenteredFlexBox py={0.5} sx={{ alignItems: 'center' }}>
                  <SportsIcon fontSize="medium" />
                  <Typography ml={1} variant="body2" align="left">
                    {trainingSessions[weekDay].coach.name}
                  </Typography>
                </CenteredFlexBox>
              </Box>
            </Grid>

            <Grid item xs={3}>
              <FullSizeCenteredFlexBox>
                <Typography variant="body1" align="center">
                  Weather TBD
                </Typography>
              </FullSizeCenteredFlexBox>
            </Grid>

            <Grid item xs={12} mt={-0.5}>
              <Box px={1} pb={1}>
                <CenteredFlexBox>
                  <DirectionsRunIcon />

                  <Typography ml={0.5} variant="body2">
                    {sessionString}
                  </Typography>
                </CenteredFlexBox>
              </Box>
            </Grid>
          </Grid>
        </>
      ) : null}
    </Box>
  );
}

export default TrainingSession;
