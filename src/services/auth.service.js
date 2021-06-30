import config from 'config';
import { errorCatcher } from './errors';
import httpService from './http.service';

const { apiVersion } = config;

const me = () => httpService
  .get(`/${apiVersion}/users/me`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const login = (body) => httpService
  .post('/login', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const loginSSO = (body) => httpService
  .post('/login/sso', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const loginWithGoogle = (body) => httpService
  .post('/login/google', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const register = (body) => httpService
  .post('/register', body)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const confirmEmail = (body) => httpService
  .post('/verify-email', body)
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

const updateProfile = (user) => httpService
  .put(`/${apiVersion}/users/${user.id}`, user)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const updatePassword = (body) => httpService
  .post(`/${apiVersion}/users/update-password`, body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const subscribe = () => httpService
  .post(`/${apiVersion}/subscribe`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const searchUsers = (search) => httpService
  .post(`/${apiVersion}/users/search`, { search })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const loadOrganizationTypes = () => httpService
  .get(`/${apiVersion}/organization-types`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  me,
  login,
  loginWithGoogle,
  register,
  confirmEmail,
  forgotPassword,
  resetPassword,
  updateProfile,
  updatePassword,
  subscribe,
  searchUsers,
  loadOrganizationTypes,
  loginSSO,
};
