/* eslint-disable */
import config from 'config';
import httpService from './http.service';
const { apiVersion } = config;

const msTeamsToken = (code, submissionId, assignmentId, classId) => httpService
  .get(`/microsoft-team/get-access-token-via-code`,
  {},
  {
    code: code,
    submissionId: submissionId,
    assignmentId: assignmentId,
    classId: classId,
  })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const turnIn = (classworkId, submissionId, courseId) => httpService
  .post(
    `/microsoft-team/submit-assignment`,
    { 
      classId: classworkId,
      submissionId: submissionId,
      assignmentId: courseId,
      token: localStorage.getItem('mt_token'),
      // localStorage.setItem('refresh_token', result.refresh_token);
     },
  )
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

  export default {
    msTeamsToken,
    turnIn,
  }