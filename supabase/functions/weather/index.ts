// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { parse } from 'https://deno.land/x/xml/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
};

serve(async (req) => {
  const u = new URL(req.url);
  const reqParams = u.searchParams;
  const reqType = reqParams.get('requestType');

  try {
    const requestOptions = {
      method: 'GET',
    };

    if (reqType === 'weather') {
      try {
        const data = await fetch(
          `http://metwdb-openaccess.ichec.ie/metno-wdb2ts/locationforecast?lat=53.2729276;long=-6.2723167`,
          requestOptions,
        );
        if (data) {
          const metXML = await data.text();
          const dublinWeather = parse(metXML);

          return new Response(JSON.stringify(dublinWeather), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } catch (error) {
        console.log('error in getActivityFromStrava:', error.message);
      }
    } else if (reqType === 'sunset') {
      try {
        const url = `https://api.sunrisesunset.io/json?lat=53.3498006&lng=-6.2602964&timezone=UTC&date=${reqParams.get(
          'date',
        )}`;

        const data = await fetch(url, requestOptions);
        if (data) {
          const sunsetData = await data.json();

          return new Response(JSON.stringify(sunsetData), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } catch (error) {
        console.log('error in getting sunset:', error.message);
      }
    } else if (reqType === 'warnings') {
      try {
        const url = 'https://www.met.ie/Open_Data/json/warning_IRELAND.json';

        const data = await fetch(url, requestOptions);
        if (data) {
          const warningsData = await data.json();

          return new Response(JSON.stringify(warningsData), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } catch (error) {
        console.log('error in getting warnings:', error.message);
      }
    }
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
