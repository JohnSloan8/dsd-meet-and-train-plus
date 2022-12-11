import { supabase } from '@/services/supabase';

const getTrainingSessions = async (weekStart: date, weekEnd: date) => {
  try {
    const { data, error } = await supabase
      .from('training_sessions')
      .select(`location(name), time, date, session, coach(name, coaching_role(type))`)
      .gte('date', weekStart)
      .lte('date', weekEnd)
      .order('date', { ascending: true });

    if (data) {
      console.log('data:', data);
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
