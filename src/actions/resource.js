import axios from "axios";
import { SHOW_CREATE_RESOURCE_MODAL, HIDE_CREATE_RESOURCE_MODAL, SHOW_CREATE_RESOURCE_ACTIVITY, SHOW_CREATE_RESOURCE_QUESTION, SHOW_CREATE_RESOURCE_DESCRIPTION, CREATE_RESOURCE, PREVIEW_RESOURCE, HIDE_PREVIEW_PLAYLIST_MODAL } from './../constants/actionTypes';

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



export const createResource = (playlistid, resource, editor, editorType) => ({
    type:CREATE_RESOURCE,
    playlistid,
    resource,
    editor,
    editorType
});

export const createResourceAction = (playlistid, editor, editorType) => {
    return async dispatch => {
        try {
            const { token } = JSON.parse(localStorage.getItem("auth"));
            const headers = {
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+ token
              };
            const data = {
                playlistid:playlistid,
                library: window.h5peditorCopy.getLibrary(),
                parameters: JSON.stringify(window.h5peditorCopy.getParams()),
                action: 'create'
              };
            
            const response = await axios.post(global.config.h5pAjaxUrl+'/api/api/h5p/?api_token=test', data, {
                headers: headers
              })
              .then((response) => {
                
                // if(localStorage.getItem("playlists")){
                //     plists = JSON.parse(localStorage.getItem("playlists"));
                // }
                let resource = response.data;
                // console.log(resource);
                
                // let plists = [];
                // plists.forEach((playlist, i)=>{
                //     if(playlist.id === playlistid){
                //         plists[i] = Object.assign( { 'resources':[] }, plists[i] );
                //         plists[i].resources.push(resource);
                //     }
                // });
                
                
                // localStorage.setItem("playlists", JSON.stringify(plists));
                dispatch(
                    createResource(playlistid, resource, editor, editorType)
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

export const previewResource = (id) => ({
    type:PREVIEW_RESOURCE,
    id
});

export const previewResourceAction = (id) => {
    return async dispatch => {
        try {   
            dispatch(
                previewResource(id)
            )
            
        } catch (e) {
            throw new Error(e);
        }
    }
}



export const hidePreviewResourceModal = () => ({
    type:HIDE_PREVIEW_PLAYLIST_MODAL
  });
  
  export const hidePreviewResourceModalAction = () => {
    return async dispatch => {
      try {
        dispatch(
          hidePreviewResourceModal()
        )
      } catch (e) {
        throw new Error(e);
      }
    }
  }