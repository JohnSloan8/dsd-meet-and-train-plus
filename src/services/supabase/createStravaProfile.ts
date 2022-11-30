import { StravaProfileModel } from '@/models';
import { supabase } from '@/services/supabase';

const createStravaProfile = async (profileData: StravaProfileModel) => {
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
