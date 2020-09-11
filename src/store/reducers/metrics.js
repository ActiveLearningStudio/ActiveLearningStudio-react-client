import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  project_count: 0,
  project_shares: 0,
  project_views: 0,

  playlist_count: 0,
  playlist_shares: 0,
  playlist_views: 0,

  activity_count: 0,
  activity_shares: 0,
  activity_views: 0,

  membership_type: '',
  membership_type_id: 0,
  membership_type_name: '',
  total_storage: 0,
  total_bandwidth: 0,
  used_storage: 0,
  used_bandwidth: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_METRICS:
      return {
        ...state,
        project_count: action.metrics.project_count,
        project_shares: action.metrics.project_shares,
        project_views: action.metrics.project_views,

        playlist_count: action.metrics.playlist_count,
        playlist_shares: action.metrics.playlist_shares,
        playlist_views: action.metrics.playlist_views,

        activity_count: action.metrics.activity_count,
        activity_shares: action.metrics.activity_shares,
        activity_views: action.metrics.activity_views,
      };

    case actionTypes.GET_USER_MEMBERSHIP:
      return {
        ...state,
        membership_type: action.membership.membership_type,
        membership_type_id: action.membership.membership_type_id,
        membership_type_name: action.membership.membership_type_name,
        total_storage: action.membership.total_storage,
        total_bandwidth: action.membership.total_bandwidth,
        used_storage: action.membership.used_storage,
        used_bandwidth: action.membership.used_bandwidth,
      };

    default:
      return state;
  }
};
