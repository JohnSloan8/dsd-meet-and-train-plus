import {Database} from './supabase'

interface Session {
    pace: string
    reps: number
    time?: string
    distance?: string
    recovery: string
}

interface Weather {
  code: number
  updatedAt: number
  windSpeed: number
  temperature: number
  windDirection: number
}

interface SessionDatabase extends Omit<Database, 'public.Tables.sessions.Row.session'> {
  session: Session[]
}

interface extendedDatabase extends Omit<SessionDatabase, 'public.Tables.sessions.Row.weather'> {
  weather: Weather
}

export type {extendedDatabase}