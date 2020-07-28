import axios from "axios";
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
  SET_LMS_COURSE,
} from "../constants/actionTypes";
import { editResource } from "./resource";
import loaderimg from "../images/loader.svg";
import SharePreviewPopup from "../helpers/SharePreviewPopup";
import { store } from "../index.js";

// Publishes the project in LEARN
export const shareProject = (project) => ({
  type: SHARE_PROJECT,
  project: project,
});

// Publishes the project in LEARN
export const shareProjectAction = (projectId) => {
  return async (dispatch) => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    const response = axios
      .post(
        "/api/shareproject",
        {
          projectId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        if (response.data.status == "error" || response.status != 200) {
          console.log("Error: " + response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Loads a specific project
export const loadProject = (project) => ({
  type: LOAD_PROJECT,
  project: project,
});

//gets the data of project based on project id from the server
// populates the data to the edit form
export const loadProjectAction = (projectId) => {
  return async (dispatch) => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    const response = await axios.post(
      "/api/loadproject",
      {
        projectId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.data.status == "success")
      dispatch(loadProject(response.data.data.project));
  };
};

//when user clicks on header plus button it opens dropdown menu

export const showCreateProjectSubmenu = () => ({
  type: SHOW_CREATE_PROJECT_SUBMENU,
});

export const showUserSubMenu = () => ({
  type: SHOW_USER_SUB_MENU,
});

export const closeMenu = () => ({
  type: CLOSE_MENU,
});

export const closeMenuAction = () => {
  return async (dispatch) => {
    try {
      dispatch(closeMenu());
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const showCreateProjectSubmenuAction = () => {
  return async (dispatch) => {
    try {
      dispatch(showCreateProjectSubmenu());
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const showUserSubMenuAction = () => {
  return async (dispatch) => {
    try {
      dispatch(showUserSubMenu());
    } catch (e) {
      throw new Error(e);
    }
  };
};

// opens a project modal both for new

export const showCreateProjectModal = () => ({
  type: SHOW_CREATE_PROJECT_MODAL,
});

export const showCreateProjectModalAction = () => {
  return async (dispatch) => {
    try {
      dispatch(showCreateProjectModal());
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const createProject = (projectdata) => ({
  type: CREATE_PROJECT,
  projectdata,
});

//This method sends two different request based on request parameter
//request parameter can be create / update
// if request = create it sends request to create a Project
//if request = update it sends request to udpate the resource

export const createUpdateProject = async (
  url,
  request,
  name,
  description,
  thumb_url
) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("auth"));

    const data = {
      name,
      description,
      thumb_url,
    };
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    var response = {};
    if (request == "create") {
      response = await axios.post(url, data, config);
    } else if (request == "update") {
      response = await axios.put(url, data, config);
    }

    if (response.data.status == "success") {
      const projectdata = {
        _id: response.data.data._id,
        name: response.data.data.name,
        thumb_url: response.data.data.thumb_url,
        userid: response.data.data.userid,
      };
      return projectdata;
    }
  } catch (e) {
    throw new Error(e);
  }
};

//create project request
//@params, name, description, thumb_url is sent to the server
//upon success redux states appends the project to already created projects

export const createProjectAction = (name, description, thumb_url) => {
  return async (dispatch) => {
    try {
      const projectdata = await createUpdateProject(
        "/api/project",
        "create",
        name,
        description,
        thumb_url
      );
      dispatch(createProject(projectdata));
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const updateProject = (projectdata) => ({
  type: UPDATE_PROJECT,
  projectdata,
});

//edit project data is sent to the server for updates

export const updateProjectAction = (
  projectid,
  name,
  description,
  thumb_url
) => {
  return async (dispatch) => {
    try {
      const projectdata = await createUpdateProject(
        "/api/project/" + projectid,
        "update",
        name,
        description,
        thumb_url
      );
      dispatch(updateProject(projectdata));
    } catch (e) {
      throw new Error(e);
    }
  };
};

//loadLMS

//load projects of current logged in user

//LMS action starts from here
export const LoadLMS = () => {
  return async (dispatch) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("auth"));
      const response = await axios.get(
        global.config.laravelAPIUrl + "go/lms-manager/get-user-settings",

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(loadLMSdata(response.data.data));
      console.log("response", response);
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const ShareLMS = (
  playlistId,
  LmsTokenId,
  lmsName,
  lmsUrl,
  playlistName,
  projectName
) => {
  const { token } = JSON.parse(localStorage.getItem("auth"));

  Swal.fire({
    title: `This playlist will be added to course <strong>${projectName}</strong>. If the course does not exist, it will be created. `,
    text: "Would you like to proceed?",

    showCancelButton: true,
    confirmButtonColor: "#5952c6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Continue",
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        iconHtml: loaderimg,
        title: "Publishing....",

        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
      });

      axios
        .post(
          global.config.laravelAPIUrl + `/go/${lmsName}/publish/playlist`,
          { setting_id: LmsTokenId, playlist_id: playlistId },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.status == "success") {
            Swal.fire({
              icon: "success",
              title: "Published!",
              confirmButtonColor: "#5952c6",
              html: `Your playlist has been published to <a target="_blank" href="${lmsUrl}"> ${lmsUrl}</a>`,
              //   text: `Yo'ur playlist has been submitted to ${lmsUrl}`,
            });
          }
        })
        .catch((e) => {
          Swal.fire({
            confirmButtonColor: "#5952c6",
            icon: "error",
            text: "Something went wrong, Kindly try again",
          });
        });
    }
  });
};

export const loadLMSdata = (lmsInfo) => ({
  type: SHOW_LMS,
  lmsInfo,
});

export const changeloader = (change) => {
  return {
    type: CHANGE_LOADING,
    change,
  };
};

//LMS action ENDS from here

export const loadMyProjects = (projects) => ({
  type: LOAD_MY_PROJECTS,
  projects,
});

export const loadMyProjectsselected = (projects) => {
  return {
    type: LOAD_MY_PROJECTS_SELECTED,
    projects,
  };
};

//load projects of current logged in user

export const loadMyProjectsAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PAGE_LOADING,
      });
      const { token } = JSON.parse(localStorage.getItem("auth"));
      const response = await axios.post(
        global.config.laravelAPIUrl + "/myprojects",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.status == "success") {
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
};

//load project preview

export const loadMyProjectsActionPreview = (projectId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PAGE_LOADING,
      });
      const { token } = JSON.parse(localStorage.getItem("auth"));
      const response = await axios.get(
        global.config.laravelAPIUrl + "/project?projectId=" + projectId,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.status == "success") {
        dispatch(loadMyProjectsselected(response.data.data.project));
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
};

//load project shared view
export const loadMyProjectsActionPreviewShared = (projectId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        global.config.laravelAPIUrl +
          "/get-shared-project?projectId=" +
          projectId
      );

      if (response.data.status == "success") {
        dispatch(loadMyProjectsselected(response.data.data.project));
        dispatch({
          type: PAGE_LOADING_COMPLETE,
        });
      } else {
        dispatch(loadMyProjectsselected(response.data));
      }
    } catch (e) {
      throw new Error(e);
    }
  };
};

//toggle project share

export const toggleProjectshare = async (projectId, ProjectName) => {
  const { token } = JSON.parse(localStorage.getItem("auth"));
  const response = await axios.post(
    global.config.laravelAPIUrl + "/share-project",
    { projectId },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (response.data.status == "success") {
    let protocol = window.location.href.split("/")[0] + "//";
    let url = `${
      protocol + window.location.host
    }/project/shared/${projectId.trim()}`;
    return SharePreviewPopup(url, ProjectName);
  }
};
export const toggleProjectshareremoved = async (projectId, ProjectName) => {
  const { token } = JSON.parse(localStorage.getItem("auth"));
  const response = await axios.post(
    global.config.laravelAPIUrl + "/remove-share-project",
    { projectId },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (response.data.status == "success") {
    Swal.fire({
      title: `You stopped sharing <strong>"${ProjectName}"</strong> ! `,
      html: `Please remember that anyone you have shared this project with, will no longer have access to its contents.`,
    });
  }
};

export const deleteProject = (projectid) => ({
  type: DELETE_PROJECT,
  projectid,
});

//deletes project
export const deleteProjectAction = (projectid) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/project/${projectid}`, {
        projectid,
      });

      if (response.data.status == "success") {
        dispatch(deleteProject(projectid));
      }
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const uploadProjectThumbnail = (thumb_url) => ({
  type: UPLOAD_PROJECT_THUMBNAIL,
  thumb_url,
});

export const projectThumbnailProgress = (progress) => ({
  type: PROJECT_THUMBNAIL_PROGRESS,
  progress,
});

//uploads project thumbnail
export const uploadProjectThumbnailAction = (formData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          dispatch(
            projectThumbnailProgress(
              "Uploaded progress: " +
                Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                "%"
            )
          );
        },
      };
      return axios
        .post(
          global.config.laravelAPIUrl + "/post-upload-image",
          formData,
          config
        )
        .then((response) => {
          dispatch(uploadProjectThumbnail(response.data.data.guid));
        });
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const getProjectCourseFromLMS = (
  lms,
  setting_id,
  project_id,
  playslist,
  lmsUrl
) => {
  return (dispatch) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        /*dispatch(
          projectThumbnailProgress(
            "Uploaded progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          )
        );*/
      },
    };

    let formData = { setting_id, project_id };
    Swal.fire({
      iconHtml: loaderimg,
      title: "Fetchnig Information....",

      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    return axios
      .post(
        global.config.laravelAPIUrl + "/go/" + lms + "/fetch/course",
        formData
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(setLmsCourse(response.data.data));
          const globalstoreClone = store.getState();
          const counterarray = [];
          if (response.data.data.playlists.length > 0) {
          } else {
          }
          const { token } = JSON.parse(localStorage.getItem("auth"));
          Swal.fire({
            title: `This Project will be added to ${lms}. If the Project does not exist, it will be created. `,
            text: "Would you like to proceed?",

            showCancelButton: true,
            confirmButtonColor: "#5952c6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continue",
          }).then((result) => {
            if (result.value) {
              Swal.fire({
                iconHtml: loaderimg,
                title: "Publishing....",

                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
              });

              const allplay = playslist.map((eachPlaylist, counter) => {
                return axios.post(
                  global.config.laravelAPIUrl + `/go/${lms}/publish/playlist`,
                  {
                    setting_id: setting_id,
                    playlist_id: eachPlaylist._id,
                    counter:
                      !!globalstoreClone.project.lms_course &&
                      globalstoreClone.project.lms_course.playlists_copy_counter
                        .length > 0
                        ? globalstoreClone.project.lms_course
                            .playlists_copy_counter[counter].counter
                        : 0,
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  }
                );
              });
              console.log(allplay);
              axios
                .all(allplay)
                .then((res) => {
                  console.log(res);
                  if (!!res) {
                    Swal.fire({
                      icon: "success",
                      title: "Published!",
                      confirmButtonColor: "#5952c6",
                      html: `Your Project has been published to <a target="_blank" href="${lmsUrl}"> ${lmsUrl}</a>`,
                      //   text: `Yo'ur playlist has been submitted to ${lmsUrl}`,
                    });
                  }
                })
                .catch((e) => {
                  Swal.fire({
                    confirmButtonColor: "#5952c6",
                    icon: "error",
                    text: "Something went wrong, Kindly try again",
                  });
                });
            }
          });
        }
      });
  };
};

export const setLmsCourse = (course) => {
  return {
    type: SET_LMS_COURSE,
    lms_course: course,
  };
};
