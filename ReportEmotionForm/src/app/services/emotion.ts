

export interface Test{
    _id: string;
    TestID: string;
    _v:string
  }
  
  export interface Emotion{
    id: string;
    name: string;
  }
  
  export class Emotion{
    constructor(id:string,name:string) {
      this.id = id;
      this.name = name;
    }
  }
  
  export interface EmoReadWrite {
    _id:string;
    NoteID: string;
    NoteTitle: string;
    NoteContent: string;
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
    Intensity: { key: keyof EmoReadWrite, value: number }[];
  }
  
  export class EmoReadWrite implements EmoReadWrite {
    constructor(NoteID: string,NoteTitle: string,NoteContent: string, UserID: string, Timestamp: string,NoEmotion: number,ActionType: string){
      this.NoteID = NoteID;
      this.NoteTitle = NoteTitle;
      this.NoteContent = NoteContent;
      this.UserID = UserID;
      this.Timestamp = Timestamp;
      this.NoEmotion = NoEmotion;
      this.ActionType = ActionType;
      this.Intensity = []; 
    }
  
    getJoyful(): number {
      return this.Joyful;
    }
  
    setJoyful(value: number) {
      this.Joyful = value;
    }
  
    getJoyful_Intensity(): number {
      return this.Joyful_Intensity;
    }
  
    setJoyful_Intensity(value: number) {
      this.Joyful_Intensity = value;
    }
  
    getCurious(): number {
      return this.Curious;
    }
  
    setCurious(value: number) {
      this.Curious = value;
    }
  
    getCurious_Intensity(): number {
      return this.Curious_Intensity;
    }
  
    setCurious_Intensity(value: number) {
      this.Curious_Intensity = value;
    }
  
    getSurprised(): number {
      return this.Surprised;
    }
  
    setSurprised(value: number) {
      this.Surprised = value;
    }
  
    getSurprised_Intensity(): number {
      return this.Surprised_Intensity;
    }
  
    setSurprised_Intensity(value: number) {
      this.Surprised_Intensity = value;
    }
  
    getConfused(): number {
      return this.Confused;
    }
  
    setConfused(value: number) {
      this.Confused = value;
    }
  
    getConfused_Intensity(): number {
      return this.Confused_Intensity;
    }
  
    setConfused_Intensity(value: number) {
      this.Confused_Intensity = value;
    }
  
    getAnxious(): number {
      return this.Anxious;
    }
  
    setAnxious(value: number) {
      this.Anxious = value;
    }
  
    getAnxious_Intensity(): number {
      return this.Anxious_Intensity;
    }
  
    setAnxious_Intensity(value: number) {
      this.Anxious_Intensity = value;
    }
  
    getFrustrated(): number {
      return this.Frustrated;
    }
  
    setFrustrated(value: number) {
      this.Frustrated = value;
    }
  
    getFrustrated_Intensity(): number {
      return this.Frustrated_Intensity;
    }
  
    setFrustrated_Intensity(value: number) {
      this.Frustrated_Intensity = value;
    }
  
    getBored(): number {
      return this.Bored;
    }
  
    setBored(value: number) {
      this.Bored = value;
    }
  
    getBored_Intensity(): number {
      return this.Bored_Intensity;
    }
  
    setBored_Intensity(value: number) {
      this.Bored_Intensity = value;
    }
  
    // constructor(NoteID: string, UserID: string, Timestamp: string, NoEmotion: number, ActionType: string, Joyful: number,
    // Joyful_Intensity: number,
    // Curious: number,
    // Curious_Intensity: number,
    // Surprised: number,
    // Surprised_Intensity: number,
    // Confused: number,
    // Confused_Intensity: number,
    // Anxious: number,
    // Anxious_Intensity: number,
    // Frustrated: number,
    // Frustrated_Intensity: number,
    // Bored: number,
    // Bored_Intensity: number) {
    //   this.NoteID = NoteID;
    //   this.UserID = UserID;
    //   this.Timestamp = Timestamp;
    //   this.NoEmotion = NoEmotion;
    //   this.ActionType = ActionType;
    //   this.Joyful =Joyful;
    //   this.Joyful_Intensity=Joyful_Intensity;
    //   this.Curious=Curious;
    //   this.Curious_Intensity=Curious_Intensity;
    //   this.Surprised=Surprised;
    //   this.Surprised_Intensity=Surprised_Intensity;
    //   this.Confused=Confused;
    //   this.Confused_Intensity=Confused_Intensity;
    //   this.Anxious=Anxious;
    //   this.Anxious_Intensity=Anxious_Intensity;
    //   this.Frustrated=Frustrated;
    //   this.Frustrated_Intensity=Frustrated_Intensity;
    //   this.Bored=Bored;
    //   this.Bored_Intensity=Bored_Intensity;
    // }
  }
  
  
  export interface EmoSurvey {
    id: number;
    UserID: string;
    Timestamp: string;
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
  
  export class EmoSurvey implements EmoSurvey{
    constructor(UserID: string,
                Timestamp: string,
                Joyful: number,
                Curious: number,
                Surprised: number,
                Confused: number,
                Anxious: number,
                Frustrated: number,
                Bored: number,
                Inconducive: string,
                Reason: string,
                Remarks: string) {
      this.UserID = UserID;
      this.Timestamp = Timestamp;
      this.Joyful = Joyful;
      this.Curious = Curious;
      this.Surprised = Surprised;
      this.Confused = Confused;
      this.Anxious = Anxious;
      this.Frustrated = Frustrated;
      this.Bored = Bored;
      this.Inconducive = Inconducive;
      this.Reason = Reason;
      this.Remarks = Remarks;
    }
  
  }
  
  export interface EmoReg {
    id: number;
    UserID: string;
    Timestamp: string;
    GroupMembers: string;
    Visualization: string;
    Challenges: string;
    ImprovementWays: string;
    PositivePlan: string;
    Action: string;
  }
  
  export class EmoReg implements EmoReg{
    constructor(UserID: string,
                Timestamp: string,
                GroupMembers: string,
                Visualization: string,
                Challenges: string,
                ImprovementWays: string,
                PositivePlan: string,
                Action: string) {
      this.UserID = UserID;
      this.Timestamp = Timestamp;
      this.GroupMembers = GroupMembers;
      this.Visualization = Visualization;
      this.Challenges = Challenges;
      this.ImprovementWays = ImprovementWays;
      this.PositivePlan = PositivePlan;
      this.Action = Action;
    }
  }
  
  export interface EmoLogData {
    UserID: string,
    Timestamp:string,
    InteractedElement:string,
    ActionType:string,
    Output:string,
    Title:string,
    Authors:string,
    Body:string,
    Scaffolds:string,
    Created:string,
    Views:string,
    Buildson:string,
    EditBy:string,
    ReadBy:string,
    LastEditedAt:string
  }
  
  export class EmoLogData implements EmoLogData{
    constructor(UserID: string,
                Timestamp:string,
                InteractedElement:string,
                ActionType:string,
                Output:string,
                Title:string,
                Authors:string,
                Body:string,
                Scaffolds:string,
                Created:string,
                Views:string,
                Buildson:string,
                EditBy:string,
                ReadBy:string,
                LastEditedAt:string) {
      this.Authors = Authors;
      this.Body = Body;
      this.Scaffolds = Scaffolds;
      this.Created = Created;
      this.Views = Views;
      this.Buildson = Buildson;
      this.EditBy = EditBy;
      this.ReadBy = ReadBy;
      this.UserID = UserID;
      this.Timestamp = Timestamp;
      this.InteractedElement = InteractedElement;
      this.ActionType = ActionType;
      this.Output = Output;
      this.Title = Title;
      this.LastEditedAt = LastEditedAt;
    }
  }
  