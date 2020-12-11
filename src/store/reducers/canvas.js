import {
  BACK_TO_SEARCH,
  DO_SEARCH,
  UPDATE_PARAMS,
  SET_PREVIEW_ACTIVITY,
  CLOSE_PREVIEW,
  GET_H5P_SETTINGS,
  PREVIOUS_PAGE,
  NEXT_PAGE,
  SHOW_RESULTS,
} from '../actionTypes';

const INITIAL_STATE = {
  currentPage: 'search',
  searchParams: {},
  activities: [],
  previewActivity: null,
  h5pSettings: null,
  hasMoreResults: false,
};

const canvasReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DO_SEARCH:
      return {
        ...state,
        activities: action.results.activities.slice(0, 10),
        currentPage: 'results',
        hasMoreResults: action.results.activities.length > 10,
      };

    case SHOW_RESULTS:
      return {
        ...state,
        currentPage: 'results',
      };

    case BACK_TO_SEARCH:
      return {
        ...state,
        currentPage: 'search',
        searchParams: {},
      };

    case UPDATE_PARAMS:
      return {
        ...state,
        searchParams: action.params,
      };

    case SET_PREVIEW_ACTIVITY:
      return {
        ...state,
        previewActivity: action.activity,
      };

    case CLOSE_PREVIEW:
      return {
        ...state,
        previewActivity: null,
      };

    case GET_H5P_SETTINGS:
      return {
        ...state,
        h5pSettings: action.h5pSettings,
      };

    case PREVIOUS_PAGE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          from: state.searchParams.from - 10,
        },
      };

    case NEXT_PAGE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          from: (state.searchParams.from) ? state.searchParams.from + 10 : 10,
        },
      };

    default:
      return state;
  }
};

export default canvasReducer;
