import groupService from 'services/group.service';
import * as actionTypes from '../actionTypes';
import store from '../index';

export const resetSelectedGroupAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.RESET_SELECTED_GROUP,
  });
};

export const updateSelectedGroupAction = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_SELECTED_GROUP,
    payload,
  });
};

export const showCreationAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_CREATE_GROUP,
  });
};

export const showInvitingAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_INVITE_MEMBER,
  });
};

export const showAssigningAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_ASSIGN_GROUP,
  });
};

export const loadGroupsAction = () => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  try {
    dispatch({
      type: actionTypes.PAGE_LOADING,
    });

    const { groups } = await groupService.getAll(activeOrganization?.id);

    dispatch({
      type: actionTypes.LOAD_GROUPS,
      payload: { groups },
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

export const loadSubOrganizationGroupsAction = () => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  try {
    dispatch({
      type: actionTypes.PAGE_LOADING,
    });

    const { groups } = await groupService.getAllSubOrganizationGroups(activeOrganization?.id);

    dispatch({
      type: actionTypes.LOAD_GROUPS,
      payload: { groups },
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

export const createGroupAction = (data) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  try {
    dispatch({ type: actionTypes.CREATE_GROUP_REQUEST });

    const { group } = await groupService.create(data, activeOrganization?.id);

    dispatch({
      type: actionTypes.CREATE_GROUP_SUCCESS,
      payload: { group },
    });

    return group;
  } catch (e) {
    dispatch({ type: actionTypes.CREATE_GROUP_FAIL });

    throw e;
  }
};

export const loadGroupAction = (groupId) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  try {
    dispatch({
      type: actionTypes.LOAD_GROUP_REQUEST,
    });

    const { group } = await groupService.get(groupId, activeOrganization?.id);

    dispatch({
      type: actionTypes.LOAD_GROUP_SUCCESS,
      payload: { group },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.LOAD_GROUP_FAIL,
    });
  }
};

export const updateGroupAction = (groupId, data) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  try {
    dispatch({ type: actionTypes.UPDATE_GROUP_REQUEST });

    const { group } = await groupService.update(groupId, data, activeOrganization?.id);

    dispatch({
      type: actionTypes.UPDATE_GROUP_SUCCESS,
      payload: { group },
    });
  } catch (e) {
    dispatch({ type: actionTypes.UPDATE_GROUP_FAIL });

    throw e;
  }
};

export const deleteGroupAction = (groupId) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  try {
    dispatch({ type: actionTypes.DELETE_GROUP_REQUEST });

    await groupService.remove(groupId, activeOrganization?.id);

    dispatch({
      type: actionTypes.DELETE_GROUP_SUCCESS,
      payload: { groupId },
    });
  } catch (e) {
    dispatch({ type: actionTypes.DELETE_GROUP_FAIL });

    throw e;
  }
};

export const inviteGroupMemberAction = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.INVITE_MEMBER_CONFIRM_REQUEST });

    const { invited } = await groupService.inviteConfirm(user);

    if (invited) {
      dispatch({
        type: actionTypes.INVITE_MEMBER_CONFIRM_SUCCESS,
        payload: { users: [user] },
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

export const inviteGroupMembersAction = (users) => async (dispatch) => {
  dispatch({
    type: actionTypes.INVITE_MEMBER_CONFIRM_SUCCESS,
    payload: { users },
  });
};

export const inviteMemberAction = (groupId, email) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.INVITE_MEMBERS_REQUEST });

    await groupService.inviteMember(groupId, email);

    dispatch({
      type: actionTypes.INVITE_MEMBERS_SUCCESS,
    });

    dispatch(loadGroupAction(groupId));
  } catch (e) {
    dispatch({ type: actionTypes.INVITE_MEMBERS_FAIL });

    throw e;
  }
};

export const inviteMembersAction = (groupId, users, note) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  try {
    dispatch({ type: actionTypes.INVITE_MEMBERS_REQUEST });

    await groupService.inviteMembers(groupId, users, note, activeOrganization?.id);

    dispatch({
      type: actionTypes.INVITE_MEMBERS_SUCCESS,
    });

    dispatch(loadGroupAction(groupId));
  } catch (e) {
    dispatch({ type: actionTypes.INVITE_MEMBERS_FAIL });

    throw e;
  }
};

export const removeMemberAction = (groupId, userId, email) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.REMOVE_MEMBER_REQUEST,
      payload: { userId },
    });

    await groupService.removeMember(groupId, userId, email);

    dispatch({
      type: actionTypes.REMOVE_MEMBER_SUCCESS,
    });

    dispatch(loadGroupAction(groupId));
  } catch (e) {
    dispatch({ type: actionTypes.REMOVE_MEMBER_FAIL });

    throw e;
  }
};

export const addProjectsAction = (groupId, ids) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.ADD_GROUP_PROJECTS_REQUEST,
    });

    await groupService.addProjects(groupId, ids);

    dispatch({
      type: actionTypes.ADD_GROUP_PROJECTS_SUCCESS,
    });

    dispatch(loadGroupAction(groupId));
  } catch (e) {
    dispatch({ type: actionTypes.ADD_GROUP_PROJECTS_FAIL });

    throw e;
  }
};

export const removeProjectAction = (groupId, id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.REMOVE_PROJECT_REQUEST,
    });

    await groupService.removeProject(groupId, id);

    dispatch({
      type: actionTypes.REMOVE_PROJECT_SUCCESS,
    });

    dispatch(loadGroupAction(groupId));
  } catch (e) {
    dispatch({ type: actionTypes.REMOVE_PROJECT_FAIL });

    throw e;
  }
};

export const addMembersToProjectAction = (groupId, projectId, ids) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.ADD_MEMBERS_TO_PROJECT_REQUEST,
    });

    await groupService.addMembersToProject(groupId, projectId, ids);

    dispatch({
      type: actionTypes.ADD_MEMBERS_TO_PROJECT_SUCCESS,
    });

    dispatch(loadGroupAction(groupId));
  } catch (e) {
    dispatch({ type: actionTypes.ADD_MEMBERS_TO_PROJECT_FAIL });

    throw e;
  }
};

export const removeMemberFromProjectAction = (groupId, projectId, id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.REMOVE_MEMBER_FROM_PROJECT_REQUEST,
    });

    await groupService.removeMemberFromProject(groupId, projectId, id);

    dispatch({
      type: actionTypes.REMOVE_MEMBER_FROM_PROJECT_SUCCESS,
    });

    dispatch(loadGroupAction(groupId));
  } catch (e) {
    dispatch({ type: actionTypes.REMOVE_MEMBER_FROM_PROJECT_FAIL });

    throw e;
  }
};
