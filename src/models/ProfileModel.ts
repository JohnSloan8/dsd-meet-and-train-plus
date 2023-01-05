interface ProfileModel {
  id: number;
  target_race: string;
  target_time: string;
  equivalent_paces: { [key: string]: string };
}

export default ProfileModel;
