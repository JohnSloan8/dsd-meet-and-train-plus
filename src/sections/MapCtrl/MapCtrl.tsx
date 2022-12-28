import { useEffect, useState } from 'react';

import Map from '@/components/Map';
import { useActivities } from '@/store/activities';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

const OpenMapCtrl = () => {
  const { trainingSessions } = useTrainingSessions();
  const { activities } = useActivities();
  const { weekDay } = useWeekDay();
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    const coords = activities.map((a) => {
      return a.coords;
    });
    if (coords !== undefined) {
      setCoords(coords);
    }
  }, [activities]);

  if (trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined) {
    return (
      <Map
        lat={trainingSessions[weekDay].location.latitude}
        lon={trainingSessions[weekDay].location.longitude}
        coords={coords}
      />
    );
  } else {
    return null;
  }
};

export default OpenMapCtrl;
