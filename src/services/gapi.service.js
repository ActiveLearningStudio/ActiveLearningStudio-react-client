import axios from 'axios';

// import config from 'config';

// const { apiVersion } = config;
const gapiBaseUrl = 'https://classroom.googleapis.com/v1';

const getStudentCourses = (token) => axios({
  method: 'get',
  url: `${gapiBaseUrl}/courses`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response);

export default {
  getStudentCourses,
};
