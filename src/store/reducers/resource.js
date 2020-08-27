import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  types: [],
  resources: [],
  showCreateResourcePopup: false,
  newResource: {
    activity: {
      type: null,
    },
    metadata: {
      thumbUrl: null,
    },
  },
  editResource: {
    params: {
      data: '',
    },
    metadata: {
      title: null,
      subjectId: null,
      educationLevelId: null,
      thumbUrl: null,
    },
  },
  selectedResource: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOAD_RESOURCE_TYPES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOAD_RESOURCE_TYPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        types: action.payload.activityTypes,
      };
    case actionTypes.LOAD_RESOURCE_TYPES_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOAD_RESOURCE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOAD_RESOURCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedResource: action.payload.resource,
        previousResourceId: action.payload.previousResourceId,
        nextResourceId: action.payload.nextResourceId,
      };
    case actionTypes.LOAD_RESOURCE_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    // TODO: refactor bottom
    case actionTypes.SHOW_CREATE_RESOURCE_MODAL:
      return {
        ...state,
        showCreateResourcePopup: true,
        currentPlaylistId: action.id,
      };

    case actionTypes.HIDE_CREATE_RESOURCE_MODAL:
      return {
        ...state,
        showCreateResourcePopup: false,
        newResource: {
          activity: {
            type: null,
          },
          params: {
            data: '',
          },
          metadata: {
            title: null,
            subjectId: null,
            educationLevelId: null,
            thumbUrl: null,
          },
        },
        editResource: {
          params: {
            data: '',
          },
          metadata: {
            title: null,
            subjectId: null,
            educationLevelId: null,
            thumbUrl: null,
          },
        },
      };

    case actionTypes.SHOW_RESOURCE_ACTIVITY_TYPE:
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

    case actionTypes.SHOW_RESOURCE_SELECT_ACTIVITY:
      return {
        ...state,
        isResourceActivityType: false,
        isResourceSelectActivity: true,
        isResourceDescribeActivity: false,
        isResourceActivityBuild: false,
        isActivityTypeFilled: true,
      };

    case actionTypes.SHOW_RESOURCE_DESCRIBE_ACTIVITY:
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

    case actionTypes.SHOW_RESOURCE_ACTIVITY_BUILD:
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

    case actionTypes.HIDE_RESOURCE_ACTIVITY_BUILD:
      return {
        ...state,
        isResourceActivityType: false,
        isResourceSelectActivity: false,
        isResourceDescribeActivity: true,
        isResourceActivityBuild: false,
        isDescribeFilled: false,
      };

    case actionTypes.CREATE_RESOURCE:
      return {
        ...state,
        showCreateResourcePopup: false,
        editResource: {
          params: {
            data: '',
          },
        },
        newResource: {
          activity: {
            type: null,
          },
          metadata: {
            thumbUrl: null,
          },
        },
      };

    case actionTypes.EDIT_RESOURCE:
      return {
        ...state,
        showEditResourcePopup: false,
        editResource: {
          params: {
            data: '',
          },
        },
      };

    case actionTypes.PREVIEW_RESOURCE:
      return {
        ...state,
        showPreviewResourcePopup: true,
        previewResourceId: action.id,
      };

    case actionTypes.HIDE_PREVIEW_PLAYLIST_MODAL:
      return {
        ...state,
        showPreviewResourcePopup: false,
      };

    case actionTypes.SELECT_ACTIVITY_TYPE:
      return {
        ...state,
        newResource: {
          ...state.newResource,
          activityTypeId: action.payload.activityTypeId,
        },
      };

    case actionTypes.SELECT_ACTIVITY:
      return {
        ...state,
        newResource: {
          ...state.newResource,
          activity: action.payload.activity,
        },
      };

    case actionTypes.DESCRIBE_ACTIVITY:
      if (action.payload.activityId != null) {
        return {
          ...state,
          editResource: {
            ...state.editResource,
            metadata: {
              ...state.editResource.metadata,
              metaContent: action.payload.metadata,
            },
          },
        };
      }
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

    case actionTypes.UPLOAD_RESOURCE_THUMBNAIL:
      return {
        ...state,
        newResource: {
          ...state.newResource,
          metadata: {
            ...state.newResource.metadata,
            thumbUrl: action.thumbUrl,
          },
        },
        editResource: {
          ...state.editResource,
          metadata: {
            ...state.editResource.metadata,
            thumbUrl: action.thumbUrl,
          },
        },
        progress: null,
      };

    case actionTypes.RESOURCE_VALIDATION_ERRORS:
      return {
        ...state,
        showCreateResourcePopup: true,
      };

    case actionTypes.RESOURCE_THUMBNAIL_PROGRESS:
      return {
        ...state,
        progress: action.progress,
      };

    default:
      return state;
  }
};
