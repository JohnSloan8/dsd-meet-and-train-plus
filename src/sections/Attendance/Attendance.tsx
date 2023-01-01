/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { getTrainingSessionAttendance } from '@/services/supabase';
import { getTrainingSessionAttendanceProfiles } from '@/services/supabase';
import { useSelectedAthlete } from '@/store/activities';
import {
  useTrainingSessionAttendance,
  useTrainingSessionAttendanceProfiles,
  useTrainingSessions,
} from '@/store/trainingSessions';
import { useWeek } from '@/store/week';
import { useWeekDay } from '@/store/weekDay';

function Attendance() {
  const { trainingSessionAttendance, setTrainingSessionAttendance } =
    useTrainingSessionAttendance();
  const { trainingSessionAttendanceProfiles, setTrainingSessionAttendanceProfiles } =
    useTrainingSessionAttendanceProfiles();

  const { trainingSessions } = useTrainingSessions();
  const { selectedAthlete, setSelectedAthlete } = useSelectedAthlete();
  const [selectedAthleteName, setSelectedAthleteName] = useState('');
  const { weekDay } = useWeekDay();
  const { week } = useWeek();

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
    } else {
      setTrainingSessionAttendance([]);
    }
  }, [trainingSessions, weekDay, week]);

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
    if (userID === selectedAthlete) {
      setSelectedAthlete(undefined);
    } else {
      setSelectedAthlete(userID);
    }
  };

  useEffect(() => {
    const selectedAthleteProfile = trainingSessionAttendanceProfiles.find((p) => {
      return p.user_id === selectedAthlete;
    });
    if (selectedAthleteProfile !== undefined) {
      const name = `${selectedAthleteProfile.first_name} ${selectedAthleteProfile.surname}`;
      setSelectedAthleteName(name);
    } else {
      setSelectedAthleteName('');
    }
  }, [selectedAthlete]);

  useEffect(() => {
    setSelectedAthlete(undefined);
  }, [weekDay, trainingSessions]);

  return (
    <Box>
      <CenteredFlexBox pt={1} pb={0.5} height={40}>
        <DirectionsRunIcon sx={{ color: 'primary.dark' }} fontSize="medium" />

        <Typography
          color={'primary.dark'}
          ml={0.5}
          sx={{ visibility: selectedAthleteName !== '' ? 'visible' : 'hidden' }}
        >
          {selectedAthleteName}
        </Typography>
      </CenteredFlexBox>
      <CenteredFlexBox>
        <Box px={3} py={0} width={440}>
          <Grid container>
            {trainingSessionAttendanceProfiles.map((p, i) => (
              <Grid key={i} item width={46} mb={-0.7}>
                <CenteredFlexBox>
                  <IconButton
                    onClick={() => {
                      clickAvatar(p.user_id);
                    }}
                    sx={{
                      width: 58,
                      height: 58,
                      zIndex: selectedAthlete === p.user_id ? 101 : 100 - i,
                    }}
                  >
                    <Avatar
                      src={p.profile_pic}
                      alt={p.first_name}
                      sx={{
                        border:
                          selectedAthlete === p.user_id ? `2px solid #0d47a1` : '2px solid white',
                        width: 58,
                        height: 58,
                      }}
                    />
                  </IconButton>
                </CenteredFlexBox>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CenteredFlexBox>
    </Box>
  );
}

export default Attendance;
