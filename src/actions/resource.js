import axios from "axios";
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
    DELETE_RESOURCE,
    SHOW_RESOURCE_DESCRIBE_ACTIVITY,
    SELECT_ACTIVITY_TYPE,
    SELECT_ACTIVITY,
    DESCRIBE_ACTIVITY
} from './../constants/actionTypes';

export const loadResource = (resource, previous, next) => ({
  type: LOAD_RESOURCE,
  resource: resource,
  previousResourceId: previous,
  nextResourceId: next,
});

// Returns the requested resource along the next and previous one in the playlist
export const loadResourceAction = (resourceId) => {
  return async dispatch => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    const response = await axios.post(
      '/api/loadresource',
      { resourceId },
      { headers: { "Authorization": "Bearer "+token } }
    );

    if(response.data.status == "success"){
        const data = response.data.data;
        dispatch( loadResource(data.resource, data.previousResourceId, data.nextResourceId) );
    }
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
    type:SHOW_RESOURCE_ACTIVITY_TYPE
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



export const showSelectActivity = (activityType) => ({
    type:SHOW_RESOURCE_SELECT_ACTIVITY,
    activityType
});

export const showSelectActivityAction = (activityType) => {
    return async dispatch => {
        try {
            dispatch(
                showSelectActivity(activityType)
            )
        } catch (e) {
            throw new Error(e);
        }
    }
}



export const showBuildActivity = (editor, editorType, params) => ({
    type:SHOW_RESOURCE_ACTIVITY_BUILD,
    editor,
    editorType,
    params
});

export const showBuildActivityAction = (editor, editorType) => {
    return async dispatch => {
        try {
            axios.get(global.config.h5pAjaxUrl+'/h5p/content-params/47')
            .then((params) => {
               dispatch(
                    showBuildActivity(editor, editorType, params)
                )
               
               
            });
            
        } catch (e) {
            throw new Error(e);
        }
    }
}



export const showDescribeActivity = (activity) => ({
    type:SHOW_RESOURCE_DESCRIBE_ACTIVITY,
    activity
});

export const showDescribeActivityAction = (activity) => {
    return async dispatch => {
        try {
            dispatch(
                showDescribeActivity(activity)
            )
        } catch (e) {
            throw new Error(e);
        }
    }
}



export const editResource = (playlistid, resource, editor, editorType) => ({
    type:EDIT_RESOURCE,
    playlistid,
    resource,
    editor,
    editorType
});

export const editResourceAction = (playlistid, editor, editorType) => {
    return async dispatch => {
        try {
            const { token } = JSON.parse(localStorage.getItem("auth"));
            const headers = {
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+ token
              };

            // h5peditorCopy to be taken from h5papi/storage/h5p/laravel-h5p/js/laravel-h5p.js
            // alert(JSON.stringify(window.h5peditorCopy.getParams()));
            const data = {
                // playlistid:playlistid,
                library: window.h5peditorCopy.getLibrary(),
                parameters: JSON.stringify(window.h5peditorCopy.getParams()),
                action: 'create'
              };
            // insert into mysql
            const response = await axios.patch(global.config.h5pAjaxUrl+'/api/h5p/47', data, {
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




export const createResource = (playlistid, resource, editor, editorType) => ({
    type:CREATE_RESOURCE,
    playlistid,
    resource,
    editor,
    editorType
});

export const createResourceAction = (playlistid, editor, editorType, metaData) => {
    alert(metaData);
    return async dispatch => {
        try {
            const { token } = JSON.parse(localStorage.getItem("auth"));
            const headers = {
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+ token
              };

            // h5peditorCopy to be taken from h5papi/storage/h5p/laravel-h5p/js/laravel-h5p.js
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
                     metaData: metaData,
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

export const createResourceByH5PUploadAction = (playlistid, editor, editorType, payload) => {   
    return async dispatch => {
        try {
            const { token } = JSON.parse(localStorage.getItem("auth"));
            const formData = new FormData();
            formData.append('h5p_file',payload.h5pFile);
            formData.append('action', 'upload');
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Authorization": "Bearer "+ token
                }
            }
            return axios.post(
                global.config.h5pAjaxUrl +'/api/h5p',
                formData,
                config
            )
            .then((response_upload) => {
                let data_upload = {...response_upload.data};                
                if(data_upload instanceof Object && "id" in data_upload){                    
                    //insert into mongodb
                    axios.post(global.config.laravelAPIUrl+'/activity',
                        {
                            mysqlid: data_upload.id,
                            playlistid:playlistid,
                            action: 'create'
                        }, {
                        headers: {'Content-Type': 'application/json',"Authorization": "Bearer "+ token}})
                    .then((response_activity) => {
                        
                        
                        let resource = {...response_activity.data.data};                        
                        resource.id = response_activity.data.data._id;
                        resource.mysqlid = response_activity.data.data.mysqlid;
                        // resource.title = response.data.data._id;                        
                        dispatch(
                            createResource(playlistid, resource, editor, editorType)
                        )
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                }else{
                    throw new Error(e);
                }                                
            });
            
        }catch(e){
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
  



export const onChangeActivityType = (activityTypeId) => {
    return ({
    type:SELECT_ACTIVITY_TYPE,
    activityTypeId
})};

export const onChangeActivityTypeAction = (e) => {
    return dispatch => {
        try {
            let activityTypeId = e.target.value;
            dispatch(
                onChangeActivityType(activityTypeId)
            )
        } catch (e) {
            throw new Error(e);
        }
    }
}


export const onChangeActivity = (activity) => ({
    type:SELECT_ACTIVITY,
    activity
});

export const onChangeActivityAction = ( activity, e) => {
    return dispatch => {
        try {
            dispatch(
                onChangeActivity(activity)
            )
        } catch (e) {
            console.log(e);
        }
    }
}


export const onSubmitDescribeActivity = (metaData) => ({
    type:DESCRIBE_ACTIVITY,
    metaData
});

export const onSubmitDescribeActivityAction = ( metaData ) => {
    return dispatch => {
        try {
            dispatch(
                onSubmitDescribeActivity(metaData)
            )
        } catch (e) {
            console.log(e);
        }
    }
}
