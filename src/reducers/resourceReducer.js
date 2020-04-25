import { SHOW_CREATE_RESOURCE_MODAL, HIDE_CREATE_RESOURCE_MODAL, SHOW_CREATE_RESOURCE_ACTIVITY, SHOW_CREATE_RESOURCE_QUESTION, SHOW_CREATE_RESOURCE_DESCRIPTION, CREATE_RESOURCE } from "../constants/actionTypes";

const defaultResourceState = () => {
    if (localStorage.getItem("resources")) {
        //      console.log("---");
        //      console.log(localStorage.getItem("resources"));
        //  localStorage.clear();

        return {
            'playlists':JSON.parse(localStorage.getItem("playlists")),
            // 'resources':JSON.parse(localStorage.getItem("resources")),
            'showCreateResourcePopup': false
        }
    } else {
        return {
            'playlists':[],
            'showCreateResourcePopup': false
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
        case SHOW_CREATE_RESOURCE_ACTIVITY:
                return {
                    ...state,
                    isResourceActivity:true,
                    isResourceQuestion:false,
                    isResourceDescription:false
                };
        case SHOW_CREATE_RESOURCE_QUESTION:
            return {
                ...state,
                isResourceActivity:false,
                isResourceQuestion:true,
                isResourceDescription:false
            };
        case SHOW_CREATE_RESOURCE_DESCRIPTION:
            return {
                ...state,
                isResourceActivity:false,
                isResourceQuestion:false,
                isResourceDescription:true,
                editor:action.editor,
                editorType:action.editorType
            };
        case CREATE_RESOURCE:
            return {
                ...state,
                showCreateResourcePopup:false
            };   
        default:
            return state;
    }
};

export default resourceReducer;
