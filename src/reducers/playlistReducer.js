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
  lOADPH5,
} from "../constants/actionTypes";
import { useState } from "react";
import { useEffect } from "react";

const defaultPlaylistState = () => {
  if (localStorage.getItem("playlists")) {
    return {
      playlists: JSON.parse(localStorage.getItem("playlists")),
      showCreatePlaylistPopup: false,
      loadingPH5: "loading...",
    };
  } else {
    return {
      playlists: [],
      showCreatePlaylistPopup: false,
      selectedPlaylist: null,
      loadingPH5: "loading...",
    };
  }
};

let newPlaylists = [];

const playlistReducer = (state = defaultPlaylistState(), action) => {
  switch (action.type) {
    case CREATE_PLAYLIST:
      return {
        ...state,
        playlists: [...state.playlists, action.playlistdata],
      };
    case lOADPH5:
      return {
        ...state,
        loadingPH5: action.show,
      };
    //reset playlists to empty when going to projects dashboard
    //so that when user clicks to new project it will load to default empty
    case LOAD_MY_PROJECTS:
      return {
        ...state,
        playlists: [],
      };

    case DELETE_PLAYLIST:
      let newPlaylist = state.playlists.filter((playlist) => {
        return playlist._id !== action.id;
      });
      return {
        ...state,
        showDeletePlaylistPopup: false,
        playlists: newPlaylist,
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
      // adding resource to newplaylist specific id
      newPlaylists = state.playlists;
      state.playlists.forEach((playlist, i) => {
        if (playlist._id === action.playlistid) {
          newPlaylists[i] = Object.assign({ resources: [] }, newPlaylists[i]);
          newPlaylists[i].resources.push({
            _id: action.resource.id,
            id: action.resource.mysqlid,
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
      // adding resource to newplaylist specific id
      return {
        ...state,
        showCreateResourcePopup: false,
      };
    case DELETE_RESOURCE:
      let plists = [];
      state.playlists.forEach((playlist, i) => {
        let newResources = playlist.resources.filter((res) => {
          return res._id !== action.resourceid;
        });
        var p = null;
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
      const newReorderedPlaylists = state.playlists.map((playlist) => {
        return playlist._id === action.playlist._id
          ? action.playlist
          : playlist;
      });
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
      let newTitleChangedPlaylists = state.playlists.filter((playlist) => {
        if (playlist._id === action.playlistid) {
          playlist.title = action.title;
          playlist.playlistTitleClicked = false;
        }
        return playlist;
      });
      return {
        ...state,
        playlists: newTitleChangedPlaylists,
      };
    case CLICK_PLAYLIST_TITLE:
      let newClickTitlePlaylists = state.playlists.filter((playlist) => {
        if (playlist._id === action.playlistid) {
          playlist.playlistTitleClicked = true;
        }
        return playlist;
      });
      return {
        ...state,
        playlists: newClickTitlePlaylists,
      };

    default:
      return state;
  }
};

export default playlistReducer;
