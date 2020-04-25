import axios from "axios";
import { SHOW_CREATE_RESOURCE_MODAL, HIDE_CREATE_RESOURCE_MODAL, SHOW_CREATE_RESOURCE_ACTIVITY, SHOW_CREATE_RESOURCE_QUESTION, SHOW_CREATE_RESOURCE_DESCRIPTION, CREATE_RESOURCE } from './../constants/actionTypes';

export const showCreateResourceModal = (id) => ({
    type: SHOW_CREATE_RESOURCE_MODAL,
    id
});

export const showCreateResourceModalAction = (id) => {
    return async dispatch => {
        try {
            dispatch(
                showCreateResourceModal(id)
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



export const createResource = (playlistId, id, title, editor, editorType) => ({
    type:CREATE_RESOURCE,
    playlistId,
    id,
    title,
    editor,
    editorType
});

export const createResourceAction = (playlistId, editor, editorType) => {
    return async dispatch => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'JWT fefege...'
              };
            const data = {
                playlistId:playlistId,
                library: window.h5peditorCopy.getLibrary(),
                parameters: JSON.stringify(window.h5peditorCopy.getParams()),
                action: 'create'
              };
            
            const response = await axios.post('http://localhost:8082/api/api/h5p/?api_token=test', data, {
                headers: headers
              })
              .then((response) => {
                let plists = [];
                if(localStorage.getItem("playlists")){
                    plists = JSON.parse(localStorage.getItem("playlists"));
                }
                let resource = response.data;
                // console.log(resource);
                
                
                plists.forEach((playlist, i)=>{
                    if(playlist.id === playlistId){
                        plists[i] = Object.assign( { 'resources':[] }, plists[i] );
                        plists[i].resources.push(resource);
                    }
                });
                
                
                localStorage.setItem("playlists", JSON.stringify(plists));
                dispatch(
                    createResource(playlistId, resource.id, resource.title, editor, editorType)
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