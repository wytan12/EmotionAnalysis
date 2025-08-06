import mongoose, { Schema } from "mongoose";
const TestingReadWriteSchema = new mongoose.Schema({
  _id: String,
  ratings: [
    {
      emotionId: String,
      intensity: Number,
    }
  ],
  authors: [
    {
      type: String
    }
  ],
  actionType: {
    type: String,
    default: 'Reading'
  },
  communityId: String,
  created: Date,
  inViews: [
    {
      _id: String,
      title: String
    }
  ],
  note: {
    _id: String,
    title: String,
    authors: [
      {
        type: String
      }
    ],
    data: {
      body: String,
      languages: {
        type: String,
        default: null
      },
      isAssignedReading: {
        type: Boolean,
        default: false
      }
    },
    created: Date
  },
});

const EmoReadWriteSchema = new mongoose.Schema({
  UserID: String,
  NoteID: String,
  NoteTitle: String,
  NoteContent: String,
  Views: String,
  ActionType: {               
    type: String,
    default: 'Reading'
  },
  Timestamp: Number,
  NoEmotion:{
    type: Number,
    default: 1
  },
  Joyful:{
    type: Number,
    default: 0
  },
  Curious:{
    type: Number,
    default: 0
  },
  Surprised:{
    type: Number,
    default: 0
  },
  Confused:{
    type: Number,
    default: 0
  },
  Anxious:{
    type: Number,
    default: 0
  },
  Frustrated:{
    type: Number,
    default: 0
  },
  Bored:{
    type: Number,
    default: 0
  },
  Joyful_Intensity:{
    type: Number,
    default: 0
  },
  Curious_Intensity:{
    type: Number,
    default: 0
  },
  Surprised_Intensity:{
    type: Number,
    default: 0
  },
  Confused_Intensity:{
    type: Number,
    default: 0
  },
  Anxious_Intensity:{
    type: Number,
    default: 0
  },
  Frustrated_Intensity:{
    type: Number,
    default: 0
  },
  Bored_Intensity:{
    type: Number,
    default: 0
  }
});

const EmoSurveySchema = new mongoose.Schema({
  UserID:String,
  Timestamp: Number,
  Joyful:{
    type: Number,
    default: 0
  },
  Curious:{
    type: Number,
    default: 0
  },
  Surprised:{
    type: Number,
    default: 0
  },
  Confused:{
    type: Number,
    default: 0
  },
  Anxious:{
    type: Number,
    default: 0
  },
  Frustrated:{
    type: Number,
    default: 0
  },
  Bored:{
    type: Number,
    default: 0
  },
  Inconducive: {
    type: [String],
    default: []
  },
  Reason: String,
  Remarks: String,
  communityID: String,
});

const EmoRegSchema = new mongoose.Schema({
  UserID: String,
  ReflectionTitle: String,
  GroupMembers:String,
  Timestamp:Number,
  Visualization:String,
  Challenges:String,
  ImprovementWays:String,
  PositivePlan:String,
  Action:String,
  communityID: String,
});

const EmoLogDataSchema = new mongoose.Schema({
  UserID: String,
  Timestamp:String,
  InteractedElement:String,
  ActionType:String,
  Output:String,
  Title:String,
  Authors:String,
  Body:String,
  Scaffolds:String,
  Created:String,
  Views:String,
  Buildson:String,
  EditBy:String,
  ReadBy:String,
  LastEditedAt:String
});


const TestSchema = new mongoose.Schema({
  testID: String,
});

const EmotionSchema = new mongoose.Schema({
  id: String,
  name:String
});


const TestReadWrite = mongoose.model('TestReadWrite', TestingReadWriteSchema, 'TestReadWrite');
const EmoReadWrite = mongoose.model('EmoReadWrite', EmoReadWriteSchema, 'EmoReadWrite');
const EmoSurvey = mongoose.model('EmoSurvey', EmoSurveySchema, 'EmoSurvey');
const EmoReg = mongoose.model('EmoReg', EmoRegSchema, 'EmoReg');
const Test = mongoose.model('Test', TestSchema, 'Test');
const EmoLogData = mongoose.model('EmoLogData', EmoLogDataSchema, 'EmoLogData');
const Emotion = mongoose.model('Emotion', EmotionSchema, 'Emotion');

export { TestReadWrite,EmoReadWrite,EmoSurvey,EmoReg ,Test,Emotion,EmoLogData};