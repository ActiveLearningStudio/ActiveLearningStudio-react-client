import * as actionTypes from '../actionTypes';

export const setActiveAdminForm = (type) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_ACTIVE_FORM,
    payload: type,
  });
};

export const setActiveTab = (type) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_ACTIVE_TAB,
    payload: type,
  });
};

export const removeActiveAdminForm = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ACTIVE_FORM,
  });
};
