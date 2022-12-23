import axios from 'axios';

const getWeather = async () => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `https://onblcbnmhbprhpgkhtep.functions.supabase.co/weather`,
      timeout: 10000,
    });
    if (data) {
      console.log('weather data:', data);
      return data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
    return false;
  }
};

export default getWeather;
