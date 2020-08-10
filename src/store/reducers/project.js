import { prepareLmsCourse } from 'logic/lmsCourse';
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
  LOAD_MY_PROJECTS_SELECTED,
  SET_LMS_COURSE,
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
    thumbUrl: null,
    showCreateProjectSubmenu: false,
    showCreateProjectPopup: false,
    showUserSubMenu: false,
    projectSelect: {},
    lmsCourse: null,
  };
};

const projectReducer = (state = defaultProgramState(), action) => {
  switch (action.type) {
    case CLOSE_MENU:
      if (state.showCreateProjectSubmenu) {
        return {
          ...state,
          showCreateProjectSubmenu: !state.showCreateProjectSubmenu,
        };
      }
      if (state.showUserSubMenu) {
        return {
          ...state,
          showUserSubMenu: !state.showUserSubMenu,
        };
      }
      return state;

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
        thumbUrl: null,
      };

    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.projectData],
        thumbUrl: null,
      };

    case LOAD_MY_PROJECTS:
      return {
        ...state,
        projects: action.projects,
      };

    case LOAD_MY_PROJECTS_SELECTED:
      return {
        ...state,
        projectSelect: action.projects,
      };

    case LOAD_PROJECT:
      return {
        ...state,
        selectedProject: action.project,
        thumbUrl: action.project.thumbUrl,
      };

    case DELETE_PROJECT:
      const newProjects = state.projects.filter((project) => project._id !== action.projectId);
      return {
        ...state,
        projects: newProjects,
      };

    case UPLOAD_PROJECT_THUMBNAIL:
      return {
        ...state,
        thumbUrl: action.thumbUrl,
        progress: null,
      };

    case PROJECT_THUMBNAIL_PROGRESS:
      return {
        ...state,
        progress: action.progress,
      };

    case SET_LMS_COURSE:
      return {
        ...state,
        lmsCourse: prepareLmsCourse(action, state),
      };

    default:
      return state;
  }
};

export default projectReducer;
