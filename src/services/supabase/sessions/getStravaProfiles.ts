import { supabase } from '@/services/supabase';

const getStravaProfiles = async (list_of_ids: string[]) => {
  try {
    const { data, error } = await supabase
      .from('strava_profile')
      .select(`*`)
      // .filter('user_id', 'in', `(${list_of_ids})`);
      .in('user_id', list_of_ids);

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

export default getStravaProfiles;
