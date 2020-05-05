import {
    SHOW_DELETE_PLAYLIST_MODAL, HIDE_DELETE_PLAYLIST_MODAL
  } from './../constants/actionTypes';

export const showDeletePlaylistPopup = (id, title, deleteType) => ({
    type:SHOW_DELETE_PLAYLIST_MODAL,
    id,
    title,
    deleteType
  });
  
  export const showDeletePlaylistPopupAction = (id, title, deleteType) => {
    return async dispatch => {
      try {
        dispatch(
          showDeletePlaylistPopup(id, title, deleteType)
        )
      } catch (e) {
        throw new Error(e);
      }
    }
  }



export const hideDeletePlaylistModal = () => ({
    type:HIDE_DELETE_PLAYLIST_MODAL
  });
  
  export const hideDeletePlaylistModalAction = () => {
    return async dispatch => {
      try {
        dispatch(
          hideDeletePlaylistModal()
        )
      } catch (e) {
        throw new Error(e);
      }
    }
  }