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
console.log('API_HOST:', process.env.API_HOST);

if (proxyUrl) {
  console.log(`[PROXY] Using proxy: ${proxyUrl}`);
} else {
  console.log('[PROXY] No HTTPS_PROXY configured. Requests will be sent directly.');
}

// Store user sessions with tokens
const userSessions = new Map(); // In production, use Redis or database
let cachedToken = null;
let tokenExpiry = null;

// Authenticate with KF6 using RDC credentials
async function authenticateWithKF6() {
  const username = process.env.RDC_USERNAME;
  const password = process.env.RDC_PASSWORD;
  
  if (!username || !password) {
    throw new Error('RDC_USERNAME and RDC_PASSWORD must be set in environment variables');
  }
  
  try {
    console.log('[AUTH] Authenticating with KF6 using RDC credentials...');
    
    const axiosConfig = {
      headers: { 'Content-Type': 'application/json' },
      proxy: false
    };
    
    if (proxyAgent) {
      axiosConfig.httpsAgent = proxyAgent;
    }
    
    const authResponse = await axios.post('https://kf6.rdc.nie.edu.sg/auth/local', {
      identifier: username,
      password: password
    }, axiosConfig);
    
    if (authResponse.data && authResponse.data.jwt) {
      console.log('[AUTH] Successfully authenticated with KF6');
      cachedToken = authResponse.data.jwt;
      tokenExpiry = Date.now() + (18 * 60 * 60 * 1000); // 18 hours
      return authResponse.data.jwt;
    } else {
      throw new Error('No JWT token received from KF6');
    }
  } catch (error) {
    console.error('[AUTH] Failed to authenticate with KF6:', error.message);
    throw error;
  }
}

// Get valid token (cached or new)
async function getValidToken() {
  // Check if we have a cached token that's still valid
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('[AUTH] Using cached token');
    return cachedToken;
  }
  
  // Token expired or doesn't exist, get a new one
  console.log('[AUTH] Token expired or missing, getting new token...');
  return await authenticateWithKF6();
}

// Extract token from request (query param, header, or session) or use RDC auth
async function getTokenFromRequest(req) {
  // First check query parameters (for KF redirects - still support this)
  if (req.query.access_token) {
    console.log('[AUTH] Token found in query parameters');
    return req.query.access_token;
  }
  
  // Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    console.log('[AUTH] Token found in Authorization header');
    return authHeader.substring(7);
  }
  
  // Check session if available
  if (req.session && req.session.access_token) {
    console.log('[AUTH] Token found in session');
    return req.session.access_token;
  }
  
  // If no token found in request, use RDC credentials to get one
  console.log('[AUTH] No token in request, using RDC credentials');
  return await getValidToken();
}

// Store token in session for future requests
function storeTokenInSession(req, token, communityId) {
  if (!req.session) {
    console.warn('[SESSION] Session not available, cannot store token');
    return;
  }
  
  req.session.access_token = token;
  req.session.community_id = communityId;
  req.session.token_stored_at = Date.now();
  console.log('[SESSION] Token and community ID stored in session');
}

// Handle KF redirect with token - this should be the landing page endpoint
APIrouter.get("/auth/kf-redirect", (req, res) => {
  const { access_token, community_id } = req.query;
  
  if (!access_token) {
    console.error('[KF_REDIRECT] No access token in redirect URL');
    return res.status(400).json({ 
      message: 'Access token required',
      error: 'No access_token found in URL parameters'
    });
  }
  
  // Store token and community ID in session
  storeTokenInSession(req, access_token, community_id);
  
  console.log(`[KF_REDIRECT] Successfully stored token and community ID: ${community_id || 'not provided'}`);
  
  // Redirect to Angular frontend with token in URL so frontend can also store it
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost';
  const redirectPath = community_id ? 
    `/redirect/${community_id}?access_token=${access_token}` : 
    `/redirect?access_token=${access_token}`;
    
  res.redirect(`${frontendUrl}${redirectPath}`);
});

// Initialize session from frontend token
APIrouter.post("/auth/initialize-session", (req, res) => {
  const { access_token } = req.body;
  
  if (!access_token) {
    console.error('[INIT_SESSION] No access token provided');
    return res.status(400).json({ 
      message: 'Access token required',
      error: 'No access_token found in request body'
    });
  }
  
  // Store token in session
  storeTokenInSession(req, access_token, null);
  
  console.log('[INIT_SESSION] Session initialized with frontend token');
  
  res.status(200).json({ 
    message: 'Session initialized successfully',
    sessionId: req.sessionID
  });
});

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

// Test endpoint to verify RDC authentication works
APIrouter.get("/test-auth", async (req, res) => {
  try {
    console.log('[TEST-AUTH] Testing RDC authentication...');
    const token = await getValidToken();
    
    res.status(200).json({
      message: 'Authentication successful',
      tokenPreview: token.substring(0, 20) + '...',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[TEST-AUTH] Authentication failed:', error.message);
    res.status(401).json({
      message: 'Authentication failed',
      error: error.message
    });
  }
});

APIrouter.get("/user-info", async (req, res) => {
  // Use base API host and construct user endpoint
  const baseApiHost = process.env.API_HOST || "https://kf6.rdc.nie.edu.sg/api/analytics/emotions/note-emotions/community-id";
  const userApiHost = baseApiHost.replace('/analytics/emotions/note-emotions/community-id', '/users/me');
  
  try {
    // Extract token from request or authenticate with RDC credentials
    const token = await getTokenFromRequest(req);
    
    if (!token) {
      console.error('[AUTH] Failed to get token for user-info request');
      return res.status(401).json({ 
        message: 'Authentication failed', 
        error: 'Could not obtain access token'
      });
    }
    
    console.log(`[DEBUG] Using token for user-info: ${token.substring(0, 20)}...`);
    console.log(`[DEBUG] User API endpoint: ${userApiHost}`);
    
    const axiosConfig = {
      headers: { Authorization: `Bearer ${token}` },
      proxy: false
    };
    if (proxyAgent) {
      axiosConfig.httpsAgent = proxyAgent;
    }
    const userData = await axios.get(userApiHost, axiosConfig);

    res.status(200).json(userData.data);
  } catch (error) {
    console.error('User info fetch error:', error.message);
    if (error.response && error.response.status === 401) {
      res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching user info', error: error.message });
    }
  }
});

APIrouter.get('/community-data/community-id/:communityId?', async (req, res) => {
  const communityId = req.params.communityId || req.query.community_id;
  console.log(`[DEBUG] communityId received: ${communityId}`);
  const API_HOST = process.env.API_HOST || "https://kf6.rdc.nie.edu.sg/api/analytics/emotions/note-emotions/community-id";
  console.log(`[DEBUG] Using API_HOST from environment: ${API_HOST}`);

  try {
    console.log(`[REQUEST] Fetching data for community ID: ${communityId}`);
    
    // Extract token from request or authenticate with RDC credentials
    const token = await getTokenFromRequest(req);
    
    if (!token) {
      console.error('[AUTH] Failed to get token for community data request');
      return res.status(401).json({ 
        message: 'Authentication failed', 
        error: 'Could not obtain access token'
      });
    }
    
    console.log(`[DEBUG] Using token: ${token.substring(0, 20)}...`);
    
    // Store token and community ID in session for future requests
    if (req.query.access_token && communityId) {
      storeTokenInSession(req, token, communityId);
      console.log('[AUTH] Initial authentication detected - stored token in session');
    }
    
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
      headers: {
        ...axiosConfig.headers,
        Authorization: `Bearer ${token.substring(0, 20)}...`
      }
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
    communityID: req.body.communityID,
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
    communityID: req.body.communityID,
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

// Community-specific endpoints
APIrouter.get("/findAllEmoSurvey/:communityId", (req, res) => {
  const communityId = req.params.communityId;
  console.log("findAllEmoSurvey for community:", communityId);
  EmoSurvey.find({ communityID: communityId })
    .then((found) => {
      res.send(found);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

APIrouter.get("/findAllEmoReadWrite/:communityId", (req, res) => {
  const communityId = req.params.communityId;
  console.log("findAllEmoReadWrite for community:", communityId);
  EmoReadWrite.find({ communityID: communityId })
    .then((found) => {
      res.send(found);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

APIrouter.get("/findAllEmoReg/:communityId", (req, res) => {
  const communityId = req.params.communityId;
  console.log("findAllEmoReg for community:", communityId);
  EmoReg.find({ communityID: communityId })
    .then((found) => {
      res.send(found);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

export { APIrouter };
