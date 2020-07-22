import { SHOW_LMS, CHANGE_LOADING, GOOGLE_SHARE } from '../actionTypes';

const defaultShareState = () => ({
  shareVendors: [],
  loadingShare: false,
  googleShare: false,
});

export default (state = defaultShareState(), action) => {
  switch (action.type) {
    case SHOW_LMS:
      return {
        ...state,
        shareVendors: action.lmsInfo,
      };

    case CHANGE_LOADING:
      return {
        ...state,
        loadingShare: action.change,
      };

    case GOOGLE_SHARE:
      return {
        ...state,
        googleShare: action.value,
      };

    default:
      return state;
  }
};
