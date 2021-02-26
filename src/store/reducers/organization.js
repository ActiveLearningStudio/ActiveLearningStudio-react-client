import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  activeScreen: 'intro',
  backScreen: '',
  roles: [{ name: 'admin', id: 1 }, { name: 'author', id: 2 }, { name: 'super-admin', id: 3 }],
  users: [{ name: 'qamar', id: 4 }, { name: 'ali', id: 5 }, { name: 'janah', id: 6 }],
  allOrganizations: [],
  currentOrganization: null,
  activeOrganization: null,
  logo: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_ACTIVE_SCREEN:
      return {
        ...state,
        activeScreen: action.payload,
      };
    case actionTypes.GET_PREVIOUS_SCREEN:
      return {
        ...state,
        backScreen: action.payload,
      };
    case actionTypes.ADD_ALL_ORG:
      return {
        ...state,
        allOrganizations: action.payload,
      };
    case actionTypes.ADD_CURRENT_ORG:
      return {
        ...state,
        currentOrganization: action.payload,
      };
    case actionTypes.ADD_ACTIVE_ORG:
      return {
        ...state,
        activeOrganization: action.payload,
        logo: action.payload.image,
      };
    default:
      return state;
  }
};
