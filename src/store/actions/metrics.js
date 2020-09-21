import metricsService from 'services/metrics.service';
import {
  GET_USER_METRICS,
  GET_USER_MEMBERSHIP,
  ACTIVITY_VIEWED,
  PLAYLIST_VIEWED,
  PROJECT_VIEWED,
} from '../actionTypes';

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

export const logActivityViewAction = (activityId) => async (dispatch) => {
  metricsService.logActivityView(activityId);
  dispatch({ type: ACTIVITY_VIEWED });
};

export const logPlaylistViewAction = (playlistId) => async (dispatch) => {
  metricsService.logPlaylistView(playlistId);
  dispatch({ type: PLAYLIST_VIEWED });
};

export const logProjectViewAction = (projectId) => async (dispatch) => {
  metricsService.logProjectView(projectId);
  dispatch({ type: PROJECT_VIEWED });
};
