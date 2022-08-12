// eslint-disable-next-line object-curly-newline
import { SEARCH_REDUX, CLEAR_SEARCH, SELECT_EXISTING_ACTIVITY, RESET_EXISTING_ACTIVITY, SET_SEARCH_TYPE } from '../actionTypes';

const INITIAL_STATE = {
  searchResult: {},
  searchQuery: '',
  searchMeta: {},
  searchType: 'Independent activities',
  existingActivitySearchSelected: null,
};

const SearchReducer = (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    case SEARCH_REDUX:
      const { data, searchQuery, meta } = action;
      return {
        ...state,
        searchResult: data,
        searchMeta: meta,
        searchQuery,
      };

    case CLEAR_SEARCH:
      return { ...INITIAL_STATE };

    case SELECT_EXISTING_ACTIVITY:
      const { activity } = action;
      return {
        ...state,
        existingActivitySearchSelected: activity,
      };

    case RESET_EXISTING_ACTIVITY:
      return {
        ...state,
        existingActivitySearchSelected: null,
      };
    case SET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.searchType,
      };
    default:
      return state;
  }
};

export default SearchReducer;
