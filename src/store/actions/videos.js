/* eslint-disable */
import videoServices from "services/videos.services";
import * as actionTypes from "../actionTypes";
import store from "../index";

export const getAllVideos = (id) => async (dispatch) => {
  const result = await videoServices.getAll(id);
  dispatch({
    type: actionTypes.ALL_VIDEOS,
    payload: result.data,
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

export const getBrightCMS = () => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const result = await videoServices.brightCMS(activeOrganization.id);
  return result;
};

export const getBrightVideos = (brightId) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const result = await videoServices.brightCMSVideo({
    organization_id: activeOrganization.id,
    id: brightId,
  });
  return result;
};

export const getSearchVideoCard = (orgId, searchQuery) => async (dispatch) => {
  const result = await videoServices.getSearchVideoCard(orgId, searchQuery);
  console.log("After Seacrhing:", result.data);
  dispatch({
    type: actionTypes.ALL_VIDEOS,
    payload: result.data,
  });
};

export const deleteVideo = (videoID) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const result = await videoServices.deleteVideo(
    activeOrganization.id,
    videoID
  );
  dispatch({
    type: actionTypes.REMOVE_VIDEOS,
    payload: videoID,
  });
};
