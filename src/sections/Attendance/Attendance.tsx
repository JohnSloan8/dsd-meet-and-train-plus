/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import { CenteredFlexBox } from '@/components/styled';
import { getSessionAttendance } from '@/services/supabase';
import { getSessionAttendanceProfiles } from '@/services/supabase';
import { useSelectedAthlete } from '@/store/activities';
import { useSessionAttendance, useSessionAttendanceProfiles } from '@/store/sessions';
import { currentSessionState } from '@/store/sessions';

function Attendance() {
  const { SessionAttendance, setSessionAttendance } = useSessionAttendance();
  const { SessionAttendanceProfiles, setSessionAttendanceProfiles } =
    useSessionAttendanceProfiles();

  const currentSession = useRecoilValue(currentSessionState);

  const { selectedAthlete, setSelectedAthlete } = useSelectedAthlete();
  // const [selectedAthleteName, setSelectedAthleteName] = useState('');

  useEffect(() => {
    if (currentSession !== undefined) {
      const todaysDate = Date.now();
      const trainingDate = new Date(`${currentSession.date} ${currentSession.time}`);
      if (todaysDate - trainingDate.getTime() > 0) {
        getSessionAttendance(currentSession.id).then((user_id_list: any) => {
          setSessionAttendance(user_id_list);
        });
      } else {
        setSessionAttendance([]);
      }
    } else {
      setSessionAttendance([]);
    }
  }, [currentSession]);

  useEffect(() => {
    if (SessionAttendance && SessionAttendance.length > 0) {
      getSessionAttendanceProfiles(SessionAttendance).then((d: any) => {
        setSessionAttendanceProfiles(d);
      });
    } else {
      setSessionAttendanceProfiles([]);
    }
  }, [SessionAttendance]);

  useEffect(() => {
    console.log('SessionAttendanceProfiles:', SessionAttendanceProfiles);
  }, [SessionAttendanceProfiles]);

  const clickAvatar = (userID: string) => {
    if (userID === selectedAthlete) {
      setSelectedAthlete(undefined);
    } else {
      setSelectedAthlete(userID);
    }
  };

  // useEffect(() => {
  //   const selectedAthleteProfile = SessionAttendanceProfiles.find((p) => {
  //     return p.user_id === selectedAthlete;
  //   });
  //   if (selectedAthleteProfile !== undefined) {
  //     const name = `${selectedAthleteProfile.first_name} ${selectedAthleteProfile.surname}`;
  //     // setSelectedAthleteName(name);
  //   } else {
  //     setSelectedAthleteName('');
  //   }
  // }, [selectedAthlete]);

  useEffect(() => {
    setSelectedAthlete(undefined);
  }, [currentSession]);

  return (
    <Box>
      <CenteredFlexBox>
        <Box px={2} py={1} width={440}>
          <Grid container>
            {SessionAttendanceProfiles.map((p, i) => (
              <Grid key={i} item width={56} mb={-0.7}>
                <CenteredFlexBox>
                  <IconButton
                    onClick={() => {
                      clickAvatar(p.user_id);
                    }}
                    sx={{
                      width: 64,
                      height: 64,
                      zIndex: selectedAthlete === p.user_id ? 101 : 100 - i,
                    }}
                  >
                    <Avatar
                      src={p.profile_pic}
                      alt={p.first_name}
                      sx={{
                        border:
                          selectedAthlete === p.user_id ? `2px solid #0d47a1` : '2px solid white',
                        width: 64,
                        height: 64,
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
