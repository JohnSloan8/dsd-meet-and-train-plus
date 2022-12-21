import { supabase } from '@/services/supabase';

const getTrainingSessionAttendanceProfiles = async (list_of_ids: string[]) => {
  let queryFilterString = `("${list_of_ids[0]}`;
  list_of_ids.map((id: string, i: number) => {
    if (i > 0) {
      queryFilterString += `, ${id}`;
    }
  });
  queryFilterString += '")';
  console.log('queryFilterString:', queryFilterString);
  try {
    const { data, error } = await supabase
      .from('strava_profile')
      .select(`user_id, first_name, surname, profile_pic`)
      .filter('user_id', 'in', `(${list_of_ids})`);

    if (data) {
      console.log('attendance profile data:', data);
      return data;
    }

    if (error) {
      console.log('attendance profile error:', error);

      throw error;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default getTrainingSessionAttendanceProfiles;
