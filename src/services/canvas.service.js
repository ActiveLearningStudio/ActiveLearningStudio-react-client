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
    `/${apiVersion}/go/lms/activities`,
    { ...params },
  )
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

export default {
  browse,
  search,
  getH5pSettings,
  tsugiGradePassback,
};
