/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsIcon from '@mui/icons-material/Sports';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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
    console.log('trainingSessions:', trainingSessions);
  }, [trainingSessions]);

  return (
    <Box height={150} backgroundColor="primary.main" color="#fff">
      {trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined ? (
        <>
          <Grid container>
            <Grid item xs={6}>
              <FullSizeCenteredFlexBox>
                <Box>
                  <CenteredFlexBox>
                    <LocationOnIcon />
                    <Typography align="center" variant="h6">
                      {trainingSessions[weekDay].location.name}
                    </Typography>
                  </CenteredFlexBox>
                  <CenteredFlexBox my={0.5}>
                    <AccessTimeIcon fontSize="small" />

                    <Typography ml={0.5} variant="body2" align="center">
                      {trainingSessions[weekDay].time.substring(0, 5)}
                    </Typography>
                  </CenteredFlexBox>
                  <CenteredFlexBox>
                    <SportsIcon fontSize="medium" />

                    <Typography ml={0.5} variant="body2" align="center">
                      {trainingSessions[weekDay].coach.name}
                    </Typography>
                  </CenteredFlexBox>
                </Box>
              </FullSizeCenteredFlexBox>
            </Grid>
            <Grid item xs={6}>
              <CenteredFlexBox p={1} height={150}>
                <Card elevation={4} sx={{ height: 130, width: '100%' }}>
                  <CenteredFlexBox height={130} sx={{ overflowY: 'scroll' }}>
                    <Box p={1}>
                      {trainingSessions[weekDay].session.map((s, i) => (
                        <Typography variant="body2" key={i} align="center">
                          {`${s.reps !== 1 ? s.reps + 'x' : ''}${
                            s.distance !== undefined ? s.distance : s.time
                          } ${s.pace === 'strides' ? 'strides' : '@' + s.pace + ','} ${
                            s.recovery ? s.recovery + ' rec.' : ''
                          }`}
                        </Typography>
                      ))}
                    </Box>
                  </CenteredFlexBox>
                </Card>
              </CenteredFlexBox>
            </Grid>
          </Grid>
        </>
      ) : null}
    </Box>
  );
}

export default TrainingSession;
