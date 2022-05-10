/* eslint-disable */

import { toast } from 'react-toastify';
import resourceService from 'services/resource.service';
import indResourceService from 'services/indActivities.service';
import store from '../index';
import * as actionTypes from '../actionTypes';

export const createIndResourceAction = (metadata, hide) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const data = {
    library: window.h5peditorCopy.getLibrary(),
    parameters: JSON.stringify(window.h5peditorCopy.getParams()),
    action: 'create',
  };
  toast.info('Creating new Activity ...', {
    className: 'project-loading',
    closeOnClick: false,
    closeButton: false,
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100000,
    icon: '',
  });
  const insertedH5pResource = await resourceService.h5pToken(data);
  if (!insertedH5pResource.fail) {
    const resource = insertedH5pResource;

    const activity = {
      h5p_content_id: resource.id,
      thumb_url: metadata?.thumb_url,
      action: 'create',
      title: metadata?.title,
      type: 'h5p',
      content: 'place_holder',
      subject_id: metadata?.subject_id,
      education_level_id: metadata?.education_level_id,
      author_tag_id: metadata?.author_tag_id,
      description: metadata?.description || undefined,
      source_type: metadata?.source_type || undefined,
      source_url: metadata?.source_url || undefined,
      organization_visibility_type_id: 1,
    };

    const result = await indResourceService.create(activeOrganization.id, activity);
    toast.dismiss();
    toast.success('Activity Created', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    dispatch({
      type: actionTypes.ADD_IND_ACTIVITIES,
      payload: result['independent-activity'],
    });
    hide();
    dispatch({
      type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
      payload: '',
    });
  }
};

export const allIndActivity = (orgId) => async (dispatch) => {
  const allActivities = await indResourceService.allIndActivity(orgId);
  if (allActivities['independent-activities']) {
    dispatch({
      type: actionTypes.ALL_IND_ACTIVITIES,
      payload: allActivities['independent-activities'],
    });
  } else {
    dispatch({
      type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
      payload: [],
    });
  }
};

export const deleteIndActivity = (activityId) => async (dispatch) => {
  const allActivities = await indResourceService.deleteIndActivity(activityId);
  // if (allActivities['independent-activities']) {
  //   dispatch({
  //     type: actionTypes.ALL_IND_ACTIVITIES,
  //     payload: allActivities['independent-activities'],
  //   });
  // } else {
  //   dispatch({
  //     type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
  //     payload: [],
  //   });
  // }
};
