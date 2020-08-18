import {
  SHOW_DELETE_POPUP,
  DELETE_RESOURCE,
  DELETE_PROJECT_SUCCESS,
  HIDE_DELETE_POPUP,
  PAGE_LOADING_COMPLETE,
  PAGE_LOADING,
  DELETE_PLAYLIST_SUCCESS,
} from '../actionTypes';

const defaultUIState = () => ({
  showCreatePlaylistPopup: false,
  selectedPlaylist: null,
  showDeletePlaylistPopup: false,
});

export default (state = defaultUIState(), action) => {
  switch (action.type) {
    case SHOW_DELETE_POPUP:
      return {
        ...state,
        showDeletePlaylistPopup: true,
        id: action.id,
        title: action.title,
        deleteType: action.deleteType,
      };
    case HIDE_DELETE_POPUP:
      return {
        ...state,
        showDeletePlaylistPopup: false,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        showDeletePlaylistPopup: false,
      };
    case DELETE_PLAYLIST_SUCCESS:
      return {
        ...state,
        showDeletePlaylistPopup: false,
      };
    case DELETE_RESOURCE:
      return {
        ...state,
        showDeletePlaylistPopup: false,
      };
    case PAGE_LOADING:
      return {
        ...state,
        pageLoading: true,
      };
    case PAGE_LOADING_COMPLETE:
      return {
        ...state,
        pageLoading: false,
      };
    default:
      return state;
  }
};
