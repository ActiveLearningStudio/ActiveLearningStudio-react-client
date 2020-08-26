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

// Refactor bottom

export const reorderPlaylists = (playlists) => ({
  type: actionTypes.REORDER_PLAYLISTS,
  playlists,
});

export const LoadHP = (show) => ({
  type: actionTypes.LOAD_H5P,
  show,
});

export const reorderPlaylistsAction = (playlists) => async (dispatch) => {
  // Optimistically dispatching action with new playlists data
  // to avoid waiting for request to go through
  dispatch(reorderPlaylists(playlists));

  // Then performing request. If something goes wrong,
  // dispatch loadProjectPlaylistsAction to refresh playlists
  // with fresh server data
  const { token } = JSON.parse(localStorage.getItem('auth'));
  axios.post(
    '/api/reorder-project-playlists',
    { playlists },
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => {
      if (response.data.status === 'error' || response.status !== 200) {
        dispatch(loadProjectPlaylistsAction(playlists[0].projectId));
      }
    })
    .catch(() => {
      dispatch(loadProjectPlaylistsAction(playlists[0].projectId));
    });
};

export const reorderPlaylistActivities = (playlist) => ({
  type: actionTypes.REORDER_PLAYLIST,
  playlist,
});

export const reorderPlaylistActivitiesAction = (playlist) => async (dispatch) => {
  // Optimistically dispatching action with new playlist data
  // to avoid waiting for request to go through
  dispatch(reorderPlaylistActivities(playlist));

  // Then performing request. If something goes wrong,
  // dispatch loadProjectPlaylistsAction to refresh playlists
  // with fresh server data
  const { token } = JSON.parse(localStorage.getItem('auth'));
  axios.post(
    '/api/reorder-playlist',
    { playlist },
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => {
      if (response.data.status === 'error' || response.status !== 200) {
        dispatch(loadProjectPlaylistsAction(playlist.projectId));
      }
    })
    .catch(() => {
      dispatch(loadProjectPlaylistsAction(playlist.projectId));
    });
};

export const loadLtiPlaylistAction = (playlistId) => async (dispatch) => {
  // const { token } = JSON.parse(localStorage.getItem("auth"));
  const response = await axios.post('/api/load-playlist-lti', { playlistId });

  if (response.data.status === 'success') {
    dispatch(loadPlaylist(response.data.data.playlist));
  }
};

export const loadPlaylistActionShared = (playlistId) => async (dispatch) => {
  // const { token } = JSON.parse(localStorage.getItem("auth"));
  const response = await axios.post('/api/load-shared-playlist', {
    playlistId,
  });

  if (response.data.status === 'success') {
    dispatch(loadPlaylist(response.data.data.playlist));
  } else {
    dispatch(loadPlaylist(response.data.status));
  }
};

// export const loadPlaylistActionNew = (resourceId) => async (dispatch) => {
//   const { token } = JSON.parse(localStorage.getItem('auth'));
//   await axios
//     .post(
//       `${global.config.laravelAPIUrl}/h5p-resource-settings`,
//       { resourceId },
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
