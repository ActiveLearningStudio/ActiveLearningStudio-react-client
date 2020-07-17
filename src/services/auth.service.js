import httpService from './http.service';

const login = (body) => httpService
  .post('/login', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const register = (body) => httpService
  .post('/register', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const forgotPassword = (body) => httpService
  .post('/forgot-password', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const resetPassword = (body) => httpService
  .post('/reset-password', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  login,
  register,
  forgotPassword,
  resetPassword,
};
