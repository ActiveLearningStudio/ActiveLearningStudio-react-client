import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  showCreation: false,
  showInviting: false,
  showAssigning: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SHOW_CREATE_TEAM:
      return {
        ...state,
        showCreation: true,
        showAssigning: false,
        showInviting: false,
      };

    case actionTypes.SHOW_INVITE_MEMBER:
      return {
        ...state,
        showCreation: false,
        showInviting: true,
        showAssigning: false,
      };

    case actionTypes.SHOW_ASSIGN_PROJECT:
      return {
        ...state,
        showCreation: false,
        showInviting: false,
        showAssigning: true,
      };

    case actionTypes.FINISH_CREATE_TEAM:
      return {
        ...state,
        showCreation: false,
        showInviting: false,
        showAssigning: false,
      };

    default:
      return state;
  }
};
