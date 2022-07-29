/* eslint-disable */
import { prepareLmsCourse } from 'logic/lmsCourse';
import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  projects: null,
  projectMeta: null,
  isProjectLoading: false,
  islazyLoader: false,
  selectedProject: {},
  thumbUrl: null,
  projectSelect: {},
  lmsCourse: null,
  clone: [],
  isSharedProject: null,
  visibilityTypes: [],
  currentVisibilityType: null,
  searchPreviewProject: null,
};

export default (state = INITIAL_STATE, action) => {
  const { projects, clone } = state;

  switch (action.type) {
    case actionTypes.CREATE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CREATE_PROJECT_SUCCESS:
      if (projects) {
        return {
          ...state,
          isLoading: false,
          projects: [...projects, action.payload.project],
          thumbUrl: null,
        };
      } else {
        return {
          ...state,
          isLoading: false,
          projects: [action.payload.project],
          thumbUrl: null,
        };
      }

    case actionTypes.CREATE_PROJECT_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOAD_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.PAGE_LOADING:
      return {
        ...state,
        islazyLoader: true,
      };
    case actionTypes.PAGE_LOADING_COMPLETE:
      return {
        ...state,
        islazyLoader: false,
      };
    case actionTypes.SET_SELECTED_PROJECT:
      return {
        ...state,
        isLoading: false,
        selectedProject: action.payload,
        thumbUrl: action.payload.thumb_url,
        currentVisibilityType: action.payload.organization_visibility_type_id,
      };
    case actionTypes.CLEAR_SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: {},
        thumbUrl: null,
        currentVisibilityType: null,
      };
    case actionTypes.CLEAR_PROJECT_SELECT:
      return {
        ...state,
        projectSelect: null,
        selectedProject: null,
        isSharedProject: null,
      };
    case actionTypes.LOAD_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedProject: action.payload.project,
        thumbUrl: action.payload.project.thumb_url,
        currentVisibilityType: action.payload.project.organization_visibility_type_id,
      };
    case actionTypes.LOAD_PROJECT_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.UPDATE_PROJECT_SUCCESS:
      // const index = projects.findIndex((p) => p.id === action.payload.project.id);
      // if (index > -1) {
      // 	projects.splice(index, 1, action.payload.project);
      // 	return {
      // 		...state,
      // 		isLoading: false,
      // 		projects,
      // 		// thumbUrl: null,
      // 		// currentVisibilityType: null,
      // 	};
      // }
      return {
        ...state,
        isLoading: false,
        selectedProject: { ...action.payload.project, thumbUrl: action.payload.thumb_url },
      };
    case actionTypes.UPDATE_PROJECT_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.DELETE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: projects.filter((project) => project.id !== action.payload.projectId),
      };
    case actionTypes.DELETE_PROJECT_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOAD_MY_PROJECTS:
      return {
        ...state,
        projects: action.payload.projects,
        islazyLoader: false,
        isProjectLoading: true,
        projectMeta: action.payload.meta,
        links: action.payload.links?.first,
      };
    case actionTypes.SHOW_SKELETON:
      return {
        ...state,

        isProjectLoading: false,
      };
    case actionTypes.ADD_MY_PROJECTS:
      if (!projects) {
        return {
          ...state,
          projects: action.payload.projects,
          islazyLoader: false,
          isProjectLoading: true,
          projectMeta: action.payload.meta,
        };
      } else {
        const newProjects = projects.concat(action.payload.projects);
        return {
          ...state,
          projects: newProjects,
          islazyLoader: false,
          isProjectLoading: true,
          projectMeta: action.payload.meta,
        };
      }
    case actionTypes.LOAD_MY_CLONE_PROJECTS:
      return {
        ...state,
        clone: action.payload.projects,
        islazyLoader: false,
        projectMeta: action.payload.meta,
      };
    case actionTypes.ADD_MY_CLONE_PROJECTS:
      if (!clone) {
        return {
          ...state,
          clone: action.payload.projects,
          islazyLoader: false,
          projectMeta: action.payload.meta,
        };
      } else {
        const newClone = clone.concat(action.payload.projects);
        return {
          ...state,
          clone: newClone,
          islazyLoader: false,
          projectMeta: action.payload.meta,
        };
      }

    case actionTypes.LOAD_MY_PROJECTS_SELECTED:
    case actionTypes.SHARE_PROJECT:
      return {
        ...state,
        isSharedProject: true,
        projectSelect: action.payload.project,
        selectedProject: action.payload.project,
      };

    case actionTypes.UPLOAD_PROJECT_THUMBNAIL:
      return {
        ...state,
        thumbUrl: action.payload.thumbUrl,
        progress: null,
      };

    case actionTypes.SHOW_CREATE_PROJECT_MODAL:
      return {
        ...state,
        selectedProject: {
          _id: null,
        },
        thumbUrl: null,
      };

    case actionTypes.PROJECT_THUMBNAIL_PROGRESS:
      return {
        ...state,
        progress: action.progress,
      };

    case actionTypes.LOAD_MY_PROJECTS_FAILED:
      return {
        ...state,
        isLoading: false,
        isSharedProject: false,
      };

    case actionTypes.SET_LMS_COURSE:
      return {
        ...state,
        lmsCourse: prepareLmsCourse(action, state),
      };
    case actionTypes.PROJECT_VISIBILITY_TYPES:
      return {
        ...state,
        visibilityTypes: action.payload.data,
      };
    case actionTypes.CURRENT_VISIBILITY_TYPE:
      return {
        ...state,
        currentVisibilityType: action.payload,
      };
    case actionTypes.SEARCH_PREVIEW_PROJECT:
      return {
        ...state,
        searchPreviewProject: action.payload,
        projectSelect: action.payload,
      };
    default:
      return state;
  }
};
