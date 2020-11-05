import axios from 'axios';
import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;
const gapiBaseUrl = 'https://classroom.googleapis.com/v1';

const getStudentProfile = (token) => axios({
  method: 'get',
  url: `${gapiBaseUrl}/userProfiles/me`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then((response) => response);

const getStudentCourses = (token) => axios({
  method: 'get',
  url: `${gapiBaseUrl}/courses`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then((response) => response);

const h5pResourceSettings = (activityId) => httpService
.get(`/${apiVersion}/google-classroom/activities/${activityId}/h5p-resource-settings`)
.then(({ data }) => data)
.catch((err) => Promise.reject(err.response.data));

export default {
  getStudentProfile,
  getStudentCourses,
  h5pResourceSettings
};
