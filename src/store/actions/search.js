/* eslint-disable */
import Swal from "sweetalert2";

import searchService from "services/search.service";
import resourceService from "services/resource.service";
import {
  SEARCH_REDUX,
  CLEAR_SEARCH,
  SELECT_EXISTING_ACTIVITY,
  RESET_EXISTING_ACTIVITY,
  SET_SEARCH_TYPE,
} from "../actionTypes";
import store from "../index";

export const searchRedux = (data, searchQuery, meta) => ({
  type: SEARCH_REDUX,
  data,
  searchQuery,
  meta,
});

export const simpleSearchAction = (values) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  // const activityType = [];
  // if (values.standardArray) {
  //   values.standardArray.map((data) => {
  //     if (typeof (data) === 'object') {
  //       activityType.push(data.value);
  //     }
  //     return true;
  //   });
  // }
  console.log(values);
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
    sendData = {
      query: values.phrase || undefined,
      h5pLibraries: values.standardArray,
      from: values.from,
      size: values.size,
      model: values.model || undefined,
      negativeQuery: values.no_words || undefined,
      subjectIds: activeSubjects,
      author: values.author || undefined,
      educationLevelIds: activeGrades,
      authorTagsIds: activeAuthTags,
      startDate: values.fromDate || undefined,
      endDate: values.toDate || undefined,
      organization_id: activeOrganization?.id,
      searchType: "showcase_projects",
    };
  } else {
    // eslint-disable-next-line no-lonely-if

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
      authorTagsIds: activeAuthTags,
      startDate: values.fromDate || undefined,
      endDate: values.toDate || undefined,
      organization_id: activeOrganization?.id,
      searchType: "showcase_projects",
    };
  }

  const response = await searchService.searchResult(sendData);

  if (response?.errors) {
    if (response?.errors.query) {
      Swal.fire(response.errors.query[0]);
    }
  } else {
    dispatch(
      searchRedux(response?.data, values.phrase, response?.meta)
    );
  }

  return response;
};
export const simpleSearchProjectPreview = (
  subOrgId,
  projectId
) => async (dispatch) => {
  const response = await resourceService.searchProjectPreview(
    subOrgId,
    projectId
  );
  return response?.project;
};

export const searchIndependentActivitiesAction = (
  values,
  searchType
) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
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
    sendData = {
      query: values.query || values.phrase || undefined,
      subjectArray: values.subjectArray,
      gradeArray: values.gradeArray,
      author: values.authors || undefined,
      subjectIds: activeSubjects,
      authorTagsIds: activeAuthTags,
      negativeQuery: values.no_words || undefined,
      h5pLibraries: values.standardArray,
      startDate: values.fromDate || undefined,
      educationLevelIds: activeGrades,
      endDate: values.toDate || undefined,
      organization_id: activeOrganization?.id,
      from: values.from,
      size: values.size,
    };
  } else {
    sendData = {
      query: values.query || values.phrase || undefined,
      subjectArray: values.subjectArray,
      gradeArray: values.gradeArray,
      authorTagsIds: activeAuthTags,
      subjectIds: activeSubjects,
      educationLevelIds: activeGrades,
      author: values.authors || undefined,
      negativeQuery: values.no_words || undefined,
      startDate: values.fromDate || undefined,
      organization_id: activeOrganization?.id,
      endDate: values.toDate || undefined,
      from: values.from,
      size: values.size,
    };
  }

  const result = await searchService.searchIndependentActivities(
    searchType,
    sendData
  );
  dispatch(searchRedux(result?.data, values?.query, result?.meta));
  return result;
};

export const setSearchTypeAction = (type) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_TYPE,
    searchType: type,
  });
};

export const cloneProject = (projectID) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
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

export const existingActivitySearchGetAction = (
  activityId,
  activityType
) => async (dispatch) => {
  let result = null;
  if (activityType === "independent") {
    result = await resourceService.independentH5pResourceSettings(
      activityId
    );
  } else {
    result = await resourceService.h5pResourceSettings(activityId);
  }

  dispatch({
    type: SELECT_EXISTING_ACTIVITY,
    activity: {
      ...result,
      activityType,
    },
  });
};

export const existingActivitySearchResetAction = () => async (
  dispatch
) => dispatch({ type: RESET_EXISTING_ACTIVITY });
