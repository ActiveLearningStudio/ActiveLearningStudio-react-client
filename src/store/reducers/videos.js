/* eslint-disable */
import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  allVideos: null,
  videoId: '',
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
    default:
      return state;
  }
};
