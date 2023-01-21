import { EquivalentPacesModel, SessionModel, WeatherModel } from './extendedSupabase';

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          coords: Json | null;
          created_at: string | null;
          id: number;
          session_id: number | null;
          strava_activity_id: number | null;
          strava_data: Json | null;
          user_id: string | null;
        };
        Insert: {
          coords?: Json | null;
          created_at?: string | null;
          id?: number;
          session_id?: number | null;
          strava_activity_id?: number | null;
          strava_data?: Json | null;
          user_id?: string | null;
        };
        Update: {
          coords?: Json | null;
          created_at?: string | null;
          id?: number;
          session_id?: number | null;
          strava_activity_id?: number | null;
          strava_data?: Json | null;
          user_id?: string | null;
        };
      };
      coaches: {
        Row: {
          coaching_role_id: number | null;
          created_at: string | null;
          id: number;
          name: string | null;
          picture: string | null;
        };
        Insert: {
          coaching_role_id?: number | null;
          created_at?: string | null;
          id?: number;
          name?: string | null;
          picture?: string | null;
        };
        Update: {
          coaching_role_id?: number | null;
          created_at?: string | null;
          id?: number;
          name?: string | null;
          picture?: string | null;
        };
      };
      coaching_roles: {
        Row: {
          created_at: string | null;
          id: number;
          type: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          type?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          type?: string | null;
        };
      };
      locations: {
        Row: {
          created_at: string | null;
          id: number;
          latitude: number | null;
          longitude: number | null;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          latitude?: number | null;
          longitude?: number | null;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          latitude?: number | null;
          longitude?: number | null;
          name?: string | null;
        };
      };
      profiles: {
        Row: {
          created_at: string | null;
          equivalent_paces: EquivalentPacesModel | null;
          id: number;
          target_race: string | null;
          target_time: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          equivalent_paces?: Json | null;
          id?: number;
          target_race?: string | null;
          target_time?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          equivalent_paces?: Json | null;
          id?: number;
          target_race?: string | null;
          target_time?: string | null;
          user_id?: string | null;
        };
      };
      session_attendances: {
        Row: {
          created_at: string | null;
          id: number;
          session_id: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          session_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          session_id?: number | null;
          user_id?: string | null;
        };
      };
      session_types: {
        Row: {
          created_at: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string | null;
        };
      };
      sessions: {
        Row: {
          coach_id: number | null;
          created_at: string | null;
          date: string | null;
          id: number;
          location_id: number | null;
          session: SessionModel | null;
          session_type_id: number | null;
          sunset: string | null;
          time: string | null;
          weather: WeatherModel | null;
        };
        Insert: {
          coach_id?: number | null;
          created_at?: string | null;
          date?: string | null;
          id?: number;
          location_id?: number | null;
          session?: Json | null;
          session_type_id?: number | null;
          sunset?: string | null;
          time?: string | null;
          weather?: Json | null;
        };
        Update: {
          coach_id?: number | null;
          created_at?: string | null;
          date?: string | null;
          id?: number;
          location_id?: number | null;
          session?: Json | null;
          session_type_id?: number | null;
          sunset?: string | null;
          time?: string | null;
          weather?: Json | null;
        };
      };
      strava_profiles: {
        Row: {
          access_token: string | null;
          city: string | null;
          country: string | null;
          created_at: string | null;
          first_name: string | null;
          id: number;
          profile_pic: string | null;
          profile_pic_medium: string | null;
          refresh_token: string | null;
          sex: string | null;
          strava_id: number | null;
          surname: string | null;
          token_expires_at: number | null;
          user_id: string | null;
        };
        Insert: {
          access_token?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string | null;
          first_name?: string | null;
          id?: number;
          profile_pic?: string | null;
          profile_pic_medium?: string | null;
          refresh_token?: string | null;
          sex?: string | null;
          strava_id?: number | null;
          surname?: string | null;
          token_expires_at?: number | null;
          user_id?: string | null;
        };
        Update: {
          access_token?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string | null;
          first_name?: string | null;
          id?: number;
          profile_pic?: string | null;
          profile_pic_medium?: string | null;
          refresh_token?: string | null;
          sex?: string | null;
          strava_id?: number | null;
          surname?: string | null;
          token_expires_at?: number | null;
          user_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
