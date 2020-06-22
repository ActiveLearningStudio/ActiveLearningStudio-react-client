import axios from "axios";
import {
  AUTH_RECEIVE,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_SIGNUP,
  ShOW_TERMS,
  ShOW_LOGIN,
} from "../constants/actionTypes";

export const show_login = () => ({
  type: ShOW_LOGIN,
});
export const show_term = () => ({
  type: ShOW_TERMS,
});

export const showlogin = (login, terms) => ({
  type: AUTH_SIGNUP,
  login,
  terms,
});

export const startSignup = (displayName, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        global.config.laravelAPIUrl + "/users",
        {
          displayName,
          email,
          password,
        }
      );

      const user = {
        displayName: response.data.displayName,
        id: response.data._id,
        token: response.headers["x-auth"],
        role: response.data.role,
        subscribed: response.data.subscribed,
      };
      localStorage.setItem("auth", JSON.stringify(user));

      dispatch(
        signup(response.data.displayName, response.data._id, response.data.role)
      );
    } catch (e) {
      throw e.response.data.errors;
    }
  };
};

export const login = (displayName, id, token) => ({
  type: AUTH_RECEIVE,
  displayName,
  id,
  token,
});
export const loginError = () => ({
  type: AUTH_ERROR,
});

export const startLogin = (email, password) => {
  localStorage.setItem("temp_email", email);
  localStorage.setItem("temp_pass", password);
  return async (dispatch) => {
    try {
      const response = await axios.post(
        global.config.laravelAPIUrl + "/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.status == "success") {
        if (!response.data.data.subscribed) {
          dispatch(show_term());
        } else {
          const user = {
            displayName: response.data.data.payload.user.name,
            id: response.data.data.payload.user._id,
            token: response.data.data.token,
            auth_expiry: response.data.data.payload.exp,
            subscribed: response.data.data.subscribed,
          };
          dispatch(login(user.displayName, user.id, user.token));
          localStorage.setItem("auth", JSON.stringify(user));
        }
      } else {
        dispatch(loginError());
      }
    } catch (e) {
      dispatch(loginError());
      throw new Error(e.response.data.error);
    }
  };
};

export const ecceptterms = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        global.config.laravelAPIUrl + "/auth/privacy-subscription/subscribe",
        {
          email,
          password,
        }
      );

      if (response.data.status == "success") {
        if (!response.data.data.subscribed) {
          dispatch(show_term());
        } else {
          const user = {
            displayName: response.data.data.payload.user.name,
            id: response.data.data.payload.user._id,
            token: response.data.data.token,
            auth_expiry: response.data.data.payload.exp,
          };
          dispatch(login(user.displayName, user.id, user.token));
          localStorage.setItem("auth", JSON.stringify(user));
          dispatch(show_login());
        }
      } else {
        dispatch(loginError());
      }
    } catch (e) {
      dispatch(loginError());
      throw new Error(e.response.data.error);
    }
  };
};

export const logout = () => ({
  type: AUTH_LOGOUT,
});

export const startLogoutAction = () => {
  return async (dispatch) => {
    try {
      // const { token } = JSON.parse(localStorage.getItem("auth"));
      localStorage.removeItem("auth");
      // await axios.delete(
      //   // `${process.env.REACT_APP_API_URL}/users/me/token`,
      //   global.config.laravelAPIUrl +'/users/me/token',
      //   {
      //     headers: {
      //       "x-auth": token
      //     }
      //   }
      // );
      dispatch(logout());
    } catch (e) {
      localStorage.removeItem("auth");
      dispatch(logout());
    }
  };
};
