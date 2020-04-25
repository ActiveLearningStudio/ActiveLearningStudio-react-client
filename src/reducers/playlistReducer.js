import { CREATE_PLAYLIST, DELETE_PLAYLIST, SHOW_CREATE_PLAYLIST_MODAL, HIDE_CREATE_PLAYLIST_MODAL, CREATE_RESOURCE } from "../constants/actionTypes";

const defaultPlaylistState = () => {
  if (localStorage.getItem("playlists")) {
//      console.log("---");
//      console.log(localStorage.getItem("playlists"));
    //  localStorage.clear();
        
    return {
        'playlists':JSON.parse(localStorage.getItem("playlists")),
        'showCreatePlaylistPopup':false
    }
  } else {
    return {
        'playlists':[],
        'showCreatePlaylistPopup':false
    };
  }
};

const playlistReducer = (state = defaultPlaylistState(), action) => {
  switch (action.type) {
    case CREATE_PLAYLIST:
      return {
        ...state,
        playlists: [
          {id:action.id, title:action.title},
          ...state.playlists
        ]
      };

      case DELETE_PLAYLIST:
        let newPlaylist = state.playlists.filter(playlist => {
          return playlist.id !== action.id
        });
        return {
          ...state,
          playlists: newPlaylist
        };
        case SHOW_CREATE_PLAYLIST_MODAL:
          return {
            ...state,
            showCreatePlaylistPopup: true
          };
        case HIDE_CREATE_PLAYLIST_MODAL:
          return {
            ...state,
            showCreatePlaylistPopup: false
          };
      case CREATE_RESOURCE:
        // adding resource to newplaylist specific id
        let newPlaylists = state.playlists;
        state.playlists.forEach((playlist,i) => {
            if(playlist.id === action.playlistId){
              newPlaylists[i] = Object.assign( { 'resources':[] }, newPlaylists[i] );
              newPlaylists[i].resources.push({id:action._id, title:action.title});
            }
        });
        
            return {
                ...state,
                playlists: newPlaylists,
                showCreateResourcePopup:false
                
            };
    default:
      return state;
  }
};

export default playlistReducer;
