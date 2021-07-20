import axios from 'axios';
import config from 'config';
import httpService from './http.service';

const { apiVersion, tsugiBaseUrl } = config;

const browse = (params) => httpService
  .post(
    `/${apiVersion}/go/lms/projects`,
    { ...params },
  )
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const search = (params) => httpService
  .post(
    `/${apiVersion}/go/lms/projects`,
    { ...params },
  )
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getProject = (projectId) => httpService
  .get(`/${apiVersion}/go/lms/project/${projectId}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getH5pSettings = (activityId) => httpService
  .get(`/${apiVersion}/google-classroom/activities/${activityId}/h5p-resource-settings`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const tsugiGradePassback = (session, gpb, score) => axios({
  method: 'post',
  url: tsugiBaseUrl,
  params: { PHPSESSID: session, gpb, final_grade: score },
})
  .then((response) => response);

const getLtiSummary = (actor, activity) => httpService.post(
 `/${apiVersion}/outcome/summary`,
 { actor, activity },
)
.then(({ data }) => data)
.catch((error) => {
  if (error && error.response && error.response.data && error.response.data.errors) {
    return error.response.data;
  }

  console.log('Unexpected error in summary endpoint:');
  console.log(error);
  return null;
});

export default {
  browse,
  search,
  getProject,
  getH5pSettings,
  tsugiGradePassback,
  getLtiSummary,
};
