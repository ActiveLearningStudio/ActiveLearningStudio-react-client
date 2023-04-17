/* eslint-disable */
import config from 'config';
import httpService from './http.service';
const { apiVersion } = config;

const msTeamsToken = (code) => httpService
  .get(`/microsoft-team/get-access-token-via-code`,
  {},
  {
    code: code,
  })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getSubmissionStatus = (token, submissionId, assignmentId, classId) => httpService
  .get(`/microsoft-team/get-submission-status`,
  {},
  {
    token,
    submissionId,
    assignmentId,
    classId,
  })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const turnIn = (token, classworkId, submissionId, courseId) => httpService
  .post(
    `/microsoft-team/submit-assignment`,
    { 
      classId: classworkId,
      submissionId: submissionId,
      assignmentId: courseId,
      token: token,
     },
  )
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

  export default {
    msTeamsToken,
    getSubmissionStatus,
    turnIn,
  }