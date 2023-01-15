/* eslint-disable @typescript-eslint/no-explicit-any */
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

import { generateNewAccessToken, getActivityFromStrava } from './apiCalls/strava.ts';
import {
  createActivity,
  createSessionAttendance,
  doesActivityExist,
  getActivity,
  getSession,
  getUserProfile,
  updateAccessToken,
  updateActivity,
} from './apiCalls/supabase.ts';
import isActivityInRightLocation from './utils/isActivityInRightLocation.ts';
import isActivityRunAtRightTime from './utils/isActivityRunAtRightTime.ts';
import polylineDecoder from './utils/polylineDecoder.ts';

serve(async (req) => {
  const { method } = req;

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_ANON_KEY'),
    );

    // strava webhooks send a POST request upon new or updated activity
    if (method === 'POST') {
      const activityData = await req.json();

      if (activityData.aspect_type === 'create' || activityData.aspect_type === 'update') {
        // if new activity, then create

        let userProfile = await getUserProfile(supabaseClient, activityData.owner_id);

        // check if access token has expired
        const date = Date.now();
        const token_expires = userProfile.token_expires_at * 1000; // milliseconds for JS
        if (date - token_expires > 0) {
          // get new access token

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
        } else {
          console.log('token still valid');
        }

        /** Get Full Activity Data From Strava */
        const fullStravaActivityData = await getActivityFromStrava(
          activityData.object_id,
          userProfile.access_token,
        );

        const sessionDate = fullStravaActivityData.start_date_local.split('T')[0];
        const thisSession = await getSession(supabaseClient, sessionDate);
        if (thisSession !== undefined) {
          const runAtRightTime = await isActivityRunAtRightTime(
            fullStravaActivityData,
            thisSession,
          );

          if (runAtRightTime) {
            const [points, olPoints] = polylineDecoder(fullStravaActivityData.map.polyline);
            const rightLocation = isActivityInRightLocation(points, thisSession.location);
            if (rightLocation) {
              let activity = null;
              if (activityData.aspect_type === 'create') {
                activity = await createActivity(
                  supabaseClient,
                  userProfile.user_id,
                  activityData.object_id,
                );
                console.log('created new activity, id', activity.id);
              } else if (activityData.aspect_type === 'update') {
                console.log('updating activity');
                const activityExists = await doesActivityExist(
                  supabaseClient,
                  activityData.object_id,
                );

                if (activityExists) {
                  activity = await getActivity(supabaseClient, activityData.object_id);
                  console.log('updating exisiting activity, id:', activity.id);
                } else {
                  activity = await createActivity(
                    supabaseClient,
                    userProfile.user_id,
                    activityData.object_id,
                  );
                  console.log('creating new activity in update, id:', activity.id);
                }
              }

              const updatedActivity = await updateActivity(
                supabaseClient,
                activity.id,
                fullStravaActivityData,
                olPoints,
                thisSession.id,
              );

              createSessionAttendance(supabaseClient, userProfile.user_id, thisSession.id).then(
                (a) => {
                  console.log('new attendance:', a);
                },
              );

              console.log('updatedActivity:', updatedActivity);
            } else {
              console.log('not run at right location');
            }
          } else {
            console.log('not a DSD run');
          }
        } else {
          console.log('undefined session');
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
