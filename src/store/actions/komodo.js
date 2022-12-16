/* eslint-disable */
/* eslint-disable import/prefer-default-export */
import komodoService from "services/komodo.service";
import * as actionTypes from "../actionTypes";

export const getKomdoVideoList = (orgId, page, size, search) => async (
  dispatch
) => {
  dispatch({
    type: actionTypes.KOMODO_VIDEO_LOAD,
  });
  const komodoResult = await komodoService.getKomdoVideoList(
    orgId,
    page,
    size,
    search
  );
  if (page !== 1 && page > 1 && komodoResult) {
    dispatch({
      type: actionTypes.ADD_MORE_KOMODO_VIDEO,
      payload: komodoResult,
    });
  } else {
    dispatch({
      type: actionTypes.KOMODO_VIDEO_GET_SUCCESS,
      payload: komodoResult,
    });
  }
};
