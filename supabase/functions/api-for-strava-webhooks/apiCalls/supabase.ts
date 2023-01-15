/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

const getUserProfile = async (supabaseClient: SupabaseClient, strava_id: number) => {
  const { data, error } = await supabaseClient
    .from('strava_profile')
    .select(`id, user_id, access_token, refresh_token, token_expires_at`)
    .single()
    .limit(1)
    .eq('strava_id', strava_id);

  if (error) throw error;

  return data;
};

const updateAccessToken = async (
  id: number,
  access_token: string,
  expires_at: number,
  supabaseClient: SupabaseClient,
) => {
  const { data, error } = await supabaseClient
    .from('strava_profile')
    .upsert({ id: id, access_token: access_token, token_expires_at: expires_at })
    .select();
  if (error) throw error;
  return data;
};

const getActivity = async (supabaseClient: SupabaseClient, activity_id: number) => {
  const { data, error } = await supabaseClient
    .from('activities')
    .select(`id, user_id, strava_activity_id, strava_data`)
    .single()
    .limit(1)
    .eq('strava_activity_id', activity_id);

  if (error) throw error;

  return data;
};

const doesActivityExist = async (supabaseClient: SupabaseClient, activity_id: number) => {
  const { count, error } = await supabaseClient
    .from('activities')
    .select('*', { count: 'exact', head: true })
    .eq('strava_activity_id', activity_id);
  if (error) throw error;

  if (count === 1) {
    return true;
  }
  return false;
};

const createActivity = async (
  supabaseClient: SupabaseClient,
  user_id: string,
  activity_id: number,
) => {
  const { data, error } = await supabaseClient
    .from('activities')
    .insert({
      user_id: user_id,
      strava_activity_id: activity_id,
    })
    .select()
    .single()
    .limit(1);

  if (error) throw error;

  return data;
};

const updateActivity = async (
  supabaseClient: SupabaseClient,
  id: number,
  strava_data: any,
  coords: any[],
  session_id: number,
) => {
  const { data, error } = await supabaseClient
    .from('activities')
    .upsert({ id: id, strava_data: strava_data, coords: coords, session_id: session_id })
    .select();
  if (error) throw error;
  return data;
};

const getSession = async (supabaseClient: SupabaseClient, sessionStartDate: string) => {
  try {
    const { data, error } = await supabaseClient
      .from('sessions')
      .select(`id, location(latitude, longitude), time, date`)
      .single()
      .limit(1)
      .eq('date', sessionStartDate);

    if (data) {
      return data;
    }

    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

const createSessionAttendance = async (
  supabaseClient: SupabaseClient,
  user_id: string,
  session_id: number,
) => {
  const { data, error } = await supabaseClient
    .from('session_attendances')
    .insert({
      user_id: user_id,
      session_id: session_id,
    })
    .select();

  if (error) throw error;

  return data;
};

export {
  getUserProfile,
  updateAccessToken,
  getActivity,
  createActivity,
  updateActivity,
  doesActivityExist,
  getSession,
  createSessionAttendance,
};
