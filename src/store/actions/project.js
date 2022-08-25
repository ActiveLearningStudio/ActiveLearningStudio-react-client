/* eslint-disable */
import axios from 'axios';
import Swal from 'sweetalert2';

import { toast } from 'react-toastify';

import loaderImg from 'assets/images/loader.svg';
import SharePreviewPopup from 'components/SharePreviewPopup';
import projectService from 'services/project.service';

import * as actionTypes from '../actionTypes';
import store from '../index';

export const visibilityTypes = () => async (dispatch) => {
  const result = await projectService.visibilityTypes();
  dispatch({
    type: actionTypes.PROJECT_VISIBILITY_TYPES,
    payload: result,
  });
  return result;
};
export const setCurrentVisibilityType = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.CURRENT_VISIBILITY_TYPE,
    payload: data,
  });
};

export const createProjectAction = (data) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  try {
    dispatch({ type: actionTypes.CREATE_PROJECT_REQUEST });
    // toast.info('creating project ...', {
    //   position: 'top-center',
    //   hideProgressBar: false,
    //   icon: '',
    //   closeOnClick: true,
    //   pauseOnHover: false,
    //   draggable: true,
    //   progress: undefined,
    // });
    const { project } = await projectService.create(data, activeOrganization.id);
    dispatch({
      type: actionTypes.CREATE_PROJECT_SUCCESS,
      payload: { project },
    });
    toast.dismiss();
    if (project) {
      // toast.success('New Project Created', {
      //   position: 'top-center',
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      return project;
    }
    // dispatch(allSidebarProjects());
  } catch (e) {
    dispatch({ type: actionTypes.CREATE_PROJECT_FAIL });
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: e.message || 'Something went wrong !',
    });
  }
};

export const setSelectedProject = (project) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_SELECTED_PROJECT,
    payload: project,
  });
};

export const clearSelectedProject = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_SELECTED_PROJECT,
  });
};

export const loadProjectAction = (projectId, signal) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  try {
    dispatch({
      type: actionTypes.LOAD_PROJECT_REQUEST,
    });

    const { project } = await projectService.get(projectId, activeOrganization?.id, signal);
    Swal.close();
    dispatch({
      type: actionTypes.LOAD_PROJECT_SUCCESS,
      payload: { project },
    });
  } catch (e) {
    if (e === 'AbortError') {
      console.log('Call aborted');
    }
    dispatch({
      type: actionTypes.LOAD_PROJECT_FAIL,
    });
  }
};

export const updateProjectAction = (projectId, data) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  try {
    toast.info('Updating Project ...', {
      position: 'top-center',
      hideProgressBar: true,
      icon: '',
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      autoClose: 5000,
    });
    dispatch({ type: actionTypes.UPDATE_PROJECT_REQUEST });
    const { project } = await projectService.update(projectId, data, activeOrganization.id);
    toast.dismiss();
    toast.success('Project Edited', {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      autoClose: 2500,
    });
    dispatch({
      type: actionTypes.UPDATE_PROJECT_SUCCESS,
      payload: { project },
    });
    // dispatch(allSidebarProjects());
    return project;
  } catch (e) {
    dispatch({ type: actionTypes.UPDATE_PROJECT_FAIL });
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: e.message || 'Something went wrong !',
    });
    return e.message;
  }
};

export const deleteProjectAction = (projectId) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  try {
    dispatch({ type: actionTypes.DELETE_PROJECT_REQUEST });

    await projectService.remove(projectId, activeOrganization.id);

    dispatch({
      type: actionTypes.DELETE_PROJECT_SUCCESS,
      payload: { projectId },
    });
    // dispatch(allSidebarProjects());
  } catch (e) {
    dispatch({ type: actionTypes.DELETE_PROJECT_FAIL });
  }
};

export const uploadProjectThumbnail = (thumbUrl) => ({
  type: actionTypes.UPLOAD_PROJECT_THUMBNAIL,
  payload: { thumbUrl },
});

export const uploadProjectThumbnailAction = (formData) => async (dispatch) => {
  const config = {
    onUploadProgress: (progressEvent) => {
      dispatch({
        type: actionTypes.PROJECT_THUMBNAIL_PROGRESS,
        payload: {
          progress: `Uploaded progress: ${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`,
        },
      });
    },
  };
  const centralizedState = store.getState();
  toast.info('Uploading image...', {
    position: 'top-center',
    hideProgressBar: false,
    icon: '',
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    autoClose: 30000,
  });
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const { thumbUrl } = await projectService.upload(formData, config, activeOrganization.id);
  toast.dismiss();
  dispatch({
    type: actionTypes.UPLOAD_PROJECT_THUMBNAIL,
    payload: { thumbUrl },
  });
  return thumbUrl;
};
export const addMyproject = (page, size, searchQuery) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { currentOrganization },
  } = centralizedState;
  try {
    dispatch({
      type: actionTypes.PAGE_LOADING,
    });
    const response = await projectService.getAll(currentOrganization?.id, page, size, searchQuery);

    dispatch({
      type: actionTypes.ADD_MY_PROJECTS,
      payload: response,
    });
    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });
  }
};
export const loadMyProjectsAction = (page, size, searchQuery) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { currentOrganization },
  } = centralizedState;
  try {
    dispatch({
      type: actionTypes.PAGE_LOADING,
    });
    const response = await projectService.getAll(currentOrganization?.id, page, size, searchQuery);

    dispatch({
      type: actionTypes.LOAD_MY_PROJECTS,
      payload: response,
    });
    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });
  }
};

export const loadMyFavProjectsAction = () => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { currentOrganization },
  } = centralizedState;
  const { projects } = await projectService.getAllFav(currentOrganization?.id);
  dispatch({
    type: actionTypes.SIDEBAR_UPDATE_PROJECT,
    data: { projects },
  });
};

export const loadMyReorderProjectsAction = (projectId, projectDivider) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const reorderProject = [];
  let reorderIndex = 0;
  projectDivider.map((data) => {
    return data.collection.map((collections) => {
      reorderProject.push({
        order: reorderIndex,
        id: collections.id,
        project: collections,
      });
      reorderIndex = reorderIndex + 1;
    });
  });
  const choosenProject = reorderProject.filter((data) => {
    if (data?.id == projectId) {
      return data;
    }
  });
  await projectService.getReorderAll(projectId, activeOrganization?.id, choosenProject[0]?.order);
  dispatch(loadMyProjectsAction());
};

export const loadMyCloneProjectsAction = (page, size, searchQuery) => async (dispatch) => {
  // const centralizedState = store.getState();
  // const {
  //   organization: { activeOrganization },
  // } = centralizedState;
  // const projects = await projectService.getClone(activeOrganization?.id);
  // dispatch({
  //   type: actionTypes.LOAD_MY_CLONE_PROJECTS,
  //   payload: projects,
  // });
  const centralizedState = store.getState();
  const {
    organization: { currentOrganization },
  } = centralizedState;

  try {
    dispatch({
      type: actionTypes.PAGE_LOADING,
    });
    const response = await projectService.getAll(currentOrganization?.id, page, size, searchQuery);
    dispatch({
      type: actionTypes.LOAD_MY_CLONE_PROJECTS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });
    window.scrollTo(0, 0);
  }
};

export const addCloneProjectsAction = (page, size, searchQuery) => async (dispatch) => {
  // const centralizedState = store.getState();
  // const {
  //   organization: { activeOrganization },
  // } = centralizedState;
  // const projects = await projectService.getClone(activeOrganization?.id);
  // dispatch({
  //   type: actionTypes.LOAD_MY_CLONE_PROJECTS,
  //   payload: projects,
  // });
  const centralizedState = store.getState();
  const {
    organization: { currentOrganization },
  } = centralizedState;

  try {
    dispatch({
      type: actionTypes.PAGE_LOADING,
    });
    const response = await projectService.getAll(currentOrganization?.id, page, size, searchQuery);
    dispatch({
      type: actionTypes.ADD_MY_CLONE_PROJECTS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });
    window.scrollTo(0, 0);
  }
};

export const sampleProjects = () => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { currentOrganization },
  } = centralizedState;
  const { projects } = await projectService.getSampleProject(currentOrganization?.id);
  dispatch({
    type: actionTypes.SIDEBAR_SAMPLE_PROJECT,
    data: { projects },
  });
};

export const loadMyProjectsActionPreview = (projectId) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  try {
    dispatch({
      type: actionTypes.PAGE_LOADING,
    });

    const { project } = await projectService.get(projectId, activeOrganization?.id);

    dispatch({
      type: actionTypes.LOAD_MY_PROJECTS_SELECTED,
      payload: { project },
    });

    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });

    throw e;
  }
};

export const toggleProjectShareAction = (projectId, ProjectName, adminPanel = false) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const { project } = await projectService.share(projectId, activeOrganization?.id);

    dispatch({
      type: actionTypes.SHARE_PROJECT,
      payload: { project },
    });
    if (adminPanel) return project;
    const protocol = `${window.location.href.split('/')[0]}//`;
    const url = `${protocol + window.location.host}/project/${projectId}/shared`;
    return SharePreviewPopup(url, ProjectName);
  };

export const toggleProjectShareRemovedAction = (projectId, projectName, adminPanel = false) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const { project } = await projectService.removeShared(activeOrganization?.id, projectId);

    dispatch({
      type: actionTypes.SHARE_PROJECT,
      payload: { project },
    });
    if (adminPanel) return project;
    Swal.fire({
      title: `You stopped sharing <strong>"${projectName}"</strong> !`,
      html: 'Please remember that anyone you have shared this project with, will no longer have access to its contents.',
    });
  };

export const deleteFavObj = (projectId) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  Swal.fire({
    showCancelButton: true,
    confirmButtonColor: '#5952c6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete',
    title: 'Are you sure you want to remove this ?',
  }).then(async (result) => {
    if (result.value) {
      Swal.showLoading();
      await projectService.addToFav(projectId, activeOrganization.id);
      Swal.close();
      dispatch(loadMyFavProjectsAction());
    }
  });
};

export const addProjectFav = (projectId) => async (/* dispatch */) => {
  Swal.showLoading();
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization, currentOrganization },
  } = centralizedState;
  const project = await projectService.addToFav(projectId, activeOrganization.id);

  if (project.message) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonColor: '#5952c6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'My Favorite Projects',
      icon: 'success',
      title: project.message,
    }).then((result) => {
      if (result.value) {
        window.location.href = `/org/${currentOrganization?.domain}/?active=fav`;
      }
    });
  }
};

export const loadMyProjectsPreviewSharedAction = (projectId) => async (dispatch) => {
  try {
    // dispatch({
    //   type: actionTypes.PAGE_LOADING,
    // });

    const { project } = await projectService.getShared(projectId);

    dispatch({
      type: actionTypes.LOAD_MY_PROJECTS_SELECTED,
      payload: { project },
    });

    // dispatch({
    //   type: actionTypes.PAGE_LOADING_COMPLETE,
    // });
  } catch (e) {
    dispatch({
      type: actionTypes.LOAD_MY_PROJECTS_FAILED,
      payload: { error: e },
    });

    throw e;
  }
};

// TODO: need to refactor bottom functions

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
      }
    )
    .then((response) => {
      if (response.data.status === 'error' || response.status !== 200) {
        console.log(`Error: ${response.data.message}`);
      }
    })
    .catch((error) => {
      throw error;
    });
};

// opens a project modal both for new
export const showCreateProjectModal = () => ({
  type: actionTypes.SHOW_CREATE_PROJECT_MODAL,
});

export const showCreateProjectModalAction = () => async (dispatch) => {
  dispatch(showCreateProjectModal());
};

// LMS action starts from here
export const loadLmsAction = () => async (dispatch) => {
  const { settings } = await projectService.lmsSetting();
  dispatch({
    type: actionTypes.SHOW_LMS,
    lmsInfo: settings,
  });
};

export const ShareLMS = (playlistId, LmsTokenId, lmsName, lmsUrl, playlistName, projectName) => {
  const { token } = JSON.parse(localStorage.getItem('auth'));

  Swal.fire({
    title: `This playlist will be added to course <strong>${projectName}</strong>. If the course does not exist, it will be created. `,
    text: 'Would you like to proceed?',
    showCancelButton: true,
    confirmButtonColor: '#5952c6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Continue',
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        icon: loaderImg,
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
          }
        )
        .then((res) => {
          if (res.data.status === 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Published!',
              confirmButtonColor: '#5952c6',
              html: `Your playlist has been published to <a target="_blank" href="${lmsUrl}"> ${lmsUrl}</a>`,
              //   text: `Your playlist has been submitted to ${lmsUrl}`,
            });
          }
        })
        .catch(() => {
          Swal.fire({
            confirmButtonColor: '#5952c6',
            icon: 'error',
            text: 'Something went wrong, Kindly try again',
          });
        });
    }
  });
};

export const getProjectCourseFromLMS = (lms, settingId, projectId, playlist, lmsUrl) => async (dispatch, getState) => {
  const response = await toast.promise(
    projectService.fetchLmsDetails(lms, projectId, settingId),
    {
      pending: 'Fetching information...',
      success: 'Information fetched!',
      error: 'Error fetching information',
    },
    {
      className: 'project-loading',
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 10000,
      closeOnClick: false,
      closeButton: false,
    },
  );
  const globalStoreClone = getState();
  if (response) {
    dispatch({
      type: actionTypes.SET_LMS_COURSE,
      lmsCourse: response.project,
      allstate: globalStoreClone,
    });
    toast.dismiss();
    Swal.fire({
      title: `This Project will be added to ${lms}. If the Project does not exist, it will be created.`,
      text: 'Would you like to proceed?',
      showCancelButton: true,
      confirmButtonColor: '#5952c6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continue',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: loaderImg,
          title: 'Publishing....',
          showCancelButton: false,
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        const globalStoreCloneUpdated = getState();

        // eslint-disable-next-line no-inner-declarations
        async function asyncFunc() {
          for (let x = 0; x < playlist.length; x += 1) {
            // eslint-disable-next-line operator-linebreak
            const counter =
              !!globalStoreCloneUpdated.project.lmsCourse && globalStoreCloneUpdated.project.lmsCourse.playlistsCopyCounter.length > 0
                ? globalStoreCloneUpdated.project.lmsCourse.playlistsCopyCounter[x].counter
                : 0;

            // eslint-disable-next-line no-await-in-loop
            await projectService.lmsPublish(lms, projectId, settingId, counter, playlist[x].id);

            if (x + 1 === playlist.length) {
              Swal.fire({
                icon: 'success',
                title: 'Published!',
                confirmButtonColor: '#5952c6',
                html: `Your Project has been published to <a target="_blank" href="${lmsUrl}">${lmsUrl}</a>`,
                // text: `Your playlist has been submitted to ${lmsUrl}`,
              });
            }
          }
        }
        if (playlist.length > 0) {
          asyncFunc();
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'No playlist available',
            confirmButtonColor: '#5952c6',
          });
        }
      }
    });
  }
  // else{
  //   Swal.fire("Unable to share")
  // }
};

export const setLmsCourse = (course, allstate) => ({
  type: actionTypes.SET_LMS_COURSE,
  lmsCourse: course,
  allstate,
});

export const getProjectCourseFromLMSPlaylist = (playlistId, settingId, lms, lmsUrl, projectId) => async (dispatch) => {
  Swal.fire({
    icon: loaderImg,
    title: 'Fetching Information....',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  const response = await projectService.fetchLmsDetails(lms, projectId, settingId);
  if (response.project) {
    const globalStoreClone = store.getState();
    dispatch(setLmsCourse(response.project, globalStoreClone));

    Swal.fire({
      title: `This Playlist will be added to ${lms}. If the Playlist does not exist, it will be created. `,
      text: 'Would you like to proceed?',
      showCancelButton: true,
      confirmButtonColor: '#5952c6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continue',
    }).then(async (result) => {
      if (result.value) {
        Swal.fire({
          icon: loaderImg,
          title: 'Publishing....',
          showCancelButton: false,
          showConfirmButton: false,
          allowOutsideClick: false,
        });

        const globalStore = store.getState();
        const playlistCounter = !!globalStore.project.lmsCourse && globalStore.project.lmsCourse.playlistsCopyCounter ? globalStore.project.lmsCourse.playlistsCopyCounter : [];

        let counterId = 0;
        playlistCounter.forEach((p) => {
          if (playlistId === p.playlist_id) {
            counterId = p.counter;
          }
        });

        await projectService.lmsPublish(lms, projectId, settingId, counterId, playlistId);

        Swal.fire({
          icon: 'success',
          title: 'Published!',
          confirmButtonColor: '#5952c6',
          html: `Your Project has been published to <a target="_blank" href="${lmsUrl}">${lmsUrl}</a>`,
          // text: `Your playlist has been submitted to ${lmsUrl}`,
        });
      }
    });
  }
};

export const loadMyProjectsLtiAction = (lmsUrl, ltiClientId) => async (dispatch) => {
  try {
    const data = {
      lms_url: lmsUrl,
      lti_client_id: ltiClientId,
    };
    const response = await projectService.deepLinking(data);

    if (response.projects) {
      let projects = [];
      projects = response.projects;

      dispatch({
        type: actionTypes.LOAD_MY_PROJECTS,
        payload: { projects },
      });
    }
  } catch (e) {
    console.log(e);
  }
};

// export const updatedProject = (userId) => async () => {
//   const echo = new Echo(socketConnection.notificationSocket());

//   echo.private('project-update')
//     .listen('ProjectUpdatedEvent', (msg) => {
//       if (msg.userId !== userId) {
//         const path = window.location.pathname;
//         if (path.includes(`project/${msg.projectId}`)) {
//           Swal.fire({
//             title: 'This project has been modified by other team member. Are you ok to refresh page to see what is updated?',
//             showDenyButton: true,
//             showCancelButton: true,
//             confirmButtonText: 'Yes',
//             denyButtonText: 'No',
//           })
//             .then((result) => {
//               if (result.isConfirmed) {
//                 window.location.reload();
//               }
//             });
//         }
//       }
//     });
// };

export const clearProjectSelected = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_PROJECT_SELECT,
  });
};

export const searchPreviewProjectAction = (projectId) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const { project } = await projectService.searchPreviewProject(activeOrganization?.id, projectId);
  dispatch({
    type: actionTypes.SEARCH_PREVIEW_PROJECT,
    payload: project,
  });
};

export const exportProjectsToNoovo = (projectId, teamId) => async () => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  try {
    const result = await projectService.exportProjectsToNoovo(activeOrganization?.id, projectId, teamId);
    return result.message;
  } catch (err) {
    return err.message;
  }
};
