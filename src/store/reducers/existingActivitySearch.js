import * as actionTypes from '../existingActivitySearchActionTypes';

const INITIAL_STATE = {
  filters: {
    subjects: [],
    levels: [],
    types: [],
    tags: [],
  },
  searchParams: {
      query: '',
      author: '',
      negativeQuery: '',
      startDate: undefined,
      endDate: undefined,
      subjectArray: [],
      subjectIds: [],
      gradeArray: [],
      educationLevelIds: [],
      authorTagsIds: [],
      h5pLibraries: [], // array of strings with library name H5P.Accordion 1.0
      organization_id: 1,
      from: 0,
      size: 10,
  },
  independentActivities: [],
  independentActivitiesTotal: 0,
  projectActivities: [],
  projectActivitiesTotal: 0,
  compatibleLibraries: [],
  loading: false,
  library: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.EXISTING_ACTIVITY_SEARCH_GET_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.filters,
        },
      };

    case actionTypes.EXISTING_ACTIVITY_SEARCH_GET_INDEPENDENT_ACTIVITIES:
      return {
        ...state,
        independentActivities: action.independentActivities,
        independentActivitiesTotal: action.independentActivitiesTotal,
      };

    case actionTypes.EXISTING_ACTIVITY_SEARCH_GET_PROJECT_ACTIVITIES:
      return {
        ...state,
        projectActivities: action.projectActivities,
        projectActivitiesTotal: action.projectActivitiesTotal,
      };

    case actionTypes.EXISTING_ACTIVITY_SEARCH_SET_PARAMS:
      return {
        ...state,
        searchParams: action.searchParams,
      };

    case actionTypes.EXISTING_ACTIVITY_SEARCH_SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };

    case actionTypes.EXISTING_ACTIVITY_SEARCH_CLEAR:
      return { ...INITIAL_STATE };

    case actionTypes.EXISTING_ACTIVITY_SEARCH_LOADING_STATUS:
      return {
        ...state,
        loading: action.loading,
      };

    case actionTypes.EXISTING_ACTIVITY_SEARCH_SET_COMPATIBLE_LIBRARIES:
      return {
        ...state,
        compatibleLibraries: action.libraries,
      };

    default:
      return state;
  }
};
