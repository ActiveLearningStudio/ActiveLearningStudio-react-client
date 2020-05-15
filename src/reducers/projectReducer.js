import {
  SHOW_CREATE_PROJECT_SUBMENU,
  SHOW_CREATE_PROJECT_MODAL,
  CREATE_PROJECT,
  LOAD_MY_PROJECTS,
  LOAD_PROJECT,
  DELETE_PROJECT,
  UPLOAD_PROJECT_THUMBNAIL
} from "../constants/actionTypes";


const defaultProgramState = () => {
  if (localStorage.getItem("projects")) {


    return {
      'projects': JSON.parse(localStorage.getItem("projects"))
    }
  } else {
    return {
      'projects': [],
      selectedProject: {
        _id: null
      },
      thumb_url: null,
      showCreateProjectSubmenu: false,
      showCreateProjectPopup: false
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
        selectedProject: {
          _id: null
        },
        thumbUrl: null
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [
          ...state.projects,
          action.projectdata
        ],
        thumbUrl: null
      };
    case LOAD_MY_PROJECTS:
      return {
        ...state,
        projects: action.projects
      };
    case LOAD_PROJECT:
      return {
        ...state,
        selectedProject: action.project,
        thumbUrl: action.project.thumb_url
      };
    case DELETE_PROJECT:
      let newProjects = state.projects.filter(project => {
        return project._id !== action.projectid
      });
      return {
        ...state,
        projects: newProjects
      };
    case UPLOAD_PROJECT_THUMBNAIL:
      return {
        ...state,
        thumbUrl: action.thumbUrl
      }

    default:
      return state;
  }
};

export default projectReducer;
