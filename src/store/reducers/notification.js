import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  notification: [],
  notificationAlert: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_ALL_NOTIFICATIONS:
      return {
        ...state,
        notification: action.payload.notifications ? action.payload.notifications : [],
      };

    case actionTypes.ADD_SINGLE_NOTIFICATION:
      return {
        ...state,
        notification: [action.newNotifications, ...state.notification],
        notificationAlert: true,
      };

    case actionTypes.CLEAR_ALL_NOTIFICATION:
      return {
        ...state,
        notificationAlert: false,
      };

    default:
      return state;
  }
};
