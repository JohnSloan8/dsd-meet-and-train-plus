import { supabase } from '@/services/supabase';

const getSessions = async (startDate: string, endDate: string) => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select(`*, coach(*), location(*)`)
      .gte('date', startDate)
      .lte('date', endDate)
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

export default getSessions;
