import { SEARCHREDUX } from "../constants/actionTypes";

const defaultsharestate = () => {
  return {
    searchresult: {},
    searchquerry: "",
  };
};

const SearchReducuer = (state = defaultsharestate(), action) => {
  switch (action.type) {
    case SEARCHREDUX:
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
