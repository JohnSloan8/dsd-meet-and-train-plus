interface TrainingSessionModel {
  coach: CoachModel;
  location: LocationModel;
  id: number;
  time: string;
  date: string;
  session: SessionModel[];
  weather: WeatherModel;
}

interface WeatherModel {
  temperature: number;
  code: number;
}

interface CoachModel {
  name: string;
  coaching_role: CoachingRoleModel;
  picture: string;
}

interface CoachingRoleModel {
  type: string;
}

interface LocationModel {
  name: string;
  latitude: number;
  longitude: number;
}

interface SessionModel {
  reps: number;
  distance?: string;
  time?: string;
  pace: string;
  recovery?: string;
}

interface TrainingSessionAttendanceProfileModel {
  first_name: string;
  profile_pic: string;
  surname: string;
  user_id: string;
}

export type { TrainingSessionModel, TrainingSessionAttendanceProfileModel, WeatherModel };
