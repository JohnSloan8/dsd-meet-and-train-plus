import { supabase } from '@/services/supabase';

const getCoaches = async (coachIDs: number[]) => {
  try {
    const { data, error } = await supabase.from('coaches').select(`*`).in('id', coachIDs);

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

export default getCoaches;
