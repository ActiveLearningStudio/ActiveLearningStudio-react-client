import {
  SHOW_DELETE_POPUP,
  HIDE_DELETE_POPUP,
  PAGE_LOADING_COMPLETE,
  PAGE_LOADING,
  DELETE_PROJECT_SUCCESS,
  DELETE_PLAYLIST_SUCCESS,
  DELETE_RESOURCE_SUCCESS,
  SIDE_BAR_COLLAPSE_TOGGLE,
  SHOW_HELP,
  HIDE_HELP,
  UPDATE_PAGINATION,
  CHANGE_ORIENTATION,
} from '../actionTypes';

const defaultUIState = () => ({
  showCreatePlaylistPopup: false,
  selectedPlaylist: null,
  showDeletePlaylistPopup: false,
  sideBarCollapsed: false,
  help: false,
  paginations: null,
  orientation: 0,
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
    case CHANGE_ORIENTATION:
      return {
        ...state,
        orientation: action.payload,
      };
    case UPDATE_PAGINATION:
      return {
        ...state,
        paginations: action.payload,
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

    case DELETE_RESOURCE_SUCCESS:
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

    case SIDE_BAR_COLLAPSE_TOGGLE:
      return {
        ...state,
        sideBarCollapsed: !state.sideBarCollapsed,
      };
    case SHOW_HELP:
      return {
        ...state,
        help: true,
      };
    case HIDE_HELP:
      return {
        ...state,
        help: false,
      };

    default:
      return state;
  }
};
