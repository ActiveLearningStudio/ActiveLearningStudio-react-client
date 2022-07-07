import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  screenState: '',
  layout: null,
  selectedLayout: null,
  singleLayout: null,
  playlist: null,
  project: null,
  activity: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_ACTIVITY_SCREEN:
      return {
        ...state,
        screenState: action.payload,
        playlist: action.playlist || state.playlist,
        project: action.project || state.project,
        activity: action.activity || state.activity,
      };
    case actionTypes.SET_LAYOUT_ACTIVITY:
      return {
        ...state,
        layout: action.payload,
      };
    case actionTypes.CLEAR_STATE:
      return {
        screenState: '',
        layout: null,
        selectedLayout: null,
        singleLayout: null,
        playlist: null,
        project: null,
        activity: null,
      };
    case actionTypes.SET_SELECTED_ACTIVITY:
      return {
        ...state,
        selectedLayout: action.payload,
      };
    case actionTypes.SET_SINGLE_ACTIVITY:
      return {
        ...state,
        singleLayout: action.payload,
      };
    default:
      return state;
  }
};
