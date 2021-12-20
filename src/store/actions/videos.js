/* eslint-disable */
import videoServices from 'services/videos.services';
import * as actionTypes from '../actionTypes';
import store from '../index';

export const getAllVideos = () => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;

  const result = await videoServices.getAll(activeOrganization?.id);
  dispatch({
    type: actionTypes.ALL_VIDEOS,
    payload: result,
  });
};

export const addVideo = (values) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;

  const result = await videoServices.addVideo(activeOrganization?.id, values);
  // dispatch({
  //   type: actionTypes.ALL_VIDEOS,
  //   payload: result,
  // });
  // return result;
};
