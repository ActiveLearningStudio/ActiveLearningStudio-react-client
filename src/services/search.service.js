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
const getCanvasCourses = (setting_id) =>
  httpService
    .get(`/${apiVersion}/go/canvas/fetch-all-courses?setting_id=${setting_id}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const getCanvasCourseAssignmentsTopic = (courseId, sid) =>
  httpService
    .get(`/${apiVersion}/go/canvas/${courseId}/fetch-assignment-groups?setting_id=${sid}`)
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

const canvasClassPublishActivity = (courseId, sid, playlistName, playlistId, activityId) =>
  httpService
    .post(`/${apiVersion}/go/canvas/${courseId}/create-assignment`, {
      setting_id: sid,
      assignment_name: playlistName,
      assignment_group_id: playlistId,
      curriki_activity_id: activityId,
    })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });
const canvasCreateNewAssignmentGroup = (courseId, sid, playlistName) =>
  httpService
    .post(`/${apiVersion}/go/canvas/${courseId}/create-assignment-group`, {
      setting_id: sid,
      assignment_group_name: playlistName,
    })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });
const canvasCreateNewCourse = (sid, playlistName) =>
  httpService
    .post(`/${apiVersion}/go/canvas/create-new-course`, {
      setting_id: sid,
      course_name: playlistName,
    })
    .then(({ data }) => data)
    .catch((err) => {
      Swal.fire({
        title: err.response.data.data,
        icon: 'error',
        text: err.response.data.response_message || err.response.data.data || 'Server Error',
      });
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

//publish playlist
const publishPlaylisttoCanvas = (projectId, playlistId, lms, settingId, cid, creationType) =>
  httpService
    .post(`/${apiVersion}/go/${lms}/projects/${projectId}/playlists/${playlistId}/publish`, {
      setting_id: settingId,
      creation_type: creationType,
      canvas_course_id: cid,
    })
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));
//pblish ms team
const getmsTeamclasses = () =>
  httpService
    .get(`/${apiVersion}/microsoft-team/classes`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));
const saveMicrosoftAccessToken = (tokenId) =>
  httpService
    .post(`/${apiVersion}/microsoft-team/save-access-token`, { access_token: tokenId })
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const createNewClasstoMicrosoftTeam = (playlistName) =>
  httpService
    .post(`/${apiVersion}/microsoft-team/classes`, {
      displayName: playlistName,
    })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });
const publishActivitytoMSteam = (publishTypeId, class_id, publishType) =>
  httpService
    .post(`/${apiVersion}/microsoft-team/${publishType}/${publishTypeId}/publish`, {
      classId: class_id,
    })
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
  getCanvasCourses,
  getCanvasCourseAssignmentsTopic,
  canvasClassPublishActivity,
  canvasCreateNewAssignmentGroup,
  publishPlaylisttoCanvas,
  canvasCreateNewCourse,
  getmsTeamclasses,
  createNewClasstoMicrosoftTeam,
  publishActivitytoMSteam,
  saveMicrosoftAccessToken,
};
