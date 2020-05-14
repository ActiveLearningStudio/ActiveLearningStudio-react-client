import {
  SHOW_DELETE_PLAYLIST_MODAL, DELETE_PLAYLIST, DELETE_RESOURCE, DELETE_PROJECT, HIDE_DELETE_PLAYLIST_MODAL, PAGE_LOADING_COMPLETE, PAGE_LOADING
} from "../constants/actionTypes";

const defaultUIState = () => {
  return {
    showCreatePlaylistPopup: false,
    selectedPlaylist: null,
    showDeletePlaylistPopup: false
  };
};

const uiReducer = (state = defaultUIState(), action) => {
  switch (action.type) {
    case SHOW_DELETE_PLAYLIST_MODAL:
      return {
        ...state,
        showDeletePlaylistPopup: true,
        id: action.id,
        title: action.title,
        deleteType: action.deleteType
      };
    case HIDE_DELETE_PLAYLIST_MODAL:
      return {
        ...state,
        showDeletePlaylistPopup: false
      };
    case DELETE_PROJECT:
      return {
        ...state,
        showDeletePlaylistPopup: false
      }
    case DELETE_PLAYLIST:
      return {
        ...state,
        showDeletePlaylistPopup: false
      }
    case DELETE_RESOURCE:
      return {
        ...state,
        showDeletePlaylistPopup: false
      }
    case PAGE_LOADING:
      return {
        ...state,
        pageLoading: true
      }
    case PAGE_LOADING_COMPLETE:
      return {
        ...state,
        pageLoading: false
      }
    default:
      return state;
  }
};

export default uiReducer;
