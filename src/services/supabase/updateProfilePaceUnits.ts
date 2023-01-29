import { supabase } from '@/services/supabase';

const updateProfilePaceUnits = async (id: number, km: boolean) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: id,
        pace_in_km: km,
      })
      .select();

    if (data) {
      return data[0];
    }

    if (error) {
      throw error;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default updateProfilePaceUnits;
