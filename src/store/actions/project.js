/* eslint-disable max-len */
import axios from 'axios';
import Swal from 'sweetalert2';

import loaderImg from 'assets/images/loader.svg';
import SharePreviewPopup from 'components/SharePreviewPopup';
import projectService from 'services/project.service';
import * as actionTypes from '../actionTypes';

export const createProjectAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_PROJECT_REQUEST });

    const { project } = await projectService.create(data);

    dispatch({
      type: actionTypes.CREATE_PROJECT_SUCCESS,
      payload: { project },
    });
  } catch (e) {
    dispatch({ type: actionTypes.CREATE_PROJECT_FAIL });

    throw e;
  }
};

export const loadProjectAction = (projectId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOAD_PROJECT_REQUEST,
    });

    const { project } = await projectService.get(projectId);

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

export const updateProjectAction = (projectId, data) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_PROJECT_REQUEST });

    const { project } = await projectService.update(projectId, data);

    dispatch({
      type: actionTypes.UPDATE_PROJECT_SUCCESS,
      payload: { project },
    });
  } catch (e) {
    dispatch({ type: actionTypes.UPDATE_PROJECT_FAIL });

    throw e;
  }
};

export const deleteProjectAction = (projectId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_PROJECT_REQUEST });

    await projectService.remove(projectId);

    dispatch({
      type: actionTypes.DELETE_PROJECT_SUCCESS,
      payload: { projectId },
    });
  } catch (e) {
    dispatch({ type: actionTypes.DELETE_PROJECT_FAIL });

    throw e;
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

  const { thumbUrl } = await projectService.upload(formData, config);

  dispatch({
    type: actionTypes.UPLOAD_PROJECT_THUMBNAIL,
    payload: { thumbUrl },
  });
};

export const loadMyProjectsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.PAGE_LOADING,
    });

    const { projects } = await projectService.getAll();

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

    throw e;
  }
};

export const loadMyProjectsActionPreview = (projectId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.PAGE_LOADING,
    });

    const { project } = await projectService.get(projectId);

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
  const { project } = await projectService.share(projectId);

  dispatch({
    type: actionTypes.SHARE_PROJECT,
    payload: { project },
  });

  const protocol = `${window.location.href.split('/')[0]}//`;
  const url = `${protocol + window.location.host}/project/shared/${projectId}`;
  return SharePreviewPopup(url, ProjectName);
};

export const toggleProjectShareRemovedAction = (projectId, projectName) => async (dispatch) => {
  const { project } = await projectService.removeShared(projectId);

  dispatch({
    type: actionTypes.SHARE_PROJECT,
    payload: { project },
  });

  Swal.fire({
    title: `You stopped sharing <strong>"${projectName}"</strong> !`,
    html: 'Please remember that anyone you have shared this project with, will no longer have access to its contents.',
  });
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
      console.log(error);
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
export const loadLmsAction = () => async (/* dispatch */) => {
  // try {
  //   const { token } = JSON.parse(localStorage.getItem('auth'));
  //   const response = await axios.get(
  //     `${global.config.laravelAPIUrl}go/lms-manager/get-user-settings`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     },
  //   );
  //
  //   dispatch({
  //     type: actionTypes.SHOW_LMS,
  //     lmsInfo: response.data.data,
  //   });
  // } catch (e) {
  //   throw e;
  // }
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

// load project shared view
export const loadMyProjectsActionPreviewShared = (/* projectId */) => async (/* dispatch */) => {
  // try {
  //   const response = await axios.get(`${global.config.laravelAPIUrl}/get-shared-project?projectId=${projectId}`);
  // {
  //   type: actionTypes.LOAD_MY_PROJECTS_SELECTED,
  //     payload: { project },
  // }
  //   if (response.data.status === 'success') {
  //     dispatch(loadMyProjectsSelected(response.data.data.project));
  //     dispatch({
  //       type: actionTypes.PAGE_LOADING_COMPLETE,
  //     });
  //   } else {
  //     dispatch(loadMyProjectsSelected(response.data));
  //   }
  // } catch (e) {
  //   throw e;
  // }
};

export const getProjectCourseFromLMS = (
  lms,
  settingId,
  projectId,
  playlist,
  lmsUrl,
) => (dispatch, getState) => {
  const formData = { settingId, projectId };
  Swal.fire({
    iconHtml: loaderImg,
    title: 'Fetching Information....',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  return axios
    .post(`${global.config.laravelAPIUrl}/go/${lms}/fetch/course`, formData)
    .then((response) => {
      if (response.data.status === 'success') {
        dispatch({
          type: actionTypes.SET_LMS_COURSE,
          lmsCourse: response.data.data,
        });

        const globalStoreClone = getState();

        const { token } = JSON.parse(localStorage.getItem('auth'));
        Swal.fire({
          title: `This Project will be added to ${lms}. If the Project does not exist, it will be created. `,
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

            // eslint-disable-next-line no-inner-declarations
            async function asyncFunc() {
              for (let x = 0; x < playlist.length; x += 1) {
                // eslint-disable-next-line no-await-in-loop
                await axios
                  .post(
                    `${global.config.laravelAPIUrl}/go/${lms}/publish/playlist`,
                    {
                      settingId,
                      playlistId: playlist[x].id,
                      counter:
                        !!globalStoreClone.project.lmsCourse
                        && globalStoreClone.project.lmsCourse.playlistsCopyCounter
                          .length > 0
                          ? globalStoreClone.project.lmsCourse
                            .playlistsCopyCounter[x].counter
                          : 0,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    },
                  )
                  .then(() => {
                    if (x + 1 === playlist.length) {
                      Swal.fire({
                        icon: 'success',
                        title: 'Published!',
                        confirmButtonColor: '#5952c6',
                        html: `Your Project has been published to <a target="_blank" href="${lmsUrl}"> ${lmsUrl}</a>`,
                        // text: `Yo'ur playlist has been submitted to ${lmsUrl}`,
                      });
                    }
                  });
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

            // const allplay = playlist.map((eachPlaylist, counter) => {
            //   return axios.post(
            //     global.config.laravelAPIUrl + `/go/${lms}/publish/playlist`,
            //     {
            //       settingId,
            //       playlistId,
            //       counter:
            //         !!globalStoreClone.project.lmsCourse &&
            //         globalStoreClone.project.lmsCourse.playlistsCopyCounter
            //           .length > 0
            //           ? globalStoreClone.project.lmsCourse.playlistsCopyCounter[counter].counter
            //           : 0,
            //     },
            //     {
            //       headers: {
            //         Authorization: "Bearer " + token,
            //       },
            //     }
            //   );
            // });

            // const syncRequest = allplay[Symbol.iterator]();

            // axios
            //   .all(allplay)
            //   .then((res) => {
            //     if (!!res) {
            //       Swal.fire({
            //         icon: 'success',
            //         title: 'Published!',
            //         confirmButtonColor: '#5952c6',
            //         html: `Your Project has been published to <a target="_blank" href="${lmsUrl}">${lmsUrl}</a>`,
            //         // text: `Yo'ur playlist has been submitted to ${lmsUrl}`,
            //       });
            //     }
            //   })
            //   .catch((e) => {
            //     Swal.fire({
            //       confirmButtonColor: '#5952c6',
            //       icon: 'error',
            //       text: 'Something went wrong, Kindly try again',
            //     });
            //   });
          }
        });
      }
    });
};
