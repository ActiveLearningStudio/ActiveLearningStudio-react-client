import Swal from 'sweetalert2';

import searchService from 'services/search.service';
import { SEARCH_REDUX, CLEAR_SEARCH } from '../actionTypes';

export const searchRedux = (data, searchQuery, meta) => ({
  type: SEARCH_REDUX,
  data,
  searchQuery,
  meta,
});

export const simpleSearchAction = (values) => async (dispatch) => {
  const activityType = [];
  if (values.standardArray) {
    values.standardArray.map((data) => {
      if (typeof (data) === 'object') {
        activityType.push(data.value);
      }
      return true;
    });
  }
  let sendData;
  if (activityType.length > 0) {
    sendData = {
      query: values.phrase,
      h5pLibraries: activityType,
      from: values.from,
      size: values.size,
      model: values.model || undefined,
      negativeQuery: values.no_words,
      subjectIds: values.subjectArray,
      educationLevelIds: values.gradeArray,
      startDate: values.fromDate,
      endDate: values.toDate,
    };
  } else {
    sendData = {
      query: values.phrase,
      h5pLibraries: values.standardArray,
      from: values.from,
      size: values.size,
      model: values.model || undefined,
      negativeQuery: values.no_words,
      subjectIds: values.subjectArray,
      educationLevelIds: values.gradeArray,
      startDate: values.fromDate,
      endDate: values.toDate,
    };
  }
  let response;
  if (values.type === 'public') {
    response = await searchService.searchResult(sendData);
  } else {
    response = await searchService.advancedSearch(sendData);
  }

  if (response.errors) {
    if (response.errors.query) {
      Swal.fire(response.errors.query[0]);
    }
  } else {
    dispatch(searchRedux(response.data, values.phrase, response.meta));
  }

  return response;
};

export const cloneProject = (projectID) => {
  searchService.cloneProject(projectID);
};

export const clearSearch = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH,
  });
};

export const clonePlaylist = (projectId, playlistId) => {
  searchService.clonePlaylist(projectId, playlistId);
};

export const cloneActivity = (playlistId, activityId) => {
  searchService.cloneActivity(playlistId, activityId);
};
