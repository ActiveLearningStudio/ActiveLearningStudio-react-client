/* eslint-disable */
import videoServices from "services/videos.services";
import * as actionTypes from "../actionTypes";
import store from "../index";

export const getAllVideos = (id) => async (dispatch) => {
  // const centralizedState = store.getState();
  // const {
  //   organization: { activeOrganization },
  // } = centralizedState;

  const result = await videoServices.getAll(id);
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

// export const getBrightCMS = (id) => async (dispatch) => {

//   const result = await videoServices.brightCMS(id);
//   dispatch({
//     type: actionTypes.BRIGHT_CMS,
//     payload: result,
//   });
// };
