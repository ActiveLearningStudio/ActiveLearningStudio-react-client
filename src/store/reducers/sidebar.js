import {
  SIDEBAR_ALL_PROJECT,
  SIDEBAR_SAMPLE_PROJECT,
  SIDEBAR_UPDATE_PROJECT,
} from '../actionTypes';

const INITIAL_STATE = {
  isLoaded: false,
  allProject: [],
  teams: [],
  groups: [],
  sampleProject: [],
  updateProject: [],
};

const Sidebar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIDEBAR_ALL_PROJECT:
      return {
        ...state,
        allProject: action.data.projects ? action.data.projects : [],
        teams: action.data.teams ? action.data.teams : [],
        groups: action.data.groups ? action.data.groups : [],
        isLoaded: true,
      };

    case SIDEBAR_SAMPLE_PROJECT:
      return {
        ...state,
        sampleProject: action.data.projects ? action.data.projects : [],
      };

    case SIDEBAR_UPDATE_PROJECT:
      return {
        ...state,
        updateProject: action.data.projects ? action.data.projects : [],
      };

    default:
      return state;
  }
};

export default Sidebar;
