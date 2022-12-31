/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import SportsIcon from '@mui/icons-material/Sports';
import WatchIcon from '@mui/icons-material/Watch';
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
    <CenteredFlexBox
      sx={{
        backgroundColor: daylight === 'n' ? 'primary.dark' : 'primary.light',
        color: 'white',
      }}
      color="#fff"
      pt={1}
    >
      {trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined ? (
        <Box maxWidth="sm">
          <Grid container>
            <Grid item xs={3.5}>
              <Box>
                <CenteredFlexBox>
                  <Avatar
                    src={trainingSessions[weekDay].coach.picture}
                    sx={{
                      // border: '2px solid white',
                      width: 64,
                      height: 64,
                    }}
                    alt={trainingSessions[weekDay].coach.name}
                  />
                  <SportsIcon
                    sx={{ position: 'absolute', zIndex: 100, marginTop: 8, color: 'gold' }}
                  />
                </CenteredFlexBox>

                <Box>
                  <CenteredFlexBox>
                    <Typography mt={1} variant="body1">
                      {trainingSessions[weekDay].coach.name.split(' ')[0]}
                    </Typography>
                  </CenteredFlexBox>
                  <CenteredFlexBox>
                    <Typography variant="body1">
                      {trainingSessions[weekDay].coach.name.split(' ')[1]}
                    </Typography>
                  </CenteredFlexBox>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <FullSizeCenteredFlexBox>
                <Box>
                  <Typography align="center" sx={{ fontWeight: 'bold' }} variant="h6" pt={1}>
                    {trainingSessions[weekDay].location.name}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {`${new Date(trainingSessions[weekDay].date).toLocaleString('en-US', {
                      day: 'numeric',
                      month: 'short',
                    })}`}
                  </Typography>
                  <CenteredFlexBox>
                    <Typography variant="h4" sx={{ fontFamily: 'digital' }}>
                      {trainingSessions[weekDay].time.substring(0, 5)}
                    </Typography>
                  </CenteredFlexBox>
                </Box>
              </FullSizeCenteredFlexBox>
            </Grid>

            <Grid item xs={3.5}>
              <FullSizeCenteredFlexBox>
                <Weather />
              </FullSizeCenteredFlexBox>
            </Grid>

            <Grid item xs={12}>
              <Box mt={1}>
                <Box borderTop={1} mx={2}></Box>
                <CenteredFlexBox py={0.75}>
                  <WatchIcon fontSize="small" />

                  <Typography ml={0.5} variant="body1">
                    {sessionString}
                  </Typography>
                </CenteredFlexBox>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </CenteredFlexBox>
  );
}

export default TrainingSession;
