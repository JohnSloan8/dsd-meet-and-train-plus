import { WeatherModel } from '@/models';
import { supabase } from '@/services/supabase';

const updateSessionWeather = async (id: number, weather: WeatherModel) => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .upsert({ id: id, weather: weather })
      .select()
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

export default updateSessionWeather;
