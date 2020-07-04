import httpService from './http.service';

const login = (phone) => httpService
  .post('/auth/login', { phone })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const confirm = (phone, token) => httpService
  .post('/auth/verify', { phone, token })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  login,
  confirm,
};
