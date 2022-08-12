/* eslint-disable */
import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  allVideos: [],
  videoId: '',
  editVideo: '',
  activecms: null,
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
        platform: action.platformName,
      };
    case actionTypes.ADD_NEW_VIDEO:
      return {
        ...state,
        allVideos: { ...state.allVideos, data: [...state.allVideos.data, action.payload] },
      };
    case actionTypes.SET_ACTIVE_VIDEO_SCREEN:
      return {
        ...state,
        editVideo: action.payload,
      };

    case actionTypes.EDIT_CMS_SCREEN:
      return {
        ...state,
        activecms: action.payload,
      };
    case actionTypes.EDIT_VIDEO_ACTIVITY:
      const updatedData = state.allVideos?.data.map((data) => {
        if (data.id === action.payload.id) {
          return action.payload;
        } else {
          return data;
        }
      });
      return {
        ...state,
        allVideos: { ...state.allVideos, data: updatedData },
      };
    case actionTypes.REMOVE_VIDEOS:
      const refreshVideo = state.allVideos.data.filter((data) => data.id !== action.payload);
      return {
        ...state,
        allVideos: { ...state.allVideos, data: refreshVideo },
      };
    default:
      return state;
  }
};
