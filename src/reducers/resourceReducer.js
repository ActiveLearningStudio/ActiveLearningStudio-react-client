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
    DESCRIBE_ACTIVITY
} from "../constants/actionTypes";

const defaultResourceState = () => {
    if (localStorage.getItem("resources")) {


        return {
            'playlists': JSON.parse(localStorage.getItem("playlists")),
            // 'resources':JSON.parse(localStorage.getItem("resources")),
            'showCreateResourcePopup': false
        }
    } else {
        return {
            'playlists': [],
            'showCreateResourcePopup': false,
            newResource: {
                activity: null,
                params: {
                    data: ''
                }
            },
            selectedResource: null
        };
    }
};

const resourceReducer = (state = defaultResourceState(), action) => {
    switch (action.type) {
        case SHOW_CREATE_RESOURCE_MODAL:
            return {
                ...state,
                showCreateResourcePopup: true,
                currentPlaylistId: action.id
            };
        case HIDE_CREATE_RESOURCE_MODAL:
            return {
                ...state,
                showCreateResourcePopup: false
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
                // newResource: {
                //     ...state.newResource,
                //     editor: action.activity,
                //     editorType: 'h5p'
                // }
            };
        case SHOW_RESOURCE_ACTIVITY_BUILD:
            return {
                ...state,
                isResourceActivityType: false,
                isResourceSelectActivity: false,
                isResourceDescribeActivity: false,
                isResourceActivityBuild: true,
                isDescribeFilled: true,
                newResource: {
                    ...state.newResource,
                    params: action.params
                }
            };
        case CREATE_RESOURCE:
            return {
                ...state,
                showCreateResourcePopup: false
            };
        case PREVIEW_RESOURCE:
            return {
                ...state,
                showPreviewResourcePopup: true,
                previewResourceId: action.id
            }
        case HIDE_PREVIEW_PLAYLIST_MODAL:
            return {
                ...state,
                showPreviewResourcePopup: false
            }

        case LOAD_RESOURCE:
            return {
                ...state,
                selectedResource: action.resource,
                previousResourceId: action.previousResourceId,
                nextResourceId: action.nextResourceId,
            }
        case SELECT_ACTIVITY_TYPE:
            return {
                ...state,
                newResource: {
                    ...state.newResource,
                    activityTypeId: action.activityTypeId
                }
            }
        case SELECT_ACTIVITY:
            return {
                ...state,
                newResource: {
                    ...state.newResource,
                    activity: action.activity
                }
            }
        case DESCRIBE_ACTIVITY:
            return {
                ...state,
                newResource: {
                    ...state.newResource,
                    metaData:action.metaData
                }
            }
        default:
            return state;
    }
};

export default resourceReducer;
