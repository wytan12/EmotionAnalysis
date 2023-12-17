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
  "_id":string;
  NoteID: string;
  UserID: string;
  Timestamp: string;
  NoEmotion: number;
  ActionType: string;
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
//
// "_id": "657e892540723a226af5e65c",
//   "NoteID": "6493f0512f36d97dd903d73a",
//   "UserID": "Zeke",
//   "Timestamp": "45099168",
//   "NoEmotion": 1,
//   "Joyful": 1,
//   "Joyful_Intensity": 2,
//   "Curious": 1,
//   "Curious_Intensity": 2,
//   "Surprised": 0,
//   "Surprised_Intensity": 9,
//   "Confused": 1,
//   "Confused_Intensity": 4,
//   "Anxious": 0,
//   "Anxious_Intensity": 4,
//   "Frustrated": 1,
//   "Frustrated_Intensity": 1,
//   "Bored": 0,
//   "Bored_Intensity": 8
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

