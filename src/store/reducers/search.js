import {
  SEARCH_REDUX,
  CLEAR_SEARCH,
  SELECT_EXISTING_ACTIVITY,
  RESET_EXISTING_ACTIVITY,
} from '../actionTypes';

const INITIAL_STATE = {
  searchResult: {},
  searchQuery: '',
  searchMeta: {},
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

    default:
      return state;
  }
};

export default SearchReducer;
