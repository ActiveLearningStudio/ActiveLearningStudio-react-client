/* eslint-disable max-len */
import axios from 'axios';
import Swal from 'sweetalert';

import loaderImg from 'assets/images/loader.svg';
import {
  SHOW_CREATE_PROJECT_MODAL,
  SHOW_CREATE_PROJECT_SUBMENU,
  CREATE_PROJECT,
  LOAD_MY_PROJECTS,
  LOAD_PROJECT,
  DELETE_PROJECT,
  PAGE_LOADING,
  PAGE_LOADING_COMPLETE,
  UPDATE_PROJECT,
  UPLOAD_PROJECT_THUMBNAIL,
  SHARE_PROJECT,
  PROJECT_THUMBNAIL_PROGRESS,
  SHOW_USER_SUB_MENU,
  CLOSE_MENU,
  SHOW_LMS,
  LOAD_MY_PROJECTS_SELECTED,
  CHANGE_LOADING,
} from '../actionTypes';
import SharePreviewPopup from '../../helpers/SharePreviewPopup';

// Publishes the project in LEARN
export const shareProject = (project) => ({
  type: SHARE_PROJECT,
  project,
});

// Publishes the project in LEARN
export const shareProjectAction = (projectId) => async () => {
  const { token } = JSON.parse(localStorage.getItem('auth'));
  axios
    .post(
      '/api/share-project',
      { projectId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => {
      if (response.data.status === 'error' || response.status !== 200) {
        console.log(`Error: ${response.data.message}`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// Loads a specific project
export const loadProject = (project) => ({
  type: LOAD_PROJECT,
  project,
});

// gets the data of project based on project id from the server
// populates the data to the edit form
export const loadProjectAction = (projectId) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem('auth'));
  const response = await axios.post(
    '/api/load-project',
    { projectId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.data.status === 'success') {
    dispatch(loadProject(response.data.data.project));
  }
};

// when user clicks on header plus button it opens dropdown menu

export const showCreateProjectSubmenu = () => ({
  type: SHOW_CREATE_PROJECT_SUBMENU,
});

export const showUserSubMenu = () => ({
  type: SHOW_USER_SUB_MENU,
});

export const closeMenu = () => ({
  type: CLOSE_MENU,
});

export const closeMenuAction = () => async (dispatch) => {
  try {
    dispatch(closeMenu());
  } catch (e) {
    throw new Error(e);
  }
};

export const showCreateProjectSubmenuAction = () => async (dispatch) => {
  try {
    dispatch(showCreateProjectSubmenu());
  } catch (e) {
    throw new Error(e);
  }
};

export const showUserSubMenuAction = () => async (dispatch) => {
  try {
    dispatch(showUserSubMenu());
  } catch (e) {
    throw new Error(e);
  }
};

// opens a project modal both for new

export const showCreateProjectModal = () => ({
  type: SHOW_CREATE_PROJECT_MODAL,
});

export const showCreateProjectModalAction = () => async (dispatch) => {
  try {
    dispatch(showCreateProjectModal());
  } catch (e) {
    throw new Error(e);
  }
};

export const createProject = (projectData) => ({
  type: CREATE_PROJECT,
  projectData,
});

// This method sends two different request based on request parameter
// request parameter can be create / update
// if request = create it sends request to create a Project
// if request = update it sends request to update the resource

export const createUpdateProject = async (
  url,
  request,
  name,
  description,
  thumbUrl,
) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('auth'));

    const data = {
      name,
      description,
      thumbUrl,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let response = {};
    if (request === 'create') {
      response = await axios.post(url, data, config);
    } else if (request === 'update') {
      response = await axios.put(url, data, config);
    }

    if (response.data.status === 'success') {
      return {
        _id: response.data.data._id,
        name: response.data.data.name,
        thumbUrl: response.data.data.thumbUrl,
        userId: response.data.data.userId,
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};

// create project request
// @params, name, description, thumbUrl is sent to the server
// upon success redux states appends the project to already created projects

export const createProjectAction = (name, description, thumbUrl) => async (dispatch) => {
  try {
    const projectData = await createUpdateProject(
      '/api/project',
      'create',
      name,
      description,
      thumbUrl,
    );

    dispatch(createProject(projectData));
  } catch (e) {
    throw new Error(e);
  }
};

export const updateProject = (projectData) => ({
  type: UPDATE_PROJECT,
  projectData,
});

// edit project data is sent to the server for updates

export const updateProjectAction = (
  projectId,
  name,
  description,
  thumbUrl,
) => async (dispatch) => {
  try {
    const projectData = await createUpdateProject(
      `/api/project/${projectId}`,
      'update',
      name,
      description,
      thumbUrl,
    );

    dispatch(updateProject(projectData));
  } catch (e) {
    throw new Error(e);
  }
};

// loadLMS

export const loadLMSData = (lmsInfo) => ({
  type: SHOW_LMS,
  lmsInfo,
});

// load projects of current logged in user

// LMS action starts from here
export const LoadLMS = () => async (dispatch) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('auth'));
    const response = await axios.get(
      `${global.config.laravelAPIUrl}go/lms-manager/get-user-settings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    dispatch(loadLMSData(response.data.data));
  } catch (e) {
    throw new Error(e);
  }
};

export const ShareLMS = (
  playlistId,
  LmsTokenId,
  lmsName,
  lmsUrl,
  playlistName,
  projectName,
) => {
  const { token } = JSON.parse(localStorage.getItem('auth'));

  Swal({
    title: `This playlist will be added to course <strong>${projectName}</strong>. If the course does not exist, it will be created. `,
    text: 'Would you like to proceed?',
    showCancelButton: true,
    confirmButtonColor: '#5952c6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Continue',
  }).then((result) => {
    if (result.value) {
      Swal({
        iconHtml: loaderImg,
        title: 'Publishing....',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
      });

      axios
        .post(
          `${global.config.laravelAPIUrl}/go/${lmsName}/publish/playlist`,
          {
            settingId: LmsTokenId,
            playlistId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.data.status === 'success') {
            Swal({
              icon: 'success',
              title: 'Published!',
              confirmButtonColor: '#5952c6',
              html: `Your playlist has been published to <a target="_blank" href="${lmsUrl}"> ${lmsUrl}</a>`,
              //   text: `Yo'ur playlist has been submitted to ${lmsUrl}`,
            });
          }
        })
        .catch(() => {
          Swal({
            confirmButtonColor: '#5952c6',
            icon: 'error',
            text: 'Something went wrong, Kindly try again',
          });
        });
    }
  });
};

export const changeloader = (change) => ({
  type: CHANGE_LOADING,
  change,
});

// LMS action ENDS from here

export const loadMyProjects = (projects) => ({
  type: LOAD_MY_PROJECTS,
  projects,
});

export const loadMyProjectsSelected = (projects) => ({
  type: LOAD_MY_PROJECTS_SELECTED,
  projects,
});

// load projects of current logged in user

export const loadMyProjectsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: PAGE_LOADING,
    });
    const { token } = JSON.parse(localStorage.getItem('auth'));
    const response = await axios.post(
      `${global.config.laravelAPIUrl}/myprojects`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data.status === 'success') {
      let projects = [];
      projects = response.data.data.projects;

      dispatch(loadMyProjects(projects));
      dispatch({
        type: PAGE_LOADING_COMPLETE,
      });
    }
  } catch (e) {
    dispatch({
      type: PAGE_LOADING_COMPLETE,
    });
    throw new Error(e);
  }
};

// load project preview

export const loadMyProjectsActionPreview = (projectId) => async (dispatch) => {
  try {
    dispatch({
      type: PAGE_LOADING,
    });
    const { token } = JSON.parse(localStorage.getItem('auth'));
    const response = await axios.get(
      `${global.config.laravelAPIUrl}/project?projectId=${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data.status === 'success') {
      dispatch(loadMyProjectsSelected(response.data.data.project));
      dispatch({
        type: PAGE_LOADING_COMPLETE,
      });
    }
  } catch (e) {
    dispatch({
      type: PAGE_LOADING_COMPLETE,
    });
    throw new Error(e);
  }
};

// load project shared view
export const loadMyProjectsActionPreviewShared = (projectId) => async (dispatch) => {
  try {
    const response = await axios.get(`${global.config.laravelAPIUrl}/get-shared-project?projectId=${projectId}`);

    if (response.data.status === 'success') {
      dispatch(loadMyProjectsSelected(response.data.data.project));
      dispatch({
        type: PAGE_LOADING_COMPLETE,
      });
    } else {
      dispatch(loadMyProjectsSelected(response.data));
    }
  } catch (e) {
    throw new Error(e);
  }
};

// toggle project share
export const toggleProjectShareAction = async (projectId, ProjectName) => {
  const { token } = JSON.parse(localStorage.getItem('auth'));
  const response = await axios.post(
    `${global.config.laravelAPIUrl}/share-project`,
    { projectId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.data.status === 'success') {
    const protocol = `${window.location.href.split('/')[0]}//`;
    const url = `${protocol + window.location.host}/project/shared/${projectId.trim()}`;
    return SharePreviewPopup(url, ProjectName);
  }
};

export const toggleProjectShareRemovedAction = async (projectId, ProjectName) => {
  const { token } = JSON.parse(localStorage.getItem('auth'));
  const response = await axios.post(
    `${global.config.laravelAPIUrl}/remove-share-project`,
    { projectId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.data.status === 'success') {
    Swal({
      title: `You stopped sharing <strong>"${ProjectName}"</strong> ! `,
      html: 'Please remember that anyone you have shared this project with, will no longer have access to its contents.',
    });
  }
};

export const deleteProject = (projectId) => ({
  type: DELETE_PROJECT,
  projectId,
});

// deletes project
export const deleteProjectAction = (projectId) => async (dispatch) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('auth'));
    const response = await axios.delete(
      `/api/project/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data.status === 'success') {
      dispatch(deleteProject(projectId));
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const uploadProjectThumbnail = (thumbUrl) => ({
  type: UPLOAD_PROJECT_THUMBNAIL,
  thumbUrl,
});

export const projectThumbnailProgress = (progress) => ({
  type: PROJECT_THUMBNAIL_PROGRESS,
  progress,
});

// uploads project thumbnail
export const uploadProjectThumbnailAction = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        dispatch(
          projectThumbnailProgress(
            `Uploaded progress: ${
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            }%`,
          ),
        );
      },
    };
    return axios
      .post(
        `${global.config.laravelAPIUrl}/post-upload-image`,
        formData,
        config,
      )
      .then((response) => {
        dispatch(uploadProjectThumbnail(response.data.data.guid));
      });
  } catch (e) {
    throw new Error(e);
  }
};
