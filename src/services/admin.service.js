import config from 'config';
import Swal from 'sweetalert2';
import httpService from './http.service';

const { apiVersion } = config;

const addUserInOrganization = (user, subOrgId) => httpService
  .post(`/${apiVersion}/suborganizations/${subOrgId}/add-new-user`, user)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: err || err.message || 'Error creating new user.',
    });
  });

const editUserInOrganization = (user, subOrgId) => httpService
  .put(`/${apiVersion}/suborganizations/${subOrgId}/update-user-detail`, user)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: err || err.message || 'Error editing user.',
    });
  });

export default {
  addUserInOrganization,
  editUserInOrganization,
};
