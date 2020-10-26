import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const getUserProjects = () => httpService
  .get(`/${apiVersion}/projects`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getProject = (id) => httpService
  .get(`/${apiVersion}/projects/${id}/playlists`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  getUserProjects,
  getProject,
};
