interface SessionModel {
  coach: CoachModel;
  location: LocationModel;
  id: number;
  time: string;
  date: string;
  session: SessionModel[];
  weather: WeatherModel;
  sunset: string;
}

interface WeatherModel {
  temperature: number;
  code: number;
  windSpeed: number;
  windDirection: number;
  updatedAt: number;
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

interface SessionAttendanceProfileModel {
  first_name: string;
  profile_pic: string;
  surname: string;
  user_id: string;
}

export type { SessionModel, SessionAttendanceProfileModel, WeatherModel };
