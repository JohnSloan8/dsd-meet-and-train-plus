import { supabase } from '@/services/supabase';

const updateSessionSunset = async (id: number, sunset: string) => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .upsert({ id: id, sunset: sunset })
      .select();

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

export default updateSessionSunset;
