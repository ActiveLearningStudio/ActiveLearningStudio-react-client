import {
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  SHOW_CREATE_PLAYLIST_MODAL,
  HIDE_CREATE_PLAYLIST_MODAL,
  CREATE_RESOURCE,
  LOAD_PROJECT_PLAYLISTS,
  LOAD_PLAYLIST,
  DELETE_RESOURCE,
  REORDER_PLAYLIST,
  REORDER_PLAYLISTS,
  EDIT_RESOURCE,
  LOAD_MY_PROJECTS,
  CHANGE_PLAYLIST_TITLE,
  CLICK_PLAYLIST_TITLE,
  LOAD_H5P,
} from '../actionTypes';

const defaultPlaylistState = () => {
  if (localStorage.getItem('playlists')) {
    return {
      playlists: JSON.parse(localStorage.getItem('playlists')),
      showCreatePlaylistPopup: false,
      loadingH5P: 'loading...',
    };
  }

  return {
    playlists: [],
    showCreatePlaylistPopup: false,
    selectedPlaylist: null,
    loadingH5P: 'loading...',
  };
};

let newPlaylists = [];

export default (state = defaultPlaylistState(), action) => {
  switch (action.type) {
    case CREATE_PLAYLIST:
      return {
        ...state,
        playlists: [
          ...state.playlists,
          action.playlistData,
        ],
      };

    case LOAD_H5P:
      return {
        ...state,
        loadingH5P: action.show,
      };

    // reset playlists to empty when going to projects dashboard
    // so that when user clicks to new project it will load to default empty
    case LOAD_MY_PROJECTS:
      return {
        ...state,
        playlists: [],
      };

    case DELETE_PLAYLIST:
      const nPlaylists = state.playlists.filter((playlist) => playlist._id !== action.id);
      return {
        ...state,
        showDeletePlaylistPopup: false,
        playlists: nPlaylists,
      };

    case SHOW_CREATE_PLAYLIST_MODAL:
      return {
        ...state,
        showCreatePlaylistPopup: true,
      };

    case HIDE_CREATE_PLAYLIST_MODAL:
      return {
        ...state,
        showCreatePlaylistPopup: false,
      };

    case CREATE_RESOURCE:
      // adding resource to newPlaylist specific id
      newPlaylists = state.playlists;
      state.playlists.forEach((playlist, i) => {
        if (playlist._id === action.playlistId) {
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

    case EDIT_RESOURCE:
      // adding resource to newPlaylist specific id
      return {
        ...state,
        showCreateResourcePopup: false,
      };

    case DELETE_RESOURCE:
      const plists = [];
      state.playlists.forEach((playlist) => {
        const newResources = playlist.resources.filter((res) => res._id !== action.resourceId);
        let p = null;
        p = playlist;
        p.resources = newResources;
        plists.push(p);
      });

      return {
        ...state,
        playlists: plists,
        showCreateResourcePopup: false,
        showDeletePlaylistPopup: false,
      };

    case LOAD_PROJECT_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };

    case LOAD_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.playlist,
      };

    case REORDER_PLAYLIST:
      // Find the changed playlist and replace with action.playlist
      const newReorderedPlaylists = state.playlists.map(
        (playlist) => ((playlist._id === action.playlist._id) ? action.playlist : playlist),
      );
      return {
        ...state,
        playlists: newReorderedPlaylists,
      };

    case REORDER_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };

    case CHANGE_PLAYLIST_TITLE:
      const newTitleChangedPlaylists = state.playlists.filter((playlist) => {
        const newPlaylist = { ...playlist };
        if (newPlaylist._id === action.playlistId) {
          newPlaylist.title = action.title;
          newPlaylist.playlistTitleClicked = false;
        }
        return newPlaylist;
      });
      return {
        ...state,
        playlists: newTitleChangedPlaylists,
      };

    case CLICK_PLAYLIST_TITLE:
      const newClickTitlePlaylists = state.playlists.filter((playlist) => {
        const nPlaylist = { ...playlist };
        if (nPlaylist._id === action.playlistId) {
          nPlaylist.playlistTitleClicked = true;
        }
        return nPlaylist;
      });
      return {
        ...state,
        playlists: newClickTitlePlaylists,
      };

    default:
      return state;
  }
};
