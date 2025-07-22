import express from "express";
import {Test, EmoReadWrite, EmoReg, EmoSurvey, Emotion,EmoLogData} from "../model/model.js";
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Re-enable proxy for testing
const proxyUrl = process.env.HTTPS_PROXY;
const proxyAgent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;
const APIrouter = express.Router();

console.log('[DEBUG] Environment variables:');
console.log('RDC_USERNAME:', process.env.RDC_USERNAME);
console.log('RDC_PASSWORD:', process.env.RDC_PASSWORD ? '***' : 'undefined');
console.log('HTTPS_PROXY:', process.env.HTTPS_PROXY);

if (proxyUrl) {
  console.log(`[PROXY] Using proxy: ${proxyUrl}`);
} else {
  console.log('[PROXY] No HTTPS_PROXY configured. Requests will be sent directly.');
}

let cachedToken = null;
let tokenExpiry = null;

// Function to authenticate and get token from external API
async function getAuthToken(forceRefresh = false) {
  // Check if we should disable token cache via env var
  const disableCache = process.env.DISABLE_TOKEN_CACHE === 'true';
  if (!forceRefresh && !disableCache && cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('[AUTH] Using cached token');
    return cachedToken;
  }

  try {
    console.log('[AUTH] Fetching new token...');
    console.log(`[AUTH] Using proxy: ${proxyUrl || 'none'}`);
    
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'EmotionAnalysis-Backend/1.0'
      },
      timeout: 30000, // 30 second timeout
      proxy: false // Disable axios built-in proxy handling
    };
    
    // Add proxy agent if configured
    if (proxyAgent) {
      axiosConfig.httpsAgent = proxyAgent;
      console.log('[AUTH] Using HTTPS proxy agent for authentication');
    }
    
    const authResponse = await axios.post('https://kf6.rdc.nie.edu.sg/auth/local', {
      userName: process.env.RDC_USERNAME,
      password: process.env.RDC_PASSWORD
    }, axiosConfig);

    console.log('[AUTH] Auth response status:', authResponse.status);
    console.log('[AUTH] Auth response data keys:', Object.keys(authResponse.data || {}));
    
    if (authResponse.data && authResponse.data.token) {
      cachedToken = authResponse.data.token;
      // Set expiry to 23 hours from now (assuming 24h token validity)
      tokenExpiry = Date.now() + (23 * 60 * 60 * 1000);
      console.log('[AUTH] Token obtained and cached:', cachedToken.substring(0, 50) + '...');
      return cachedToken;
    } else {
      console.error('[AUTH] Unexpected response structure:', authResponse.data);
      throw new Error('No token received from auth endpoint');
    }
  } catch (error) {
    console.error('[AUTH] Failed to get token:', error.message);
    if (error.response) {
      console.error(`[AUTH] Auth failed with status: ${error.response.status}`);
      console.error(`[AUTH] Auth error data:`, error.response.data);
    } else if (error.request) {
      console.error(`[AUTH] No response from auth server - possible network/proxy issue`);
      console.error(`[AUTH] Error code:`, error.code);
    }
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
    
    const axiosConfig = {
      headers: { Authorization: `Bearer ${token}` },
      proxy: false
    };
    if (proxyAgent) {
      axiosConfig.httpsAgent = proxyAgent;
    }
    const userData = await axios.get(API_HOST, axiosConfig);

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
    console.log(`[DEBUG] Environment check - RDC_USERNAME: ${process.env.RDC_USERNAME ? 'SET' : 'NOT SET'}`);
    console.log(`[DEBUG] Environment check - RDC_PASSWORD: ${process.env.RDC_PASSWORD ? 'SET' : 'NOT SET'}`);
    console.log(`[DEBUG] Proxy configuration: ${proxyUrl || 'No proxy configured'}`);
    
    const token = await getAuthToken(true); // force fresh token for debugging
    console.log(`[DEBUG] Using token: ${token ? token.substring(0, 20) + '...' : 'null'}`);
    
    const fullUrl = `${API_HOST}/${communityId}`;
    console.log('[DEBUG] Full URL:', fullUrl);

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'EmotionAnalysis-Backend/1.0',
        'Accept': 'application/json'
      },
      timeout: 30000, // 30 second timeout
      proxy: false // Disable axios built-in proxy handling
    };
    
    // Add proxy agent if configured
    if (proxyAgent) {
      axiosConfig.httpsAgent = proxyAgent;
      console.log('[DEBUG] Using HTTPS proxy agent');
    } else {
      console.log('[DEBUG] No proxy agent configured');
    }
    
    console.log('[DEBUG] Request config:', {
      ...axiosConfig,
      headers: axiosConfig.headers
    });
    
    const dataResponse = await axios.get(fullUrl, axiosConfig);

    console.log(`[SUCCESS] Data received: ${JSON.stringify(dataResponse.data).slice(0, 100)}...`);
    res.status(200).json(dataResponse.data);
  } catch (error) {
    console.error('[ERROR] Community data fetch error:', error.message);
    
    if (error.response) {
      console.error(`[ERROR] HTTP Status: ${error.response.status}`);
      console.error(`[ERROR] Status Text: ${error.response.statusText}`);
      console.error(`[ERROR] Response Headers:`, error.response.headers);
      console.error(`[ERROR] Response Data:`, JSON.stringify(error.response.data, null, 2));
      
      // Return the actual HTTP status and error details
      res.status(error.response.status || 500).json({ 
        message: 'Error fetching community data from external API', 
        error: error.message,
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
    } else if (error.request) {
      console.error(`[ERROR] No response received - Network/Proxy issue:`, error.code || error.message);
      console.error(`[ERROR] Request details:`, error.config?.url);
      res.status(502).json({ 
        message: 'Network error - unable to reach external API', 
        error: error.message,
        code: error.code,
        proxyConfigured: !!proxyUrl
      });
    } else {
      console.error(`[ERROR] Request setup error:`, error.message);
      res.status(500).json({ 
        message: 'Internal server error', 
        error: error.message 
      });
    }
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
