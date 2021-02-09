import canvasService from 'services/canvas.service';
import {
  DO_SEARCH,
  BACK_TO_SEARCH,
  UPDATE_PARAMS,
  SET_PREVIEW_ACTIVITY,
  CLOSE_PREVIEW,
  GET_H5P_SETTINGS,
  PREVIOUS_PAGE,
  NEXT_PAGE,
  SHOW_RESULTS,
  GRADE_PASS_BACK,
  LTI_ACTIVITY_INIT,
  DO_BROWSE,
} from '../actionTypes';

export const browseAction = (params) => async (dispatch) => {
  const results = await canvasService.browse(params);
  dispatch({
    type: DO_BROWSE,
    results,
  });
};

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
    type: SET_PREVIEW_ACTIVITY,
    activity,
  });
};

export const closePreviewAction = () => async (dispatch) => {
  dispatch({
    type: CLOSE_PREVIEW,
  });
};

export const getH5pSettingsAction = (activityId) => async (dispatch) => {
  const h5pSettings = await canvasService.getH5pSettings(activityId);
  dispatch({
    type: GET_H5P_SETTINGS,
    h5pSettings,
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
