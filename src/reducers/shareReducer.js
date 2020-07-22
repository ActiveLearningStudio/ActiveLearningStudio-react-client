import {
  SHOW_LMS,
  CHANGE_LOADING,
  GOOGLE_SHARE,
} from "../constants/actionTypes";

const defaultsharestate = () => {
  return {
    sharevendoes: [],
    loadingshare: false,
    googleshare: false,
  };
};

const shareReducder = (state = defaultsharestate(), action) => {
  switch (action.type) {
    case SHOW_LMS:
      return {
        ...state,
        sharevendoes: action.lmsInfo,
      };
    case CHANGE_LOADING:
      return {
        ...state,
        loadingshare: action.change,
      };
    case GOOGLE_SHARE:
      return {
        ...state,
        googleshare: action.value,
      };

    default:
      return state;
  }
};

export default shareReducder;
