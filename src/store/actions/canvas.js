import canvasService from 'services/canvas.service';
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

// Deeplinking browse tab
export const browseAction = (params) => async (dispatch) => {
  const results = await canvasService.browse(params);
  dispatch({
    type: DO_BROWSE,
    results,
  });
};

// Deeplinking search tab
export const searchAction = (params) => async (dispatch) => {
  const results = await canvasService.search(params);
  dispatch({
    type: DO_SEARCH,
    results,
  });
};

export const showResultsAction = () => async (dispatch) => {
  dispatch({
    type: SHOW_RESULTS,
  });
};

export const backToSearchAction = () => async (dispatch) => {
  dispatch({
    type: BACK_TO_SEARCH,
  });
};

export const updateParamsAction = (params) => async (dispatch) => {
  dispatch({
    type: UPDATE_PARAMS,
    params,
  });
};

export const setPreviewActivityAction = (activity) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_PREVIEW_ACTIVITY,
    activity,
  });
};

export const closePreviewAction = () => async (dispatch) => {
  dispatch({
    type: CLOSE_SEARCH_PREVIEW_ACTIVITY,
  });
};

export const previousPageAction = () => async (dispatch) => {
  dispatch({
    type: PREVIOUS_PAGE,
  });
};

export const nextPageAction = () => async (dispatch) => {
  dispatch({
    type: NEXT_PAGE,
  });
};

export const showSearchProjectAction = (project) => async (dispatch) => {
  const fullProject = await canvasService.getProject(project.id);
  dispatch({
    type: SHOW_SEARCH_PROJECT,
    project: fullProject.project,
  });
};

export const showSearchPlaylistAction = (playlist) => async (dispatch) => {
  dispatch({
    type: SHOW_SEARCH_PLAYLIST,
    playlist,
  });
};

// Other
export const getH5pSettingsAction = (activityId) => async (dispatch) => {
  const h5pSettings = await canvasService.getH5pSettings(activityId);
  dispatch({
    type: GET_H5P_SETTINGS,
    h5pSettings,
  });
};

export const gradePassBackAction = (session, gpb, score, isLearner) => async (dispatch) => {
  dispatch({
    type: GRADE_PASS_BACK,
  });
  if (isLearner) await canvasService.tsugiGradePassback(session, gpb, score);
};

export const activityInitAction = () => async (dispatch) => {
  dispatch({
    type: LTI_ACTIVITY_INIT,
  });
};

export const getLtiSummaryAction = (actor, activityId) => async (dispatch) => {
  const summary = await canvasService.getLtiSummary(actor, activityId);
  dispatch({
    type: GET_LTI_SUMMARY,
    summary,
  });
};

export const getLtiSummaryActivityInfoAction = (activityId) => async (dispatch) => {
  const summaryActivityInfo = await canvasService.getH5pSettings(activityId);
  dispatch({
    type: GET_LTI_SUMMARY_ACTIVITY_INFO,
    summaryActivityInfo,
  });
};
