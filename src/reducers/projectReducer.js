import { 
  SHOW_CREATE_PROJECT_SUBMENU, 
  SHOW_CREATE_PROJECT_MODAL, 
  CREATE_PROJECT, 
  LOAD_MY_PROJECTS, 
  LOAD_PROJECT, 
  HIDE_CREATE_PROJECT_MODAL, 
  DELETE_PROJECT
} from "../constants/actionTypes";


const defaultProgramState = () => {
  if (localStorage.getItem("projects")) {
//      console.log("---");
//      console.log(localStorage.getItem("playlists"));
    //  localStorage.clear();
        
    return {
        'projects':JSON.parse(localStorage.getItem("projects"))
    }
  } else {
    return {
        'projects':[],
        selectedProject: null,
        showCreateProjectSubmenu:false,
        showCreateProjectPopup:false
    };
  }
};

const projectReducer = (state = defaultProgramState(), action) => {
  switch (action.type) {
    
    case SHOW_CREATE_PROJECT_SUBMENU:
      return {
        ...state,
        showCreateProjectSubmenu: !state.showCreateProjectSubmenu
      };
    case SHOW_CREATE_PROJECT_MODAL:
      return {
        ...state,
        showCreateProjectPopup: true
      };
    // case HIDE_CREATE_PROJECT_MODAL:
    //   return {
    //     ...state,
    //     showCreateProjectPopup: false
    //   };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [
          action.projectdata,
          ...state.projects
        ]
      };
    case LOAD_MY_PROJECTS:
      return {
        ...state,
        projects: action.projects
      };
    case LOAD_PROJECT:
      return {
        ...state,
        selectedProject: action.project
      };
    case DELETE_PROJECT:
      let newProjects = state.projects.filter(project => {
        return project._id !== action.projectid
      });
      return {
        ...state,
        projects: newProjects
      };

    default:
      return state;
  }
};

export default projectReducer;
