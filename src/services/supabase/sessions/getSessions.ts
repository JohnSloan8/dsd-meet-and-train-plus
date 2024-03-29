import { supabase } from '@/services/supabase';

const getSessions = async (startDate: string, endDate: string) => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select(`*`)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });

    if (data) {
      return data;
    }

    if (error) {
      console.log('error:', error);
      return;
    }

    return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default getSessions;
