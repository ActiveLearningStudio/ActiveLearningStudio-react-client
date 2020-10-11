import * as actionTypes from '../actionTypes';

export const showCreationAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_CREATE_TEAM,
  });
};

export const showInvitingAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_INVITE_MEMBER,
  });
};

export const showAssigningAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_ASSIGN_PROJECT,
  });
};

export const saveAndExitCreateTeam = () => async (dispatch) => {
  dispatch({
    type: actionTypes.FINISH_CREATE_TEAM,
  });
};
