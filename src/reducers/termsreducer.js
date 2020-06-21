import { ShOW_TERMS } from "../constants/actionTypes";
import { ShOW_LOGIN } from "../constants/actionTypes";

const auth_state_login = {
  login: true,
  terms: false,
};

const termsReducer = (state = auth_state_login, action) => {
  switch (action.type) {
    case ShOW_TERMS:
      return {
        Login: false,
        terms: true,
      };
    case ShOW_LOGIN:
      return {
        Login: true,
        terms: false,
      };

    default:
      return state;
  }
};

export default termsReducer;
