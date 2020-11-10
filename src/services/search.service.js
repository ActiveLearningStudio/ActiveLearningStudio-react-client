import Swal from 'sweetalert2';
// import axios from 'axios';
import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const searchResult = (sendData) => httpService
  .get(`/${apiVersion}/search/advanced`, '', sendData)
  .then(({ data }) => data)
  .catch((err) => err.response.data);

const advancedSearch = (sendData) => httpService
  .get(`/${apiVersion}/search/dashboard`, '', sendData)
  .then(({ data }) => data)
  .catch((err) => err.response.data);

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

const cloneProject = (projectId) => httpService
  .post(`/${apiVersion}/projects/${projectId}/clone`)
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

const clonePlaylist = (projectId, playlistId) => httpService
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

const cloneActivity = (playlistId, ActivityId) => httpService
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

const googleClassShare = (projectId, courseId) => httpService
  .post(`/${apiVersion}/google-classroom/projects/${projectId}/copy`, { course_id: courseId })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const googleShareToken = (accessToken) => httpService
  .post(`/${apiVersion}/google-classroom/access-token`, {
    access_token: accessToken,
  })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getCourses = () => httpService
  .get(`/${apiVersion}/google-classroom/courses`)
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
};
