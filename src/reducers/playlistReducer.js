import { CREATE_PLAYLIST, DELETE_PLAYLIST, SHOW_CREATE_PLAYLIST_MODAL, HIDE_CREATE_PLAYLIST_MODAL, CREATE_RESOURCE, LOAD_PROJECT_PLAYLISTS } from "../constants/actionTypes";

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
          action.playlistdata,
          ...state.playlists
        ]
      };

      case DELETE_PLAYLIST:
        console.log(state);
        let newPlaylist = state.playlists.filter(playlist => {
          return playlist._id !== action.id
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
        // console.log(state.playlists)
        // console.log(action);
        let newPlaylists = state.playlists;
        state.playlists.forEach((playlist,i) => {
            if(playlist._id === action.playlistid){
              newPlaylists[i] = Object.assign( { 'resources':[] }, newPlaylists[i] );
              newPlaylists[i].resources.push({_id:action.resource.id, id:action.resource.mysqlid, title:action.resource.title});
            }
        });
        
            return {
                ...state,
                playlists: newPlaylists,
                showCreateResourcePopup:false
                
            };
      case LOAD_PROJECT_PLAYLISTS:
        return {
          ...state,
          playlists: action.playlists
        };
    default:
      return state;
  }
};

export default playlistReducer;
