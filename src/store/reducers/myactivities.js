import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  screenState: '',
  layout: null,
  selectedLayout: null,
  singleLayout: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_ACTIVITY_SCREEN:
      return {
        ...state,
        screenState: action.payload,
       };
    case actionTypes.SET_LAYOUT_ACTIVITY:
      return {
        ...state,
        layout: action.payload,
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
