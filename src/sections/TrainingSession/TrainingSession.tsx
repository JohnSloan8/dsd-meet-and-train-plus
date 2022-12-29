/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

// import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsIcon from '@mui/icons-material/Sports';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import Weather from '@/sections/Weather';
import { getTrainingSessions } from '@/services/supabase';
import { getActivities } from '@/services/supabase';
import { useActivities } from '@/store/activities';
import { useDaylight, useTrainingSessions } from '@/store/trainingSessions';
import { useWeek } from '@/store/week';
import { useWeekDay } from '@/store/weekDay';

function TrainingSession() {
  const { trainingSessions, setTrainingSessions } = useTrainingSessions();
  const { setActivities } = useActivities();
  const { week } = useWeek();
  const { weekDay } = useWeekDay();
  const [sessionString, setSessionString] = useState('');
  const { daylight } = useDaylight();

  useEffect(() => {
    if (week !== undefined) {
      getTrainingSessions(
        week[0].toISOString().substring(0, 10),
        week[1].toISOString().substring(0, 10),
      ).then((d: any) => {
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

      setSessionString(tempString);

      getActivities(trainingSessions[weekDay].id).then((activities: any) => {
        console.log('activities:', activities);
        setActivities(activities);
      });
    }
  }, [trainingSessions, weekDay]);

  return (
    <Box
      sx={{
        backgroundColor: daylight === 'n' ? 'primary.dark' : 'primary.light',
        color: 'white',
      }}
      color="#fff"
      pt={1}
    >
      {trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined ? (
        <>
          <Grid container>
            <Grid item xs={2.75}>
              <FullSizeCenteredFlexBox pl={1}>
                <Avatar
                  src={trainingSessions[weekDay].coach.picture}
                  sx={{
                    border: '2px solid white',
                    width: 64,
                    height: 64,
                  }}
                  alt={trainingSessions[weekDay].coach.name}
                />{' '}
              </FullSizeCenteredFlexBox>
            </Grid>
            <Grid item xs={6.5}>
              <Box pt={0.5}>
                <CenteredFlexBox py={0}>
                  <Typography ml={1} sx={{ fontWeight: 'bold' }} variant="h6">
                    {trainingSessions[weekDay].location.name}
                  </Typography>
                </CenteredFlexBox>
                <CenteredFlexBox>
                  <Typography variant="body2">
                    {`${new Date(trainingSessions[weekDay].date).toLocaleString('en-US', {
                      day: 'numeric',
                      month: 'short',
                    })}`}
                  </Typography>
                  <Typography
                    variant="h5"
                    mt={-0.8}
                    mb={-0.4}
                    ml={1}
                    p={-1}
                    sx={{ fontFamily: 'digital' }}
                  >
                    {trainingSessions[weekDay].time.substring(0, 5)}
                  </Typography>
                </CenteredFlexBox>
                <CenteredFlexBox sx={{ alignItems: 'center' }}>
                  <SportsIcon fontSize="small" />
                  <Typography ml={1} variant="body1" align="left">
                    {trainingSessions[weekDay].coach.name}
                  </Typography>
                </CenteredFlexBox>
              </Box>
            </Grid>

            <Grid item xs={2.75}>
              <FullSizeCenteredFlexBox pr={1}>
                <Weather />
              </FullSizeCenteredFlexBox>
            </Grid>

            <Grid item xs={12}>
              <Box pb={1} mt={2}>
                <Box borderTop={1} pb={0.75} mx={2}></Box>
                <CenteredFlexBox>
                  <DirectionsRunIcon fontSize="medium" sx={{ color: '0xffffff' }} />

                  <Typography ml={0.5} variant="body1">
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
