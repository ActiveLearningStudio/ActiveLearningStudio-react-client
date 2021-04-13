import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  isInviting: false,
  removingUserId: null,
  showCreation: false,
  showInviting: false,
  showAssigning: false,
  groups: [],
  selectedGroup: {},
};

export default (state = INITIAL_STATE, action) => {
  const { groups } = state;

  switch (action.type) {
    case actionTypes.RESET_SELECTED_GROUP:
      return {
        ...state,
        selectedGroup: {},
      };

    case actionTypes.UPDATE_SELECTED_GROUP:
      return {
        ...state,
        selectedGroup: {
          ...state.selectedGroup,
          ...action.payload,
        },
      };

    case actionTypes.SHOW_CREATE_GROUP:
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

    case actionTypes.SHOW_ASSIGN_GROUP:
      return {
        ...state,
        showCreation: false,
        showInviting: false,
        showAssigning: true,
      };

    case actionTypes.INVITE_MEMBER_CONFIRM_REQUEST:
      return {
        ...state,
        isInviting: true,
      };
    case actionTypes.INVITE_MEMBER_CONFIRM_SUCCESS:
      return {
        ...state,
        isInviting: false,
        selectedGroup: {
          ...state.selectedGroup,
          users: [...action.payload.users],
        },
      };
    case actionTypes.INVITE_MEMBER_CONFIRM_FAIL:
      return {
        ...state,
        isInviting: false,
      };

    case actionTypes.CREATE_GROUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        groups: [...groups, action.payload.group],
      };
    case actionTypes.CREATE_GROUP_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOAD_GROUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOAD_GROUP_SUCCESS:
      const idx = groups.findIndex((p) => p.id === action.payload.group.id);
      if (idx > -1) {
        groups.splice(idx, 1, action.payload.group);
        return {
          ...state,
          isLoading: false,
          groups: [...groups],
          selectedGroup: action.payload.group,
        };
      }
      return {
        ...state,
        isLoading: false,
        groups: [...groups, action.payload.group],
        selectedGroup: action.payload.group,
      };
    case actionTypes.LOAD_GROUP_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.UPDATE_GROUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.UPDATE_GROUP_SUCCESS:
      const index = groups.findIndex((p) => p.id === action.payload.group.id);
      if (index > -1) {
        groups.splice(index, 1, action.payload.group);
        return {
          ...state,
          isLoading: false,
          groups,
        };
      }
      return {
        ...state,
        isLoading: false,
        groups: [...groups, action.payload.group],
      };
    case actionTypes.UPDATE_GROUP_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.DELETE_GROUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        groups: groups.filter((group) => group.id !== action.payload.groupId),
      };
    case actionTypes.DELETE_GROUP_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOAD_GROUPS:
      return {
        ...state,
        groups: action.payload.groups,
      };

    case actionTypes.INVITE_MEMBERS_REQUEST:
      return {
        ...state,
        isInviting: true,
      };
    case actionTypes.INVITE_MEMBERS_SUCCESS:
      return {
        ...state,
        isInviting: false,
      };
    case actionTypes.INVITE_MEMBERS_FAIL:
      return {
        ...state,
        isInviting: false,
      };

    case actionTypes.REMOVE_MEMBER_REQUEST:
      return {
        ...state,
        removingUserId: action.payload.userId,
      };
    case actionTypes.REMOVE_MEMBER_SUCCESS:
      return {
        ...state,
        removingUserId: null,
      };
    case actionTypes.REMOVE_MEMBER_FAIL:
      return {
        ...state,
        removingUserId: null,
      };

    case actionTypes.ADD_GROUP_PROJECTS_REQUEST:
    case actionTypes.REMOVE_PROJECT_REQUEST:
    case actionTypes.ADD_MEMBERS_TO_PROJECT_REQUEST:
    case actionTypes.REMOVE_MEMBER_FROM_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.ADD_GROUP_PROJECTS_SUCCESS:
    case actionTypes.REMOVE_PROJECT_SUCCESS:
    case actionTypes.ADD_MEMBERS_TO_PROJECT_SUCCESS:
    case actionTypes.REMOVE_MEMBER_FROM_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.ADD_GROUP_PROJECTS_FAIL:
    case actionTypes.REMOVE_PROJECT_FAIL:
    case actionTypes.ADD_MEMBERS_TO_PROJECT_FAIL:
    case actionTypes.REMOVE_MEMBER_FROM_PROJECT_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
