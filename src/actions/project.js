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
  UPLOAD_PROJECT_THUMBNAIL
} from "../constants/actionTypes";

// Loads a specific project
export const loadProject = (project) => ({
  type: LOAD_PROJECT,
  project: project
});

//gets the data of project based on project id from the server
// populates the data to the edit form
export const loadProjectAction = (projectId) => {
  return async dispatch => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    const response = await axios.post(
      '/api/loadproject',
      { projectId },
      { headers: { "Authorization": "Bearer " + token } }
    );

    if (response.data.status == "success")
      dispatch(loadProject(response.data.data.project));
  };
};



//when user clicks on header plus button it opens dropdown menu

export const showCreateProjectSubmenu = () => ({
  type: SHOW_CREATE_PROJECT_SUBMENU
});

export const showCreateProjectSubmenuAction = () => {
  return async dispatch => {
    try {
      dispatch(
        showCreateProjectSubmenu()
      )
    } catch (e) {
      throw new Error(e);
    }
  }
}

// opens a project modal both for new

export const showCreateProjectModal = () => ({
  type: SHOW_CREATE_PROJECT_MODAL
});

export const showCreateProjectModalAction = () => {
  return async dispatch => {
    try {
      dispatch(
        showCreateProjectModal()
      )
    } catch (e) {
      throw new Error(e);
    }
  }
}



export const createProject = (projectdata) => ({
  type: CREATE_PROJECT,
  projectdata
});


//This method sends two different request based on request parameter
//request parameter can be create / update
// if request = create it sends request to create a Project
//if request = update it sends request to udpate the resource

export const createUpdateProject = async (url, request, name, description, thumb_url) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("auth"));

    const data = {
      name,
      description,
      thumb_url
    }
    const config = {
      headers: {
        "Authorization": "Bearer " + token
      }
    };
    var response = {};
    if(request == 'create'){
      response = await axios.post(
        url,
        data,
        config
      );
    } else if(request == 'update'){ 
      response = await axios.put(
        url,
        data,
        config
      );
    }
    

    if (response.data.status == "success") {
      const projectdata = {
        _id: response.data.data._id,
        name: response.data.data.name,
        thumb_url: response.data.data.thumb_url,
        userid: response.data.data.userid
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
  return async dispatch => {
    try {
      const projectdata = await createUpdateProject('/api/project', 'create', name, description, thumb_url);
      dispatch(
        createProject(projectdata)
      );
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const updateProject = (projectdata) => ({
  type: UPDATE_PROJECT,
  projectdata
});


//edit project data is sent to the server for updates

export const updateProjectAction = (projectid, name, description, thumb_url) => {
  return async dispatch => {
    try {
      const projectdata = await createUpdateProject('/api/project/' + projectid, 'update', name, description, thumb_url);
      dispatch(
        updateProject(projectdata)
      );
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const loadMyProjects = (projects) => ({
  type: LOAD_MY_PROJECTS,
  projects
});

//load projects of current logged in user

export const loadMyProjectsAction = () => {
  return async dispatch => {
    try {
      dispatch({ type: PAGE_LOADING });
      const { token } = JSON.parse(localStorage.getItem("auth"));
      const response = await axios.post(

        global.config.laravelAPIUrl + '/myprojects',
        {},
        {
          headers: {
            "Authorization": "Bearer " + token
          }
        }
      );

      if (response.data.status == "success") {
        let projects = [];
        projects = response.data.data.projects;


        dispatch(
          loadMyProjects(projects)
        );
        dispatch({ type: PAGE_LOADING_COMPLETE });
      }


    } catch (e) {
      dispatch({ type: PAGE_LOADING_COMPLETE });
      throw new Error(e);
    }
  };
};

export const deleteProject = (projectid) => ({
  type: DELETE_PROJECT,
  projectid
});


//deletes project
export const deleteProjectAction = (projectid) => {
  return async dispatch => {
    try {
      const response = await axios.delete(
        `/api/project/${projectid}`,
        {
          projectid
        }
      );

      if (response.data.status == "success") {

        dispatch(
          deleteProject(projectid)
        );
      }

    } catch (e) {
      throw new Error(e);
    }
  }
}

export const uploadProjectThumbnail = (thumb_url) => ({
  type: UPLOAD_PROJECT_THUMBNAIL,
  thumb_url
});

//uploads project thumbnail
export const uploadProjectThumbnailAction = (formData) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      return axios.post(
        global.config.laravelAPIUrl + '/post-upload-image',
        formData,
        config
      )
        .then((response) => {
          dispatch(
            uploadProjectThumbnail(response.data.data.guid)
          )

        })
    } catch (e) {
      throw new Error(e);
    }
  }
}