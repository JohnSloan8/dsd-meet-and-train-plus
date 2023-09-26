import axios from 'axios';

const getWarnings = async () => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `https://onblcbnmhbprhpgkhtep.functions.supabase.co/weather?requestType=warnings`,
      timeout: 10000,
    });
    if (data) {
      return data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message);
    return false;
  }
};

export default getWarnings;
