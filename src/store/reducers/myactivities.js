import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  screenState: '',

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_ACTIVITY_SCREEN:
      return {
        ...state,
        screenState: action.payload,
       };
    default:
      return state;
  }
};
