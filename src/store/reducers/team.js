import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  isInviting: false,
  removingUserId: null,
  showCreation: false,
  showInviting: false,
  showAssigning: false,
  teams: [],
  selectedTeam: {},
  roles: null,
  teamPermission: {},
  teamProjects: [],
  selectedForClone: '',
};

export default (state = INITIAL_STATE, action) => {
  const { teams } = state;

  switch (action.type) {
    case actionTypes.RESET_SELECTED_TEAM:
      return {
        ...state,
        selectedTeam: {},
      };

    case actionTypes.UPDATE_SELECTED_TEAM:
      return {
        ...state,
        selectedTeam: {
          ...state.selectedTeam,
          ...action.payload,
        },
      };

    case actionTypes.SHOW_CREATE_TEAM:
      return {
        ...state,
        showCreation: true,
        showAssigning: false,
        showInviting: false,
      };

    case actionTypes.ADD_TEAM_PERMISSION:
      return {
        ...state,
        teamPermission: action.payload,
      };

    case actionTypes.CLEAR_TEAM_PERMISSIONS:
      return {
        ...state,
        teamPermission: {},
      };

    case actionTypes.SHOW_INVITE_MEMBER:
      return {
        ...state,
        showCreation: false,
        showInviting: true,
        showAssigning: false,
      };

    case actionTypes.SHOW_ASSIGN_TEAM:
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
        selectedTeam: {
          ...state.selectedTeam,
          users: [...action.payload.users],
        },
      };
    case actionTypes.INVITE_MEMBER_CONFIRM_FAIL:
      return {
        ...state,
        isInviting: false,
      };

    case actionTypes.CREATE_TEAM_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CREATE_TEAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teams: [...teams, action.payload.team],
      };
    case actionTypes.CREATE_TEAM_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOAD_TEAM_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOAD_TEAM_SUCCESS:
      const idx = teams.findIndex((p) => p.id === action.payload.team.id);
      if (idx > -1) {
        teams.splice(idx, 1, action.payload.team);
        return {
          ...state,
          isLoading: false,
          teams: [...teams],
          selectedTeam: action.payload.team,
        };
      }
      return {
        ...state,
        isLoading: false,
        teams: [...teams, action.payload.team],
        selectedTeam: action.payload.team,
      };
    case actionTypes.LOAD_TEAM_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.UPDATE_TEAM_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.UPDATE_TEAM_SUCCESS:
      const index = teams.findIndex((p) => p.id === action.payload.team.id);
      if (index > -1) {
        teams.splice(index, 1, action.payload.team);
        return {
          ...state,
          isLoading: false,
          teams,
        };
      }
      return {
        ...state,
        isLoading: false,
        teams: [...teams, action.payload.team],
      };
    case actionTypes.UPDATE_TEAM_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.DELETE_TEAM_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.DELETE_TEAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teams: teams.filter((team) => team.id !== action.payload.teamId),
      };
    case actionTypes.DELETE_TEAM_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOAD_TEAMS:
      return {
        ...state,
        teams: action.payload.teams,
      };

    case actionTypes.ADD_TEAM_ROLES:
      return {
        ...state,
        roles: action.payload,
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

    case actionTypes.ADD_TEAM_PROJECTS_REQUEST:
    case actionTypes.REMOVE_PROJECT_REQUEST:
    case actionTypes.ADD_MEMBERS_TO_PROJECT_REQUEST:
    case actionTypes.REMOVE_MEMBER_FROM_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.ADD_TEAM_PROJECTS_SUCCESS:
    case actionTypes.REMOVE_PROJECT_SUCCESS:
    case actionTypes.ADD_MEMBERS_TO_PROJECT_SUCCESS:
    case actionTypes.REMOVE_MEMBER_FROM_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.ADD_TEAM_PROJECTS_FAIL:
    case actionTypes.REMOVE_PROJECT_FAIL:
    case actionTypes.ADD_MEMBERS_TO_PROJECT_FAIL:
    case actionTypes.REMOVE_MEMBER_FROM_PROJECT_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.GET_TEAM_PROJECTS:
      return {
        ...state,
        teamProjects: action.payload,
      };
    case actionTypes.PROJECT_SELECTED_FOR_CLONE:
      return {
        ...state,
        selectedForClone: action.payload,
      };
    default:
      return state;
  }
};
