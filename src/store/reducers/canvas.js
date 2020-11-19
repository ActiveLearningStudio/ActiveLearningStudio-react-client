import {
    DO_SEARCH,
  } from '../actionTypes';
  
  const INITIAL_STATE = {
    currentPage: 'search',
    projects: [],
  };
  
  const canvasReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case DO_SEARCH:
        return {
          ...state,
          projects: action.results.projects,
        };
  
      default:
        return state;
    }
  };
  
  export default canvasReducer;
  