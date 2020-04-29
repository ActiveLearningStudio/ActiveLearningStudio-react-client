import axios from "axios";
import { SHOW_CREATE_PROJECT_MODAL, SHOW_CREATE_PROJECT_SUBMENU, HIDE_CREATE_PROJECT_MODAL, CREATE_PROJECT, LOAD_MY_PROJECTS } from "../constants/actionTypes";


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



export const loadMyProjects = (projects) => ({
  type: LOAD_MY_PROJECTS,
  projects
});



export const loadMyProjectsAction = () => {
  return async dispatch => {
    try {
      const { token } = JSON.parse(localStorage.getItem("auth"));
     const response = await axios.post(
      //  `${process.env.REACT_APP_API_URL}/playlist/create`,
       '/api/myprojects',
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
      }

      
    } catch (e) {
      throw new Error(e);
    }
  };
};




