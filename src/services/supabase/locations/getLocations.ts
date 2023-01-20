import { supabase } from '@/services/supabase';

const getLocationes = async (locationIDs: number[]) => {
  try {
    const { data, error } = await supabase.from('locations').select(`*`).in('id', locationIDs);

    if (data) {
      return data;
    }

    if (error) {
      console.log('error:', error);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
  }
};

export default getLocationes;
