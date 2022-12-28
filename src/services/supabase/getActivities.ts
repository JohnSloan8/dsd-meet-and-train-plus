import { supabase } from '@/services/supabase';

const getActivities = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select(`user_id, strava_data, coords`)
      .eq('training_session_id', id);

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

export default getActivities;
