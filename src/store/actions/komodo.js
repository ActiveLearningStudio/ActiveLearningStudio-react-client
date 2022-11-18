/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import komodoService from 'services/komodo.service';
import * as actionTypes from '../actionTypes';
import store from '../index';

export const getKomdoVideoList = () => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  dispatch({
    type: actionTypes.KOMODO_VIDEO_GET_REQUEST,
  });
  try {
    const komodoResult = await komodoService.getKomdoVideoList(activeOrganization.id);
    console.log('komodoResult', komodoResult);
    dispatch({
      type: actionTypes.KOMODO_VIDEO_GET_SUCCESS,
      payload: komodoResult,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.KOMODO_VIDEO_GET_FAIL,
    });
  }
};
