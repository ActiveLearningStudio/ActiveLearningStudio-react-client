import { SHOW_LMS, CHANGE_LOADING } from '../actionTypes';

const defaultShareState = () => ({
  shareVendors: [],
  loadingShare: false,
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

    default:
      return state;
  }
};
