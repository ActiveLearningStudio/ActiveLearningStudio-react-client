import {
  // Deeplinking browse tab
  DO_BROWSE,
  // Deelinking search tab
  UPDATE_PARAMS,
  BACK_TO_SEARCH,
  DO_SEARCH,
  SHOW_SEARCH_PROJECT,
  SHOW_SEARCH_PLAYLIST,
  SET_SEARCH_PREVIEW_ACTIVITY,
  CLOSE_SEARCH_PREVIEW_ACTIVITY,
  PREVIOUS_PAGE,
  NEXT_PAGE,
  SHOW_RESULTS,
  // Other
  GET_H5P_SETTINGS,
  GRADE_PASS_BACK,
  LTI_ACTIVITY_INIT,
  GET_LTI_SUMMARY,
  GET_LTI_SUMMARY_ACTIVITY_INFO,
} from '../actionTypes';

const INITIAL_STATE = {
  // Deeplinking
  currentPage: 'search',
  // Deeplinking browse tab
  browseResults: null,
  // Deeplinking search tab
  searchParams: {
    private: '0',
  },
  searchProjects: null,
  searchSelectedProject: null,
  searchSelectedPlaylist: null,
  searchPreviewActivity: null,
  searchHasMoreResults: false,
  // Other
  h5pSettings: null,
  ltiFinished: false,
  attemptId: null,
  summary: null,
  summaryActivityInfo: null,
  summaryError: null,
};

const canvasReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Deeplinking browse tab
    case DO_BROWSE:
      return {
        ...state,
        browseResults: action.results.projects,
      };

    // Deeplinking search tab
    case DO_SEARCH:
      return {
        ...state,
        currentPage: 'results',
        searchProjects: action.results.projects.slice(0, 10),
        searchHasMoreResults: action.results.projects.length > 10,
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
        searchParams: INITIAL_STATE.searchParams,
        searchProjects: null,
        searchSelectedProject: null,
        searchPreviewActivity: null,
        h5pSettings: null,
      };

    case UPDATE_PARAMS:
      return {
        ...state,
        searchParams: action.params,
      };

    case SET_SEARCH_PREVIEW_ACTIVITY:
      return {
        ...state,
        searchPreviewActivity: action.activity,
      };

    case CLOSE_SEARCH_PREVIEW_ACTIVITY:
      return {
        ...state,
        searchPreviewActivity: null,
        h5pSettings: null,
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

    case SHOW_SEARCH_PROJECT:
      return {
        ...state,
        searchSelectedProject: action.project,
      };

    case SHOW_SEARCH_PLAYLIST:
      return {
        ...state,
        searchSelectedPlaylist: action.playlist,
      };

    // Other
    case GET_H5P_SETTINGS:
      return {
        ...state,
        h5pSettings: action.h5pSettings,
      };

    case GRADE_PASS_BACK:
      return {
        ...state,
        ltiFinished: true,
      };

    case LTI_ACTIVITY_INIT:
      return {
        ...state,
        attemptId: (state.attemptId) ? state.attemptId : Date.now(),
      };

    case GET_LTI_SUMMARY:
      if (!action.summary) {
        return {
          ...state,
          summary: false,
          summaryError: null,
        };
      }

      if (action.summary.errors) {
        return {
          ...state,
          summary: false,
          summaryError: action.summary.errors[0],
        };
      }

      return {
        ...state,
        summary: action.summary.summary,
        summaryError: null,
      };

      case GET_LTI_SUMMARY_ACTIVITY_INFO:
        return {
          ...state,
          summaryActivityInfo: action.summaryActivityInfo.activity,
        };

    default:
      return state;
  }
};

export default canvasReducer;
