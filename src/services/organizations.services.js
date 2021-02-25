import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const getAll = () => httpService
  .get(`/${apiVersion}/users/organizations`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getOrganization = (id) => httpService
  .get(`/${apiVersion}/suborganizations/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const branding = (domain) => httpService
  .get(`/${apiVersion}/organization/get-by-domain?domain=${domain.trim()}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  getAll,
  getOrganization,
  branding,
};
