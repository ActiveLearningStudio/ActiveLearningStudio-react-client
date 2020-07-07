import { SHOW_LMS, CHANGE_LOADING } from "../constants/actionTypes";

const defaultsharestate = () => {
  return {
    sharevendoes: [],
    loadingshare: false,
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

    default:
      return state;
  }
};

export default shareReducder;
