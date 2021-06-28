import axios from 'axios';
import Swal from 'sweetalert2';
import Echo from 'laravel-echo';

import resourceService from 'services/resource.service';
import socketConnection from 'services/http.service';
// import { loadProjectPlaylistsAction } from './playlist';
import * as actionTypes from '../actionTypes';

// global variable for h5p object
let h5pid;

export const loadResourceTypesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOAD_RESOURCE_TYPES_REQUEST,
    });
    const { activityTypes } = await resourceService.getTypes();

    dispatch({
      type: actionTypes.LOAD_RESOURCE_TYPES_SUCCESS,
      payload: { activityTypes },
    });
    dispatch({
      type: actionTypes.GET_ACTIVITY_TYPES,
      payload: { activityTypes },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.LOAD_RESOURCE_TYPES_FAIL,
    });

    throw e;
  }
};

export const selectActivityType = (type) => (dispatch) => {
  dispatch({
    type: actionTypes.SELECTED_ACTIVITY_TYPE,
    payload: type,
  });
};

export const createActivityType = (data) => async (dispatch) => {
  const result = await resourceService.createActivityType(data);
  dispatch({
    type: actionTypes.ADD_ACTIVITY_TYPE,
    payload: result,
  });
  return result;
};

export const editActivityType = (data, typeId) => async (dispatch) => {
  const result = await resourceService.editActivityType(data, typeId);
  dispatch({
    type: actionTypes.EDIT_ACTIVITY_TYPE,
    payload: result,
  });
  return result;
};

export const deleteActivityType = (typeId) => async (dispatch) => {
  const result = resourceService.deleteActivityType(typeId);
  dispatch({
    type: actionTypes.DELETE_ACTIVITY_TYPE,
  });
  return result;
};

export const loadResourceItemsAction = (activityTypeId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOAD_RESOURCE_ITEMS_REQUEST,
    });

    const { activityItems } = await resourceService.getItems(activityTypeId);

    dispatch({
      type: actionTypes.LOAD_RESOURCE_ITEMS_SUCCESS,
      payload: { activityItems },
    });

    return activityItems;
  } catch (e) {
    dispatch({
      type: actionTypes.LOAD_RESOURCE_ITEMS_FAIL,
    });

    throw e;
  }
};

export const getActivityItems = (query, page) => async (dispatch) => {
  const allActivityItems = await resourceService.getActivityItems(query, page);
  dispatch({
    type: actionTypes.GET_ACTIVITY_ITEMS_ADMIN,
    payload: allActivityItems.data,
  });
  return allActivityItems;
};

export const selectActivityItem = (type) => (dispatch) => {
  dispatch({
    type: actionTypes.SELECTED_ACTIVITY_ITEM,
    payload: type,
  });
};

export const createActivityItem = (data) => async (dispatch) => {
  const result = await resourceService.createActivityItem(data);
  dispatch({
    type: actionTypes.ADD_ACTIVITY_ITEM,
    payload: result,
  });
  return result;
};

export const editActivityItem = (data, itemId) => async (dispatch) => {
  const result = await resourceService.editActivityItem(data, itemId);
  dispatch({
    type: actionTypes.EDIT_ACTIVITY_ITEM,
    payload: result,
  });
  return result;
};

export const deleteActivityItem = (itemId) => async (dispatch) => {
  const result = resourceService.deleteActivityItem(itemId);
  dispatch({
    type: actionTypes.DELETE_ACTIVITY_ITEM,
  });
  return result;
};

export const loadResourceAction = (activityId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOAD_RESOURCE_REQUEST,
    });

    const data = await resourceService.get(activityId);

    dispatch({
      type: actionTypes.LOAD_RESOURCE_SUCCESS,
      payload: {
        resource: data.activity,
        previousResourceId: data.previousResourceId,
        nextResourceId: data.nextResourceId,
      },
    });
  } catch (e) {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: e.message || 'Something went wrong! We are unable to load activity.',
    });
    dispatch({
      type: actionTypes.LOAD_RESOURCE_FAIL,
    });

    throw e;
  }
};

export const loadH5pSettingsActivity = () => async () => {
  const response = await resourceService.h5pSettings();

  window.H5PIntegration = response.h5p.settings;

  response.h5p.settings.editor.assets.js.forEach((value) => {
    const script = document.createElement('script');
    script.src = value;
    script.async = false;
    document.body.appendChild(script);
  });
};

export const loadH5pResource = (activityId) => async (dispatch) => {
  const result = await resourceService.h5pResource(activityId);

  dispatch({
    type: actionTypes.LOAD_PLAYLIST_SUCCESS,
    payload: result,
  });

  return result;
};

export const loadH5pResourceXapi = (xapiData) => async () => {
  resourceService.getXapi({ statement: xapiData });
};

export const loadH5pResourceSettings = (activityId) => resourceService.h5pResourceSettings(activityId);
export const loadH5pResourceSettingsOpen = (activityId) => resourceService.h5pResourceSettingsOpen(activityId);
export const loadH5pResourceSettingsShared = (activityId) => resourceService.h5pResourceSettingsShared(activityId);
export const loadH5pResourceSettingsEmbed = (activityId) => resourceService.h5pResourceSettingsEmbed(activityId);

// export const loadH5pResourceXapi = (data) => resourceService.getXapi(data);

export const resourceSaved = (saved) => async (dispatch) => {
  dispatch({
    type: actionTypes.SAVE_SEARCH_KEY_IN_CREATION,
    saved,
  });
};

export const createResourceAction = (
  playlistId,
  editor,
  editorType,
  metadata,
  // projectId,
) => async (dispatch) => {
  // try {
  // h5pEditorCopy to be taken from h5papi/storage/h5p/laravel-h5p/js/laravel-h5p.js
  const data = {
    playlistId,
    library: window.h5peditorCopy.getLibrary(),
    parameters: JSON.stringify(window.h5peditorCopy.getParams()),
    action: 'create',
  };
  const insertedH5pResource = await resourceService.h5pToken(data);
  if (!insertedH5pResource.fail) {
    const resource = insertedH5pResource;

    const activity = {
      h5p_content_id: resource.id,
      playlist_id: playlistId,
      thumb_url: metadata.thumbUrl,
      action: 'create',
      title: metadata.metaContent.metaTitle,
      type: 'h5p',
      content: 'place_holder',
      subject_id:
        metadata.metaContent.metaSubject
        && metadata.metaContent.metaSubject,
      education_level_id:
        metadata.metaContent.metaEducationLevels
        && metadata.metaContent.metaEducationLevels,
    };
    const insertedResource = await resourceService.create(activity, playlistId);
    Swal.close();

    resourceSaved(true);

    resource.id = insertedResource.id;
    resource.mysqlid = insertedResource.mysqlid;

    dispatch({
      type: actionTypes.CREATE_RESOURCE,
      playlistId,
      resource,
      editor,
      editorType,
    });
    dispatch({
      type: actionTypes.CLEAR_FORM_DATA_IN_CREATION,
    });
  } else {
    dispatch({
      type: actionTypes.RESOURCE_VALIDATION_ERRORS,
    });
  }
  // } catch (e) {
  //   throw e;
  // }
};

export const uploadResourceThumbnail = (thumbUrl) => ({
  type: actionTypes.UPLOAD_RESOURCE_THUMBNAIL,
  payload: { thumbUrl },
});

export const resourceThumbnailProgress = (progress) => ({
  type: actionTypes.RESOURCE_THUMBNAIL_PROGRESS,
  progress,
});

export const uploadResourceThumbnailAction = (formData) => async (dispatch) => {
  const configData = {
    onUploadProgress: (progressEvent) => {
      dispatch({
        type: actionTypes.RESOURCE_THUMBNAIL_PROGRESS,
        payload: {
          progress: `Uploaded progress: ${Math.round(
            (progressEvent.loaded / progressEvent.total) * 100,
          )}%`,
        },
      });
    },
  };

  const { thumbUrl } = await resourceService.upload(formData, configData);

  dispatch({
    type: actionTypes.UPLOAD_RESOURCE_THUMBNAIL,
    payload: { thumbUrl },
  });
};

export const uploadActivityTypeThumbAction = (formData) => async (dispatch) => {
  const { image } = await resourceService.uploadActivityTypeThumb(formData);
  dispatch({
    type: actionTypes.UPLOAD_ACTIVITY_TYPE_THUMBNAIL,
    payload: { image },
  });
  return image;
};

export const uploadActivityItemThumbAction = (formData) => async (dispatch) => {
  const { image } = await resourceService.uploadActivityItemThumb(formData);
  dispatch({
    type: actionTypes.UPLOAD_ACTIVITY_ITEM_THUMBNAIL,
    payload: { image },
  });
  return image;
};

export const deleteResourceAction = (activityId, playlistId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.DELETE_RESOURCE_REQUEST,
    });

    await resourceService.remove(activityId, playlistId);
    dispatch({
      type: actionTypes.DELETE_RESOURCE_SUCCESS,
      payload: { activityId },
    });
    // dispatch(loadProjectPlaylistsAction(projectId));
  } catch (e) {
    dispatch({
      type: actionTypes.DELETE_RESOURCE_FAIL,
    });

    throw e;
  }
};

export const showCreateResourceModalAction = (id) => ({
  type: actionTypes.SHOW_CREATE_RESOURCE_MODAL,
  id,
});

export const hideCreateResourceModalAction = () => ({
  type: actionTypes.HIDE_CREATE_RESOURCE_MODAL,
});

export const showCreateResourceActivityAction = () => ({
  type: actionTypes.SHOW_RESOURCE_ACTIVITY_TYPE,
});

export const showSelectActivityAction = (activityType) => ({
  type: actionTypes.SHOW_RESOURCE_SELECT_ACTIVITY,
  activityType,
});

export const previewResourceAction = (id) => ({
  type: actionTypes.PREVIEW_RESOURCE,
  payload: { id },
});

export const hidePreviewResourceModalAction = () => ({
  type: actionTypes.HIDE_PREVIEW_PLAYLIST_MODAL,
});

// handles the actions when some activity type is switched inside activity type wizard
export const onChangeActivityTypeAction = (activityTypeId) => ({
  type: actionTypes.SELECT_ACTIVITY_TYPE,
  payload: { activityTypeId },
});

// handles the actions when some activity switched inside select activity wizard
export const onChangeActivityAction = (activity) => ({
  type: actionTypes.SELECT_ACTIVITY,
  payload: { activity },
});

// Metadata saving inside state when metadata form is submitted
export const onSubmitDescribeActivityAction = (metadata, activityId = null) => ({
  type: actionTypes.DESCRIBE_ACTIVITY,
  payload: {
    activityId,
    metadata,
  },
});

export const hideBuildActivityAction = () => ({
  type: actionTypes.HIDE_RESOURCE_ACTIVITY_BUILD,
});

export const showBuildActivity = (editor, editorType, params) => ({
  type: actionTypes.SHOW_RESOURCE_ACTIVITY_BUILD,
  editor,
  editorType,
  params,
});

export const showBuildActivityAction = (
  editor = null,
  editorType = null,
  activityId = null,
) => async (dispatch) => {
  try {
    if (activityId) {
      const response = await resourceService.activityH5p(activityId);
      const { activity } = response;
      h5pid = activity;
      const lib = `${activity.library_name} ${activity.major_version}.${activity.minor_version}`;
      dispatch(showBuildActivity(lib, activity.type, activity.h5p));
    } else {
      dispatch(showBuildActivity(editor, editorType, ''));
    }
  } catch (e) {
    console.log(e);
  }
};

export const showDescribeActivity = (activity, metadata = null) => ({
  type: actionTypes.SHOW_RESOURCE_DESCRIBE_ACTIVITY,
  activity,
  metadata,
});

export const showDescribeActivityAction = (activity, activityId = null) => async (dispatch) => {
  try {
    if (activityId) {
      Swal.showLoading();
      const response = await resourceService.activityH5p(activityId);
      Swal.close();
      if (response.activity) {
        const metadata = {
          title: response.activity.title,
          subjectId: response.activity.subject_id,
          educationLevelId: response.activity.education_level_id,
          thumbUrl: response.activity.thumb_url,
          type: response.activity.type,
        };
        dispatch(showDescribeActivity(activity, metadata));
      }
    } else {
      dispatch(showDescribeActivity(activity));
    }
  } catch (e) {
    console.log(e);
    Swal.close();
  }
};

export const createResourceByH5PUploadAction = (
  playlistId,
  editor,
  editorType,
  payload,
  metadata,
  // projectId,
) => async (dispatch) => {
  try {
    Swal.showLoading();
    const formData = new FormData();
    formData.append('h5p_file', payload.h5pFile);
    formData.append('action', 'upload');

    const responseUpload = await resourceService.h5pToken(formData);

    if (responseUpload.id) {
      const createActivityUpload = {
        h5p_content_id: responseUpload.id,
        playlist_id: playlistId,
        thumb_url: metadata.thumbUrl,
        action: 'create',
        title: metadata.metaContent.metaTitle,
        type: 'h5p',
        content: 'place_holder',
        subject_id:
          metadata.metaContent.metaSubject
          && metadata.metaContent.metaSubject.subject,
        education_level_id:
          metadata.metaContent.metaEducationLevels
          && metadata.metaContent.metaEducationLevels.name,
      };

      const responseActivity = await resourceService.create(createActivityUpload, playlistId);
      Swal.close();
      const resource = { ...responseActivity };
      resource.id = responseActivity.activity.id;

      dispatch({
        type: actionTypes.CREATE_RESOURCE,
        playlistId,
        resource,
        editor,
        editorType,
      });
      dispatch({
        type: actionTypes.CLEAR_FORM_DATA_IN_CREATION,
      });
    } else {
      throw new Error('Error occurred while creating resource');
    }
  } catch (e) {
    console.log(e);
  }
};

export const editResourceAction = (
  playlistId,
  editor,
  editorType,
  activityId,
  metadata,
) => async (dispatch) => {
  const h5pdata = {
    library: window.h5peditorCopy.getLibrary(),
    parameters: JSON.stringify(window.h5peditorCopy.getParams()),
    action: 'create',
  };
  try {
    const dataUpload = {
      title: metadata.metaContent && metadata.metaContent.metaTitle,
      content: 'create',
      thumb_url: metadata.thumbUrl,
      type: 'h5p',
      subject_id:
        metadata.metaContent.metaSubject
        && metadata.metaContent.metaSubject,
      education_level_id:
        metadata.metaContent.metaEducationLevels
        && metadata.metaContent.metaEducationLevels,
      h5p_content_id: h5pid.h5p_content.id,
      action: 'create',
      data: h5pdata,
    };
    const response = await resourceService.h5pSettingsUpdate(activityId, dataUpload, playlistId);
    Swal.close();

    resourceSaved(true);

    const resource = {};
    resource.id = response.id;

    dispatch({
      type: actionTypes.EDIT_RESOURCE,
      playlistId,
      resource,
      editor,
      editorType,
    });

    dispatch({
      type: actionTypes.CLEAR_FORM_DATA_IN_CREATION,
    });
    return response;
  } catch (e) {
    console.log(e);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: 'Error editing activity',
    });
    throw e;
  }
};

export const shareActivity = async (activityId) => {
  resourceService.shareActivity(activityId);

  // if (result.activity.id) {
  //   const protocol = `${window.location.href.split('/')[0]}//`;
  //
  //   Swal.fire({
  //     html: `You can now share Activity <strong>"${resourceName}"</strong><br>
  //         Anyone with the link below can access your activity:<br>
  //         <br><a target="_blank" href="/activity/${activityId}/shared
  //         ">${protocol + window.location.host}/activity/${activityId}/shared</a>
  //       `,
  //   });
  // }
};

export const removeShareActivity = async (activityId, resourceName) => {
  const result = await resourceService.removeShareActivity(activityId);
  if (result.activity.id) {
    Swal.fire({
      title: `You stopped sharing <strong>"${resourceName}"</strong> ! `,
      html: 'Please remember that anyone you have shared this activity with,'
        + ' will no longer have access to its contents.',
    });
  }
};

export const loadH5pShareResource = async (activityId) => {
  const result = await resourceService.loadH5pShared(activityId);
  return result;
};

// TODO: refactor bottom
export const saveGenericResourceAction = (resourceData) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem('auth'));
  const response = await axios.post(
    `${global.config.laravelAPIUrl}/activity`,
    resourceData,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (response.data.status === 'success') {
    dispatch({
      type: actionTypes.SAVE_GENERIC_RESOURCE,
    });

    dispatch({
      type: actionTypes.HIDE_CREATE_RESOURCE_MODAL,
    });
  }
};

export const saveSearchKeyInCreation = (searchKey) => async (dispatch) => {
  dispatch({
    type: actionTypes.SAVE_SEARCH_KEY_IN_CREATION,
    searchKey,
  });
};

export const saveFormDataInCreation = (formData) => async (dispatch) => {
  dispatch({
    type: actionTypes.SAVE_FORM_DATA_IN_CREATION,
    metaTitle: formData.metaTitle,
    metaSubject: formData.metaSubject,
    metaEducationLevels: formData.metaEducationLevels,
  });
};

export const updatedActivity = (userId) => async () => {
  const echo = new Echo(socketConnection.notificationSocket());

  echo.private('activity-update')
    .listen('ActivityUpdatedEvent', (msg) => {
      if (msg.userId !== userId) {
        const path = window.location.pathname;

        let message = '';
        if (path.includes(`activity/${msg.activityId}`)) {
          message = 'This activity has been modified by other team member. Are you ok to refresh page to see what is updated?';
        } else if (path.includes(`playlist/${msg.playlistId}`)) {
          message = 'This playlist has been modified by other team member. Are you ok to refresh page to see what is updated?';
        } else if (path.includes(`project/${msg.projectId}`)) {
          message = 'This project has been modified by other team member. Are you ok to refresh page to see what is updated?';
        }

        if (message) {
          Swal.fire({
            title: message,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
          })
            .then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
        }
      }
    });
};
