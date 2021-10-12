import axios from 'axios';
import Swal from 'sweetalert2';
import Echo from 'laravel-echo';

import socketConnection from 'services/http.service';
import playlistService from 'services/playlist.service';
import * as actionTypes from '../actionTypes';

export const createPlaylistAction = (projectId, title) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_PLAYLIST_REQUEST });
    Swal.fire({
      allowOutsideClick: false,
      onRender: () => {
        Swal.showLoading();
      },
    });
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
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: e.message || 'Something went wrong! We are unable to load activity.',
    });
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

export const loadProjectPlaylistsAction = (projectId, skipContent = false) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.PAGE_LOADING,
    });

    const { playlists } = await playlistService.getAll(projectId, skipContent);

    dispatch({
      type: actionTypes.LOAD_PROJECT_PLAYLISTS,
      payload: { playlists },
    });

    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });
  } catch (e) {
    // Swal.fire({
    //   title: 'Error',
    //   icon: 'error',
    //   html: e.message || 'Something went wrong! We are unable to load activity.',
    // });
    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });

    throw e;
  }
};

export const lmsPlaylist = (projectId) => async (dispatch) => {
  const { playlists } = await playlistService.getAll(projectId);
  dispatch({
    type: actionTypes.LOAD_PROJECT_PLAYLISTS,
    payload: { playlists },
  });
  return { playlists };
};

export const changePlaylistTitleAction = (projectId, playlistId, title) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.UPDATE_PLAYLIST_REQUEST,
    });

    const playlist = await playlistService.update(projectId, playlistId, { title });
    dispatch({
      type: actionTypes.UPDATE_PLAYLIST_SUCCESS,
      payload: playlist,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.UPDATE_PLAYLIST_FAIL,
    });

    throw e;
  }
};

export const clearFormData = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_FORM_DATA_IN_CREATION,
  });
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

    const pLists = playlists.map((pList, index) => ({
      id: pList.id,
      order: index,
      activities: pList.activities.map((act, idx) => ({
        id: act.id,
        order: idx,
      })),
    }));

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
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: e.message || 'Something went wrong! We are unable to load activity.',
    });
    dispatch({
      type: actionTypes.LOAD_PLAYLIST_FAIL,
    });

    throw e;
  }
};

export const showCreatePlaylistModalAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_CREATE_PLAYLIST_MODAL,
  });
};

export const hideCreatePlaylistModalAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.HIDE_CREATE_PLAYLIST_MODAL,
  });
};

export const loadLtiPlaylistAction = (playlistId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOAD_PLAYLIST_REQUEST,
    });

    const { playlist } = await playlistService.loadLti(playlistId);

    dispatch({
      type: actionTypes.LOAD_PLAYLIST_SUCCESS,
      payload: { playlist },
    });
  } catch (e) {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: e.message || 'Something went wrong! We are unable to load activity.',
    });
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

export const updatedPlaylist = (userId) => async () => {
  const echo = new Echo(socketConnection.notificationSocket());

  echo.private('playlist-update')
    .listen('PlaylistUpdatedEvent', (msg) => {
      if (msg.userId !== userId) {
        const path = window.location.pathname;

        let message = '';
        if (path.includes(`playlist/${msg.playlistId}`)) {
          message = 'This playlist has been modified by other team member. Are you ok to refresh page to see what is updated?';
        } else if (path.includes(`project/${msg.projectId}`)) {
          message = 'This project has been modified by other team member. Are you ok to refresh page to see what is updated?';
        }

        if (message) {
          Swal.fire({
            title: message,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
          })
            .then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
        }
      }
    });
};
