import { SHOW_LMS } from "../constants/actionTypes";

const defaultsharestate = () => {
  return {
    sharevendoes: [],
  };
};

const shareReducder = (state = defaultsharestate(), action) => {
  switch (action.type) {
    case SHOW_LMS:
      return {
        sharevendoes: action.lmsInfo,
      };

    default:
      return state;
  }
};

export default shareReducder;
