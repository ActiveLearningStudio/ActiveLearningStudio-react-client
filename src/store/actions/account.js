import accountService from 'services/account.service';
import {
    GET_USER_LMS_SETTINGS,
} from '../actionTypes';

export const getUserLmsSettingsAction = () => async (dispatch) => {
  const lmsSettings = await accountService.getUserLmsSettings();
  dispatch({
    type: GET_USER_LMS_SETTINGS,
    lmsSettings,
  });
};