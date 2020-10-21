import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const getAll = () => httpService
  .get(`/${apiVersion}/teams`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const create = (team) => httpService
  .post(`/${apiVersion}/teams`, team)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const get = (id) => httpService
  .get(`/${apiVersion}/teams/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const update = (id, team) => httpService
  .put(`/${apiVersion}/teams/${id}`, team)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const remove = (id) => httpService
  .remove(`/${apiVersion}/teams/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const inviteConfirm = (user) => httpService
  .post(`/${apiVersion}/teams/invite`, user)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const inviteMember = (teamId, email) => httpService
  .post(`/${apiVersion}/teams/${teamId}/invite`, { email })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const removeMember = (teamId, id) => httpService
  .post(`/${apiVersion}/teams/${teamId}/remove`, { id })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  getAll,
  create,
  get,
  update,
  remove,
  inviteConfirm,
  inviteMember,
  removeMember,
};
