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
    SHOW_RESOURCE_DESCRIBE_ACTIVITY
} from "../constants/actionTypes";

const defaultResourceState = () => {
    if (localStorage.getItem("resources")) {


        return {
            'playlists':JSON.parse(localStorage.getItem("playlists")),
            // 'resources':JSON.parse(localStorage.getItem("resources")),
            'showCreateResourcePopup': false
        }
    } else {
        return {
            'playlists':[],
            'showCreateResourcePopup': false,
            newResource:{
                activityType:1,
                activity:''
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
                currentPlaylistId:action.id
            };
        case HIDE_CREATE_RESOURCE_MODAL:
            return {
                ...state,
                showCreateResourcePopup: false
            };
        case SHOW_RESOURCE_ACTIVITY_TYPE:
                return {
                    ...state,
                    isResourceActivityType:true,
                    isResourceSelectActivity:false,
                    isResourceDescribeActivity:false,
                    isResourceActivityBuild:false,
                    isActivityTypeFilled:false,
                    isSelectActivityFilled:false,
                    isDescribeFilled:false,
                };
        case SHOW_RESOURCE_SELECT_ACTIVITY:
            return {
                ...state,
                isResourceActivityType:false,
                isResourceSelectActivity:true,
                isResourceDescribeActivity:false,
                isResourceActivityBuild:false,
                isActivityTypeFilled:true,
                newResource: {
                    activityType: action.activityType
                }
            };
        case SHOW_RESOURCE_DESCRIBE_ACTIVITY:
            return {
                ...state,
                isResourceActivityType:false,
                isResourceSelectActivity:false,
                isResourceDescribeActivity:true,
                isResourceActivityBuild:false,
                isSelectActivityFilled:true,
                newResource: {
                    ...state.newResource,
                    editor:action.activity,
                    editorType:'h5p'
                }
            };
        case SHOW_RESOURCE_ACTIVITY_BUILD:
            return {
                ...state,
                isResourceActivityType:false,
                isResourceSelectActivity:false,
                isResourceDescribeActivity:false,
                isResourceActivityBuild:true,
                isDescribeFilled:true,
            };
        case CREATE_RESOURCE:
            return {
                ...state,
                showCreateResourcePopup:false
            };   
        case PREVIEW_RESOURCE:
            return {
                ...state,
                showPreviewResourcePopup:true,
                previewResourceId:action.id
            }
        case HIDE_PREVIEW_PLAYLIST_MODAL:
            return {
                ...state,
                showPreviewResourcePopup:false
            }

        case LOAD_RESOURCE:
            return {
                ...state,
                selectedResource: action.resource,
                previousResourceId: action.previousResourceId,
                nextResourceId: action.nextResourceId,
            }
        default:
            return state;
    }
};

export default resourceReducer;
