import { supabase } from '@/services/supabase';

const getProfile = async (userID: string) => {
  console.log('userID', userID);
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`id, target_race, target_time, equivalent_paces`)
      .eq('user_id', userID)
      .single();

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

export default getProfile;
