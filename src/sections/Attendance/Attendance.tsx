/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { CenteredFlexBox } from '@/components/styled';
import { getTrainingSessionAttendance } from '@/services/supabase';
import { getTrainingSessionAttendanceProfiles } from '@/services/supabase';
import {
  useTrainingSessionAttendance,
  useTrainingSessionAttendanceProfiles,
  useTrainingSessions,
} from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

function Attendance() {
  const { trainingSessionAttendance, setTrainingSessionAttendance } =
    useTrainingSessionAttendance();
  const { trainingSessionAttendanceProfiles, setTrainingSessionAttendanceProfiles } =
    useTrainingSessionAttendanceProfiles();

  const { trainingSessions } = useTrainingSessions();
  const { weekDay } = useWeekDay();
  useEffect(() => {
    if (trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined) {
      const todaysDate = Date.now();
      const trainingDate = new Date(
        `${trainingSessions[weekDay].date} ${trainingSessions[weekDay].time}`,
      );
      if (todaysDate - trainingDate.getTime() > 0) {
        getTrainingSessionAttendance(trainingSessions[weekDay].id).then((user_id_list: any) => {
          setTrainingSessionAttendance(user_id_list);
        });
      } else {
        setTrainingSessionAttendance([]);
      }
    }
  }, [trainingSessions, weekDay]);

  useEffect(() => {
    if (trainingSessionAttendance && trainingSessionAttendance.length > 0) {
      getTrainingSessionAttendanceProfiles(trainingSessionAttendance).then((d: any) => {
        setTrainingSessionAttendanceProfiles(d);
      });
    } else {
      setTrainingSessionAttendanceProfiles([]);
    }
  }, [trainingSessionAttendance]);

  useEffect(() => {
    console.log('trainingSessionAttendanceProfiles:', trainingSessionAttendanceProfiles);
  }, [trainingSessionAttendanceProfiles]);

  const clickAvatar = (userID: string) => {
    console.log('userID:', userID);
  };

  return (
    <Box p={1} height={150} sx={{ backgroundColor: 'primary.main' }}>
      <CenteredFlexBox p={1}>
        <Grid container>
          {trainingSessionAttendanceProfiles.map((p, i) => (
            <Grid key={i} item xs={1.7} mb={-0.7}>
              <CenteredFlexBox>
                <Avatar
                  src={p.profile_pic}
                  sx={{
                    border: '2px solid white',
                    width: 58,
                    height: 58,
                  }}
                  alt={p.first_name}
                  onClick={() => {
                    clickAvatar(p.user_id);
                  }}
                />
              </CenteredFlexBox>
            </Grid>
          ))}
        </Grid>
      </CenteredFlexBox>
    </Box>
  );
}

export default Attendance;
