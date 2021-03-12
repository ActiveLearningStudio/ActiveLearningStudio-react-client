import axios from 'axios';
import config from 'config';

const {
  safeLearnAuthUrl,
  safeLearnCheckUrl,
  safeLearnApplicationName,
  safeLearnUnipath,
  safeLearnKey,
} = config;

const safeApiAuth = () => axios
  .post(safeLearnAuthUrl, null, {
    headers: {
      Authorization: `Bearer ${safeLearnKey}`,
    },
  })
  .then(({ data }) => data)
  .catch((err) => err.response.data);

const safeApiCheck = (token, imagData, actualText, time, info, activityName) => axios
  .post(safeLearnCheckUrl,
    {
      userName: info,
      workstationName: activityName,
      reportedAt: time,
      applicationName: safeLearnApplicationName,
      ipAddress: '0.0.0.0',
      unitPath: safeLearnUnipath,
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
