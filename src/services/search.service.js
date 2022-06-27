/* eslint-disable */
import Swal from 'sweetalert2';
import config from 'config';
import { errorCatcher } from './errors';
import httpService from './http.service';

const { apiVersion } = config;

const searchResult = (sendData) =>
  httpService
    .get(`/${apiVersion}/search/advanced`, '', sendData)
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err.response.data);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: err || err.message || 'Server Error',
      });
    });

const advancedSearch = (sendData) =>
  httpService
    .get(`/${apiVersion}/search/dashboard`, '', sendData)
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err.response.data);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: err || err.message || 'Server Error',
      });
    });

// const searchResult = (sendData) => axios
//   .get(`https://dev.currikistudio.org/api/api/v1/search/advanced`,{
//     headers:{
//       Authorization: `Bearer `

//     },
//     params:sendData
//   })
//   .then(({ data }) => data)
//   .catch((err) => err.response.data);

// const advancedSearch = (sendData) => axios
//   .get(`https://dev.currikistudio.org/api/api/v1/search/dashboard`,
//   {
//     headers:{
//       Authorization: `Bearer `
//     },
//     params:sendData
//   })
//   .then(({ data }) => data)
//   .catch((err) => err.response.data);

const cloneProject = (projectId, subOrgId) =>
  httpService
    .post(`/${apiVersion}/suborganization/${subOrgId}/projects/${projectId}/clone`)
    .then((res) => Swal.fire(res.data.message))
    .catch((err) => {
      if (err.response.data.errors) {
        Swal.fire(err.response.data.errors[0]);
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Something went wrong!',
        });
      }
    });

const clonePlaylist = (projectId, playlistId) =>
  httpService
    .post(`/${apiVersion}/projects/${projectId}/playlists/${playlistId}/clone`)
    .then((res) => Swal.fire(res.data.message))
    .catch((err) => {
      if (err.response.data.errors) {
        Swal.fire(err.response.data.errors[0]);
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Something went wrong!',
        });
      }
    });

const cloneActivity = (playlistId, ActivityId) =>
  httpService
    .post(`/${apiVersion}/playlists/${playlistId}/activities/${ActivityId}/clone`)
    .then((res) => Swal.fire(res.data.message))
    .catch((err) => {
      if (err.response.data.errors) {
        Swal.fire(err.response.data.errors[0]);
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Something went wrong!',
        });
      }
    });

const googleClassShare = (projectId, courseId, token, OrgId) =>
  httpService
    .post(`/${apiVersion}/google-classroom/projects/${projectId}/copy`, { course_id: courseId, access_token: token, publisher_org: OrgId })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const googleShareToken = (accessToken) =>
  httpService
    .post(`/${apiVersion}/google-classroom/access-token`, {
      access_token: accessToken,
    })
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const getCourses = () =>
  httpService
    .get(`/${apiVersion}/google-classroom/courses`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const getCourseTopics = (courseId) =>
  httpService
    .get(`/${apiVersion}/google-classroom/topics`, '', { course_id: courseId })
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const googleClassPublishPlaylist = (projectId, courseId, topicId, playlistId, token, OrgId) =>
  httpService
    .post(`/${apiVersion}/google-classroom/projects/${projectId}/playlists/${playlistId}/publish`, {
      course_id: courseId,
      topic_id: topicId,
      access_token: token,
      publisher_org: OrgId,
    })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const googleClassPublishActivity = (projectId, courseId, topicId, playlistId, activityId, token, OrgId) =>
  httpService
    .post(`/${apiVersion}/google-classroom/projects/${projectId}/playlists/${playlistId}/activities/${activityId}/publish`, {
      course_id: courseId,
      topic_id: topicId,
      access_token: token,
      publisher_org: OrgId,
    })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const googleClassPublishIndependentActivity = (courseId, topicId, activityId, token, OrgId) =>
  httpService
    .post(`/${apiVersion}/google-classroom/activities/${activityId}/publish`, {
      course_id: courseId,
      topic_id: topicId,
      access_token: token,
      publisher_org: OrgId,
    })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const searchIndependentActivities = (searchType, searchData) =>
  httpService
    .get(`/${apiVersion}/search/independent-activities?searchType=${searchType}`, '', { ...searchData })
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

export default {
  searchResult,
  cloneProject,
  clonePlaylist,
  cloneActivity,
  googleClassShare,
  googleShareToken,
  getCourses,
  advancedSearch,
  getCourseTopics,
  googleClassPublishPlaylist,
  googleClassPublishActivity,
  googleClassPublishIndependentActivity,
  searchIndependentActivities,
};
