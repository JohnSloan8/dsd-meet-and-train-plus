// import { EquivalentPacesModel, SessionModel, WeatherModel } from './extendedSupabase';

interface SessionModel {
  pace: string;
  reps: number;
  time?: string;
  distance?: string;
  recovery: string;
}

interface WeatherModel {
  code: number;
  updatedAt: number;
  windSpeed: number;
  temperature: number;
  windDirection: number;
}

interface EquivalentPacesModel {
  distance: string;
  race_time: number;
  seconds_per_km: number;
  race_pace_km: number;
  race_pace_mile: number;
  race_time_list: [number, number, number];
}
export type { SessionModel, WeatherModel, EquivalentPacesModel };
