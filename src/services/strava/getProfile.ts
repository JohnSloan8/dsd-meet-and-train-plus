import axios from 'axios';

const getProfile = async (code: string) => {
  const clientID = import.meta.env.VITE_STRAVA_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_STRAVA_CLIENT_SECRET;
  try {
    const { data } = await axios({
      method: 'post',
      url: `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`,
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

export default getProfile;
