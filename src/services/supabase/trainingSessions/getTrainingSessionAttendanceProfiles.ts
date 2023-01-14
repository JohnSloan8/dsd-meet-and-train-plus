import { supabase } from '@/services/supabase';

const getTrainingSessionAttendanceProfiles = async (list_of_ids: string[]) => {
  try {
    const { data, error } = await supabase
      .from('strava_profile')
      .select(`user_id, first_name, surname, profile_pic`)
      .filter('user_id', 'in', `(${list_of_ids})`);

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

export default getTrainingSessionAttendanceProfiles;
