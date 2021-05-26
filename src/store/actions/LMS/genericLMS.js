import service from 'services/genericLMS.service';
import {
  GENERIC_LMS_LOGIN,
  GENERIC_LMS_LOGIN_ERROR,
  GENERIC_LMS_LOAD_H5P_SETTINGS,
  GENERIC_LMS_LOAD_H5P_SETTINGS_ERROR,
} from '../../genericLMSActionTypes';

export const doLoginAction = (params) => async (dispatch) => {
  const results = await service.login(params.lmsName, params);
  if (results.errors) {
    dispatch({
      type: GENERIC_LMS_LOGIN_ERROR,
      results,
    });
  } else {
    dispatch({
      type: GENERIC_LMS_LOGIN,
      results,
    });
  }
};

export const loadH5PSettingsAction = (activityId) => async (dispatch) => {
  const results = await service.loadH5PSettings(activityId);
  if (results.errors) {
    dispatch({
      type: GENERIC_LMS_LOAD_H5P_SETTINGS_ERROR,
      results,
    });
  } else {
    dispatch({
      type: GENERIC_LMS_LOAD_H5P_SETTINGS,
      results,
    });
  }
};
