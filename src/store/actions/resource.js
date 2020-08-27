import axios from 'axios';
import Swal from 'sweetalert2';

import resourceService from 'services/resource.service';
import * as actionTypes from '../actionTypes';

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
      const response = await axios.get(
        `${global.config.laravelAPIUrl}/activity/${activityId}`,
      );

      const lib = `${response.data.data.libraryName
      } ${
        response.data.data.majorVersion
      }.${
        response.data.data.minorVersion}`;

      dispatch(
        showBuildActivity(
          lib,
          response.data.data.type,
          response.data.data.h5p,
        ),
      );
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
      const response = await axios.get(
        `${global.config.laravelAPIUrl}/activity/${activityId}`,
      );
      let metadata = {
        title: '',
        subjectId: '',
        educationLevelId: '',
      };

      if (response.data.data.metadata != null) {
        metadata = response.data.data.metadata;
      }

      dispatch(showDescribeActivity(activity, metadata));
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
    const { token } = JSON.parse(localStorage.getItem('auth'));
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // h5pEditorCopy to be taken from h5papi/storage/h5p/laravel-h5p/js/laravel-h5p.js
    const data = {
      library: window.h5peditorCopy.getLibrary(),
      parameters: JSON.stringify(window.h5peditorCopy.getParams()),
      action: 'create',
    };

    const response = await axios.put(
      `${global.config.laravelAPIUrl}/activity/${activityId}`,
      {
        playlistId,
        metadata,
        action: 'create',
        data,
      },
      {
        headers,
      },
    );

    const resource = {};
    resource.id = response.data.data.id;

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
) => async (dispatch) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('auth'));
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // h5peditorCopy to be taken from h5papi/storage/h5p/laravel-h5p/js/laravel-h5p.js
    const data = {
      playlistId,
      library: window.h5peditorCopy.getLibrary(),
      parameters: JSON.stringify(window.h5peditorCopy.getParams()),
      action: 'create',
    };

    const insertedH5pResource = await axios.post(
      `${global.config.h5pAjaxUrl}/api/h5p/?api_token=test`,
      data,
      {
        headers,
      },
    );

    if (!insertedH5pResource.data.fail) {
      const resource = insertedH5pResource.data;

      // insert into mongodb
      const insertedResource = await axios.post(
        `${global.config.laravelAPIUrl}/activity`,
        {
          mysqlid: resource.id,
          playlistId,
          metadata,
          action: 'create',
        },
        {
          headers,
        },
      );

      resource.id = insertedResource.data.data.id;
      resource.mysqlid = insertedResource.data.data.mysqlid;

      dispatch(createResource(playlistId, resource, editor, editorType));
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
) => async (dispatch) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('auth'));
    const formData = new FormData();
    formData.append('h5p_file', payload.h5pFile);
    formData.append('action', 'upload');
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const responseUpload = await axios.post(
      `${global.config.h5pAjaxUrl}/api/h5p`,
      formData,
      config,
    );

    const dataUpload = { ...responseUpload.data };
    if (dataUpload instanceof Object && 'id' in dataUpload) {
      // insert into mongodb
      const responseActivity = await axios.post(
        `${global.config.laravelAPIUrl}/activity`,
        {
          mysqlid: dataUpload.id,
          playlistId,
          metadata,
          action: 'create',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const resource = { ...responseActivity.data.data };
      resource.id = responseActivity.data.data.id;
      resource.mysqlid = responseActivity.data.data.mysqlid;

      dispatch(createResource(playlistId, resource, editor, editorType));
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
export const deleteResourceAction = (playlistId, resourceId) => async (dispatch) => {
  try {
    const response = await resourceService.remove(playlistId, resourceId);

    if (response.data.status === 'success') {
      dispatch({
        type: actionTypes.DELETE_RESOURCE,
        payload: { resourceId },
      });
    }
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
    console.log(e);
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
    console.log(e);
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
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        dispatch(
          resourceThumbnailProgress(
            `Uploaded progress: ${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`,
          ),
        );
      },
    };
    return axios
      .post(
        `${global.config.laravelAPIUrl}/post-upload-image`,
        formData,
        config,
      )
      .then((response) => {
        dispatch(uploadResourceThumbnail(response.data.data.guid));
      });
  } catch (e) {
    throw new Error(e);
  }
};
