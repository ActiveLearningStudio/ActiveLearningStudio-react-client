import { SEARCH_REDUX, CLEAR_SEARCH } from '../actionTypes';

const INITIAL_STATE = {
  searchResult: {},
  searchQuery: '',
  searchMeta: {},
};

const SearchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_REDUX:
      return {
        ...state,
        searchResult: action.data,
        searchQuery: action.searchQuery,
        searchMeta: action.meta,
      };

    case CLEAR_SEARCH:
      return {
        searchResult: {},
        searchQuery: '',
        searchMeta: {},
      };
    default:
      return state;
  }
};

export default SearchReducer;
