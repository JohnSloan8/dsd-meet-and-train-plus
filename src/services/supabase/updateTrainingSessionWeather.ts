import { WeatherModel } from '@/models/TrainingSessionModel';
import { supabase } from '@/services/supabase';

const updateTrainingSessionWeather = async (id: number, weather: WeatherModel) => {
  try {
    const { data, error } = await supabase
      .from('training_sessions')
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

export default updateTrainingSessionWeather;
