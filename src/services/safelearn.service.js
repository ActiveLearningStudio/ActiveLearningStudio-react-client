import axios from 'axios';

const safeApiAuth = (accountId, authKey) => axios
  .post(`https://api.v10.learnsafe.com/accounts/${accountId}/integrators/auth/token`, null, {
    headers: {
      Authorization: `Bearer ${authKey}`,
    },
  })
  .then(({ data }) => data)
  .catch((err) => err.response.data);

const safeApiCheck = (token, accountId, unitPath, orgName, imagData, actualText, time, info, activityName) => axios
  .post(`https://api.v10.learnsafe.com/accounts/${accountId}/integrators/content/check`,
    {
      userName: info,
      workstationName: activityName,
      reportedAt: time,
      applicationName: orgName,
      ipAddress: '0.0.0.0',
      unitPath,
      image: imagData,
      content: actualText,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  .then(({ data }) => data)
  .catch((err) => err.response.data);

export default {
  safeApiAuth,
  safeApiCheck,
};
