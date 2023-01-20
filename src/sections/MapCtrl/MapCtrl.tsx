import { useRecoilValue } from 'recoil';

import OpenMap from '@/components/OpenMap';
import { useActivities } from '@/store/activities';
import { useSelectedAthlete } from '@/store/activities';
// import { currentSessionState } from '@/store/sessions';
import { currentLocationState } from '@/store/locations';

const OpenMapCtrl = () => {
  // const currentSession = useRecoilValue(currentSessionState);
  const currentLocation = useRecoilValue(currentLocationState);

  const { activities } = useActivities();

  const { selectedAthlete } = useSelectedAthlete();

  if (currentLocation !== undefined) {
    return (
      <OpenMap
        lat={currentLocation.latitude !== null ? currentLocation.latitude : 0}
        lon={currentLocation.longitude !== null ? currentLocation.longitude : 0}
        activities={activities}
        selectedAthlete={selectedAthlete}
      />
    );
  } else {
    return null;
  }
};

export default OpenMapCtrl;
