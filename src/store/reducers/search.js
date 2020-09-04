import { SEARCH_REDUX } from 'store/actionTypes';

const defaultsharestate = () => ({
  searchResult: {},
  searchQuerry: '',
  searchMeta: {},
});

const SearchReducuer = (state = defaultsharestate(), action) => {
  switch (action.type) {
    case SEARCH_REDUX:
      return {
        ...state,
        searchResult: action.data,
        searchQuerry: action.searchquerry,
        searchMeta: action.meta,
      };

    default:
      return state;
  }
};

export default SearchReducuer;
