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
  .catch(() => false);

const getOutcomeSummary = (studentId, activityId) => httpService
  .post(
    `/${apiVersion}/outcome/summary`,
    {
      actor: studentId,
      activity: activityId,
    },
  )
  .then(({ data }) => data)
  .catch(() => false);

const h5pResourceSettings = (activityId, studentId = null) => httpService
  .get(
    `/${apiVersion}/google-classroom/activities/${activityId}/h5p-resource-settings`,
    {},
    { gcuid: studentId },
  )
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  getStudentProfile,
  getStudentCourses,
  h5pResourceSettings,
  getSubmission,
  turnIn,
  getSummaryAuth,
  getOutcomeSummary,
};
