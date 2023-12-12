export interface Test{
  _id: string;
  TestID: string;
  _v:string
}

export interface Emotion{
  id: string;
  name: string;
}
export interface EmoReadWrite {
  NoteID: string;
  UserID: string;
  ActionType: string;
  Timestamp: string;
  NoEmotion: number;
  Joyful: number;
  Joyful_Intensity: number;
  Curious: number;
  Curious_Intensity: number;
  Surprised: number;
  Surprised_Intensity: number;
  Confused: number;
  Confused_Intensity: number;
  Anxious: number;
  Anxious_Intensity: number;
  Frustrated: number;
  Frustrated_Intensity: number;
  Bored: number;
  Bored_Intensity: number;
}

export interface EmoSurvey {
  id: number;
  UserID: string;
  TimeStamp: string;
  Joyful: number;
  Curious: number;
  Surprised: number;
  Confused: number;
  Anxious: number;
  Frustrated: number;
  Bored: number;
  Inconducive: string;
  Reason: string;
  Remarks: string;
}

export interface EmoReg {
  id: number;
  UserID: string;
  GroupMembers: string;
  Timestamp: string;
  Visualization: string;
  Challenges: string;
  ImprovementWays: string;
  PositivePlan: string;
  Action: string;
}

