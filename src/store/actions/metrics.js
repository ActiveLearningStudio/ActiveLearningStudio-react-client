import metricsService from 'services/metrics.service';
import {GET_USER_METRICS, GET_USER_MEMBERSHIP} from '../actionTypes';

export const getUserMetricsAction = (userId) => async (dispatch) => {
    try {
        const { metrics } = await metricsService.getUserMetrics(userId);
        dispatch({
            type: GET_USER_METRICS,
            metrics
        });
    } catch (e) {
        throw e;
    }
};

export const getUserMembershipAction = (userId) => async (dispatch) => {
    try {
        const { membership } = await metricsService.getUserMembership(userId);
        dispatch({
            type: GET_USER_MEMBERSHIP,
            membership
        });
    } catch (e) {
        throw e;
    }
};