import Map from '@/components/Map';
import { useActivities } from '@/store/activities';
import { useSelectedAthlete } from '@/store/activities';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

const OpenMapCtrl = () => {
  const { trainingSessions } = useTrainingSessions();
  const { activities } = useActivities();
  const { weekDay } = useWeekDay();
  const { selectedAthlete } = useSelectedAthlete();

  if (trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined) {
    return (
      <Map
        lat={trainingSessions[weekDay].location.latitude}
        lon={trainingSessions[weekDay].location.longitude}
        activities={activities}
        selectedAthlete={selectedAthlete}
      />
    );
  } else {
    return null;
  }
};

export default OpenMapCtrl;
