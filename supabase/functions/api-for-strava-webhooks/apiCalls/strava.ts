/* eslint-disable @typescript-eslint/no-explicit-any */
const clientID = Deno.env.get('STRAVA_CLIENT_ID');
const clientSecret = Deno.env.get('STRAVA_CLIENT_SECRET');

const generateNewAccessToken = async (refresh_token: string) => {
  const url = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refresh_token}&grant_type=refresh_token`;
  console.log('refresh url:', url);
  try {
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (data) {
      return data.json();
    }
  } catch (error: any) {
    console.log('error in generateNewAccessToken:', error.message);
  }
};

const getActivityFromStrava = async (object_id: number, access_token: number) => {
  const myHeaders = new Headers();
  myHeaders.append('authorization', `Bearer ${access_token}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  try {
    const data = await fetch(
      `https://www.strava.com/api/v3/activities/${object_id}?include_all_efforts=" "`,
      requestOptions,
    );
    if (data) {
      return data.json();
    }
  } catch (error: any) {
    console.log('error in getActivityFromStrava:', error.message);
  }
};

export { generateNewAccessToken, getActivityFromStrava };
