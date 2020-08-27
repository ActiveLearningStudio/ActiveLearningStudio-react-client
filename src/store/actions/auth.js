import axios from 'axios';
import Swal from 'sweetalert2';

import authService from 'services/auth.service';
import storageService from 'services/storage.service';
import { USER_TOKEN_KEY } from 'constants/index';
import * as actionTypes from '../actionTypes';

export const confirmRegistration = async (verificationCode) => {
  const confirm = await axios.post(
    `${global.config.laravelAPIUrl}/auth/confirm`,
    { verificationCode },
  );

  return confirm;
};

export const hubspotConfirmation = () => {
  axios.get(`${global.config.laravelAPIUrl}/auth/send-to-hubspot`);
};

export const registrationAction = (
  firstName,
  LastName,
  email,
  password,
  phone,
  jobTitle,
  school,
  websiteUrl,
  organization,
  message,
  captchaGoogle,
) => {
  axios
    .post(`${global.config.laravelAPIUrl}/auth/signup`, {
      first_name: firstName,
      last_name: LastName,
      email,
      password,
      gapi_access_token: captchaGoogle,
      phone,
      job_title: jobTitle,
      school_district_organization: school,
      website: websiteUrl,
      organization_type: organization,
      studio_interest: message,
    })
    .then((res) => {
      if (res.data.status === 'success') {
        Swal.fire({
          text: 'Thanks for requesting early access! Please check your email for next steps.',
          icon: 'success',
          title: 'Request Demo Access',
        });
      }
    })
    .catch((res) => {
      Swal.fire({
        icon: 'error',
        title: res.response.data.message,
      });
    });
};

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
        payload: { user: response.user },
      });
    } catch (e) {
      dispatch({
        type: actionTypes.GET_USER_FAIL,
      });
    }
  } else {
    dispatch({
      type: actionTypes.GET_USER_FAIL,
    });
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
    });

    throw e;
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
    });

    throw e;
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
    });

    throw e;
  }
};

export const registerAction = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.SIGNUP_REQUEST,
  });

  try {
    const response = await authService.register(data);

    Swal.fire({
      text: response.message,
      icon: 'success',
      title: 'Registration Success',
    });

    dispatch({
      type: actionTypes.SIGNUP_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.SIGNUP_FAIL,
    });

    throw e;
  }
};

export const confirmEmailAction = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.CONFIRM_EMAIL_REQUEST,
  });

  try {
    await authService.confirmEmail(data);

    dispatch({
      type: actionTypes.CONFIRM_EMAIL_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.CONFIRM_EMAIL_FAIL,
    });

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'The confirmation link is invalid or expired.',
    });

    throw e;
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
    });

    throw e;
  }
};

export const acceptTermsAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.ACCEPT_TERMS_REQUEST,
  });

  try {
    const { user } = await authService.subscribe();

    dispatch({
      type: actionTypes.ACCEPT_TERMS_SUCCESS,
      payload: { user },
    });

    // hubspot email tacking
    // eslint-disable-next-line no-multi-assign
    const _hsq = (window._hsq = window._hsq || []);
    _hsq.push([
      'identify',
      {
        email: user.email,
        user_name: user.name,
      },
    ]);
  } catch (e) {
    dispatch({
      type: actionTypes.ACCEPT_TERMS_FAIL,
    });

    throw e;
  }
};
