/*eslint-disable*/
export default global.config = {
  h5pAjaxUrl: '/h5papi',
  h5pBaseUrl: '/',
  laravelAPIUrl: '/api',
  resourceUrl: window.__RUNTIME_CONFIG__?.REACT_APP_RESOURCE_URL || process.env.REACT_APP_RESOURCE_URL,
  apiVersion: window.__RUNTIME_CONFIG__?.REACT_APP_API_VERSION || process.env.REACT_APP_API_VERSION,
  gapiClientId: window.__RUNTIME_CONFIG__?.REACT_APP_GAPI_CLIENT_ID || process.env.REACT_APP_GAPI_CLIENT_ID,
  tsugiBaseUrl: window.__RUNTIME_CONFIG__?.REACT_APP_TSUGI_SERVER_URL || process.env.REACT_APP_TSUGI_SERVER_URL,
  // Safelearn
  safeLearnAuthUrl: window.__RUNTIME_CONFIG__?.REACT_APP_SAFELEARN_AUTH || process.env.REACT_APP_SAFELEARN_AUTH,
  safeLearnCheckUrl: window.__RUNTIME_CONFIG__?.REACT_APP_SAFELEARN_CHECK || process.env.REACT_APP_SAFELEARN_CHECK,
  safeLearnApplicationName: window.__RUNTIME_CONFIG__?.REACT_APP_SAFELEARN_APPLICATIONNAME || process.env.REACT_APP_SAFELEARN_APPLICATIONNAME,
  safeLearnUnipath: window.__RUNTIME_CONFIG__?.REACT_APP_SAFELEARN_UNITPATH || process.env.REACT_APP_SAFELEARN_UNITPATH,
  safeLearnKey: window.__RUNTIME_CONFIG__?.REACT_APP_SAFELEARN_KEY || process.env.REACT_APP_SAFELEARN_KEY,
};
