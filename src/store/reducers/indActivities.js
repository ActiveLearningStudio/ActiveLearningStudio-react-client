/* eslint-disable */
import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  allActivities: null,
  isLoading: false,
  islazyLoader: false,
};

export default (state = INITIAL_STATE, action) => {
  const { allActivities } = state;
  switch (action.type) {
    case actionTypes.ALL_IND_ACTIVITIES_REQUEST:
      return {
        ...state,
        isLoading: true,
        islazyLoader: true,
      };
    case actionTypes.ALL_IND_ACTIVITIES:
      return {
        ...state,
        isLoading: false,
        allActivities: action.payload,
        islazyLoader: false,
      };
    case actionTypes.LOAD_MORE_IND_ACTIVITIES: {
      const { data, meta } = allActivities;
      const updatedMeta = action.payload.meta;
      const newIndActivities = data.concat(action.payload.data);
      return {
        ...state,
        isLoading: false,
        allActivities: { ...allActivities, data: newIndActivities, meta: updatedMeta },
        islazyLoader: false,
      };
    }

    case actionTypes.ALL_IND_REQUEST_COMPLETE:
      return {
        ...state,
        islazyLoader: false,
      };
    case actionTypes.DEL_IND_ACTIVITIES:
      return {
        ...state,
        allActivities: {
          ...state.allActivities,
          data: state.allActivities.data.filter((data) => data.id !== action.payload),
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
          console.log('Matched');
          data.indexing = 1;
          data.indexing_text = 'REQUESTED';
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
          data: [action.payload, ...state.allActivities.data],
        },
      };

    default:
      return state;
  }
};
