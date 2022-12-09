/* eslint-disable @typescript-eslint/no-explicit-any */
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

import { generateNewAccessToken, getActivityFromStrava } from './apiCalls/strava.ts';
import {
  createActivity,
  doesActivityExist,
  getActivity,
  getUserProfile,
  updateAccessToken,
  updateActivity,
} from './apiCalls/supabase.ts';
import { isActivityDSDRun } from './utils.ts';

serve(async (req) => {
  const { method } = req;
  console.log('request made');

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_ANON_KEY'),
    );

    // strava webhooks send a POST request upon new or updated activity
    if (method === 'POST') {
      const activityData = await req.json();
      console.log('activityData:', activityData);
      if (activityData.aspect_type === 'create' || activityData.aspect_type === 'update') {
        // if new activity, then create
        //
        const userProfile = await getUserProfile(supabaseClient, activityData.owner_id);

        console.log('userProfile:', userProfile);

        // check if access token has expired
        const date = Date.now();
        const token_expires = userProfile.token_expires_at * 1000; // milliseconds for JS
        if (date - token_expires > 0) {
          // get new access token
          console.log('token expired, generating new access token:');
          const { access_token, expires_at } = await generateNewAccessToken(
            userProfile.refresh_token,
          );

          // update profile with new token
          userProfile = await updateAccessToken(
            userProfile.id,
            access_token,
            expires_at,
            supabaseClient,
          );
          console.log('userProfile:', userProfile);
        } else {
          console.log('token still valid');
        }

        /** Get Full Activity Data From Strava */
        const fullStravaActivityData = await getActivityFromStrava(
          activityData.object_id,
          userProfile.access_token,
        );
        console.log('fullStravaActivityData:', fullStravaActivityData);

        /** Check if DSD run */
        // const isDSDRun = doesActivityIsDSDun(fullStravaActivityData);

        if (isActivityDSDRun(fullStravaActivityData)) {
          let activity = null;
          if (activityData.aspect_type === 'create') {
            activity = await createActivity(
              supabaseClient,
              userProfile.user_id,
              activityData.object_id,
            );
          } else if (activityData.aspect_type === 'update') {
            const activityExists = await doesActivityExist(supabaseClient, activityData.object_id);
            console.log('activityExists:', activityExists);
            if (activityExists) {
              activity = await getActivity(supabaseClient, activityData.object_id);
            } else {
              activity = await createActivity(
                supabaseClient,
                userProfile.user_id,
                activityData.object_id,
              );
            }
          }
          console.log('activity:', activity);

          const updatedActivity = await updateActivity(
            supabaseClient,
            activity.id,
            fullStravaActivityData,
          );
          console.log('updatedActivity:', updatedActivity);
        } else {
          console.log('not a DSD run');
        }
      }
      return new Response('ok', {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});

//// For creating subscription (https://developers.strava.com/docs/webhooks/)
// if (method === 'GET' && urlObj.searchParams.get('hub.challenge') !== null) {
//   return new Response(JSON.stringify(data), {
//     headers: { 'Content-Type': 'application/json' },
//     status: 200,
//   });
// }
