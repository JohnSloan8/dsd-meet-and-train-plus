// import { useEffect } from 'react';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';

// import { useTrainingSessions } from '@/store/trainingSessions';
// import { useWeekDay } from '@/store/weekDay';

function Attendance() {
  // const { trainingSessionAttendance, setTrainingSessionAttendance } =
  //   useTrainingSessionAttendance();
  // const { trainingSessions, setTrainingSessions } = useTrainingSessions();
  // const { weekDay } = useWeekDay();
  // useEffect(() => {
  //   if (trainingSessions !== undefined) {
  //     getTrainingSessionsAttendance().then((a: any) => {
  //       console.log('a', a);
  //       setTrainingSessionsAttendance(d);
  //     });
  //   }
  // }, []);

  return (
    <CenteredFlexBox p={1}>
      <Typography variant="h6">Attendance</Typography>
    </CenteredFlexBox>
  );
}

export default Attendance;
