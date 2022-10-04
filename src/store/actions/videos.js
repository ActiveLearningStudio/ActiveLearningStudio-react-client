/* eslint-disable */
import { toast } from 'react-toastify';

import videoServices from 'services/videos.services';
import * as actionTypes from '../actionTypes';
import store from '../index';

export const getAllVideos = (id, page, size, search) => async (dispatch) => {
  const result = await videoServices.getAll(id, page, size, search);
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

export const getBrightCMS = () => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const result = await videoServices.brightCMS(activeOrganization.id);
  return result;
};

export const getBrightVideos = (brightId, offset) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const result = await videoServices.brightCMSVideo(
    {
      organization_id: activeOrganization.id,
      id: brightId,
      query_param: `query=-tags:curriki&limit=6&offset=${offset}`,
    },
    offset,
  );
  console.log('result', result);
  return result;
};

export const getKalturaVideos = (searchText = '', page = 0, size = 6) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  var result;
  try {
    result = await videoServices.getKalturaVideos({
      organization_id: activeOrganization.id,
      searchText: searchText,
      pageIndex: page,
      pageSize: size,
    });
  } catch (e) {
    result = e;
  }

  return result;
};

export const getVimeoVideos = (searchText = '', page = 1, size = 6) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  var result;
  try {
    result = await videoServices.getVimeoVideos({
      organization_id: activeOrganization.id,
      query: searchText,
      page: page,
      per_page: size,
    });
  } catch (e) {
    result = e;
  }

  return result;
};

export const getBrightVideosSearch = (brightId, videoID) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const result = await videoServices.brightCMSVideo({
    organization_id: activeOrganization.id,
    id: brightId,
    query_param: `query=-tags:curriki ${videoID}`,
  });
  return result;
};

export const getSearchVideoCard = (orgId, searchQuery) => async (dispatch) => {
  const result = await videoServices.getSearchVideoCard(orgId, searchQuery);
  console.log('After Seacrhing:', result.data);
  dispatch({
    type: actionTypes.ALL_VIDEOS,
    payload: result,
  });
};

export const deleteVideo = (videoID) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const result = await videoServices.deleteVideo(activeOrganization.id, videoID);
  dispatch({
    type: actionTypes.REMOVE_VIDEOS,
    payload: videoID,
  });
};
export const cloneh5pvideo = (videoID) => async () => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const result = await videoServices.cloneh5pvideo(activeOrganization.id, videoID);
  return result;
};

export const edith5pVideoActivity = (videoID, formData) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const h5pdata = {
    library: window.h5peditorCopy.getLibrary(),
    parameters: JSON.stringify(window.h5peditorCopy.getParams()),
    action: 'create',
  };
  toast.info('Updating  Activity ...', {
    className: 'project-loading',
    closeOnClick: false,
    closeButton: false,
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100000,
    icon: '',
  });
  const result = await videoServices.edith5pVideoActivity(activeOrganization.id, videoID, {
    ...formData,
    data: h5pdata,
    type: 'h5p_standalone',
    content: 'place_holder',
  });
  toast.dismiss();

  dispatch({
    type: actionTypes.EDIT_VIDEO_ACTIVITY,
    payload: result.activity,
  });
};

export const allBrightCove = (orgId, size, page) => async (dispatch) => {
  const result = await videoServices.allBrightCove(orgId, size, page);
  dispatch({
    type: actionTypes.UP_ALL_BRIGHTCOVE,
    payload: result,
  });
};
export const allBrightCoveSearch = (orgId, search, size, page, col, order) => async (dispatch) => {
  const result = await videoServices.allBrightCoveSearch(orgId, search, size, page, col, order);
  dispatch({
    type: actionTypes.UP_ALL_BRIGHTCOVE,
    payload: result,
  });
};
export const addBrightCove = (orgId, data) => async (dispatch) => {
  const result = await videoServices.addBrightCove(orgId, data);
  dispatch({
    type: actionTypes.NEW_BRIGHTCOVE,
    payload: result.data,
  });
  dispatch({
    type: actionTypes.UPDATE_PAGINATION_COUNT,
    payload: 1,
    reducer: 'allbrightCove',
  });
  return result;
};

export const deleteBrightCove = (orgId, settingId) => async (dispatch) => {
  const result = await videoServices.deleteBrightCove(orgId, settingId);
  if (result.message) {
    dispatch({
      type: actionTypes.DEL_BRIGHTCOVE,
      payload: settingId,
    });
    dispatch({
      type: actionTypes.UPDATE_PAGINATION_COUNT,
      payload: -1,
      reducer: 'allbrightCove',
    });
  }
  return result;
};

export const editBrightCove = (orgId, settingId, data) => async (dispatch) => {
  const result = await videoServices.editBrightCove(orgId, settingId, data);
  dispatch({
    type: actionTypes.EDIT_BRIGHTCOVE,
    payload: result.data,
  });
  return result;
};
