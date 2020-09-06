import metricsService from 'services/metrics.service';
import { GET_USER_METRICS, GET_USER_MEMBERSHIP } from '../actionTypes';

export const getUserMetricsAction = (userId) => async (dispatch) => {
  const { metrics } = await metricsService.getUserMetrics(userId);
  dispatch({
    type: GET_USER_METRICS,
    metrics,
  });
};

export const getUserMembershipAction = (userId) => async (dispatch) => {
  const { membership } = await metricsService.getUserMembership(userId);
  dispatch({
    type: GET_USER_MEMBERSHIP,
    membership,
  });
};
