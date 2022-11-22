/* eslint-disable no-unused-vars */
import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: true,
  komodoVideoList: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.KOMODO_VIDEO_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        komodoVideoList: action.payload,
      };

    case actionTypes.KOMODO_VIDEO_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        komodoVideoList: [],
      };
    default:
      return state;
  }
};
