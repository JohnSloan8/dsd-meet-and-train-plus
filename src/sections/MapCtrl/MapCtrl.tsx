import { useRecoilValue } from 'recoil';

import OpenMap from '@/components/OpenMap';
import { useActivities } from '@/store/activities';
import { useSelectedAthlete } from '@/store/activities';
import { currentSessionState } from '@/store/sessions';

const OpenMapCtrl = () => {
  const currentSession = useRecoilValue(currentSessionState);

  const { activities } = useActivities();

  const { selectedAthlete } = useSelectedAthlete();

  if (currentSession !== undefined) {
    return (
      <OpenMap
        lat={currentSession.location.latitude}
        lon={currentSession.location.longitude}
        activities={activities}
        selectedAthlete={selectedAthlete}
      />
    );
  } else {
    return null;
  }
};

export default OpenMapCtrl;
