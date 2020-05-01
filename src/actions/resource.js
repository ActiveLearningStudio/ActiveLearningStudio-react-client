import axios from "axios";
import { 
    SHOW_CREATE_RESOURCE_MODAL, 
    HIDE_CREATE_RESOURCE_MODAL, 
    SHOW_CREATE_RESOURCE_ACTIVITY, 
    SHOW_CREATE_RESOURCE_QUESTION, 
    SHOW_CREATE_RESOURCE_DESCRIPTION, 
    CREATE_RESOURCE, 
    PREVIEW_RESOURCE, 
    HIDE_PREVIEW_PLAYLIST_MODAL,
    LOAD_RESOURCE,
    DELETE_RESOURCE
} from './../constants/actionTypes';

export const loadResource = (resource) => ({
  type: LOAD_RESOURCE,
  resource: resource
});

export const loadResourceAction = (resourceId) => {
  return async dispatch => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    const response = await axios.post(
      '/api/loadresource',
      { resourceId },
      { headers: { "Authorization": "Bearer "+token } }
    );

    if(response.data.status == "success")
      dispatch( loadResource(response.data.data.resource) );
  };
};

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
            // insert into mysql
            const response = await axios.post(global.config.h5pAjaxUrl+'/api/h5p/?api_token=test', data, {
                headers: headers
              })
              .then((response) => {
                
                let resource = response.data;
                
                //insert into mongodb
                axios.post(global.config.laravelAPIUrl+'/activity',
                 {
                     mysqlid: resource.id,
                     playlistid:playlistid,
                     action: 'create'
                 }, {
                    headers: headers
                })
                .then((response) => {
                    
                    resource.id = response.data.data._id;
                    resource.mysqlid = response.data.data.mysqlid;
                    // resource.title = response.data.data._id;
                    
                    dispatch(
                        createResource(playlistid, resource, editor, editorType)
                    )
                })
                  .catch((error) => {
                    console.log(error);
                  });
                // dispatch(
                //     createResource(playlistid, resource, editor, editorType)
                // )
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


  


export const deleteResource = (resourceid) => ({
    type:DELETE_RESOURCE,
    resourceid
  }); 
  
  export const deleteResourceAction = (resourceid) => {
    return async dispatch => {
      try {
        const response = await axios.delete(
          //  `${process.env.REACT_APP_API_URL}/playlist/create`,
           `/api/activity/${resourceid}`,
           {
            resourceid
           }
         );
  
         if(response.data.status == "success") {
            dispatch(
                deleteResource(resourceid)
            );
         }
        
      } catch (e) {
        throw new Error(e);
      }
    }
  }
  
