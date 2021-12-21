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
      if (!state.allVideos.length) {
        return {
          ...state,
          allVideos: action.payload,
        };
      } else {
        return {
          ...state,
          allVideos: [...state.allVideos, action.payload],
        };
      }

    case actionTypes.ADD_VIDEO_URL:
      return {
        ...state,
        videoId: action.payload,
      };
    case actionTypes.SET_ACTIVE_VIDEO_SCREEN:
      return {
        ...state,
        editVideo: action.payload,
      };
    default:
      return state;
  }
};
