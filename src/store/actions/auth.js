import authService from 'services/auth.service';
import storageService from 'services/storage.service';
import { getErrors } from 'utils';
import { USER_TOKEN_KEY } from 'constants/index';
import * as actionTypes from '../actionTypes';

export const getUserAction = () => async (dispatch) => {
  const token = storageService.getItem(USER_TOKEN_KEY);
  if (token) {
    dispatch({
      type: actionTypes.GET_USER_REQUEST,
    });

    try {
      const response = await authService.me();

      dispatch({
        type: actionTypes.GET_USER_SUCCESS,
        payload: { user: response.data },
      });
    } catch (e) {
      dispatch({
        type: actionTypes.GET_USER_FAIL,
        payload: { error: getErrors(e) },
      });
    }
  }
};

export const loginAction = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN_REQUEST,
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
      type: actionTypes.LOGIN_SUCCESS,
      payload: { user: response.user },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: { error: getErrors(e) },
    });

    throw new Error(e);
  }
};

export const forgotPasswordAction = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.FORGOT_PASSWORD_REQUEST,
  });

  try {
    await authService.forgotPassword(data);

    dispatch({
      type: actionTypes.FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });

    storageService.setItem('forgotPasswordEmail', data.email);
  } catch (e) {
    dispatch({
      type: actionTypes.FORGOT_PASSWORD_FAIL,
      payload: { error: getErrors(e) },
    });

    throw new Error(e);
  }
};

export const resetPasswordAction = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.RESET_PASSWORD_REQUEST,
  });

  try {
    await authService.resetPassword(data);

    dispatch({
      type: actionTypes.RESET_PASSWORD_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.RESET_PASSWORD_FAIL,
      payload: { error: getErrors(e) },
    });

    throw new Error(e);
  }
};

export const registerAction = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.SIGNUP_REQUEST,
  });

  try {
    const response = await authService.register(data);

    storageService.setItem(USER_TOKEN_KEY, response.access_token);

    dispatch({
      type: actionTypes.SIGNUP_SUCCESS,
      payload: { user: response.user },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.SIGNUP_FAIL,
      payload: { error: getErrors(e) },
    });

    throw new Error(e);
  }
};

export const logoutAction = () => async () => {
  storageService.removeItem(USER_TOKEN_KEY);
  window.location.href = '/';
};

export const updateProfileAction = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_PROFILE_REQUEST,
  });

  try {
    const response = await authService.updateProfile(data);

    dispatch({
      type: actionTypes.UPDATE_PROFILE_SUCCESS,
      payload: { user: response.user },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.UPDATE_PROFILE_FAIL,
      payload: { error: getErrors(e) },
    });

    throw new Error(e);
  }
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
