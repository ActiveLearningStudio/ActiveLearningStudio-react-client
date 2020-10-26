import {
  GET_USER_PROJECTS,
  GET_SHARED_USER_PROJECTS,
  GET_USER_ACTIVITIES,
  GET_SHARED_USER_ACTIVITIES,
  GET_USER_PLAYLISTS,
} from '../actionTypes';

const INITIAL_STATE = {
  projects: [],
  activities: [],
  playlists: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_PROJECTS:
      return {
        ...state,
        projects: action.projects.projects.filter((project) => !(
          action.query !== ''
          && project.name.search(action.query) === -1
          && project.description.search(action.query) === -1
        )),
      };

    case GET_SHARED_USER_PROJECTS:
      return {
        ...state,
        projects: action.projects.projects.filter((project) => {
          if (!project.shared) return false;

          return !(
            action.query !== ''
            && project.name.search(new RegExp(action.query, 'i')) === -1
            && project.description.search(new RegExp(action.query, 'i')) === -1
          );
        }),
      };

    case GET_USER_ACTIVITIES:
    case GET_SHARED_USER_ACTIVITIES:
      return {
        ...state,
        activities: action.activities,
      };

    case GET_USER_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };

    default:
      return state;
  }
};
