import express from "express";
import {Test, EmoReadWrite, EmoReg, EmoSurvey, Emotion,EmoLogData} from "../model/model.js";
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

const proxyUrl = process.env.HTTPS_PROXY;
const proxyAgent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;
const APIrouter = express.Router();

if (!proxyUrl) {
  console.error('HTTPS_PROXY environment variable is not set. Please set it to your proxy URL.');
  process.exit(1);  // Exit if proxy is not configured
}
else {
  console.log(`Using proxy: ${proxyUrl}`);   
}

let cachedToken = null;
let tokenExpiry = null;

// Function to authenticate and get token from external API
async function getAuthToken() {
  // Check if we have a valid cached token
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('[AUTH] Using cached token');
    return cachedToken;
  }

  try {
    console.log('[AUTH] Fetching new token...');
    const authResponse = await axios.post('https://kf6.rdc.nie.edu.sg/auth/local', {
      userName: 'gaoxiazhu',
      password: 'Testemotionanalytics'
    }, {
      httpsAgent: proxyAgent,
      proxy: false
    });

    if (authResponse.data && authResponse.data.token) {
      cachedToken = authResponse.data.token;
      // Set expiry to 23 hours from now (assuming 24h token validity)
      tokenExpiry = Date.now() + (23 * 60 * 60 * 1000);
      console.log('[AUTH] Token obtained and cached');
      return cachedToken;
    } else {
      throw new Error('No token received from auth endpoint');
    }
  } catch (error) {
    console.error('[AUTH] Failed to get token:', error.message);
    throw error;
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

APIrouter.get("/user-info", async (req, res) => {
  const API_HOST = "https://kf6.rdc.nie.edu.sg/api/users/me";
  try {
    const token = await getAuthToken(); // dynamically fetch token
    
    const userData = await axios.get(API_HOST, {
      headers: { Authorization: `Bearer ${token}` },
      httpsAgent: proxyAgent, // 👈 critical for HTTPS requests via proxy
      proxy: false  // Disable axios proxy if using HttpsProxyAgent
    });

    res.status(200).json(userData.data);
  } catch (error) {
    console.error('User info fetch error:', error.message);
    res.status(500).json({ message: 'Error fetching user info', error: error.message });
  }
});

APIrouter.get('/community-data/community-id/:communityId?', async (req, res) => {
  const communityId = req.params.communityId;
  console.log(`[DEBUG] communityId received: ${req.params.communityId}`);
  const API_HOST = "https://kf6.rdc.nie.edu.sg/api/analytics/emotions/note-emotions/community-id";

  try {
    console.log(`[REQUEST] Fetching data for community ID: ${communityId}`);
    const token = await getAuthToken(); // dynamically fetch token
    
    const fullUrl = `${API_HOST}/${communityId}`;
    console.log('Fetching:', fullUrl);

    const dataResponse = await axios.get(fullUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      httpsAgent: proxyAgent, // 👈 critical for HTTPS requests via proxy
      proxy: false  // Disable axios proxy if using HttpsProxyAgent
    });

    console.log(`[SUCCESS] Data received: ${JSON.stringify(dataResponse.data).slice(0, 100)}...`);
    res.status(200).json(dataResponse.data);
  } catch (error) {
    console.error('Community data fetch error:', error.message);
    if (error.response) {
      console.error(`[ERROR] Status: ${error.response.status}`);
      console.error(`[ERROR] Response: ${JSON.stringify(error.response.data)}`);
    }
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