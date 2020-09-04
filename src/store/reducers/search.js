import { SEARCH_REDUX } from 'store/actionTypes';

const defaultsharestate = () => ({
  searchresult: {},
  searchquerry: '',
});

const SearchReducuer = (state = defaultsharestate(), action) => {
  switch (action.type) {
    case SEARCH_REDUX:
      return {
        ...state,
        searchresult: action.result,
        searchquerry: action.searchquerry,
      };

    default:
      return state;
  }
};

export default SearchReducuer;
