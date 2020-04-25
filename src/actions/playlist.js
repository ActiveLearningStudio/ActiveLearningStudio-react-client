import axios from "axios";
import {CREATE_PLAYLIST, DELETE_PLAYLIST, SHOW_CREATE_PLAYLIST_MODAL, HIDE_CREATE_PLAYLIST_MODAL} from './../constants/actionTypes';

export const createPlaylist = (id, title) => ({
  type: CREATE_PLAYLIST,
  id,
  title
});



export const createPlaylistAction = (title) => {
  return async dispatch => {
    try {
     const response = await axios.post(
      //  `${process.env.REACT_APP_API_URL}/playlist/create`,
       '/api/playlist',
       {
         title
       }
     );
     
     if(response.data.status == "success") {
        //getting last playlist id
        
        const playlistdata = {
          id:response.data.data._id,
          title: response.data.data.title
        };
        
        let plists = [];
        if(localStorage.getItem("playlists")){
            plists = JSON.parse(localStorage.getItem("playlists"));
        }
        
        plists.unshift(playlistdata);
        
        localStorage.setItem("playlists", JSON.stringify(plists));
        
        dispatch(
          createPlaylist(playlistdata.id, title)
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
          if(localStorage.getItem("playlists")){
            plists = JSON.parse(localStorage.getItem("playlists"));
          }
          plists = plists.filter(playlist => {
            return playlist.id !== id
          });
          localStorage.setItem("playlists", JSON.stringify(plists));
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