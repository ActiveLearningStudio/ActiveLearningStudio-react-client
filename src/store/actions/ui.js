import { SHOW_DELETE_POPUP, HIDE_DELETE_POPUP } from '../actionTypes';

export const showDeletePopup = (id, title, deleteType) => ({
  type: SHOW_DELETE_POPUP,
  id,
  title,
  deleteType,
});

// shows the delete popup on activities, project, playlists
export const showDeletePopupAction = (id, title, deleteType) => async (dispatch) => {
  dispatch(showDeletePopup(id, title, deleteType));
};

export const hideDeletePopup = () => ({
  type: HIDE_DELETE_POPUP,
});

// hides the delete popup on activities, project, playlists
export const hideDeletePopupAction = () => async (dispatch) => {
  dispatch(hideDeletePopup());
};
