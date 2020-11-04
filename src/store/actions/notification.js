import Echo from 'laravel-echo';
import Swal from 'sweetalert2';

import notification from 'services/notification.service';
import socketConnection from 'services/http.service';
import * as actionTypes from '../actionTypes';

export const getAllNotifications = () => async (dispatch) => {
  const notificationData = await notification.allNotifications();
  if (notificationData) {
    dispatch({
      type: actionTypes.ADD_ALL_NOTIFICATIONS,
      payload: notificationData,
    });
  }
};

export const clearAllNotification = () => async (dispatch) => {
  await notification.readAllNotifications();
  dispatch({
    type: actionTypes.CLEAR_ALL_NOTIFICATION,
  });
};

export const deleteNotification = (id) => async (dispatch) => {
  Swal.showLoading();
  await notification.deleteNotification(id);
  Swal.close();
  dispatch({
    type: actionTypes.DELETE_NOTIFICATION,
    payload: id,
  });
};

export const cloneDuplicationRequest = (userId) => async (dispatch) => {
  const echo = new Echo(socketConnection.notificationSocket());
  echo.private(`App.User.${userId}`).notification((msg) => {
    dispatch({
      type: actionTypes.ADD_SINGLE_NOTIFICATION,
      newNotifications: msg,
    });
  });
};
