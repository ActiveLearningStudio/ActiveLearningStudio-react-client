import adminService from 'services/admin.service';
import searchService from 'services/search.service';
import * as actionTypes from '../existingActivitySearchActionTypes';

export const getFiltersAction = (org) => async (dispatch, getState) => {
  // Subjects
  adminService.getSubjects(org, '', '', '', '', '')
    .then((response) => {
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_GET_FILTER,
        filters: {
          subjects: response.data.map((filter) => ({
            ...filter,
            checked: false,
          })),
        },
      });
    }).catch(() => {
      console.log('Error getting subjects for filtering');
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_GET_FILTER,
        filters: { subjects: [] },
      });
    });

  // Education levels
  adminService.getEducationLevel(org, '', '', '', '', '')
    .then((response) => {
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_GET_FILTER,
        filters: {
          levels: response.data.map((filter) => ({
            ...filter,
            checked: false,
          })),
        },
      });
    }).catch(() => {
      console.log('Error getting education levels for filtering');
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_GET_FILTER,
        filters: { levels: [] },
      });
    });

  // Author tags
  adminService.getAuthorTag(org, '', '', '', '', '')
    .then((response) => {
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_GET_FILTER,
        filters: {
          tags: response.data.map((filter) => ({
            ...filter,
            checked: false,
          })),
        },
      });
    }).catch(() => {
      console.log('Error getting author tags for filtering');
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_GET_FILTER,
        filters: { tags: [] },
      });
    });

  // Activity types
  adminService.getActivityTypes(org, '', '', '', '', '')
    .then((response) => {
      const types = [];
      const state = getState();

      response.data.forEach((cat) => cat.activityItems.forEach((type) => {
        if (!state.existingActivitySearch.compatibleLibraries.includes(type.h5pLib)) {
          return;
        }

        types.push({
          id: type.id,
          activity_type_id: type.activity_type_id,
          name: type.title,
          description: type.description,
          checked: false,
          lib: type.h5pLib,
        });
      }));
      types.sort((a, b) => a.name.localeCompare(b.name));

      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_GET_FILTER,
        filters: { types },
      });
    }).catch((e) => {
      console.log('Error getting activity types for filtering');
      console.log(e);
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_GET_FILTER,
        filters: { types: [] },
      });
    });
};

export const getActivitiesAction = (params, type) => async (dispatch, getState) => {
  const state = getState();
  const newParams = { ...params };
  Object.keys(newParams).forEach((key) => {
    if (typeof newParams[key] === 'string' && newParams[key].length === 0) {
      newParams[key] = undefined;
    }
  });

  // If we're not searching the library, all requests use the current user as author
  if (!newParams.library) {
    newParams.author = state.auth.user.email;
  }

  // If we're not filtering by activity type, we use all compatible activities as our filter
  if (newParams.h5pLibraries.length === 0) {
    newParams.h5pLibraries = state.existingActivitySearch.filters.types.map((filter) => filter.lib);
  }

  dispatch({
    type: actionTypes.EXISTING_ACTIVITY_SEARCH_LOADING_STATUS,
    loading: true,
  });

  if (type === 'independent-activities') {
    searchService.searchIndependentActivities('lti_search', newParams)
    .then((results) => {
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_GET_INDEPENDENT_ACTIVITIES,
        independentActivities: results.data,
        independentActivitiesTotal: results.meta.total,
      });
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_LOADING_STATUS,
        loading: false,
      });
    }).catch(() => {
      console.log('Error during independent activity search');
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_GET_INDEPENDENT_ACTIVITIES,
        independentActivities: [],
        independentActivitiesTotal: 0,
      });
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_LOADING_STATUS,
        loading: false,
      });
    });
  } else {
    searchService.searchResult({
      ...newParams,
      model: 'activities',
      searchType: 'lti_search',
    }).then((results) => {
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_GET_PROJECT_ACTIVITIES,
        projectActivities: results.data,
        projectActivitiesTotal: (results.meta.activities) ? results.meta.activities : 0,
      });
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_LOADING_STATUS,
        loading: false,
      });
    }).catch(() => {
      console.log('Error fetching project results');
      dispatch({
        type: actionTypes.EXISTING_ACTIVITY_SEARCH_LOADING_STATUS,
        loading: false,
      });
    });
  }
};

export const setParamsAction = (searchParams) => async (dispatch) => {
  dispatch({
    type: actionTypes.EXISTING_ACTIVITY_SEARCH_SET_PARAMS,
    searchParams,
  });
};

export const setFiltersAction = (filters) => async (dispatch) => {
  dispatch({
    type: actionTypes.EXISTING_ACTIVITY_SEARCH_SET_FILTERS,
    filters,
  });
};

export const clearSearchAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.EXISTING_ACTIVITY_SEARCH_CLEAR });
};

export const setCompatibleLibrariesAction = (libraries) => async (dispatch) => {
  dispatch({
    type: actionTypes.EXISTING_ACTIVITY_SEARCH_SET_COMPATIBLE_LIBRARIES,
    libraries,
  });
};
