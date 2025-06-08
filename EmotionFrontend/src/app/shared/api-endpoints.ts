// import { ConfigService } from "./config.service";

export let API_ENDPOINTS = {
    communityData: '',
    form: '',
    findAllEmoReadWrite: '',
    findAllEmoSurvey: '',
    findAllEmoReg: '',
    addEmotion: '',
    addEmoReadWrite: '',
    addReg: '',
    addEmoSurvey: '',
    tests: '',
  };
  
  export function initializeApiEndpoints(): void {
    // const baseUrl = configService.get('baseUrl') || 'http://localhost'; // Default base URL
    const apiUrl = `/api`; // Default API URL
    const communityDataUrl = `${apiUrl}/community-data`;
    const formUrl = `/form`;

    if (!apiUrl || !communityDataUrl|| !formUrl) {
        console.error('config keys are missing');
      }

      API_ENDPOINTS = {
        form: formUrl,
        communityData: communityDataUrl,
        findAllEmoReadWrite: `${apiUrl}/findAllEmoReadWrite`,
        findAllEmoSurvey: `${apiUrl}/findAllEmoSurvey`,
        findAllEmoReg: `${apiUrl}/findAllEmoReg`,
        addEmotion: `${apiUrl}/addEmotion`,
        addEmoReadWrite: `${apiUrl}/addEmoReadWrite`,
        addReg: `${apiUrl}/addReg`,
        addEmoSurvey: `${apiUrl}/addEmoSurvey`,
        tests: `${apiUrl}/tests`,
      };
    
      console.log('API Endpoints initialized:', API_ENDPOINTS);
  }
  