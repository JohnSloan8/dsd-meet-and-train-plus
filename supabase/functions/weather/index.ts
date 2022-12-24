// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { parse } from "https://deno.land/x/xml/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
}

serve(async (req) => {

  console.log('request made to weather');
  const u = new URL(req.url);
  const reqParams = u.searchParams
  const reqType = reqParams.get('requestType')
  console.log('reqParams:', reqType)
  try {
    // Create a Supabase client with the Auth context of the logged in user.
    // const supabaseClient = createClient(
    //   Deno.env.get('SUPABASE_URL'),
    //   Deno.env.get('SUPABASE_ANON_KEY'),
    // );

    const requestOptions = {
      method: 'GET'
    };
  
    if ( reqType === "weather") {
    try {
      const data = await fetch(
        `http://metwdb-openaccess.ichec.ie/metno-wdb2ts/locationforecast?lat=53.2729276;long=-6.2723167`,
        requestOptions,
      );
      if (data) {
        
        const metXML = await data.text()
        const dublinWeather = parse(metXML)

        console.log('dublinWeather:', dublinWeather)
        return new Response(JSON.stringify(dublinWeather), {
          headers: {...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      console.log('error in getActivityFromStrava:', error.message);
    }
  } else if ( reqType === "sunset") {
    try {
      const url = `https://api.sunrise-sunset.org/json?lat=53.2729276;lng=-6.2723167&date=${reqParams.get('date')}`
      console.log('sunsetURL:', url)
      const data = await fetch(
        url,
        requestOptions,
      );
      if (data) {
        const sunsetData = await data.json()
        console.log('sunsetData:', sunsetData)
        return new Response(JSON.stringify(sunsetData), {
          headers: {...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      console.log('error in getActivityFromStrava:', error.message);
    }
  }
      
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: error.message }), {
      headers: {'Content-Type': 'application/json' },
      status: 400,
    });
  }
});