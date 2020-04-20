import axios from "axios";
import { SHOW_CREATE_RESOURCE_MODAL, HIDE_CREATE_RESOURCE_MODAL, SHOW_CREATE_RESOURCE_ACTIVITY, SHOW_CREATE_RESOURCE_QUESTION, SHOW_CREATE_RESOURCE_DESCRIPTION, CREATE_RESOURCE } from './../constants/actionTypes';

export const showCreateResourceModal = () => ({
    type: SHOW_CREATE_RESOURCE_MODAL
});

export const showCreateResourceModalAction = () => {
    return async dispatch => {
        try {
            dispatch(
                showCreateResourceModal()
            )
        } catch (e) {
            throw new Error(e);
        }
    }
}

export const hideCreateResourceModal = () => ({
    type: HIDE_CREATE_RESOURCE_MODAL
});

export const hideCreateResourceModalAction = () => {
    return async dispatch => {
        try {
            dispatch(
                hideCreateResourceModal()
            )
        } catch (e) {
            throw new Error(e);
        }
    }
}



export const showCreateResourceActivity = () => ({
    type:SHOW_CREATE_RESOURCE_ACTIVITY
});

export const showCreateResourceActivityAction = () => {
    return async dispatch => {
        try {
            dispatch(
                showCreateResourceActivity()
            )
        } catch (e) {
            throw new Error(e);
        }
    }
}



export const showCreateResourceQuestion = () => ({
    type:SHOW_CREATE_RESOURCE_QUESTION
});

export const showCreateResourceQuestionAction = () => {
    return async dispatch => {
        try {
            dispatch(
                showCreateResourceQuestion()
            )
        } catch (e) {
            throw new Error(e);
        }
    }
}



export const showCreateResourceDescription = (editor, editorType) => ({
    type:SHOW_CREATE_RESOURCE_DESCRIPTION,
    editor,
    editorType
});

export const showCreateResourceDescriptionAction = (editor, editorType) => {
    return async dispatch => {
        try {
            dispatch(
                showCreateResourceDescription(editor, editorType)
            )
        } catch (e) {
            throw new Error(e);
        }
    }
}



export const createResource = (id, title, editor, editorType) => ({
    type:CREATE_RESOURCE,
    id,
    title,
    editor,
    editorType
});

export const createResourceAction = (editor, editorType) => {
    // console.log((editor));
    return async dispatch => {
        try {

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'JWT fefege...'
              };
            const data = {
                library: window.h5peditorCopy.getLibrary(),
                parameters: JSON.stringify(window.h5peditorCopy.getParams()),
                action: 'create'
              };
            
            const response = await axios.post('http://localhost:8082/api/api/h5p/?api_token=test', data, {
                headers: headers
              })
              .then((response) => {
                console.log(response)
                let plists = [];
                if(localStorage.getItem("playlists")){
                    plists = JSON.parse(localStorage.getItem("playlists"));
                }
                let resource = response.data;
                // console.log(resource);
                // plists[0].resources = [];
                plists[0] = Object.assign( { 'resources':[] }, plists[0] );
                plists[0].resources.push(resource);
                console.log(plists);
                
                localStorage.setItem("playlists", JSON.stringify(plists));
                dispatch(
                    createResource(resource.id, resource.title, editor, editorType)
                )
              })
              .catch((error) => {
                console.log(error);
              });

              
            
            
        } catch (e) {
            throw new Error(e);
        }
    }
}