import axios from "axios";
import { 
  SHOW_CREATE_PROJECT_MODAL, 
  SHOW_CREATE_PROJECT_SUBMENU, 
  HIDE_CREATE_PROJECT_MODAL, 
  CREATE_PROJECT, 
  LOAD_MY_PROJECTS,
  LOAD_PROJECT,
  DELETE_PROJECT,
  PAGE_LOADING,
  PAGE_LOADING_COMPLETE,
  UPDATE_PROJECT,
  UPLOAD_THUMBNAIL
} from "../constants/actionTypes";

// Loads a specific project
export const loadProject = (project) => ({
  type:LOAD_PROJECT,
  project: project
});

export const loadProjectAction = (projectId) => {
  return async dispatch => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    const response = await axios.post(
      '/api/loadproject',
      { projectId },
      { headers: { "Authorization": "Bearer "+token } }
    );

    if(response.data.status == "success")
      dispatch( loadProject(response.data.data.project) );
  };
};

//

export const showCreateProjectSubmenu = () => ({
  type:SHOW_CREATE_PROJECT_SUBMENU
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



export const showCreateProjectModal = () => ({
  type:SHOW_CREATE_PROJECT_MODAL
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



// export const hideCreateProjectModal = () => ({
//   type:HIDE_CREATE_PROJECT_MODAL
// });

// export const hideCreateProjectModalAction = () => {
//   return async dispatch => {
//     try {
//       dispatch(
//         hideCreateProjectModal()
//       )
//     } catch (e) {
//       throw new Error(e);
//     }
//   }
// }



export const createProject = (projectdata) => ({
  type: CREATE_PROJECT,
  projectdata
});



export const createProjectAction = (name, description, thumb_url) => {
  return async dispatch => {
    try {
      //get auth token
      const { token } = JSON.parse(localStorage.getItem("auth"));

     const response = await axios.post(
      //  `${process.env.REACT_APP_API_URL}/playlist/create`,
       '/api/project',
       {
         name,
         description,
         thumb_url
       },
       {
        headers: {
          "Authorization": "Bearer "+ token
        }
      }
     );
     
     if(response.data.status == "success") {
       
        //getting last project id
        
        const projectdata = {
          _id:response.data.data._id,
          name: response.data.data.name,
          thumb_url: response.data.data.thumb_url,
          userid: response.data.data.userid
        };
        dispatch(
          createProject(projectdata)
        );
      }

      
    } catch (e) {
      throw new Error(e);
    }
  };
};





export const updateProject = (projectdata) => ({
  type: UPDATE_PROJECT,
  projectdata
});



export const updateProjectAction = (projectid, name, description, thumb_url) => {
  return async dispatch => {
    try {
      //get auth token
      const { token } = JSON.parse(localStorage.getItem("auth"));

     const response = await axios.put(
      //  `${process.env.REACT_APP_API_URL}/playlist/create`,
       '/api/project/' + projectid,
       {
         name,
         description,
         thumb_url
       },
       {
        headers: {
          "Authorization": "Bearer "+ token
        }
      }
     );
     
     if(response.data.status == "success") {
       
        //getting last project id
        
        const projectdata = {
          _id:response.data.data._id,
          name: response.data.data.name,
          thumb_url: response.data.data.thumb_url,
          userid: response.data.data.userid
        };
        dispatch(
          updateProject(projectdata)
        );
      }

      
    } catch (e) {
      throw new Error(e);
    }
  };
};



export const loadMyProjects = (projects) => ({
  type: LOAD_MY_PROJECTS,
  projects
});



export const loadMyProjectsAction = () => {
  return async dispatch => {
    try {
      dispatch({type:PAGE_LOADING});
      const { token } = JSON.parse(localStorage.getItem("auth"));
     const response = await axios.post(
      //  `${process.env.REACT_APP_API_URL}/playlist/create`,
       global.config.laravelAPIUrl+'/myprojects',
       {},
       {
          headers: {
            "Authorization": "Bearer "+token
          }
        }
     );
     
     if(response.data.status == "success") {
        let projects = [];
        projects = response.data.data.projects;
        
        
        dispatch(
          loadMyProjects(projects)
        );
        dispatch({type:PAGE_LOADING_COMPLETE});
      }

      
    } catch (e) {
      dispatch({type:PAGE_LOADING_COMPLETE});
      throw new Error(e);
    }
  };
};







export const deleteProject = (projectid) => ({
  type:DELETE_PROJECT,
  projectid
}); 

export const deleteProjectAction = (projectid) => {
  return async dispatch => {
    try {
      const response = await axios.delete(
        //  `${process.env.REACT_APP_API_URL}/playlist/create`,
         `/api/project/${projectid}`,
         {
           projectid
         }
       );

       if(response.data.status == "success") {
          // let plists = [];
          // if(localStorage.getItem("playlists")){
          //   plists = JSON.parse(localStorage.getItem("playlists"));
          // }
          // plists = plists.filter(playlist => {
          //   return playlist.id !== id
          // });
          // localStorage.setItem("playlists", JSON.stringify(plists));
          dispatch(
            deleteProject(projectid)
          );
       }
      
    } catch (e) {
      throw new Error(e);
    }
  }
}

export const uploadThumbnail = (thumbUrl) => ({
  type:UPLOAD_THUMBNAIL,
  thumbUrl
}); 

export const uploadThumbnailAction = (formData) => {
    // console.log(e);
  // const formData = new FormData();
  // formData.append('uploads',e.target.files[0])
  return async dispatch => {
    try {
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      return axios.post(
        global.config.laravelAPIUrl +'/post-upload-image',
        formData,
        config
      )
      .then((response) => {
        dispatch(
          uploadThumbnail(response.data.data.guid)
        )
        
        })
    } catch (e) {
      throw new Error(e);
    }
  }
  
}