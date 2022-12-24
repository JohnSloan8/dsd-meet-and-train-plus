import axios from 'axios';

const getSunset = async (date: string) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `https://onblcbnmhbprhpgkhtep.functions.supabase.co/weather?requestType=sunset&date=${date}`,
      timeout: 10000,
    });
    if (data) {
      console.log('Sunset data:', data);
      return data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
    return false;
  }
};

export default getSunset;
