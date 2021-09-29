import axios from 'axios';
import Swal from 'sweetalert2';
import Echo from 'laravel-echo';

import loaderImg from 'assets/images/loader.svg';
import SharePreviewPopup from 'components/SharePreviewPopup';
import projectService from 'services/project.service';
import groupService from 'services/group.service';
import teamService from 'services/team.service';
import socketConnection from 'services/http.service';
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
export const allSidebarProjects = () => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  const { projects } = await projectService.getAll(activeOrganization.id);
  const { teams } = await teamService.getAll(activeOrganization.id);
  const { groups } = await groupService.getAll(activeOrganization.id);
  dispatch({
    type: actionTypes.SIDEBAR_ALL_PROJECT,
    data: { projects, teams, groups },
  });
};
export const createProjectAction = (data) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  try {
    dispatch({ type: actionTypes.CREATE_PROJECT_REQUEST });
    Swal.showLoading();
    const { project } = await projectService.create(data, activeOrganization.id);
    Swal.close();
    dispatch({
      type: actionTypes.CREATE_PROJECT_SUCCESS,
      payload: { project },
    });
    dispatch(allSidebarProjects());
  } catch (e) {
    dispatch({ type: actionTypes.CREATE_PROJECT_FAIL });
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: e.message || 'Something went wrong !',
    });
  }
};

export const loadProjectAction = (projectId) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  try {
    dispatch({
      type: actionTypes.LOAD_PROJECT_REQUEST,
    });

    const { project } = await projectService.get(projectId, activeOrganization?.id);
    Swal.close();
    dispatch({
      type: actionTypes.LOAD_PROJECT_SUCCESS,
      payload: { project },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.LOAD_PROJECT_FAIL,
    });
  }
};

export const getIndexed = (projectId) => async () => {
  const result = await projectService.getIndexed(projectId);
  return result;
};

export const getElastic = (projectId) => async () => {
  const result = await projectService.getelastic(projectId);
  return result;
};

export const updateProjectAction = (projectId, data) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  try {
    dispatch({ type: actionTypes.UPDATE_PROJECT_REQUEST });
    Swal.showLoading();
    const { project } = await projectService.update(projectId, data, activeOrganization.id);
    dispatch({
      type: actionTypes.UPDATE_PROJECT_SUCCESS,
      payload: { project },
    });
    Swal.close();
    dispatch(allSidebarProjects());
    return project;
  } catch (e) {
    dispatch({ type: actionTypes.UPDATE_PROJECT_FAIL });
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: e.message || 'Something went wrong !',
    });
    return e;
  }
};

export const deleteProjectAction = (projectId) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  try {
    dispatch({ type: actionTypes.DELETE_PROJECT_REQUEST });

    await projectService.remove(projectId, activeOrganization.id);

    dispatch({
      type: actionTypes.DELETE_PROJECT_SUCCESS,
      payload: { projectId },
    });
    dispatch(allSidebarProjects());
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
          progress: `Uploaded progress: ${Math.round(
            (progressEvent.loaded / progressEvent.total) * 100,
          )}%`,
        },
      });
    },
  };
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  const { thumbUrl } = await projectService.upload(formData, config, activeOrganization.id);

  dispatch({
    type: actionTypes.UPLOAD_PROJECT_THUMBNAIL,
    payload: { thumbUrl },
  });
  return thumbUrl;
};

export const loadMyProjectsAction = () => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  try {
    dispatch({
      type: actionTypes.PAGE_LOADING,
    });
    const { projects } = await projectService.getAll(activeOrganization?.id);

    dispatch({
      type: actionTypes.LOAD_MY_PROJECTS,
      payload: { projects },
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
  const { organization: { activeOrganization } } = centralizedState;
  const { projects } = await projectService.getAllFav(activeOrganization.id);
  dispatch({
    type: actionTypes.SIDEBAR_UPDATE_PROJECT,
    data: { projects },
  });
};

/* eslint-disable */
export const loadMyReorderProjectsAction = (projectDivider) => async () => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  const reorderProject = [];
  let reorderIndex = 0;
  projectDivider.map((data) => {
    return data.collection.map((collections) => {
      reorderProject.push({
        order: reorderIndex,
        id: collections.id,
        project: collections
      });
      reorderIndex = reorderIndex + 1;
    });
  });

  return await projectService.getReorderAll(reorderProject, activeOrganization?.id);
};
/* eslint-enable */

export const loadMyCloneProjectsAction = () => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  const projects = await projectService.getClone(activeOrganization?.id);
  dispatch({
    type: actionTypes.LOAD_MY_CLONE_PROJECTS,
    payload: projects,
  });
};

export const sampleProjects = () => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  const { projects } = await projectService.getSampleProject(activeOrganization.id);
  dispatch({
    type: actionTypes.SIDEBAR_SAMPLE_PROJECT,
    data: { projects },
  });
};

// export const allUpdateProject = () => async (dispatch) => {
//   const { projects } = await projectService.getUpdatedProjects();
//   dispatch({
//     type: actionTypes.SIDEBAR_UPDATE_PROJECT,
//     data: { projects },
//   });
// };

export const loadMyProjectsActionPreview = (projectId) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
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

export const toggleProjectShareAction = (projectId, ProjectName) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  const { project } = await projectService.share(projectId, activeOrganization?.id);

  dispatch({
    type: actionTypes.SHARE_PROJECT,
    payload: { project },
  });

  const protocol = `${window.location.href.split('/')[0]}//`;
  const url = `${protocol + window.location.host}/studio/project/${projectId}/shared`;
  return SharePreviewPopup(url, ProjectName);
};

export const toggleProjectShareRemovedAction = (projectId, projectName) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  const { project } = await projectService.removeShared(activeOrganization?.id, projectId);

  dispatch({
    type: actionTypes.SHARE_PROJECT,
    payload: { project },
  });

  Swal.fire({
    title: `You stopped sharing <strong>"${projectName}"</strong> !`,
    html: 'Please remember that anyone you have shared this project with, will no longer have access to its contents.',
  });
};

export const deleteFavObj = (projectId) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  Swal.fire({
    showCancelButton: true,
    confirmButtonColor: '#5952c6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete',
    title: 'Are you sure you want to remove this ?',
  })
    .then(async (result) => {
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
  const { organization: { activeOrganization, currentOrganization } } = centralizedState;
  const project = await projectService.addToFav(projectId, activeOrganization.id);

  if (project.message) {
    Swal.fire({
      showCancelButton: true,
      confirmButtonColor: '#5952c6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'My Favorite Projects',
      icon: 'success',
      title: project.message,
    })
      .then((result) => {
        if (result.value) {
          window.location.href = `/studio/org/${currentOrganization?.domain}/?active=fav`;
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
      },
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

export const ShareLMS = (
  playlistId,
  LmsTokenId,
  lmsName,
  lmsUrl,
  playlistName,
  projectName,
) => {
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

export const getProjectCourseFromLMS = (
  lms,
  settingId,
  projectId,
  playlist,
  lmsUrl,
) => async (dispatch, getState) => {
  Swal.fire({
    iconHtml: loaderImg,
    title: 'Fetching Information....',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  const response = await projectService.fetchLmsDetails(lms, projectId, settingId);
  const globalStoreClone = getState();
  if (response) {
    dispatch({
      type: actionTypes.SET_LMS_COURSE,
      lmsCourse: response.project,
      allstate: globalStoreClone,
    });

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
          iconHtml: loaderImg,
          title: 'Publishing....',
          showCancelButton: false,
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        const globalStoreCloneUpdated = getState();
        // eslint-disable-next-line no-inner-declarations
        async function asyncFunc() {
          for (let x = 0; x < playlist.length; x += 1) {
            // eslint-disable-next-line no-await-in-loop
            const counter = !!globalStoreCloneUpdated.project.lmsCourse
            && globalStoreCloneUpdated.project.lmsCourse.playlistsCopyCounter
              .length > 0
              ? globalStoreCloneUpdated.project.lmsCourse
                .playlistsCopyCounter[x].counter
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

export const getProjectCourseFromLMSPlaylist = (
  playlistId,
  settingId,
  lms,
  lmsUrl,
  projectId,
) => async (dispatch) => {
  Swal.fire({
    iconHtml: loaderImg,
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
          iconHtml: loaderImg,
          title: 'Publishing....',
          showCancelButton: false,
          showConfirmButton: false,
          allowOutsideClick: false,
        });

        const globalStore = store.getState();
        const playlistCounter = !!globalStore.project.lmsCourse && globalStore.project.lmsCourse.playlistsCopyCounter
          ? globalStore.project.lmsCourse.playlistsCopyCounter
          : [];

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

export const updatedProject = (userId) => async () => {
  const echo = new Echo(socketConnection.notificationSocket());

  echo.private('project-update')
    .listen('ProjectUpdatedEvent', (msg) => {
      if (msg.userId !== userId) {
        const path = window.location.pathname;
        if (path.includes(`project/${msg.projectId}`)) {
          Swal.fire({
            title: 'This project has been modified by other team member. Are you ok to refresh page to see what is updated?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
          })
            .then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
        }
      }
    });
};
