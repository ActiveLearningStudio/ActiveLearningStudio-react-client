import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  isInviting: false,
  showCreation: false,
  showInviting: false,
  showAssigning: false,
  teams: [],
  selectedTeam: {},
};

export default (state = INITIAL_STATE, action) => {
  const { teams } = state;

  switch (action.type) {
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
          users: [...(state.selectedTeam.users || []), action.payload.user],
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
      return {
        ...state,
        isLoading: false,
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

    default:
      return state;
  }
};
