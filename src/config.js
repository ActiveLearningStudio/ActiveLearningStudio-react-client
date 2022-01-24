export default global.config = {
  h5pAjaxUrl: '/h5papi',
  h5pBaseUrl: '/',
  laravelAPIUrl: '/api',
  resourceUrl: process.env.REACT_APP_RESOURCE_URL,
  apiVersion: process.env.REACT_APP_API_VERSION,
  gapiClientId: process.env.REACT_APP_GAPI_CLIENT_ID,
  tsugiBaseUrl: process.env.REACT_APP_TSUGI_SERVER_URL,
  // Safelearn
  safeLearnAuthUrl: process.env.REACT_APP_SAFELEARN_AUTH,
  safeLearnCheckUrl: process.env.REACT_APP_SAFELEARN_CHECK,
  safeLearnApplicationName: process.env.REACT_APP_SAFELEARN_APPLICATIONNAME,
  safeLearnUnipath: process.env.REACT_APP_SAFELEARN_UNITPATH,
  safeLearnKey: process.env.REACT_APP_SAFELEARN_KEY,
};
