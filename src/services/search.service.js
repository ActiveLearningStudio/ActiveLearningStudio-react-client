/*eslint-disable */
import Swal from 'sweetalert2';
import axios from 'axios';
import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

// const searchResult = (sendData) => httpService
//   .get(`/${apiVersion}/search/advanced`, '', sendData)
//   .then(({ data }) => data)
//   .catch((err) => err.response.data);

// const advancedSearch = (sendData) => httpService
//   .get(`/${apiVersion}/search/dashboard`, '', sendData)
//   .then(({ data }) => data)
//   .catch((err) => err.response.data);

const searchResult = (sendData) => axios
  .get(`https://dev.currikistudio.org/api/api/v1/search/advanced`,{
    headers:{
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyNSIsImp0aSI6ImU5NDE4YmJhNzg2NjdmOTA1MDNjMDU4MWUwNjkyODVjY2FmMGMzNGJlNzNlMWIyZTJhZTdkYzY1MmVhMDAxZDA1MTIyM2EwZTZjMTE4Zjk1IiwiaWF0IjoxNjA2ODIyNzMyLCJuYmYiOjE2MDY4MjI3MzIsImV4cCI6MTYzODM1ODczMiwic3ViIjoiNzI2Iiwic2NvcGVzIjpbXX0.YSRDQTcVY7Lvd8LWpDmTPvf0mezfWc1R5SXH9la49W0TulZqQrCUumhNDAsdM4CL7mJVcG5K1dowX7jaAEK5SOw1jlXpPn6pSwe7XPlv6Q1HN9ZmjMS5s3UnRKfht8etqUdUcpmykM7DwwRDyPzhySpwGxY8xxvn1PHKFmRg5SLKfBKTxwoXimCv9yYypbkyPl34oeBTe5qrRtSPbn5Zc9Qc9nchsrKdMvf6-F2FWtjTvaeqGq-W4eJt-4JGgJ4RodfDyzt0366HORvAkihAuTD2fo_DoROnwIbNooZTV9VfO5VzTwK8vn8czBDwIMSaIZaM1ggZ7yz4dHIsKi52z847Y-kQ2yDbiw6p4ExghtIVlArs56eR8ssXyawSG9qrII9SagVFcJEtDVEKw-qTGiAXVrZ4CWj0KNQ9FuH-VXfs07TU7AWJ4hromz8xtOFRFq0XVo1PT4fx3yOvhbt7TbyynVby77uwTOo6vhRJ07QAvh7lQO-uEwY3m6BkKKLATAid3971ZGvOh5aBxMSo_dLtE7wUNttr_CGq1zAGV3yCALyMOx6SSxPQsO2q-Gwh0KoYdeuIn9sVKKsnExdl4luuemhDF7qjvK7afARub9Hc0EzeKOPSUZ9GjVuC88lZVOce2gmnb_mDV5hBKFc6vIbWoI075SPOuZMAJ6H-QWw
      `
    },
    params:sendData
  })
  .then(({ data }) => data)
  .catch((err) => err.response.data);

const advancedSearch = (sendData) => axios
  .get(`https://dev.currikistudio.org/api/api/v1/search/dashboard`,
  {
    headers:{
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyNSIsImp0aSI6ImU5NDE4YmJhNzg2NjdmOTA1MDNjMDU4MWUwNjkyODVjY2FmMGMzNGJlNzNlMWIyZTJhZTdkYzY1MmVhMDAxZDA1MTIyM2EwZTZjMTE4Zjk1IiwiaWF0IjoxNjA2ODIyNzMyLCJuYmYiOjE2MDY4MjI3MzIsImV4cCI6MTYzODM1ODczMiwic3ViIjoiNzI2Iiwic2NvcGVzIjpbXX0.YSRDQTcVY7Lvd8LWpDmTPvf0mezfWc1R5SXH9la49W0TulZqQrCUumhNDAsdM4CL7mJVcG5K1dowX7jaAEK5SOw1jlXpPn6pSwe7XPlv6Q1HN9ZmjMS5s3UnRKfht8etqUdUcpmykM7DwwRDyPzhySpwGxY8xxvn1PHKFmRg5SLKfBKTxwoXimCv9yYypbkyPl34oeBTe5qrRtSPbn5Zc9Qc9nchsrKdMvf6-F2FWtjTvaeqGq-W4eJt-4JGgJ4RodfDyzt0366HORvAkihAuTD2fo_DoROnwIbNooZTV9VfO5VzTwK8vn8czBDwIMSaIZaM1ggZ7yz4dHIsKi52z847Y-kQ2yDbiw6p4ExghtIVlArs56eR8ssXyawSG9qrII9SagVFcJEtDVEKw-qTGiAXVrZ4CWj0KNQ9FuH-VXfs07TU7AWJ4hromz8xtOFRFq0XVo1PT4fx3yOvhbt7TbyynVby77uwTOo6vhRJ07QAvh7lQO-uEwY3m6BkKKLATAid3971ZGvOh5aBxMSo_dLtE7wUNttr_CGq1zAGV3yCALyMOx6SSxPQsO2q-Gwh0KoYdeuIn9sVKKsnExdl4luuemhDF7qjvK7afARub9Hc0EzeKOPSUZ9GjVuC88lZVOce2gmnb_mDV5hBKFc6vIbWoI075SPOuZMAJ6H-QWw
      `
    },
    params:sendData
  })
  .then(({ data }) => data)
  .catch((err) => err.response.data);

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
