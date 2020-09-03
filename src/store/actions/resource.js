import axios from 'axios';
import Swal from 'sweetalert2';

import resourceService from 'services/resource.service';
import projectService from 'services/project.service';
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
  } catch (e) {
    dispatch({
      type: actionTypes.LOAD_RESOURCE_TYPES_FAIL,
    });

    throw e;
  }
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

export const loadResourceAction = (resourceId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOAD_RESOURCE_REQUEST,
    });

    const data = await resourceService.loadResource(resourceId);

    dispatch({
      type: actionTypes.LOAD_RESOURCE_SUCCESS,
      payload: {
        resource: data.resource,
        previousResourceId: data.previousResourceId,
        nextResourceId: data.nextResourceId,
      },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.LOAD_RESOURCE_FAIL,
    });

    throw e;
  }
};

export const loadH5pSettingsActivity = () => async () => {
  const response = await resourceService.h5pSetings();

  window.H5PIntegration = response.h5p.settings;

  response.h5p.settings.editor.assets.js.forEach((value) => {
    const script = document.createElement('script');
    script.src = value;
    script.async = false;
    document.body.appendChild(script);
  });
};

// TODO: refactor bottom
export const saveGenericResource = () => ({
  type: actionTypes.SAVE_GENERIC_RESOURCE,
});

export const hideCreateResourceModal = () => ({
  type: actionTypes.HIDE_CREATE_RESOURCE_MODAL,
});

export const saveGenericResourceAction = (resourceData) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem('auth'));
  const response = await axios.post(
    `${global.config.laravelAPIUrl}/activity`,
    resourceData,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (response.data.status === 'success') {
    dispatch(saveGenericResource());
    dispatch(hideCreateResourceModal());
  }
};

export const showCreateResourceModal = (id) => ({
  type: actionTypes.SHOW_CREATE_RESOURCE_MODAL,
  id,
});

export const showCreateResourceModalAction = (id) => async (dispatch) => {
  try {
    dispatch(showCreateResourceModal(id));
  } catch (e) {
    throw new Error(e);
  }
};

export const hideCreateResourceModalAction = () => async (dispatch) => {
  try {
    dispatch(hideCreateResourceModal());
  } catch (e) {
    throw new Error(e);
  }
};

export const showCreateResourceActivity = () => ({
  type: actionTypes.SHOW_RESOURCE_ACTIVITY_TYPE,
});

export const showCreateResourceActivityAction = () => async (dispatch) => {
  try {
    dispatch(showCreateResourceActivity());
  } catch (e) {
    throw new Error(e);
  }
};

export const showSelectActivity = (activityType) => ({
  type: actionTypes.SHOW_RESOURCE_SELECT_ACTIVITY,
  activityType,
});

export const showSelectActivityAction = (activityType) => async (dispatch) => {
  try {
    dispatch(showSelectActivity(activityType));
  } catch (e) {
    throw new Error(e);
  }
};

export const showBuildActivity = (editor, editorType, params) => ({
  type: actionTypes.SHOW_RESOURCE_ACTIVITY_BUILD,
  editor,
  editorType,
  params,
});

export const hideBuildActivity = () => ({
  type: actionTypes.HIDE_RESOURCE_ACTIVITY_BUILD,
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
    throw new Error(e);
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
      const response = await resourceService.activityH5p(activityId);
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
    throw new Error(e);
  }
};

export const editResource = (playlistId, resource, editor, editorType) => ({
  type: actionTypes.EDIT_RESOURCE,
  playlistId,
  resource,
  editor,
  editorType,
});

// resource shared

export const resourceUnshared = (resourceId, resourceName) => {
  const { token } = JSON.parse(localStorage.getItem('auth'));

  axios
    .post(
      `${global.config.laravelAPIUrl}/remove-share-activity`,
      { resourceId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => {
      if (res.data.status === 'success') {
        Swal.fire({
          title: `You stopped sharing <strong>"${resourceName}"</strong> ! `,
          html: 'Please remember that anyone you have shared this activity with,'
            + ' will no longer have access to its contents.',
        });
      }
    });
};

// resource unshared

export const resourceShared = (resourceId, resourceName) => {
  const { token } = JSON.parse(localStorage.getItem('auth'));

  axios
    .post(
      `${global.config.laravelAPIUrl}/share-activity`,
      { resourceId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => {
      if (res.data.status === 'success') {
        const protocol = `${window.location.href.split('/')[0]}//`;

        Swal.fire({
          html: `You can now share Activity <strong>"${resourceName}"</strong><br>
                Anyone with the link below can access your activity:<br>
                <br><a target="_blank" href="/shared/activity/${resourceId.trim()}
                ">${protocol + window.location.host}/shared/activity/${resourceId.trim()}</a>
              `,
        });
      }
    });
};

export const editResourceAction = (
  playlistId,
  editor,
  editorType,
  activityId,
  metadata,
) => async (dispatch) => {
  try {
    const dataUpload = {
      title: metadata.metaContent && metadata.metaContent.metaTitle,
      content: 'create',
      thumb_url: metadata.thumbUrl,
      subject_id:
      metadata.metaContent.metaSubject
      && metadata.metaContent.metaSubject.subject,
      education_level_id:
      metadata.metaContent.metaEducationalLevels
      && metadata.metaContent.metaEducationalLevels.name,
      h5p_content_id: h5pid.id,
      action: 'create',
    };

    const response = await resourceService.h5pSetingsUpdate(activityId, dataUpload);

    const resource = {};
    resource.id = response.id;

    dispatch(editResource(playlistId, resource, editor, editorType));
  } catch (e) {
    throw new Error(e);
  }
};

export const validationErrorsResource = () => ({
  type: actionTypes.RESOURCE_VALIDATION_ERRORS,
});

export const createResource = (playlistId, resource, editor, editorType) => ({
  type: actionTypes.CREATE_RESOURCE,
  playlistId,
  resource,
  editor,
  editorType,
});

export const createResourceAction = (
  playlistId,
  editor,
  editorType,
  metadata,
  projectId,
) => async (dispatch) => {
  // try {
  // h5peditorCopy to be taken from h5papi/storage/h5p/laravel-h5p/js/laravel-h5p.js
  const data = {
    playlistId,
    library: window.h5peditorCopy.getLibrary(),
    parameters: JSON.stringify(window.h5peditorCopy.getParams()),
    action: 'create',
  };

  const insertedH5pResource = await resourceService.h5pToken(data);
  try {
    if (!insertedH5pResource.fail) {
      const resource = insertedH5pResource;
      const createActivityDate = {
        h5p_content_id: resource.id,
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
        metadata.metaContent.metaEducationalLevels
        && metadata.metaContent.metaEducationalLevels.name,
      };
      const insertedResource = await resourceService.createActivity(createActivityDate);

      resource.id = insertedResource.id;

      dispatch(createResource(playlistId, resource, editor, editorType));
      // dispatch(hideCreateResourceModal());
      window.location.href = `/project/${projectId}`;
    } else {
      dispatch(validationErrorsResource());
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const createResourceByH5PUploadAction = (
  playlistId,
  editor,
  editorType,
  payload,
  metadata,
  projectId,
) => async (dispatch) => {
  try {
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
          metadata.metaContent.metaEducationalLevels
          && metadata.metaContent.metaEducationalLevels.name,
      };

      const responseActivity = await resourceService.createActivity(createActivityUpload);

      const resource = { ...responseActivity };
      resource.id = responseActivity.activity.id;

      dispatch(createResource(playlistId, resource, editor, editorType));
      window.location.href = `/project/${projectId}`;
    } else {
      throw new Error('Error occurred while creating resource');
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const previewResource = (id) => ({
  type: actionTypes.PREVIEW_RESOURCE,
  id,
});

export const previewResourceAction = (id) => async (dispatch) => {
  try {
    dispatch(previewResource(id));
  } catch (e) {
    throw new Error(e);
  }
};

export const hidePreviewResourceModal = () => ({
  type: actionTypes.HIDE_PREVIEW_PLAYLIST_MODAL,
});

export const hidePreviewResourceModalAction = () => async (dispatch) => {
  try {
    dispatch(hidePreviewResourceModal());
  } catch (e) {
    throw new Error(e);
  }
};

// runs delete resource ajax
export const deleteResourceAction = (resourceId) => async (dispatch) => {
  try {
    const response = await resourceService.remove(resourceId);

    if (!response.message) {
      dispatch({
        type: actionTypes.DELETE_RESOURCE,
        payload: { resourceId },
      });
    }

    window.location.reload();
  } catch (e) {
    throw new Error(e);
  }
};

// handles the actions when some activity type is switched inside activity type wizard
export const onChangeActivityTypeAction = (activityTypeId) => (dispatch) => {
  try {
    // let activityTypeId = activityTypeId;
    dispatch({
      type: actionTypes.SELECT_ACTIVITY_TYPE,
      payload: { activityTypeId },
    });
  } catch (e) {
    throw new Error(e);
  }
};

// handles the actions when some activity switched inside select activity wizard
export const onChangeActivityAction = (activity) => (dispatch) => {
  try {
    dispatch({
      type: actionTypes.SELECT_ACTIVITY,
      payload: { activity },
    });
  } catch (e) {
    return e;
  }
};

// Metadata saving inside state when metadata form is submitted
export const onSubmitDescribeActivityAction = (metadata, activityId = null) => (dispatch) => {
  try {
    dispatch({
      type: actionTypes.DESCRIBE_ACTIVITY,
      payload: {
        activityId,
        metadata,
      },
    });
  } catch (e) {
    return e;
  }
};

// uploads the thumbnail of resource

export const uploadResourceThumbnail = (thumbUrl) => ({
  type: actionTypes.UPLOAD_RESOURCE_THUMBNAIL,
  thumbUrl,
});

export const resourceThumbnailProgress = (progress) => ({
  type: actionTypes.RESOURCE_THUMBNAIL_PROGRESS,
  progress,
});

export const uploadResourceThumbnailAction = (formData) => async (dispatch) => {
  try {
    const configData = {
      onUploadProgress: (progressEvent) => {
        dispatch({
          type: actionTypes.PROJECT_THUMBNAIL_PROGRESS,
          payload: {
            progress: `Uploaded progress: ${Math.round(
              (progressEvent.loaded / progressEvent.total) * 100,
            )}%`,
          },
        });
      },
    };

    const response = await projectService.upload(formData, configData);

    dispatch(uploadResourceThumbnail(response.thumbUrl));
  } catch (e) {
    // throw new Error(e);
  }
};

export const activeShareActivity = async (actvityId) => {
  const result = await resourceService.shareActivity(actvityId);
  return result;
};

export const loadh5pShareResource = async (actvityId) => {
  const result = await resourceService.loadH5pShared(actvityId);
  return result;
};
