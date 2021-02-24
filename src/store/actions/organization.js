import * as actionTypes from '../actionTypes';

export const updateOrganizationScreen = (screen) => (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_ACTIVE_SCREEN,
    payload: screen,
  });
};

export const updateOrganizationScreen1 = (screen) => (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_ACTIVE_SCREEN,
    payload: screen,
  });
};
