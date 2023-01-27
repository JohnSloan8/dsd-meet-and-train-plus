// import { Database } from '../../../types/supabase';
import { EquivalentPacesModel } from '@/models';
import { supabase } from '@/services/supabase';

const updateProfile = async (
  id: number,
  target_race: string,
  target_time: string,
  equivalent_paces: EquivalentPacesModel[],
) => {
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

export default updateProfile;
