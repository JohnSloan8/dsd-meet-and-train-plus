import { supabase } from '@/services/supabase';

const getStravaProfile = async (userID: string) => {
  try {
    const { data, error } = await supabase
      .from('strava_profiles')
      .select(`*`)
      .eq('user_id', userID);

    if (data) {
      return data[0];
    }

    if (error) {
      throw error;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default getStravaProfile;
