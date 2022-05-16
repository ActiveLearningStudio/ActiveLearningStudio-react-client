/* eslint-disable */
import * as actionTypes from "../actionTypes";

const INITIAL_STATE = {
  allActivities: null,
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ALL_IND_ACTIVITIES:
      return {
        ...state,
        allActivities: action.payload,
      };
    case actionTypes.DEL_IND_ACTIVITIES:
      return {
        ...state,
        allActivities: state.allActivities.filter(
          (data) => data.id !== action.payload
        ),
      };
    case actionTypes.EDIT_IND_ACTIVITIES:
      return {
        ...state,
        allActivities: state.allActivities.map((data) => {
          if (data.id === action.payload.id) {
            return action.payload;
          } else {
            return data;
          }
        }),
      };
    case actionTypes.ADD_IND_ACTIVITIES:
      if (state.allActivities?.length) {
        return {
          ...state,
          allActivities: [...state.allActivities, action.payload],
        };
      } else {
        return {
          ...state,
          allActivities: action.payload,
        };
      }

    case actionTypes.UPDATE_IND_ACTIVITIES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.UPDATE_IND_ACTIVITIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allActivities: [...state.allActivities, action.payload],
      };
    case actionTypes.UPDATE_IND_ACTIVITIES_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
