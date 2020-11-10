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
  .post(`/${apiVersion}/teams/${teamId}/invite-member`, { email })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const inviteMembers = (teamId, users, note) => httpService
  .post(`/${apiVersion}/teams/${teamId}/invite-members`, note ? { users, note } : { users })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const removeMember = (teamId, id) => httpService
  .post(`/${apiVersion}/teams/${teamId}/remove`, { id })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const addProjects = (teamId, ids) => httpService
  .post(`/${apiVersion}/teams/${teamId}/add-projects`, { ids })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const removeProject = (teamId, id) => httpService
  .post(`/${apiVersion}/teams/${teamId}/remove-project`, { id })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const addMembersToProject = (teamId, projectId, ids) => httpService
  .post(`/${apiVersion}/teams/${teamId}/projects/${projectId}/add-members`, { ids })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const removeMemberFromProject = (teamId, projectId, id) => httpService
  .post(`/${apiVersion}/teams/${teamId}/projects/${projectId}/remove-member`, { id })
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
  inviteMembers,
  removeMember,
  addProjects,
  removeProject,
  addMembersToProject,
  removeMemberFromProject,
};
