import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  notification: {
    today: [],
  },
  notificationAlert: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_ALL_NOTIFICATIONS:
      return {
        ...state,
        notification: action.payload.notifications ? action.payload.notifications : {},
        notificationAlert: action.payload.unread_count ? action.payload.unread_count : 0,
      };

    case actionTypes.ADD_SINGLE_NOTIFICATION:
      const today = [action.newNotifications, ...state.notification.today];
      return {
        ...state,
        notification: { ...state.notification, today },
        notificationAlert: 1,
      };

    case actionTypes.CLEAR_ALL_NOTIFICATION:
      return {
        ...state,
        notificationAlert: 0,
      };

    case actionTypes.DELETE_NOTIFICATION:
      const updatedList = [];
      Object.keys(state.notification).map((key) => {
        const holder = state.notification[key].filter((each) => each.id !== action.payload);
        updatedList.push({ [key]: holder });
        return true;
      });

      return {
        ...state,
        notification: updatedList.reduce(((key, value) => Object.assign(key, value)), {}),
      };

    default:
      return state;
  }
};
