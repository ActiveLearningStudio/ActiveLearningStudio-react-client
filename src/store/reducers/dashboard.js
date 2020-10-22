import {
    GET_USER_PROJECTS,
    GET_SHARED_USER_PROJECTS
} from '../actionTypes';

const INITIAL_STATE = {
    projects: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_PROJECTS:
      return {
        ...state,
        projects: action.projects.projects,
      };

      case GET_SHARED_USER_PROJECTS:
        return {
          ...state,
          projects: action.projects.projects.filter(project => project.shared),
        };

    default:
      return state;
  }
};
