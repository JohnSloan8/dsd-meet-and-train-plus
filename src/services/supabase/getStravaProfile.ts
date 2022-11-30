import { supabase } from '@/services/supabase';

const getStravaProfile = async (userID: string) => {
  try {
    const { data, error } = await supabase
      .from('strava_profile')
      .select(
        `id, user_id, access_token, refresh_token, first_name, surname, city, country, strava_id, profile_pic, profile_pic_medium, sex`,
      )
      .eq('user_id', userID);

    if (data) {
      return data;
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
