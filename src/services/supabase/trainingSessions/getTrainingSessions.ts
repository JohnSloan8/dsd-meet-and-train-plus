import { supabase } from '@/services/supabase';

const getTrainingSessions = async (startDate: string) => {
  try {
    const { data, error } = await supabase
      .from('training_sessions')
      .select(`*`)
      .gte('date', startDate)

      .order('date', { ascending: true });

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

export default getTrainingSessions;
