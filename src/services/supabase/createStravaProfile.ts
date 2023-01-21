import { supabase } from '@/services/supabase';

import { Database } from '../../../types/supabase';

const createStravaProfile = async (
  profileData: Database['public']['Tables']['strava_profiles']['Insert'],
) => {
  try {
    const { data, error } = await supabase.from('strava_profile').insert(profileData).select();

    if (error) {
      throw error;
    }
    if (data) {
      return data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default createStravaProfile;
