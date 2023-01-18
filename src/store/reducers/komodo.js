/* eslint-disable */
import * as actionTypes from "../actionTypes";

const INITIAL_STATE = {
  isLoading: true,
  komodoVideoList: null,
  isLazyLoading: false,
};
export default (state = INITIAL_STATE, action) => {
  const { komodoVideoList } = state;
  switch (action.type) {
    case actionTypes.KOMODO_VIDEO_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        komodoVideoList: action.payload,
      };

    case actionTypes.KOMODO_VIDEO_LOAD:
      return {
        ...state,
        isLazyLoading: true,
      };
    case actionTypes.ADD_MORE_KOMODO_VIDEO:
      if (komodoVideoList) {
        const oldKmodoVideos = komodoVideoList?.data;
        return {
          ...state,
          komodoVideoList: {
            ...action.payload,
            data: oldKmodoVideos?.concat(action.payload.data),
          },
          isLazyLoading: false,
        };
      }

    default:
      return state;
  }
};
