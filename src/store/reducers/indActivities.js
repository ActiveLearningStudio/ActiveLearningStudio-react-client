/* eslint-disable */
import * as actionTypes from "../actionTypes";

const INITIAL_STATE = {
  allActivities: null,
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ALL_IND_ACTIVITIES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.ALL_IND_ACTIVITIES:
      return {
        ...state,
        isLoading: false,
        allActivities: action.payload,
      };
    case actionTypes.DEL_IND_ACTIVITIES:
      return {
        ...state,
        allActivities: {
          ...state.allActivities,
          data: state.allActivities.data.filter(
            (data) => data.id !== action.payload
          ),
        },
      };
    case actionTypes.EDIT_IND_ACTIVITIES:
      const newEditData = state.allActivities.data.map((data) => {
        if (data.id === action.payload.id) {
          return action.payload;
        }
        return data;
      });
      return {
        ...state,
        allActivities: { ...state.allActivities, data: newEditData },
      };
    // Update the index of the activity
    case actionTypes.EDIT_IND_ACTIVITIES_INDEX:
      const newEditDataIndex = state.allActivities.data.map((data) => {
        if (data.id === action.payload) {
          console.log("Matched");
          data.indexing = 1;
          data.indexing_text = "REQUESTED";
        }
        return data;
      });
      return {
        ...state,
        allActivities: { ...state.allActivities, data: newEditDataIndex },
      };
    case actionTypes.ADD_IND_ACTIVITIES:
      return {
        ...state,
        allActivities: {
          ...state.allActivities,
          data: [...state.allActivities.data, action.payload],
        },
      };

    default:
      return state;
  }
};
