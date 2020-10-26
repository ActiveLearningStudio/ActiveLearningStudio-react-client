import accountService from 'services/account.service';
import { GET_USER_LMS_SETTINGS } from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const getUserLmsSettingsAction = () => async (dispatch) => {
  const lmsSettings = await accountService.getUserLmsSettings();
  dispatch({
    type: GET_USER_LMS_SETTINGS,
    lmsSettings,
  });
};
