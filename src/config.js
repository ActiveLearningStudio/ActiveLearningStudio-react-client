/*eslint-disable*/
export default global.config = {
  h5pAjaxUrl: '/h5papi',
  h5pBaseUrl: '/',
  laravelAPIUrl: '/api',
  resourceUrl: window.__RUNTIME_CONFIG__?.REACT_APP_RESOURCE_URL,
  apiVersion: window.__RUNTIME_CONFIG__?.REACT_APP_API_VERSION,
  gapiClientId: window.__RUNTIME_CONFIG__?.REACT_APP_GAPI_CLIENT_ID,
  tsugiBaseUrl: window.__RUNTIME_CONFIG__?.REACT_APP_TSUGI_SERVER_URL,
  domainUrl: window.__RUNTIME_CONFIG__?.REACT_DOMAIN_URL,
  teamsTenantId: window.__RUNTIME_CONFIG__?.REACT_MS_TENANT_ID,
  teamsClientId: window.__RUNTIME_CONFIG__?.REACT_MS_CLIENT_ID,

  // Safelearn
  safeLearnAuthUrl: window.__RUNTIME_CONFIG__?.REACT_APP_SAFELEARN_AUTH,
  safeLearnCheckUrl: window.__RUNTIME_CONFIG__?.REACT_APP_SAFELEARN_CHECK,
  safeLearnApplicationName: window.__RUNTIME_CONFIG__?.REACT_APP_SAFELEARN_APPLICATIONNAME,
  safeLearnUnipath: window.__RUNTIME_CONFIG__?.REACT_APP_SAFELEARN_UNITPATH,
  safeLearnKey: window.__RUNTIME_CONFIG__?.REACT_APP_SAFELEARN_KEY,
};
