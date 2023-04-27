/* eslint-disable */

import { toast } from "react-toastify";
import Swal from "sweetalert2";

import resourceService from "services/resource.service";
import indResourceService from "services/indActivities.service";
import store from "../index";
import * as actionTypes from "../actionTypes";

export const createIndResourceAction = (
  metadata,
  hide,
  accountId,
  settingId,
  redirecttoactivity,
  fullWidth
) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const data = {
    library: window.h5peditorCopy.getLibrary(),
    parameters: JSON.stringify(window.h5peditorCopy.getParams()),
    action: "create",
    brightcove_account_id: accountId || undefined,
    brightcove_api_setting_id: settingId || undefined,
  };
  toast.info("Creating new Activity ...", {
    className: "project-loading",
    closeOnClick: false,
    closeButton: false,
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100000,
    icon: "",
  });
  const insertedH5pResource = await resourceService.h5pToken(data);
  if (!insertedH5pResource.fail) {
    const resource = insertedH5pResource;

    const activity = {
      h5p_content_id: resource.id,
      thumb_url: metadata?.thumb_url,
      action: "create",
      title: metadata?.title,
      type: "h5p",
      content: "place_holder",
      subject_id: metadata?.subject_id,
      education_level_id: metadata?.education_level_id,
      author_tag_id: metadata?.author_tag_id,
      description: metadata?.description || undefined,
      source_type: metadata?.source_type || undefined,
      source_url: metadata?.source_url || undefined,
      organization_visibility_type_id: 1,
    };

    const result = await indResourceService.create(
      activeOrganization.id,
      activity
    );
    const resultShared = await indResourceService.sharedIndependentActivity(
      insertedH5pResource.id
    );
    window.top.postMessage(resultShared, "http://127.0.0.1:5501");
    toast.dismiss();
    toast.success("Activity Created", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });

    if (fullWidth) {
      setTimeout(() => {
        Swal.fire({
          title: "We can close the window here now",
          showConfirmButton: false,
          showCancelButton: false,
        });
      }, [1500]);
    } else {
      dispatch({
        type: actionTypes.ADD_IND_ACTIVITIES,
        payload: result["independent-activity"],
      });
      hide();
      dispatch({
        type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
        payload: "",
      });
      dispatch({
        type: "ADD_VIDEO_URL",
        payload: "",
      });
      if (redirecttoactivity) {
        window.location.href = "/";
      }
    }
  }
};

// export const allIndActivity = (orgId) => async (dispatch) => {
//   const allActivities = await indResourceService.allIndActivity(orgId);
//   if (allActivities["independent-activities"]) {
//     dispatch({
//       type: actionTypes.ALL_IND_ACTIVITIES,
//       payload: allActivities["independent-activities"],
//     });
//   } else {
//     dispatch({
//       type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
//       payload: [],
//     });
//   }
// };
export const allIndActivity = (orgId, page, size, search) => async (
  dispatch
) => {
  dispatch({
    type: actionTypes.ALL_IND_ACTIVITIES_REQUEST,
  });
  const allActivities = await indResourceService.allIndActivity(
    orgId,
    page,
    size,
    search
  );
  // console.log("allActivities", allActivities);
  if (allActivities) {
    if (page > 1) {
      dispatch({
        type: actionTypes.LOAD_MORE_IND_ACTIVITIES,
        payload: allActivities,
      });
    } else {
      dispatch({
        type: actionTypes.ALL_IND_ACTIVITIES,
        payload: allActivities,
      });
    }
  } else {
    dispatch({
      type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
      payload: [],
    });
  }
  dispatch({
    type: actionTypes.ALL_IND_REQUEST_COMPLETE,
  });
  return allActivities;
};

export const allAdminExportActivity = (
  orgId,
  page,
  size,
  search,
  column,
  orderBy
) => async (dispatch) => {
  const allActivities = await indResourceService.allAdminExportActivity(
    orgId,
    page,
    size,
    search,
    column,
    orderBy
  );
  // console.log("allActivities", allActivities);
  if (allActivities) {
    dispatch({
      type: actionTypes.ALL_ADMIN_EXPORTED_ACTIVITIES,
      payload: allActivities,
    });
  } else {
    dispatch({
      type: actionTypes.ALL_ADMIN_EXPORTED_ACTIVITIES,
      payload: [],
    });
  }
};

export const deleteIndActivity = (activityId, admin) => async (
  dispatch
) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const allActivities = await indResourceService.deleteIndActivity(
    activeOrganization.id,
    activityId
  );
  if (allActivities.message) {
    Swal.fire({
      icon: "success",
      html: allActivities.message,
    });
    if (admin) {
      dispatch({
        type: actionTypes.DEL_ADMIN_IND_ACTIVITIES,
        payload: activityId,
      });
    } else {
      dispatch({
        type: actionTypes.DEL_IND_ACTIVITIES,
        payload: activityId,
      });
    }
  }
};

export const editIndActivityItem = (
  activityId,
  data,
  admin
) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  toast.info("Updating  Activity ...", {
    className: "project-loading",
    closeOnClick: false,
    closeButton: false,
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100000,
    icon: "",
  });

  const editActivities = await indResourceService.editIndActivityItem(
    activeOrganization.id,
    data,
    activityId
  );
  toast.dismiss();
  toast.success("Activity Updated", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 4000,
  });
  if (editActivities) {
    if (admin) {
      dispatch({
        type: actionTypes.EDIT_ADMIN_IND_ACTIVITIES,
        payload: editActivities["independent-activity"],
      });
    } else {
      dispatch({
        type: actionTypes.EDIT_IND_ACTIVITIES,
        payload: editActivities["independent-activity"],
      });
    }
  }
};

export const adminIntActivities = (
  orgId,
  page,
  size,
  searchQueryProject,
  column = "",
  orderBy = "",
  authorId,
  createdFrom,
  createdTo,
  updatedFrom,
  updatedTo,
  shared,
  index,
  visibility
) => async (dispatch) => {
  const allActivities = await indResourceService.allAdminIntActivities(
    orgId,
    page,
    size,
    searchQueryProject,
    column,
    orderBy,
    authorId,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
    shared,
    index,
    visibility
  );
  if (allActivities) {
    dispatch({
      type: actionTypes.ALL_ADMIN_IND_ACTIVITIES,
      payload: allActivities,
    });
  } else {
    dispatch({
      type: actionTypes.ALL_ADMIN_IND_ACTIVITIES,
      payload: [],
    });
  }
};
export const shareEnableLink = (id, admin) => async (dispatch) => {
  toast.info("Exporting  Activity ...", {
    className: "project-loading",
    closeOnClick: false,
    closeButton: false,
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100000,
    icon: "",
  });
  const result = await indResourceService.shareEnable(id);
  toast.dismiss();
  toast.success("Activity (xApi) is downloaded", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 4000,
  });
  if (admin) {
    dispatch({
      type: actionTypes.EDIT_ADMIN_IND_ACTIVITIES,
      payload: result?.["independent-activity"],
    });
  } else {
    dispatch({
      type: actionTypes.EDIT_IND_ACTIVITIES,
      payload: result["independent-activity"],
    });
  }
  return result;
};
export const shareDisableLink = (id, admin) => async (dispatch) => {
  toast.info("Updating  Activity ...", {
    className: "project-loading",
    closeOnClick: false,
    closeButton: false,
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100000,
    icon: "",
  });
  const result = await indResourceService.shareDisable(id);
  toast.dismiss();
  toast.success("Activity Updated", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 4000,
  });
  if (admin) {
    dispatch({
      type: actionTypes.EDIT_ADMIN_IND_ACTIVITIES,
      payload: result?.["independent-activity"],
    });
  } else {
    dispatch({
      type: actionTypes.EDIT_IND_ACTIVITIES,
      payload: result["independent-activity"],
    });
  }
  return result;
};

export const getIndex = (id, index, admin) => async (dispatch) => {
  toast.info("Updating  Activity ...", {
    className: "project-loading",
    closeOnClick: false,
    closeButton: false,
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100000,
    icon: "",
  });
  let result;
  if (admin) {
    result = await indResourceService.getIndex(
      id,
      index.indexing,
      admin
    );
  } else {
    result = await indResourceService.getIndex(id, index);
  }
  console.log("Reslt index", result);
  toast.dismiss();

  if (result.message) {
    toast.success(result.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
    });
    if (admin) {
      dispatch({
        type: actionTypes.EDIT_INDEX_ADMIN_IND_ACTIVITIES,
        payload: index,
        activityId: id,
      });
    } else {
      dispatch({
        type: actionTypes.EDIT_IND_ACTIVITIES_INDEX,
        payload: id,
      });
    }
  }
};
