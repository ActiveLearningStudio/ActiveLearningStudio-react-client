/* eslint-disable */
import config from "config";
import Swal from "sweetalert2";
import httpService from "./http.service";
import { errorCatcher } from "./errors";

const { apiVersion } = config;

const addUserInOrganization = (user, subOrgId) =>
  httpService
    .post(
      `/${apiVersion}/suborganizations/${subOrgId}/add-new-user`,
      user
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const editUserInOrganization = (user, subOrgId) =>
  httpService
    .put(
      `/${apiVersion}/suborganizations/${subOrgId}/update-user-detail`,
      user
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

// project
const getAllProject = (
  subOrgId,
  page,
  size,
  authorId,
  createdFrom,
  createdTo,
  updatedFrom,
  updatedTo,
  shared,
  index,
  query = "",
  column = "",
  orderBy = ""
) =>
  httpService
    // eslint-disable-next-line max-len
    .get(
      `/${apiVersion}/suborganizations/${subOrgId}/projects?page=${page}${
        size ? `&size=${size}` : ""
      }${authorId ? `&author_id=${authorId}` : ""}${
        createdFrom ? `&created_from=${createdFrom}` : ""
      }${createdTo ? `&created_to=${createdTo}` : ""}
  ${updatedFrom ? `&updated_from=${updatedFrom}` : ""}${
        updatedTo ? `&updated_to=${updatedTo}` : ""
      }${shared || shared === 0 ? `&shared=${shared}` : ""}${
        index ? `&indexing=${index}` : ""
      }${query ? `&query=${query}` : ""}${
        column ? `&order_by_column=${column}` : ""
      }${orderBy ? `&order_by_type=${orderBy}` : ""}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      // errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const getAllExportedProject = (
  subOrgId,
  page,
  size,
  query = "",
  column = "",
  orderBy = ""
) =>
  httpService
    .get(
      `/${apiVersion}/suborganization/${subOrgId}/users/notifications/export-list?page=${page}${
        size ? `&size=${size}` : ""
      }${query ? `&query=${query}` : ""}
  ${column ? `&order_by_column=${column}` : ""}${
        orderBy ? `&order_by_type=${orderBy}` : ""
      }`
    )
    .then(({ data }) => data)
    .catch((err) => {
      // errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const exportProject = (subOrgId, projectId) =>
  httpService
    .post(
      `/${apiVersion}/suborganization/${subOrgId}/projects/${projectId}/export`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const importProject = (subOrgId, projectData) =>
  httpService
    .post(
      `/${apiVersion}/suborganization/${subOrgId}/projects/import`,
      projectData
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const getAllProjectSearch = (
  subOrgId,
  page,
  search,
  size,
  column,
  orderBy
) =>
  httpService
    .get(
      `/${apiVersion}/suborganizations/${subOrgId}/projects?page=${page}${
        search ? `&query=${search.replace(/#/, "%23")}` : ""
      }
  ${size ? `&size=${size}` : ""}${
        column ? `&order_by_column=${column}` : ""
      }${orderBy ? `&order_by_type=${orderBy}` : ""}`
    )
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const getUserProject = (subOrgId, page) =>
  httpService
    .get(
      `/${apiVersion}/suborganizations/${subOrgId}/projects?exclude_starter=true&page=${page}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const getUserProjectSearch = (subOrgId, page, search) =>
  httpService
    .get(
      `/${apiVersion}/suborganizations/${subOrgId}/projects?exclude_starter=true&page=${page}&query=${search.replace(
        /#/,
        "%23"
      )}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const getAllProjectIndex = (
  subOrgId,
  page,
  index,
  size,
  authorId,
  createdFrom,
  createdTo,
  updatedFrom,
  updatedTo,
  shared
) =>
  httpService
    // eslint-disable-next-line max-len
    .get(
      `/${apiVersion}/suborganizations/${subOrgId}/projects?page=${page}&indexing=${index}${
        size ? `&size=${size}` : ""
      }${authorId ? `&author_id=${authorId}` : ""}${
        createdFrom ? `&created_from=${createdFrom}` : ""
      }${createdTo ? `&created_to=${createdTo}` : ""}${
        updatedFrom ? `&updated_from=${updatedFrom}` : ""
      }${updatedTo ? `&updated_to=${updatedTo}` : ""}${
        shared || shared === 0 ? `&shared=${shared}` : ""
      }`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const userSerchIndexs = (subOrgId, page, index, search, size) =>
  httpService
    .get(
      `/${apiVersion}/suborganizations/${subOrgId}/projects?page=${page}&indexing=${index}${
        size ? `&size=${size}` : ""
      }&query=${search.replace(/#/, "%23") || ""}`
    )
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const updateIndex = (projectId, index) =>
  httpService
    .get(`/${apiVersion}/projects/${projectId}/indexes/${index}`)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const getLmsProject = (
  subOrgId,
  page,
  size,
  query,
  column,
  orderBy,
  filterBy = ""
) =>
  httpService
    .get(
      `${apiVersion}/suborganizations/${subOrgId}/lms-settings?page=${page}
  ${query !== "" ? `&query=${query}` : ""}${
        size !== "" ? `&size=${size}` : ""
      }
  ${column !== "" ? `&order_by_column=${column}` : ""}${
        orderBy !== "" ? `&order_by_type=${orderBy}` : ""
      }
  ${filterBy !== "" ? `&filter=${filterBy}` : ""}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const deleteLmsProject = (subOrgId, id) =>
  httpService
    .remove(
      `${apiVersion}/suborganizations/${subOrgId}/lms-settings/${id}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const updateLmsProject = (subOrgId, id, values) =>
  httpService
    .put(
      `${apiVersion}/suborganizations/${subOrgId}/lms-settings/${id}`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const createLmsProject = (subOrgId, values) =>
  httpService
    .post(
      `${apiVersion}/suborganizations/${subOrgId}/lms-settings`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const getLmsProjectSearch = (subOrgId, search, page) =>
  httpService
    .get(
      `${apiVersion}/suborganizations/${subOrgId}/lms-settings?page=${page}&query=${search.replace(
        /#/,
        "%23"
      )}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const getActivityTypes = (
  subOrgId,
  page,
  size,
  column,
  orderBy,
  search
) =>
  httpService
    .get(
      `/${apiVersion}/suborganizations/${subOrgId}/activity-types?page=${page}&size=${size}&order_by_column=${column}&order_by_type=${orderBy}&query=${search}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const getUserReport = (mode, size, page, query) =>
  httpService
    .get(
      `/${apiVersion}/users/report/basic${
        mode ? `?mode=${mode}` : ""
      }${size ? `&size=${size}` : ""}${page ? `&page=${page}` : ""}${
        query ? `&query=${query}` : ""
      }`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const getJobListing = (filter, size, page, query) =>
  httpService
    .get(
      `/${apiVersion}/queue-monitor/jobs${
        filter ? `?filter=${filter}` : ""
      }${size ? `&size=${size}` : ""}${page ? `&page=${page}` : ""}${
        query ? `&query=${query}` : ""
      }`
    )
    .then((data) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const retryAllFailedJobs = () =>
  httpService
    .get(`/${apiVersion}/queue-monitor/jobs/retry/all`)
    .then((data) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const retrySpecificFailedJob = (job) =>
  httpService
    .get(`/${apiVersion}/queue-monitor/jobs/retry/${job}`)
    .then((data) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const forgetAllFailedJobs = () =>
  httpService
    .get(`/${apiVersion}/queue-monitor/jobs/forget/all`)
    .then((data) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const forgetSpecificFailedJob = (job) =>
  httpService
    .get(`/${apiVersion}/queue-monitor/jobs/forget/${job}`)
    .then((data) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const getLogsListing = (filter, size, page, query) =>
  httpService
    .get(
      `/${apiVersion}/queue-monitor${
        filter ? `?filter=${filter}` : ""
      }${size ? `&size=${size}` : ""}${page ? `&page=${page}` : ""}${
        query ? `&query=${query}` : ""
      }`
    )
    .then((data) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const getDefaultSso = (
  orgId,
  page,
  size,
  query,
  column,
  orderBy,
  filterBy = ""
) =>
  httpService
    .get(
      `${apiVersion}/organizations/${orgId}/default-sso-settings?page=${page}
  ${query !== "" ? `&query=${query}` : ""}${
        size !== "" ? `&size=${size}` : ""
      }
  ${column !== "" ? `&order_by_column=${column}` : ""}${
        orderBy !== "" ? `&order_by_type=${orderBy}` : ""
      }
  ${filterBy !== "" ? `&filter=${filterBy}` : ""}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const createDefaultSso = (orgId, values) =>
  httpService
    .post(
      `${apiVersion}/organizations/${orgId}/default-sso-settings`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const updateDefaultSso = (orgId, id, values) =>
  httpService
    .put(
      `${apiVersion}/organizations/${orgId}/default-sso-settings/${id}`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const deleteDefaultSso = (orgId, id) =>
  httpService
    .remove(
      `${apiVersion}/organizations/${orgId}/default-sso-settings/${id}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const searchDefaultSso = (orgId, search, page) =>
  httpService
    .get(
      `${apiVersion}/organizations/${orgId}/default-sso-settings?page=${page}&query=${search}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const getLtiTools = (
  subOrgId,
  page,
  size,
  query,
  column,
  orderBy,
  filterBy
) =>
  httpService
    .get(
      `${apiVersion}/suborganizations/${subOrgId}/lti-tool-settings?page=${page}
  ${query ? `&query=${query}` : ""}${size ? `&size=${size}` : ""}
  ${column ? `&order_by_column=${column}` : ""}${
        orderBy ? `&order_by_type=${orderBy}` : ""
      }
  ${filterBy ? `&filter=${filterBy}` : ""}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const getLtiToolsMedia = (subOrgId, page, size, query, filterBy) =>
  httpService
    .get(
      `${apiVersion}/suborganizations/${subOrgId}/lti-tool-settings?page=${page}&size=${size}&query=${query}&filter=${filterBy}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const createLtiTool = (subOrgId, values) =>
  httpService
    .post(
      `${apiVersion}/suborganizations/${subOrgId}/lti-tool-settings`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const updateLtiTool = (subOrgId, id, values) =>
  httpService
    .put(
      `${apiVersion}/suborganizations/${subOrgId}/lti-tool-settings/${id}`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const deleteLtiTool = (subOrgId, id) =>
  httpService
    .remove(
      `${apiVersion}/suborganizations/${subOrgId}/lti-tool-settings/${id}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const searchLtiTool = (subOrgId, query, page) =>
  httpService
    .get(
      `${apiVersion}/suborganizations/${subOrgId}/lti-tool-settings?page=${page}${
        query ? `&query=${query.replace(/#/, "%23")}` : ""
      }`
    )
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const cloneLtiTool = (subOrgId, id, user_id) =>
  httpService
    .post(
      `/${apiVersion}/suborganizations/${subOrgId}/lti-tool-settings/${id}/clone`,
      {
        user_id: user_id,
      }
    )
    .then((res) => Swal.fire(res.data.message))
    .catch((err) => {
      if (err.response.data.errors) {
        Swal.fire(err.response.data.errors[0]);
      } else {
        Swal.fire({
          icon: "error",
          text: "Something went wrong!",
        });
      }
    });
const ltiToolType = (subOrgId) =>
  httpService
    .get(`/${apiVersion}/lti-tool-type`)
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err);
    });
const checkUserEmail = (orgId, email) =>
  httpService
    .get(
      `${apiVersion}/suborganization/${orgId}/users/check-email?email=${email}`
    )
    .then(({ data }) => data);

const addUserToOrg = (subOrgId, userId, role) =>
  httpService
    .post(`/${apiVersion}/suborganizations/${subOrgId}/add-user`, {
      user_id: userId,
      role_id: role,
    })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const removeUser = (subOrgId, userId, preserve) =>
  httpService
    .remove(
      `${apiVersion}/suborganizations/${subOrgId}/remove-user`,
      {
        user_id: userId,
        preserve_data: preserve,
      }
    )
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const getSubjects = (subOrgId, page, size, query, column, orderBy) =>
  httpService
    .get(
      `${apiVersion}/suborganizations/${subOrgId}/subjects${
        page ? `?page=${page}` : ""
      }${size ? `&size=${size}` : ""}${
        !page && !size ? `?skipPagination=${true}` : ""
      }${query ? `&query=${query.replace(/#/, "%23")}` : ""}
  ${column ? `&order_by_column=${column}` : ""}${
        orderBy ? `&order_by_type=${orderBy}` : ""
      }`
    )
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const createSubject = (subOrgId, values) =>
  httpService
    .post(
      `${apiVersion}/suborganizations/${subOrgId}/subjects`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const updateSubject = (subOrgId, id, values) =>
  httpService
    .put(
      `${apiVersion}/suborganizations/${subOrgId}/subjects/${id}`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const deleteSubject = (subOrgId, id) =>
  httpService
    .remove(
      `${apiVersion}/suborganizations/${subOrgId}/subjects/${id}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const getEducationLevel = (
  subOrgId,
  page,
  size,
  query,
  column,
  orderBy
) =>
  httpService
    .get(
      `${apiVersion}/suborganizations/${subOrgId}/education-levels${
        page ? `?page=${page}` : ""
      }${size ? `&size=${size}` : ""}${
        !page && !size ? `?skipPagination=${true}` : ""
      }${query ? `&query=${query.replace(/#/, "%23")}` : ""}
  ${column ? `&order_by_column=${column}` : ""}${
        orderBy ? `&order_by_type=${orderBy}` : ""
      }`
    )
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const createEducationLevel = (subOrgId, values) =>
  httpService
    .post(
      `${apiVersion}/suborganizations/${subOrgId}/education-levels`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const updateEducationLevel = (subOrgId, id, values) =>
  httpService
    .put(
      `${apiVersion}/suborganizations/${subOrgId}/education-levels/${id}`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const deleteEducationLevel = (subOrgId, id) =>
  httpService
    .remove(
      `${apiVersion}/suborganizations/${subOrgId}/education-levels/${id}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const getAuthorTag = (subOrgId, page, size, query, column, orderBy) =>
  httpService
    .get(
      `${apiVersion}/suborganizations/${subOrgId}/author-tags${
        page ? `?page=${page}` : ""
      }${size ? `&size=${size}` : ""}${
        !page && !size ? `?skipPagination=${true}` : ""
      }${query ? `&query=${query.replace(/#/, "%23")}` : ""}
  ${column ? `&order_by_column=${column}` : ""}${
        orderBy ? `&order_by_type=${orderBy}` : ""
      }`
    )
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const createAuthorTag = (subOrgId, values) =>
  httpService
    .post(
      `${apiVersion}/suborganizations/${subOrgId}/author-tags`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const updateAuthorTag = (subOrgId, id, values) =>
  httpService
    .put(
      `${apiVersion}/suborganizations/${subOrgId}/author-tags/${id}`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const deleteAuthorTag = (subOrgId, id) =>
  httpService
    .remove(
      `${apiVersion}/suborganizations/${subOrgId}/author-tags/${id}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const getActivityLayout = (
  subOrgId,
  page,
  size,
  query,
  column,
  orderBy
) =>
  httpService
    .get(
      `${apiVersion}/suborganizations/${subOrgId}/activity-layouts${
        page ? `?page=${page}` : ""
      }${size ? `&size=${size}` : ""}${
        query ? `&query=${query.replace(/#/, "%23")}` : ""
      }
  ${column ? `&order_by_column=${column}` : ""}${
        orderBy ? `&order_by_type=${orderBy}` : ""
      }`
    )
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const createActivityLayout = (subOrgId, values) =>
  httpService
    .post(
      `${apiVersion}/suborganizations/${subOrgId}/activity-layouts`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const updateActivityLayout = (subOrgId, id, values) =>
  httpService
    .put(
      `${apiVersion}/suborganizations/${subOrgId}/activity-layouts/${id}`,
      values
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

const deleteActivityLayout = (subOrgId, id) =>
  httpService
    .remove(
      `${apiVersion}/suborganizations/${subOrgId}/activity-layouts/${id}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });

// eslint-disable-next-line camelcase
const teamsActionAdminPanel = (
  subOrgId,
  query,
  page,
  size,
  order_by_column = "",
  order_by_type = ""
) =>
  httpService
    // eslint-disable-next-line camelcase
    .get(
      `${apiVersion}/suborganization/${subOrgId}/get-admin-teams?size=${size}${
        query ? `&query=${query}` : ""
      }${page ? `&page=${page}` : ""}${
        order_by_column ? `&order_by_column=${order_by_column}` : ""
      }${order_by_type ? `&order_by_type=${order_by_type}` : ""}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });
//media sources for organizations
const getAllMediaSources = () =>
  httpService
    .get(`${apiVersion}/media-sources`)
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });
//get  org media source
const getOrgMediaSource = (orgId) =>
  httpService
    .get(`${apiVersion}/suborganizations/${orgId}/media-sources`)
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });
//update  org media source
const updateOrgMediaSource = (subOrgId, media_source_ids) =>
  httpService
    .put(
      `${apiVersion}/suborganizations/${subOrgId}/update-media-sources`,
      {
        media_source_ids: media_source_ids,
      }
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject();
    });
const getMediaSources = (
  subOrgId,
  page,
  size,
  query,
  column,
  orderBy
) =>
  httpService
    .get(
      `${apiVersion}/suborganizations/${subOrgId}/media-sources${
        page ? `?page=${page}` : ""
      }${size ? `&size=${size}` : ""}${
        !page && !size ? `?skipPagination=${true}` : ""
      }${query ? `&query=${query.replace(/#/, "%23")}` : ""}
  ${column ? `&order_by_column=${column}` : ""}${
        orderBy ? `&order_by_type=${orderBy}` : ""
      }`
    )
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const gettAllDynamicPermisison = (subOrgId, roleId, add) =>
  httpService
    .get(
      `/${apiVersion}/suborganizations/${subOrgId}/role/${roleId}/permissions${
        add ? "?view=all" : ""
      }`
    )
    .then(({ data }) => data)
    .catch((err) => {
      // errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });
const updateAllDynamicPermisison = (subOrgId, data) =>
  httpService
    .put(
      `/${apiVersion}/suborganizations/${subOrgId}/update-role-ui-permissions`,
      data
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });
export default {
  gettAllDynamicPermisison,
  updateAllDynamicPermisison,
  addUserInOrganization,
  editUserInOrganization,
  getAllProject,
  getUserProject,
  getAllProjectIndex,
  updateIndex,
  userSerchIndexs,
  getAllProjectSearch,
  exportProject,
  getUserProjectSearch,
  getActivityTypes,
  getLmsProject,
  getLmsProjectSearch,
  deleteLmsProject,
  updateLmsProject,
  getUserReport,
  createLmsProject,
  getJobListing,
  retryAllFailedJobs,
  retrySpecificFailedJob,
  forgetAllFailedJobs,
  forgetSpecificFailedJob,
  getLogsListing,
  importProject,
  getDefaultSso,
  deleteDefaultSso,
  createDefaultSso,
  updateDefaultSso,
  searchDefaultSso,
  getAllExportedProject,
  getLtiTools,
  createLtiTool,
  updateLtiTool,
  deleteLtiTool,
  searchLtiTool,
  cloneLtiTool,
  checkUserEmail,
  addUserToOrg,
  removeUser,
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getEducationLevel,
  createEducationLevel,
  updateEducationLevel,
  deleteEducationLevel,
  getAuthorTag,
  createAuthorTag,
  updateAuthorTag,
  deleteAuthorTag,
  getActivityLayout,
  createActivityLayout,
  updateActivityLayout,
  deleteActivityLayout,
  teamsActionAdminPanel,
  getAllMediaSources,
  getOrgMediaSource,
  updateOrgMediaSource,
  getMediaSources,
  ltiToolType,
  getLtiToolsMedia,
};
