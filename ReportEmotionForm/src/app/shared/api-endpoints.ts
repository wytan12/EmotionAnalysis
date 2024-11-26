import { ConfigService } from "./config.service";

export let API_ENDPOINTS = {
    base: '',
    communityData: '',
    findAllEmoReadWrite: '',
    findAllEmoSurvey: '',
    findAllEmoReg: '',
    addEmotion: '',
    addEmoReadWrite: '',
    addReg: '',
    addEmoSurvey: '',
    tests: '',
  };
  
  export function initializeApiEndpoints(configService: ConfigService): void {
    const baseUrl = configService.get('baseUrl') || 'http://localhost'; // Default base URL
    const apiUrl = configService.get('apiUrl') || `${baseUrl}/api`; // Default API URL
    const communityDataUrl = configService.get('communityDataUrl') || `${apiUrl}/community-data`;

    if (!baseUrl || !apiUrl || !communityDataUrl) {
        console.error('config keys are missing');
      }

      API_ENDPOINTS = {
        base: baseUrl,
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
  