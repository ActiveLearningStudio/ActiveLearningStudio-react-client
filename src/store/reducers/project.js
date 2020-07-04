import {
  SHOW_CREATE_PROJECT_SUBMENU,
  SHOW_CREATE_PROJECT_MODAL,
  CREATE_PROJECT,
  LOAD_MY_PROJECTS,
  LOAD_PROJECT,
  DELETE_PROJECT,
  UPLOAD_PROJECT_THUMBNAIL,
  PROJECT_THUMBNAIL_PROGRESS,
  SHOW_USER_SUB_MENU,
  CLOSE_MENU,
} from '../actionTypes';

const defaultProgramState = () => {
  if (localStorage.getItem('projects')) {
    return {
      projects: JSON.parse(localStorage.getItem('projects')),
    };
  }
  return {
    projects: [],
    selectedProject: {
      _id: null,
    },
    thumb_url: null,
    showCreateProjectSubmenu: false,
    showCreateProjectPopup: false,
    showUserSubMenu: false,
  };
};

export default (state = defaultProgramState(), action) => {
  switch (action.type) {
    case CLOSE_MENU:
      if (state.showCreateProjectSubmenu) {
        state = {
          ...state,
          showCreateProjectSubmenu: !state.showCreateProjectSubmenu,
        };
      }
      if (state.showUserSubMenu) {
        state = {
          ...state,
          showUserSubMenu: !state.showUserSubMenu,
        };
      }

      return {
        ...state,
      };
    case SHOW_CREATE_PROJECT_SUBMENU:
      return {
        ...state,
        showCreateProjectSubmenu: !state.showCreateProjectSubmenu,
      };
    case SHOW_USER_SUB_MENU:
      return {
        ...state,
        showUserSubMenu: !state.showUserSubMenu,
      };
    case SHOW_CREATE_PROJECT_MODAL:
      return {
        ...state,
        selectedProject: {
          _id: null,
        },
        thumb_url: null,
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [
          ...state.projects,
          action.projectdata,
        ],
        thumb_url: null,
      };
    case LOAD_MY_PROJECTS:
      return {
        ...state,
        projects: action.projects,
      };
    case LOAD_PROJECT:
      return {
        ...state,
        selectedProject: action.project,
        thumb_url: action.project.thumb_url,
      };
    case DELETE_PROJECT:
      const newProjects = state.projects.filter((project) => project._id !== action.projectid);
      return {
        ...state,
        projects: newProjects,
      };

    case UPLOAD_PROJECT_THUMBNAIL:
      return {
        ...state,
        thumb_url: action.thumb_url,
        progress: null,
      };
    case PROJECT_THUMBNAIL_PROGRESS:
      return {
        ...state,
        progress: action.progress,
      };

    default:
      return state;
  }
};
