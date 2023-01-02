/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { getTrainingSessions } from '@/services/supabase';
import { getActivities } from '@/services/supabase';
import { useActivities } from '@/store/activities';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeek } from '@/store/week';
import { useWeekDay } from '@/store/weekDay';

function TrainingSession() {
  const { trainingSessions, setTrainingSessions } = useTrainingSessions();
  const { setActivities } = useActivities();
  const { week } = useWeek();
  const { weekDay } = useWeekDay();
  const [sessionString, setSessionString] = useState('');

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

  return trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined ? (
    <CenteredFlexBox sx={{ height: '100%', alignItems: 'center' }}>
      <Typography variant="body1">{sessionString}</Typography>
    </CenteredFlexBox>
  ) : null;
}

export default TrainingSession;
