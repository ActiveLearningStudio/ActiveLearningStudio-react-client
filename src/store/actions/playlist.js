import axios from 'axios';

import {
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  SHOW_CREATE_PLAYLIST_MODAL,
  HIDE_CREATE_PLAYLIST_MODAL,
  LOAD_PROJECT_PLAYLISTS,
  LOAD_PLAYLIST,
  CHANGE_PLAYLIST_TITLE,
  REORDER_PLAYLIST,
  REORDER_PLAYLISTS,
  CLICK_PLAYLIST_TITLE,
  LOAD_H5P,
} from '../actionTypes';

export const reorderPlaylists = (playlists) => ({
  type: REORDER_PLAYLISTS,
  playlists,
});

export const loadProjectPlaylists = (playlists) => ({
  type: LOAD_PROJECT_PLAYLISTS,
  playlists,
});

export const LoadHP = (show) => ({
  type: LOAD_H5P,
  show,
});

export const loadProjectPlaylistsAction = (projectId) => async (dispatch) => {
  try {
    // dispatch({type:PAGE_LOADING});
    const { token } = JSON.parse(localStorage.getItem('auth'));
    const response = await axios.post(
      '/api/project-playlists',
      {
        projectId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data.status === 'success') {
      const { playlists } = response.data.data;

      dispatch(
        loadProjectPlaylists(playlists),
      );
      // dispatch({type:PAGE_LOADING_COMPLETE});
    }
  } catch (e) {
    // dispatch({ type: PAGE_LOADING_COMPLETE });
    throw new Error(e);
  }
};

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
  type: REORDER_PLAYLIST,
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

export const loadPlaylist = (playlist) => ({
  type: LOAD_PLAYLIST,
  playlist,
});

export const loadPlaylistAction = (playlistId) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem('auth'));
  const response = await axios.post(
    '/api/load-playlist',
    { playlistId },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (response.data.status === 'success') {
    dispatch(loadPlaylist(response.data.data.playlist));
  }
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

export const createPlaylist = (playlistData) => ({
  type: CREATE_PLAYLIST,
  playlistData,
});

export const createPlaylistAction = (projectId, title) => async (dispatch) => {
  try {
    const response = await axios.post(
      '/api/playlist',
      {
        projectId,
        title,
      },
    );

    if (response.data.status === 'success') {
      // getting last playlist id

      const playlistData = {
        _id: response.data.data._id,
        title: response.data.data.title,
        projectId: response.data.data.projectId,
      };

      dispatch(
        createPlaylist(playlistData),
      );
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const deletePlaylist = (id) => ({
  type: DELETE_PLAYLIST,
  id,
});

export const deletePlaylistAction = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `/api/playlist/${id}`,
      {
        id,
      },
    );

    if (response.data.status === 'success') {
      dispatch(
        deletePlaylist(id),
      );
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const showCreatePlaylistModal = () => ({
  type: SHOW_CREATE_PLAYLIST_MODAL,
});

export const showCreatePlaylistModalAction = () => async (dispatch) => {
  try {
    dispatch(
      showCreatePlaylistModal(),
    );
  } catch (e) {
    throw new Error(e);
  }
};

export const hideCreatePlaylistModal = () => ({
  type: HIDE_CREATE_PLAYLIST_MODAL,
});

export const hideCreatePlaylistModalAction = () => async (dispatch) => {
  try {
    dispatch(
      hideCreatePlaylistModal(),
    );
  } catch (e) {
    throw new Error(e);
  }
};

export const changePlaylistTitle = (playlistId, title) => ({
  type: CHANGE_PLAYLIST_TITLE,
  playlistId,
  title,
});

export const changePlaylistTitleAction = (e, playlistId) => async (dispatch) => {
  try {
    const title = e.target.value;
    const { token } = JSON.parse(localStorage.getItem('auth'));
    const response = await axios.put(
      `/api/playlist/${playlistId}`,
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data.status === 'success') {
      dispatch(
        changePlaylistTitle(playlistId, title),
      );
    }
  } catch (err) {
    // dispatch({ type: PAGE_LOADING_COMPLETE });
    throw new Error(err);
  }
};

export const clickPlaylistTitle = (playlistId) => ({
  type: CLICK_PLAYLIST_TITLE,
  playlistId,
});

export const clickPlaylistTitleAction = (playlistId) => async (dispatch) => {
  dispatch(
    clickPlaylistTitle(playlistId),
  );
};
