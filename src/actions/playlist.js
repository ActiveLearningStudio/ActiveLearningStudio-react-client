import axios from "axios";
import {history} from './../routers/AppRouter';
import {
  CREATE_PLAYLIST, 
  DELETE_PLAYLIST, 
  SHOW_CREATE_PLAYLIST_MODAL, 
  HIDE_CREATE_PLAYLIST_MODAL, 
  HIDE_PREVIEW_PLAYLIST_MODA, 
  LOAD_PROJECT_PLAYLISTSL, 
  LOAD_PROJECT_PLAYLISTS,
  HIDE_PREVIEW_PLAYLIST_MODAL,
  LOAD_PLAYLIST,
  SHOW_DELETE_PLAYLIST_MODAL,
  HIDE_DELETE_PLAYLIST_MODAL,
  PAGE_LOADING,
  PAGE_LOADING_COMPLETE
} from './../constants/actionTypes';

export const loadPlaylist = (playlist) => ({
  type: LOAD_PLAYLIST,
  playlist: playlist
});

export const loadPlaylistAction = (playlistId) => {
  return async dispatch => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    const response = await axios.post(
      '/api/loadplaylist',
      { playlistId },
      { headers: { "Authorization": "Bearer "+token } }
    );

    if(response.data.status == "success")
      dispatch( loadPlaylist(response.data.data.playlist) );
  };
};

export const createPlaylist = (playlistdata) => ({
  type: CREATE_PLAYLIST,
  playlistdata
});



export const createPlaylistAction = (projectid, title) => {
  return async dispatch => {
    try {
     const response = await axios.post(
      //  `${process.env.REACT_APP_API_URL}/playlist/create`,
       '/api/playlist',
       {
         projectid,
         title
       }
     );
     
     if(response.data.status == "success") {
        //getting last playlist id
        
        const playlistdata = {
          _id:response.data.data._id,
          title: response.data.data.title,
          projectid: response.data.data.projectid
        };
        
        let plists = [];
        // if(localStorage.getItem("playlists")){
        //     plists = JSON.parse(localStorage.getItem("playlists"));
        // }
        
        // plists.unshift(playlistdata);
        
        // localStorage.setItem("playlists", JSON.stringify(plists));
        
        dispatch(
          createPlaylist(playlistdata)
        );
      }

      
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const deletePlaylist = (id) => ({
  type:DELETE_PLAYLIST,
  id
}); 

export const deletePlaylistAction = (id) => {
  return async dispatch => {
    try {
      const response = await axios.delete(
        //  `${process.env.REACT_APP_API_URL}/playlist/create`,
         `/api/playlist/${id}`,
         {
           id
         }
       );

       if(response.data.status == "success") {
          let plists = [];
          // if(localStorage.getItem("playlists")){
          //   plists = JSON.parse(localStorage.getItem("playlists"));
          // }
          // plists = plists.filter(playlist => {
          //   return playlist.id !== id
          // });
          // localStorage.setItem("playlists", JSON.stringify(plists));
          dispatch(
            deletePlaylist(id)
          );
       }
      
    } catch (e) {
      throw new Error(e);
    }
  }
}


export const showCreatePlaylistModal = () => ({
  type:SHOW_CREATE_PLAYLIST_MODAL
});

export const showCreatePlaylistModalAction = () => {
  return async dispatch => {
    try {
      dispatch(
        showCreatePlaylistModal()
      )
    } catch (e) {
      throw new Error(e);
    }
  }
}


export const hideCreatePlaylistModal = () => ({
  type:HIDE_CREATE_PLAYLIST_MODAL
});

export const hideCreatePlaylistModalAction = () => {
  return async dispatch => {
    try {
      dispatch(
        hideCreatePlaylistModal()
      )
    } catch (e) {
      throw new Error(e);
    }
  }
}





export const loadProjectPlaylists = (playlists) => ({
  type: LOAD_PROJECT_PLAYLISTS,
  playlists
});



export const loadProjectPlaylistsAction = (projectid) => {
  return async dispatch => {
    try {
      dispatch({type:PAGE_LOADING});
      const { token } = JSON.parse(localStorage.getItem("auth"));
     const response = await axios.post(
      //  `${process.env.REACT_APP_API_URL}/playlist/create`,
       '/api/project-playlists',
       {
         projectid
       },
       {
          headers: {
            "Authorization": "Bearer "+token
          }
        }
     );
     
     if(response.data.status == "success") {
        let playlists = [];
        playlists = response.data.data.playlists;
        
        
        dispatch(
          loadProjectPlaylists(playlists)
        );
        dispatch({type:PAGE_LOADING_COMPLETE});
      }

      
    } catch (e) {
      dispatch({type:PAGE_LOADING_COMPLETE});
      throw new Error(e);
      
    }
  };
};

