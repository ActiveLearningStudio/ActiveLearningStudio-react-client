import axios from 'axios';
import config from 'config';
import Swal from 'sweetalert2';
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
  params: {
    courseStates: 'ACTIVE',
  },
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response);

const getCourse = (token, courseId) => axios({
  method: 'get',
  url: `${gapiBaseUrl}/courses/${courseId}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response);

const getSubmission = (classworkId, courseId, token) => httpService
  .post(
    `/${apiVersion}/google-classroom/classwork/${classworkId}/submission`,
    { course_id: courseId, access_token: token },
  )
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const turnIn = (classworkId, courseId, token) => httpService
  .post(
    `/${apiVersion}/google-classroom/turnin/${classworkId}`,
    { course_id: courseId, access_token: token },
  )
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getSummaryAuth = (token, courseId, classworkId, submissionId) => httpService
  .post(
    `/${apiVersion}/google-classroom/validate-summary-access`,
    {
      course_id: courseId,
      access_token: token,
      gc_classwork_id: classworkId,
      gc_submission_id: submissionId,
    },
  )
  .then(({ data }) => data)
  .catch((response) => response.response.data);

const getOutcomeSummary = (studentId, activityId) => httpService
  .post(
    `/${apiVersion}/outcome/summary`,
    {
      actor: studentId,
      activity: activityId,
    },
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

const h5pResourceSettings = (activityId, studentId = null, submissionId = null) => httpService
  .get(
    `/${apiVersion}/google-classroom/activities/${activityId}/h5p-resource-settings`,
    {},
    {
      gcuid: studentId,
      submissionid: submissionId,
    },
  )
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: err.message || 'Something went wrong! We are unable to load activity.',
    });
  });

  const getGoogleSlides = (token, query) => axios({
    method: 'get',
    url: 'https://www.googleapis.com/drive/v3/files',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: query.length > 0 ? `name contains '${query}' and mimeType='application/vnd.google-apps.presentation'` : "mimeType='application/vnd.google-apps.presentation'",
      fields: 'files(id, name, mimeType, iconLink, size, createdTime, lastModifyingUser)',
    },
  })
  .then((response) => response)
  .catch((err) => {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: err?.response?.data?.error?.message || 'Something went wrong while trying to communicate with Google Drive.',
    });
  });

  const getGoogleSlidesPDF = (token, fileId) => axios({
    method: 'get',
    url: `https://www.googleapis.com/drive/v3/files/${fileId}/export`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'arraybuffer',
    params: {
      fileId,
      mimeType: 'application/pdf',
    },
  }).then((response) => response)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: err.message || 'Something went wrong while trying to communicate with Google Drive.',
    });
  });

export default {
  getStudentProfile,
  getStudentCourses,
  getCourse,
  h5pResourceSettings,
  getSubmission,
  turnIn,
  getSummaryAuth,
  getOutcomeSummary,
  getGoogleSlides,
  getGoogleSlidesPDF,
};
