import Swal from 'sweetalert2';

import searchService from 'services/search.service';
import resourceService from 'services/resource.service';
import {
  SEARCH_REDUX,
  CLEAR_SEARCH,
  SELECT_EXISTING_ACTIVITY,
  RESET_EXISTING_ACTIVITY,
} from '../actionTypes';
import store from '../index';

export const searchRedux = (data, searchQuery, meta) => ({
  type: SEARCH_REDUX,
  data,
  searchQuery,
  meta,
});

export const simpleSearchAction = (values) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  // const activityType = [];
  // if (values.standardArray) {
  //   values.standardArray.map((data) => {
  //     if (typeof (data) === 'object') {
  //       activityType.push(data.value);
  //     }
  //     return true;
  //   });
  // }
  const activeGrades = [];
  if (values.gradeArray) {
      values.gradeArray.forEach((grade) => {
        activeGrades.push(grade);
    });
  }
  const activeSubjects = [];
  if (values.subjectArray) {
      values.subjectArray.forEach((subject) => {
        activeSubjects.push(subject);
    });
  }
  const activeAuthTags = [];
  if (values.authorTagsArray) {
      values.authorTagsArray.forEach((tag) => {
        activeAuthTags.push(tag);
    });
  }
  let sendData;
  if (values.standardArray && values.standardArray.length > 0) {
    if (values.type === 'orgSearch') {
      sendData = {
        query: values.phrase || undefined,
        h5pLibraries: values.standardArray,
        from: values.from,
        size: values.size,
        author: values.author || undefined,
        model: values.model || undefined,
        negativeQuery: values.no_words || undefined,
        subjectIds: activeSubjects,
        educationLevelIds: activeGrades,
        authorTagIds: activeAuthTags,
        startDate: values.fromDate || undefined,
        endDate: values.toDate || undefined,
        organization_id: activeOrganization?.id,
        searchType: 'org_projects',
      };
    } else {
      sendData = {
        query: values.phrase,
        h5pLibraries: values.standardArray,
        from: values.from,
        size: values.size,
        model: values.model || undefined,
        negativeQuery: values.no_words || undefined,
        subjectIds: activeSubjects,
        author: values.author || undefined,
        educationLevelIds: activeGrades,
        authorTagIds: activeAuthTags,
        startDate: values.fromDate || undefined,
        endDate: values.toDate || undefined,
        organization_id: activeOrganization?.id,
        searchType: values.type === 'public' ? 'showcase_projects' : 'my_projects',
      };
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (values.type === 'orgSearch') {
      sendData = {
        query: values.phrase || undefined,
        h5pLibraries: values.standardArray,
        from: values.from,
        size: values.size,
        author: values.author || undefined,
        model: values.model || undefined,
        negativeQuery: values.no_words || undefined,
        subjectIds: activeSubjects,
        educationLevelIds: activeGrades,
        authorTagIds: activeAuthTags,
        startDate: values.fromDate || undefined,
        endDate: values.toDate || undefined,
        organization_id: activeOrganization?.id,
        searchType: 'org_projects',
      };
    } else {
      sendData = {
        query: values.phrase,
        h5pLibraries: values.standardArray,
        from: values.from,
        size: values.size,
        author: values.author || undefined,
        model: values.model || undefined,
        negativeQuery: values.no_words || undefined,
        subjectIds: activeSubjects,
        educationLevelIds: activeGrades,
        authorTagIds: activeAuthTags,
        startDate: values.fromDate || undefined,
        endDate: values.toDate || undefined,
        organization_id: activeOrganization?.id,
        searchType: values.type === 'public' ? 'showcase_projects' : 'my_projects',
      };
    }
  }
  let response;
  if (values.type === 'public' || values.type === 'orgSearch') {
    response = await searchService.searchResult(sendData);
  } else {
    response = await searchService.advancedSearch(sendData);
  }

  if (response?.errors) {
    if (response?.errors.query) {
      Swal.fire(response.errors.query[0]);
    }
  } else {
    dispatch(searchRedux(response?.data, values.phrase, response?.meta));
  }

  return response;
};

export const cloneProject = (projectID) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  searchService.cloneProject(projectID, activeOrganization.id);
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

export const existingActivitySearchGetAction = (activityId) => async (dispatch) => {
  const result = await resourceService.h5pResourceSettings(activityId);
  dispatch({
    type: SELECT_EXISTING_ACTIVITY,
    activity: result,
  });
};

export const existingActivitySearchResetAction = () => async (dispatch) => dispatch({ type: RESET_EXISTING_ACTIVITY });
