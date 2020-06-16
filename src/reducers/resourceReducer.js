import {
  SHOW_CREATE_RESOURCE_MODAL,
  HIDE_CREATE_RESOURCE_MODAL,
  SHOW_RESOURCE_ACTIVITY_TYPE,
  SHOW_RESOURCE_SELECT_ACTIVITY,
  SHOW_RESOURCE_ACTIVITY_BUILD,
  CREATE_RESOURCE,
  PREVIEW_RESOURCE,
  HIDE_PREVIEW_PLAYLIST_MODAL,
  LOAD_RESOURCE,
  SHOW_RESOURCE_DESCRIBE_ACTIVITY,
  SELECT_ACTIVITY_TYPE,
  SELECT_ACTIVITY,
  DESCRIBE_ACTIVITY,
  UPLOAD_RESOURCE_THUMBNAIL,
  EDIT_RESOURCE,
  RESOURCE_VALIDATION_ERRORS,
  RESOURCE_THUMBNAIL_PROGRESS,
  HIDE_RESOURCE_ACTIVITY_BUILD,
} from "../constants/actionTypes";

const defaultResourceState = () => {
  if (localStorage.getItem("resources")) {
    return {
      playlists: JSON.parse(localStorage.getItem("playlists")),
      // 'resources':JSON.parse(localStorage.getItem("resources")),
      showCreateResourcePopup: false,
    };
  } else {
    return {
      playlists: [],
      showCreateResourcePopup: false,
      newResource: {
        activity: {
          type: null,
        },
        metadata: {
          thumb_url: null,
        },
      },
      editResource: {
        params: {
          data: "",
        },
        metadata: {
          title: null,
          subjectid: null,
          educationlevelid: null,
          thumb_url: null,
        },
      },
      selectedResource: null,
    };
  }
};

const resourceReducer = (state = defaultResourceState(), action) => {
  switch (action.type) {
    case SHOW_CREATE_RESOURCE_MODAL:
      return {
        ...state,
        showCreateResourcePopup: true,
        currentPlaylistId: action.id,
      };
    case HIDE_CREATE_RESOURCE_MODAL:
      return {
        ...state,
        showCreateResourcePopup: false,
        newResource: {
          activity: {
            type: null,
          },
          params: {
            data: "",
          },
          metadata: {
            title: null,
            subjectid: null,
            educationlevelid: null,
            thumb_url: null,
          },
        },
        editResource: {
          params: {
            data: "",
          },
          metadata: {
            title: null,
            subjectid: null,
            educationlevelid: null,
            thumb_url: null,
          },
        },
      };
    case SHOW_RESOURCE_ACTIVITY_TYPE:
      return {
        ...state,
        isResourceActivityType: true,
        isResourceSelectActivity: false,
        isResourceDescribeActivity: false,
        isResourceActivityBuild: false,
        isActivityTypeFilled: false,
        isSelectActivityFilled: false,
        isDescribeFilled: false,
      };
    case SHOW_RESOURCE_SELECT_ACTIVITY:
      return {
        ...state,
        isResourceActivityType: false,
        isResourceSelectActivity: true,
        isResourceDescribeActivity: false,
        isResourceActivityBuild: false,
        isActivityTypeFilled: true,
      };
    case SHOW_RESOURCE_DESCRIBE_ACTIVITY:
      return {
        ...state,
        isResourceActivityType: false,
        isResourceSelectActivity: false,
        isResourceDescribeActivity: true,
        isResourceActivityBuild: false,
        isSelectActivityFilled: true,
        editResource: {
          ...state.editResource,
          params: action.params,
          editor: action.editor,
          editorType: action.editorType,
          metadata: action.metadata,
        },
      };
    case SHOW_RESOURCE_ACTIVITY_BUILD:
      return {
        ...state,
        isResourceActivityType: false,
        isResourceSelectActivity: false,
        isResourceDescribeActivity: false,
        isResourceActivityBuild: true,
        isDescribeFilled: true,
        editResource: {
          ...state.editResource,
          params: action.params,
          editor: action.editor,
          editorType: action.editorType,
        },
      };
    case HIDE_RESOURCE_ACTIVITY_BUILD:
      return {
        ...state,
        isResourceActivityType: false,
        isResourceSelectActivity: false,
        isResourceDescribeActivity: true,
        isResourceActivityBuild: false,
        isDescribeFilled: false,
      };
    case CREATE_RESOURCE:
      return {
        ...state,
        showCreateResourcePopup: false,
        editResource: {
          params: {
            data: "",
          },
        },
        newResource: {
          activity: {
            type: null,
          },
          metadata: {
            thumb_url: null,
          },
        },
      };
    case EDIT_RESOURCE:
      return {
        ...state,
        showEditResourcePopup: false,
        editResource: {
          params: {
            data: "",
          },
        },
      };
    case PREVIEW_RESOURCE:
      return {
        ...state,
        showPreviewResourcePopup: true,
        previewResourceId: action.id,
      };
    case HIDE_PREVIEW_PLAYLIST_MODAL:
      return {
        ...state,
        showPreviewResourcePopup: false,
      };

    case LOAD_RESOURCE:
      return {
        ...state,
        selectedResource: action.resource,
        previousResourceId: action.previousResourceId,
        nextResourceId: action.nextResourceId,
      };
    case SELECT_ACTIVITY_TYPE:
      return {
        ...state,
        newResource: {
          ...state.newResource,
          activityTypeId: action.activityTypeId,
        },
      };
    case SELECT_ACTIVITY:
      return {
        ...state,
        newResource: {
          ...state.newResource,
          activity: action.activity,
        },
      };
    case DESCRIBE_ACTIVITY:
      if (action.activityid != null) {
        return {
          ...state,
          editResource: {
            ...state.editResource,
            metadata: {
              ...state.editResource.metadata,
              metaContent: action.metadata,
            },
          },
        };
      } else {
        return {
          ...state,
          newResource: {
            ...state.newResource,
            metadata: {
              ...state.newResource.metadata,
              metaContent: action.metadata,
            },
          },
        };
      }
    case UPLOAD_RESOURCE_THUMBNAIL:
      return {
        ...state,
        newResource: {
          ...state.newResource,
          metadata: {
            ...state.newResource.metadata,
            thumb_url: action.thumb_url,
          },
        },
        editResource: {
          ...state.editResource,
          metadata: {
            ...state.editResource.metadata,
            thumb_url: action.thumb_url,
          },
        },
        editResource: {
          ...state.editResource,
          metadata: {
            ...state.editResource.metadata,
            thumb_url: action.thumb_url,
          },
        },
        progress: null,
      };
    case RESOURCE_VALIDATION_ERRORS:
      return {
        ...state,
        showCreateResourcePopup: true,
      };
    case RESOURCE_THUMBNAIL_PROGRESS:
      return {
        ...state,
        progress: action.progress,
      };
    default:
      return state;
  }
};

export default resourceReducer;
