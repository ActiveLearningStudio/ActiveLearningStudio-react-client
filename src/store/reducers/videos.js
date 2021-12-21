/* eslint-disable */
import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  allVideos: [],
  videoId: '',
  editVideo: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ALL_VIDEOS:
      return {
        ...state,
        allVideos: action.payload,
      };

    case actionTypes.ADD_VIDEO_URL:
      return {
        ...state,
        videoId: action.payload,
      };

    case actionTypes.ADD_NEW_VIDEO:
      return {
        ...state,
        allVideos: [...state.allVideos, action.payload],
      };
    case actionTypes.SET_ACTIVE_VIDEO_SCREEN:
      return {
        ...state,
        editVideo: action.payload,
      };
    case actionTypes.REMOVE_VIDEOS:
      const refreshVideo = state.allVideos.filter((data) => data.id !== action.payload);
      return {
        ...state,
        allVideos: refreshVideo,
      };
    default:
      return state;
  }
};
