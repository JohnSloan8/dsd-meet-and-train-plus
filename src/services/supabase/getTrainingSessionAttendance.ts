import { supabase } from '@/services/supabase';

const getTrainingSessionAttendance = async (tSID: number) => {
  try {
    const { data, error } = await supabase
      .from('training_session_attendance')
      .select(`user_id`)
      .eq('training_session_id', tSID);

    if (data) {
      const user_ids = data.map((d) => {
        return d.user_id;
      });
      return user_ids;
    }

    if (error) {
      throw error;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default getTrainingSessionAttendance;
