import {
  BACK_TO_SEARCH,
  DO_SEARCH,
} from '../actionTypes';

const INITIAL_STATE = {
  currentPage: 'search',
  searchParams: {},
  projects: [],
};

const canvasReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DO_SEARCH:
      return {
        ...state,
        projects: action.results.projects,
        currentPage: 'results',
      };

    case BACK_TO_SEARCH:
      return {
        ...state,
        currentPage: 'search',
      };

    default:
      return state;
  }
};

export default canvasReducer;
