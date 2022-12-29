import Map from '@/components/Map';
import { useActivities } from '@/store/activities';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

const OpenMapCtrl = () => {
  const { trainingSessions } = useTrainingSessions();
  const { activities } = useActivities();
  const { weekDay } = useWeekDay();

  if (trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined) {
    return (
      <Map
        lat={trainingSessions[weekDay].location.latitude}
        lon={trainingSessions[weekDay].location.longitude}
        activities={activities}
      />
    );
  } else {
    return null;
  }
};

export default OpenMapCtrl;
