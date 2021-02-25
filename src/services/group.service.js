import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const getAll = () => httpService
  .get(`/${apiVersion}/groups`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const create = (group) => httpService
  .post(`/${apiVersion}/groups`, group)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const get = (id) => httpService
  .get(`/${apiVersion}/groups/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const update = (id, group) => httpService
  .put(`/${apiVersion}/groups/${id}`, group)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const remove = (id) => httpService
  .remove(`/${apiVersion}/groups/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const inviteConfirm = (user) => httpService
  .post(`/${apiVersion}/groups/invite`, user)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const inviteMember = (groupId, email) => httpService
  .post(`/${apiVersion}/groups/${groupId}/invite-member`, { email })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const inviteMembers = (groupId, users, note) => httpService
  .post(`/${apiVersion}/groups/${groupId}/invite-members`, note ? { users, note } : { users })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const removeMember = (groupId, id) => httpService
  .post(`/${apiVersion}/groups/${groupId}/remove`, { id })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const addProjects = (groupId, ids) => httpService
  .post(`/${apiVersion}/groups/${groupId}/add-projects`, { ids })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const removeProject = (groupId, id) => httpService
  .post(`/${apiVersion}/groups/${groupId}/remove-project`, { id })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const addMembersToProject = (groupId, projectId, ids) => httpService
  .post(`/${apiVersion}/groups/${groupId}/projects/${projectId}/add-members`, { ids })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const removeMemberFromProject = (groupId, projectId, id) => httpService
  .post(`/${apiVersion}/groups/${groupId}/projects/${projectId}/remove-member`, { id })
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
