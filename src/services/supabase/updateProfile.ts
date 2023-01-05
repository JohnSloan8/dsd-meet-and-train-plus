import { ProfileModel } from '@/models';
import { supabase } from '@/services/supabase';

const updateProfile = async ({ id, target_race, target_time, equivalent_paces }: ProfileModel) => {
  console.log('id:', id);
  console.log('target_race:', target_race);
  console.log('target_time:', target_time);
  console.log('equivalent_paces:', equivalent_paces);
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: id,
        target_race: target_race,
        target_time: target_time,
        equivalent_paces: equivalent_paces,
      })
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

export default updateProfile;
