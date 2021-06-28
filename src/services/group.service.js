import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const getAll = (subOrgId) => httpService
  .get(`/${apiVersion}/suborganization/${subOrgId}/groups`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getAllSubOrganizationGroups = (subOrgId) => httpService
  .get(`/${apiVersion}/suborganization/${subOrgId}/get-groups`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const create = (group, subOrgId) => httpService
  .post(`/${apiVersion}/suborganization/${subOrgId}/groups`, group)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const get = (id, subOrgId) => httpService
  .get(`/${apiVersion}/suborganization/${subOrgId}/groups/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const update = (id, group, subOrgId) => httpService
  .put(`/${apiVersion}/suborganization/${subOrgId}/groups/${id}`, group)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const remove = (id, subOrgId) => httpService
  .remove(`/${apiVersion}/suborganization/${subOrgId}/groups/${id}`)
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

const inviteMembers = (groupId, users, note, subOrgId) => httpService
  .post(`/${apiVersion}/suborganization/${subOrgId}/groups/${groupId}/invite-members`, note ? { users, note } : { users })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const removeMember = (groupId, id, email) => httpService
  .post(`/${apiVersion}/groups/${groupId}/remove`, { id, email })
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
  getAllSubOrganizationGroups,
};
