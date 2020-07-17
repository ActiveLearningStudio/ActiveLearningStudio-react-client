import authService from 'services/auth.service';
import storageService from 'services/storage.service';
import { getErrors } from 'utils';
import { USER_TOKEN_KEY } from '../../constants';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from '../actionTypes';

export const loginAction = (data) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });

  try {
    const response = await authService.login(data);

    // hubspot email tacking
    // eslint-disable-next-line no-multi-assign
    const _hsq = (window._hsq = window._hsq || []);
    _hsq.push([
      'identify',
      {
        email: response.user.email,
        user_name: `${response.user.first_name} ${response.user.last_name}`,
      },
    ]);

    storageService.setItem(USER_TOKEN_KEY, response.access_token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: response.user },
    });
  } catch (e) {
    dispatch({
      type: LOGIN_FAIL,
      payload: { error: getErrors(e) },
    });

    throw new Error(e);
  }
};

export const forgotPasswordAction = (data) => async (dispatch) => {
  dispatch({
    type: FORGOT_PASSWORD_REQUEST,
  });

  try {
    await authService.forgotPassword(data);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });

    storageService.setItem('forgotPasswordEmail', data.email);
  } catch (e) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: { error: getErrors(e) },
    });

    throw new Error(e);
  }
};

export const resetPasswordAction = (data) => async (dispatch) => {
  dispatch({
    type: RESET_PASSWORD_REQUEST,
  });

  try {
    await authService.resetPassword(data);

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: { error: getErrors(e) },
    });

    throw new Error(e);
  }
};

export const registerAction = (data) => async (dispatch) => {
  dispatch({
    type: SIGNUP_REQUEST,
  });

  try {
    const response = await authService.register(data);

    storageService.setItem(USER_TOKEN_KEY, response.access_token);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: { user: response.user },
    });
  } catch (e) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: { error: getErrors(e) },
    });

    throw new Error(e);
  }
};

export const logoutAction = () => async () => {
  storageService.removeItem(USER_TOKEN_KEY);
  window.location.href = '/';
};

// export const acceptTerms = (email, password) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       `${global.config.laravelAPIUrl}/auth/privacy-subscription/subscribe`,
//       {
//         email,
//         password,
//       },
//     );
//
//     if (response.data.status === 'success') {
//       if (!response.data.data.subscribed) {
//         dispatch(show_term());
//       } else {
//         const user = {
//           displayName: response.data.data.payload.user.name,
//           id: response.data.data.payload.user._id,
//           token: response.data.data.token,
//           auth_expiry: response.data.data.payload.exp,
//           subscribed: response.data.data.subscribed,
//         };
//           // hubspot email tacking
//         const _hsq = (window._hsq = window._hsq || []);
//         _hsq.push([
//           'identify',
//           {
//             email: response.data.data.payload.user.email,
//             user_name: user.displayName,
//           },
//         ]);
//         dispatch(login(user.displayName, user.id, user.token));
//         localStorage.setItem('auth', JSON.stringify(user));
//         dispatch(show_login());
//       }
//     } else {
//       dispatch(loginError());
//     }
//   } catch (e) {
//     dispatch(loginError());
//     throw new Error(e.response.data.error);
//   }
// };
