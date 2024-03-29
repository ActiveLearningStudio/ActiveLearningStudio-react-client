/* eslint-disable */
import axios from 'axios';
import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const login = (lms, params) =>
  httpService
    .post(`/${apiVersion}/go/${lms}/login`, params)
    .then(({ data }) => data)
    .catch((err) => err.response.data);

const loadH5PSettings = (activityId, studentId = null) =>
  httpService
    .get(`/${apiVersion}/google-classroom/activities/${activityId}/h5p-resource-settings`, {}, { gcuid: studentId })
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const loadSafariMontagePublishTool = (projectId, playlistId, activityId, lmsSettingId) =>
  httpService
    .post(`/${apiVersion}/go/safarimontage/projects/${projectId}/playlists/${playlistId}/activities/${activityId}/publish`, { setting_id: lmsSettingId, count: 1 })
    .then(({ data }) => data)
    .catch((err) => err.response.data);

const getMsTeamsClassMembers = (classId, token) =>
  axios
    .get(`https://graph.microsoft.com/v1.0/education/classes/${classId}/members`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data);

const getMsTeamsClassTeachers = (classId, token) =>
  axios
    .get(`https://graph.microsoft.com/v1.0/education/classes/${classId}/teachers`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data);

export default {
  login,
  loadH5PSettings,
  loadSafariMontagePublishTool,
  getMsTeamsClassMembers,
  getMsTeamsClassTeachers,
};
