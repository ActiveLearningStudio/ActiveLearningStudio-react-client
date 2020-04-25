import axios from "axios";
import { AUTH_RECEIVE, AUTH_ERROR, AUTH_LOGOUT, AUTH_SIGNUP } from "../constants/actionTypes";


export const signup = (displayName, id, role) => ({
  type: AUTH_SIGNUP,
  displayName,
  id,
  role
});

export const startSignup = (displayName, email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        // `${process.env.REACT_APP_API_URL}/users`,
        'api/users',
        {
          displayName,
          email,
          password
        }
      );

      const user = {
        displayName: response.data.displayName,
        id: response.data._id,
        token: response.headers["x-auth"],
        role: response.data.role
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
  token
});
export const loginError = () => ({
  type: AUTH_ERROR
});

export const startLogin = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        // `${process.env.REACT_APP_API_URL}/users/login`,
        'api/auth/login',
        {
          email,
          password
        }
      );
      if(response.data.success) {
        const user = {
          displayName: response.data.payload.user.name,
          id: response.data.payload.user._id,
          token: response.headers["x-auth"]
        };
        
        localStorage.setItem("auth", JSON.stringify(user));
        
        dispatch(
          login(user.displayName, user.id, user.token)
        );
      }
      

      
    } catch (e) {
      // console.log(e);
      dispatch(
        loginError()
      );
      throw new Error(e.response.data.error);
    }
  };
};

export const startLogout = () => {
  return async dispatch => {
    try {
      const { token } = JSON.parse(localStorage.getItem("auth"));
      localStorage.removeItem("auth");
      await axios.delete(
        // `${process.env.REACT_APP_API_URL}/users/me/token`,
        'api/users/me/token',
        {
          headers: {
            "x-auth": token
          }
        }
      );
      dispatch(logout());
    } catch (e) {
      localStorage.removeItem("auth");
      dispatch(logout());
    }
  };
};

export const logout = () => ({
  type: AUTH_LOGOUT
});
