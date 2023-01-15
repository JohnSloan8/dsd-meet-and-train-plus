import { supabase } from '@/services/supabase';

const createProfile = async (user_id: string) => {
  try {
    const { data, error } = await supabase.from('profiles').insert({
      user_id: user_id,
    });

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

export default createProfile;
