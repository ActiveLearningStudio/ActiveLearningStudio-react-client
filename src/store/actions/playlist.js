import axios from 'axios';

import playlistService from 'services/playlist.service';
import * as actionTypes from '../actionTypes';

export const createPlaylistAction = (projectId, title) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_PLAYLIST_REQUEST });

    const { playlist } = await playlistService.create(projectId, { title });

    dispatch({
      type: actionTypes.CREATE_PLAYLIST_SUCCESS,
      payload: { playlist },
    });
  } catch (e) {
    dispatch({ type: actionTypes.CREATE_PLAYLIST_FAIL });

    throw e;
  }
};

export const loadPlaylist = (playlist) => ({
  type: actionTypes.LOAD_PLAYLIST,
  playlist,
});

export const loadPlaylistAction = (projectId, id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOAD_PLAYLIST_REQUEST,
    });

    const { playlist } = await playlistService.get(projectId, id);

    dispatch({
      type: actionTypes.LOAD_PLAYLIST_SUCCESS,
      payload: { playlist },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.LOAD_PLAYLIST_FAIL,
    });

    throw e;
  }
};

export const deletePlaylistAction = (projectId, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_PLAYLIST_REQUEST });

    await playlistService.remove(projectId, id);

    dispatch({
      type: actionTypes.DELETE_PLAYLIST_SUCCESS,
      payload: { playlistId: id },
    });
  } catch (e) {
    dispatch({ type: actionTypes.DELETE_PLAYLIST_FAIL });

    throw e;
  }
};

export const loadProjectPlaylistsAction = (projectId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.PAGE_LOADING,
    });

    const { playlists } = await playlistService.getAll(projectId);

    dispatch({
      type: actionTypes.LOAD_PROJECT_PLAYLISTS,
      payload: { playlists },
    });

    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });

    throw e;
  }
};

export const changePlaylistTitleAction = (projectId, playlistId, title) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.UPDATE_PLAYLIST_REQUEST,
    });

    const { playlist } = await playlistService.update(projectId, playlistId, { title });
    dispatch({
      type: actionTypes.UPDATE_PLAYLIST_SUCCESS,
      payload: { playlist },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.UPDATE_PLAYLIST_FAIL,
    });

    throw e;
  }
};

// Reorders playlists AND activities
export const reorderPlaylistsAction = (projectId, orgPlaylists, playlists) => async (dispatch) => {
  try {
    // Optimistically dispatching action with new playlists data
    // to avoid waiting for request to go through
    dispatch({
      type: actionTypes.REORDER_PLAYLISTS_REQUEST,
      payload: { playlists },
    });

    const pLists = playlists.map((pList, index) => {
      const mapped = {
        id: pList.id,
        order: index,
        activities: pList.activities.map((act, index) => ({
          id: act.id,
          order: index
        }))
      };
      return mapped;
    });

    const { playlists: updatedPlaylists } = await playlistService.reorder(projectId, pLists);

    dispatch({
      type: actionTypes.REORDER_PLAYLISTS_SUCCESS,
      payload: { updatedPlaylists },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.REORDER_PLAYLISTS_FAIL,
      payload: { orgPlaylists },
    });
  }
};

export const loadSharedPlaylistAction = (projectId, playlistId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOAD_PLAYLIST_REQUEST,
    });

    const { playlist } = await playlistService.loadShared(playlistId);

    dispatch({
      type: actionTypes.LOAD_PLAYLIST_SUCCESS,
      payload: { playlist },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.LOAD_PLAYLIST_FAIL,
    });

    throw e;
  }
};

// Refactor bottom

export const LoadHP = (show) => ({
  type: actionTypes.LOAD_H5P,
  show,
});

export const loadLtiPlaylistAction = (playlistId) => async (dispatch) => {
  // const { token } = JSON.parse(localStorage.getItem("auth"));
  const response = await axios.post('/api/load-playlist-lti', { playlistId });

  if (response.data.status === 'success') {
    dispatch(loadPlaylist(response.data.data.playlist));
  }
};

// export const loadPlaylistActionNew = (activityId) => async (dispatch) => {
//   const { token } = JSON.parse(localStorage.getItem('auth'));
//   await axios
//     .post(
//       `${global.config.laravelAPIUrl}/h5p-resource-settings`,
//       { activityId },
//       { headers: { Authorization: `Bearer ${token}` } },
//     )
//     .then((response) => {
//       // if (response.data.status == "success")
//       // dispatch(loadPlaylist(response.data.data.playlist));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export const showCreatePlaylistModal = () => ({
  type: actionTypes.SHOW_CREATE_PLAYLIST_MODAL,
});

export const showCreatePlaylistModalAction = () => async (dispatch) => {
  dispatch(showCreatePlaylistModal());
};

export const hideCreatePlaylistModal = () => ({
  type: actionTypes.HIDE_CREATE_PLAYLIST_MODAL,
});

export const hideCreatePlaylistModalAction = () => async (dispatch) => {
  dispatch(hideCreatePlaylistModal());
};
