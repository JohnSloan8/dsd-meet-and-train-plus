/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RestoreIcon from '@mui/icons-material/Restore';
import SpeedIcon from '@mui/icons-material/Speed';
import TimerIcon from '@mui/icons-material/Timer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox, FullSizeBox } from '@/components/styled';
import { getProfile } from '@/services/supabase';
import { getTrainingSessions } from '@/services/supabase';
import { getActivities } from '@/services/supabase';
import { useActivities } from '@/store/activities';
import { useSession } from '@/store/auth';
import { useProfile } from '@/store/profile';
import { useSessionInPast, useTrainingSessions } from '@/store/trainingSessions';
import { useWeek } from '@/store/week';
import { useWeekDay } from '@/store/weekDay';

function TrainingSession() {
  const navigate = useNavigate();

  const { trainingSessions, setTrainingSessions } = useTrainingSessions();
  const { setActivities } = useActivities();
  const { week } = useWeek();
  const { weekDay } = useWeekDay();

  const [paces, setPaces] = useState([]);
  const { setSessionInPast } = useSessionInPast();
  const { profile, setProfile } = useProfile();
  const { session } = useSession();

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
    if (profile === undefined && session !== null) {
      getProfile(session.user.id).then((p) => {
        if (p) {
          setProfile(p);
        }
      });
    } else {
      console.log('profile undefined or session null');
    }
  }, []);

  useEffect(() => {
    if (trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined) {
      if (profile !== undefined) {
        console.log('profile:', profile);
        const tempPacesList: any = [];
        trainingSessions[weekDay].session.map((s) => {
          const tempPaces = {
            reps: s.reps,
            pace: s.pace,
            distance: s.distance ? s.distance : undefined,
            time: s.time ? s.time : undefined,
            paceSpeed:
              profile.equivalent_paces[s.pace] !== undefined
                ? profile.equivalent_paces[s.pace]
                : undefined,
          };
          tempPacesList.push(tempPaces);
        });
        setPaces(tempPacesList);
      }

      getActivities(trainingSessions[weekDay].id).then((activities: any) => {
        setActivities(activities);
      });

      const inPast =
        Date.now() -
          new Date(
            `${trainingSessions[weekDay].date}T${trainingSessions[weekDay].time}`,
          ).getTime() >
        0
          ? true
          : false;
      setSessionInPast(inPast);
    }
  }, [trainingSessions, weekDay, profile]);

  useEffect(() => {
    console.log('paces:', paces);
  }, [paces]);

  return trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined ? (
    <FullSizeBox>
      <Box p={1}>
        <Grid container>
          <Grid item xs={5} borderRight={1}>
            <CenteredFlexBox pb={0.25}>
              <DirectionsRunIcon fontSize={'small'} />
            </CenteredFlexBox>
          </Grid>
          <Grid item xs={3} borderRight={1}>
            <CenteredFlexBox>
              <SpeedIcon fontSize={'small'} />
            </CenteredFlexBox>
          </Grid>
          <Grid item xs={2} borderRight={1}>
            <CenteredFlexBox>
              <TimerIcon fontSize={'small'} />
            </CenteredFlexBox>
          </Grid>
          <Grid item xs={2}>
            <CenteredFlexBox>
              <RestoreIcon fontSize={'small'} />
            </CenteredFlexBox>
          </Grid>
        </Grid>
        {paces.length > 0 &&
          paces.map((p: any, i) => (
            <Box key={i}>
              <Grid container borderTop={1}>
                <Grid item xs={5} borderRight={1}>
                  {p.reps !== undefined && p.reps > 1 ? (
                    <Typography align="center">{`${p.reps} x ${p.distance ? p.distance : p.time} @${
                      p.pace
                    }`}</Typography>
                  ) : (
                    <Typography align="center">{`${p.distance ? p.distance : p.time} @${
                      p.pace
                    }`}</Typography>
                  )}
                </Grid>
                <Grid item xs={3} borderRight={1}>
                  <Typography align="center">
                    {p.paceSpeed ? p.paceSpeed.race_pace_km : null}
                  </Typography>
                </Grid>
                <Grid item xs={2} borderRight={1}>
                  <Typography align="center">
                    {p.paceSpeed && p.paceSpeed.race_time ? p.paceSpeed.race_time : null}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center">
                    {p.recovery && p.recovery.race_time ? p.recovery.race_time : null}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        <CenteredFlexBox m={1}>
          <Button
            sx={{ backgroundColor: 'warning.dark' }}
            onClick={() => {
              navigate('/profile');
            }}
          >
            Change Target
          </Button>
        </CenteredFlexBox>
      </Box>
    </FullSizeBox>
  ) : null;
}

export default TrainingSession;
