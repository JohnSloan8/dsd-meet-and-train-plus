interface TrainingSessionsModel {
  location: number;
  time: string;
  date: string;
  session: SessionModel[];
}

interface SessionModel {
  reps: number;
  distance?: string;
  time?: string;
  pace: string;
  recovery?: string;
}

export type { TrainingSessionsModel };
