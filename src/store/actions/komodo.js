/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import komodoService from 'services/komodo.service';
import * as actionTypes from '../actionTypes';
import store from '../index';

export const getKomdoVideoList = (orgId) => async (dispatch) => {
  const komodoResult = await komodoService.getKomdoVideoList(orgId);

  dispatch({
    type: actionTypes.KOMODO_VIDEO_GET_SUCCESS,
    payload: komodoResult,
  });
};
