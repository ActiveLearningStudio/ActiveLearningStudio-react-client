import teamService from 'services/team.service';
import * as actionTypes from '../actionTypes';

export const resetSelectedTeamAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.RESET_SELECTED_TEAM,
  });
};

export const updateSelectedTeamAction = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_SELECTED_TEAM,
    payload,
  });
};

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
    type: actionTypes.SHOW_ASSIGN_TEAM,
  });
};

export const loadTeamsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.PAGE_LOADING,
    });

    const { teams } = await teamService.getAll();

    dispatch({
      type: actionTypes.LOAD_TEAMS,
      payload: { teams },
    });

    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.PAGE_LOADING_COMPLETE,
    });

    throw e;
  }
};

export const createTeamAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_TEAM_REQUEST });

    const { team } = await teamService.create(data);

    dispatch({
      type: actionTypes.CREATE_TEAM_SUCCESS,
      payload: { team },
    });

    return team;
  } catch (e) {
    dispatch({ type: actionTypes.CREATE_TEAM_FAIL });

    throw e;
  }
};

export const loadTeamAction = (teamId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOAD_TEAM_REQUEST,
    });

    const { team } = await teamService.get(teamId);

    dispatch({
      type: actionTypes.LOAD_TEAM_SUCCESS,
      payload: { team },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.LOAD_TEAM_FAIL,
    });
  }
};

export const updateTeamAction = (teamId, data) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_TEAM_REQUEST });

    const { team } = await teamService.update(teamId, data);

    dispatch({
      type: actionTypes.UPDATE_TEAM_SUCCESS,
      payload: { team },
    });
  } catch (e) {
    dispatch({ type: actionTypes.UPDATE_TEAM_FAIL });

    throw e;
  }
};

export const deleteTeamAction = (teamId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_TEAM_REQUEST });

    await teamService.remove(teamId);

    dispatch({
      type: actionTypes.DELETE_TEAM_SUCCESS,
      payload: { teamId },
    });
  } catch (e) {
    dispatch({ type: actionTypes.DELETE_TEAM_FAIL });

    throw e;
  }
};

export const inviteTeamMemberAction = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.INVITE_MEMBER_CONFIRM_REQUEST });

    const { invited } = await teamService.inviteConfirm(user);

    if (invited) {
      dispatch({
        type: actionTypes.INVITE_MEMBER_CONFIRM_SUCCESS,
        payload: { user },
      });
    } else {
      dispatch({ type: actionTypes.INVITE_MEMBER_CONFIRM_FAIL });
    }

    return invited;
  } catch (e) {
    dispatch({ type: actionTypes.INVITE_MEMBER_CONFIRM_FAIL });

    throw e;
  }
};

export const inviteMemberAction = (teamId, email) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.INVITE_MEMBER_REQUEST });

    await teamService.inviteMember(teamId, email);

    dispatch({
      type: actionTypes.INVITE_MEMBER_SUCCESS,
    });

    dispatch(loadTeamAction(teamId));
  } catch (e) {
    dispatch({ type: actionTypes.INVITE_MEMBER_FAIL });

    throw e;
  }
};

export const removeMemberAction = (teamId, userId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.REMOVE_MEMBER_REQUEST,
      payload: { userId },
    });

    await teamService.removeMember(teamId, userId);

    dispatch({
      type: actionTypes.REMOVE_MEMBER_SUCCESS,
    });

    dispatch(loadTeamAction(teamId));
  } catch (e) {
    dispatch({ type: actionTypes.REMOVE_MEMBER_FAIL });

    throw e;
  }
};
