import {
  SHOW_DELETE_POPUP, HIDE_DELETE_POPUP
} from './../constants/actionTypes';

export const showDeletePopup = (id, title, deleteType) => ({
  type: SHOW_DELETE_POPUP,
  id,
  title,
  deleteType
});

export const showDeletePopupAction = (id, title, deleteType) => {
  return async dispatch => {
    try {
      dispatch(
        showDeletePopup(id, title, deleteType)
      )
    } catch (e) {
      throw new Error(e);
    }
  }
}

export const hideDeletePopup = () => ({
  type: HIDE_DELETE_POPUP
});

export const hideDeletePopupAction = () => {
  return async dispatch => {
    try {
      dispatch(
        hideDeletePopup()
      )
    } catch (e) {
      throw new Error(e);
    }
  }
}