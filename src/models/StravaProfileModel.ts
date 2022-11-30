interface StravaProfileModel {
  id?: number;
  user_id?: string;
  first_name?: string;
  surname?: string;
  city?: string;
  country?: string;
  strava_id?: number;
  profile_pic?: string;
  profile_pic_medium?: string;
  sex?: string;
  access_token?: string;
  refresh_token?: string;
}

export type { StravaProfileModel };
