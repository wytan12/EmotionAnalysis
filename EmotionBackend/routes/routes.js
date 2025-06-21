import express from "express";
import {Test, EmoReadWrite, EmoReg, EmoSurvey, Emotion,EmoLogData} from "../model/model.js";
import axios from 'axios';

const APIrouter = express.Router();

let cachedToken = null;
let tokenExpiry = null;

async function getAuthToken() {
  const now = Date.now();

  // Return cached token if still valid (e.g., expires in 1 hour)
  if (cachedToken && tokenExpiry && now < tokenExpiry) {
    return cachedToken;
  }

  try {
    const response = await axios.post('https://kf6.rdc.nie.edu.sg/auth/local', {
      userName: 'gaoxiazhu',
      password: 'Testemotionanalytics',
    });

    cachedToken = response.data.token;
    tokenExpiry = now + 55 * 60 * 1000; // cache for 55 minutes
    return cachedToken;
  } catch (error) {
    console.error('Error fetching auth token:', error.message);
    throw new Error('Authentication failed');
  }
}

APIrouter.get("/newtest", (req, res) => {
  const newTest = new Test({
    testID: "liang"+Date.now(),
  });
  newTest
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

APIrouter.get("/emolog", (req, res) => {
  EmoLogData.find()
    .then((found) => {
      res.send(found);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

APIrouter.get("/tests", (req, res) => {
  Test.find()
    .then((found) => {
      res.send(found);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

APIrouter.get('/community-data/community-id/:communityId?', async (req, res) => {
  const communityId = req.params.communityId || "6645ab836782b352b64ea86c";
  const API_HOST = "https://kf6.rdc.nie.edu.sg/api/analytics/emotions/note-emotions/community-id";

  try {
    const token = await getAuthToken(); // dynamically fetch token

    const dataResponse = await axios.get(`${API_HOST}/${communityId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.status(200).json(dataResponse.data);
  } catch (error) {
    console.error('Community data fetch error:', error.message);
    res.status(500).json({ message: 'Error fetching community data', error: error.message });
  }
});

//Post Method

APIrouter.post("/addEmotion", (req, res) => {
  console.log(req.body);
  console.log("456");
  const newEmotion = new Emotion({
    id: req.body.id,
    name: req.body.name,
  });
  newEmotion
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});
APIrouter.post("/addEmoReadWrite", (req, res) => {
  console.log(req.body);
  console.log(req.body.NoteTitle);
  console.log("789");
  const newEmoReadWrite = new EmoReadWrite({
    UserID: req.body.UserID,
    NoteID: req.body.NoteID,
    NoteTitle: req.body.NoteTitle,
    Timestamp:req.body.Timestamp,
    ActionType:req.body.ActionType,
    Joyful:req.body.Joyful,
    Curious:req.body.Curious,
    Surprised:req.body.Surprised,
    Confused:req.body.Confused,
    Anxious:req.body.Anxious,
    Frustrated:req.body.Frustrated,
    Bored:req.body.Bored,
    NoEmotion:req.body.NoEmotion,
    Joyful_Intensity:req.body.Joyful_Intensity,
    Curious_Intensity:req.body.Curious_Intensity,
    Surprised_Intensity:req.body.Surprised_Intensity,
    Confused_Intensity:req.body.Confused_Intensity,
    Anxious_Intensity:req.body.Anxious_Intensity,
    Frustrated_Intensity:req.body.Frustrated_Intensity,
    Bored_Intensity:req.body.Bored_Intensity
  });
  newEmoReadWrite
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});
APIrouter.post("/addReg", (req, res) => {
  console.log(req.body);
  console.log("1112");
  const newReg = new EmoReg({
    UserID: req.body.UserID,
    Timestamp: req.body.Timestamp,
    ReflectionTitle: req.body.ReflectionTitle,
    GroupMembers: req.body.GroupMembers,
    Visualization: req.body.Visualization,
    Challenges: req.body.Challenges,
    ImprovementWays: req.body.ImprovementWays,
    PositivePlan: req.body.PositivePlan,
    Action: req.body.Action,
  });
  newReg
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});
APIrouter.post("/addEmoSurvey", (req, res) => {
  const newEmoSurvey = new EmoSurvey({
    Timestamp:req.body.Timestamp,
    Joyful:req.body.Joyful,
    Curious:req.body.Curious,
    Surprised:req.body.Surprised,
    Confused:req.body.Confused,
    Anxious:req.body.Anxious,
    Frustrated:req.body.Frustrated,
    Bored:req.body.Bored,
    Inconducive:req.body.Inconducive,
    Reason:req.body.Reason,
    Remarks:req.body.Remarks,
  });
  newEmoSurvey
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});


//
// //Get all Method
APIrouter.get("/findAllEmoReadWrite", (req, res) => {
  console.log("123");
  EmoReadWrite.find()
    .then((found) => {
      res.send(found);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

APIrouter.get("/findAllEmoReg", (req, res) => {
  console.log("findAllEmoReg");
  EmoReg.find()
    .then((found) => {
      res.send(found);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

APIrouter.get("/findAllEmoSurvey", (req, res) => {
  console.log("findAllEmoSurvey");
  EmoSurvey.find()
    .then((found) => {
      res.send(found);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

export { APIrouter };
