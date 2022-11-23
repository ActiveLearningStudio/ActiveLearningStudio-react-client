/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import komodoService from 'services/komodo.service';
import * as actionTypes from '../actionTypes';

export const getKomdoVideoList = (orgId, page, size, search) => async (dispatch) => {
  dispatch({
    type: actionTypes.KOMODO_VIDEO_GET_SUCCESS,
  });
  const komodoResult = await komodoService.getKomdoVideoList(orgId, page, size, search);

  dispatch({
    type: actionTypes.KOMODO_VIDEO_GET_SUCCESS,
    payload: komodoResult,
  });
};
