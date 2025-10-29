export const environment = {
  production: false,
  apiUrl: 'http://localhost/api',
  // Local development settings
  localDev: {
    // Set to true to use local token instead of redirect flow
    useLocalToken: true,
    // Static community ID for local development
    communityId: '6645ab836782b352b64ea86c',
    // Pre-configured token (will be set by local setup)
    localToken: null,
  },
};
