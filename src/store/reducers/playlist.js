import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  playlists: [],
  showCreatePlaylistPopup: false,
  selectedPlaylist: {},
  loadingH5P: 'loading...',
};

let newPlaylists = [];

export default (state = INITIAL_STATE, action) => {
  const { playlists } = state;

  switch (action.type) {
    case actionTypes.CREATE_PLAYLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CREATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playlists: [...playlists, action.payload.playlist],
        thumbUrl: null,
      };
    case actionTypes.CREATE_PLAYLIST_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOAD_PLAYLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOAD_PLAYLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedPlaylist: action.payload.playlist,
      };
    case actionTypes.LOAD_PLAYLIST_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.UPDATE_PLAYLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.UPDATE_PLAYLIST_SUCCESS:
      const index = playlists.findIndex((p) => p.id === action.payload.playlist.id);
      if (index > -1) {
        return {
          ...state,
          isLoading: false,
          playlists: playlists.splice(index, 1, action.payload.playlist),
          thumbUrl: null,
        };
      }
      return {
        ...state,
        isLoading: false,
        playlists: [...playlists, action.payload.playlist],
        thumbUrl: null,
      };
    case actionTypes.UPDATE_PLAYLIST_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.DELETE_PLAYLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.DELETE_PLAYLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playlists: playlists.filter((playlist) => playlist.id !== action.payload.playlistId),
      };
    case actionTypes.DELETE_PLAYLIST_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOAD_PROJECT_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload.playlists,
      };

    // Refactor bottom
    case actionTypes.LOAD_H5P:
      return {
        ...state,
        loadingH5P: action.show,
      };

    // reset playlists to empty when going to playlists dashboard
    // so that when user clicks to new playlist it will load to default empty
    case actionTypes.LOAD_MY_PROJECTS:
      return {
        ...state,
        playlists: [],
      };

    case actionTypes.SHOW_CREATE_PLAYLIST_MODAL:
      return {
        ...state,
        showCreatePlaylistPopup: true,
      };

    case actionTypes.HIDE_CREATE_PLAYLIST_MODAL:
      return {
        ...state,
        showCreatePlaylistPopup: false,
      };

    case actionTypes.CREATE_RESOURCE:
      // adding resource to newPlaylist specific id
      newPlaylists = state.playlists;
      state.playlists.forEach((playlist, i) => {
        if (playlist.id === action.playlistId) {
          newPlaylists[i] = { resources: [], ...newPlaylists[i] };
          newPlaylists[i].resources.push({
            _id: action.resource.id,
            id: action.resource.mysqlId,
            title: action.resource.title,
          });
        }
      });
      return {
        ...state,
        playlists: newPlaylists,
        showCreateResourcePopup: false,
      };

    case actionTypes.EDIT_RESOURCE:
      // adding resource to newPlaylist specific id
      return {
        ...state,
        showCreateResourcePopup: false,
      };

    case actionTypes.DELETE_RESOURCE:
      const plists = [];
      state.playlists.forEach((playlist) => {
        const newResources = playlist.resources.filter((res) => res.id !== action.payload.resourceId);
        const p = playlist;
        p.resources = newResources;
        plists.push(p);
      });
      return {
        ...state,
        playlists: plists,
        showCreateResourcePopup: false,
        showDeletePlaylistPopup: false,
      };

    case actionTypes.LOAD_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.playlist,
      };

    case actionTypes.REORDER_PLAYLIST:
      // Find the changed playlist and replace with action.playlist
      const newReorderedPlaylists = state.playlists.map(
        (playlist) => ((playlist.id === action.playlist.id) ? action.playlist : playlist),
      );
      return {
        ...state,
        playlists: newReorderedPlaylists,
      };

    case actionTypes.REORDER_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };

    default:
      return state;
  }
};
