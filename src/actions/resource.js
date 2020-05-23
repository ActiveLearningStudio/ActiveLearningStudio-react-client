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
    DESCRIBE_ACTIVITY,
    UPLOAD_RESOURCE_THUMBNAIL,
    EDIT_RESOURCE,
    RESOURCE_VALIDATION_ERRORS
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
            { headers: { "Authorization": "Bearer " + token } }
        );

        if (response.data.status == "success") {
            const data = response.data.data;
            dispatch(loadResource(data.resource, data.previousResourceId, data.nextResourceId));
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
    type: SHOW_RESOURCE_ACTIVITY_TYPE
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
    type: SHOW_RESOURCE_SELECT_ACTIVITY,
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
    type: SHOW_RESOURCE_ACTIVITY_BUILD,
    editor,
    editorType,
    params
});

export const showBuildActivityAction = (editor = null, editorType = null, activityid = null) => {
    return async dispatch => {
        try {
            if (activityid) {
                const response = await axios.get(global.config.laravelAPIUrl + '/activity/' + activityid);
                
                let lib = response.data.data.library_name + " " + response.data.data.major_version + "." + response.data.data.minor_version;
                
                dispatch(
                    showBuildActivity(lib, response.data.data.type, response.data.data.h5p)
                )
            } else {
                dispatch(
                    showBuildActivity(editor, editorType, '')
                )
            }
        } catch (e) {
            throw new Error(e);
        }
    }
}



export const showDescribeActivity = (activity, metadata = null) => ({
    type: SHOW_RESOURCE_DESCRIBE_ACTIVITY,
    activity,
    metadata
});

export const showDescribeActivityAction = (activity, activityid = null) => {
    return async dispatch => {
        try {
            if (activityid) {
                const response = await axios.get(global.config.laravelAPIUrl + '/activity/' + activityid);
                let metadata = {
                    title:'',
                    subjectid:'',
                    educationlevelid:''
                };
                if(response.data.data.metadata != null){
                    metadata = response.data.data.metadata;
                }
                dispatch(
                    showDescribeActivity(activity, metadata)
                )
            } else {
                dispatch(
                    showDescribeActivity(activity)
                )
            }
            
        } catch (e) {
            throw new Error(e);
        }
    }
}

export const editResource = (playlistid, resource, editor, editorType) => ({
    type: EDIT_RESOURCE,
    playlistid,
    resource,
    editor,
    editorType
});

export const editResourceAction = (playlistid, editor, editorType, activityid, metadata) => {
    return async dispatch => {
        try {
            const { token } = JSON.parse(localStorage.getItem("auth"));
            const headers = {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            };

            // h5peditorCopy to be taken from h5papi/storage/h5p/laravel-h5p/js/laravel-h5p.js
            const data = {
                library: window.h5peditorCopy.getLibrary(),
                parameters: JSON.stringify(window.h5peditorCopy.getParams()),
                action: 'create'
            };

            const response = await axios.put(global.config.laravelAPIUrl + '/activity/' + activityid,
                {
                    playlistid: playlistid,
                    metadata:metadata,
                    action: 'create',
                    data
                }, {
                headers: headers
            });
            

            let resource = {};
            resource.id = response.data.data._id;

            dispatch(
                editResource(playlistid, resource, editor, editorType)
            )
        } catch (e) {
            throw new Error(e);
        }
    }
}

export const validationErrorsResource = () => ({
    type: RESOURCE_VALIDATION_ERRORS
});


export const createResource = (playlistid, resource, editor, editorType) => ({
    type: CREATE_RESOURCE,
    playlistid,
    resource,
    editor,
    editorType
});

export const createResourceAction = (playlistid, editor, editorType, metadata) => {
    return async dispatch => {
        try {
            const { token } = JSON.parse(localStorage.getItem("auth"));
            const headers = {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            };

            // h5peditorCopy to be taken from h5papi/storage/h5p/laravel-h5p/js/laravel-h5p.js
            const data = {
                playlistid: playlistid,
                library: window.h5peditorCopy.getLibrary(),
                parameters: JSON.stringify(window.h5peditorCopy.getParams()),
                action: 'create'
            };


            const inserted_h5p_resource = await axios.post(global.config.h5pAjaxUrl + '/api/h5p/?api_token=test', data, {
                headers: headers
            });


            if (!inserted_h5p_resource.data.fail) {
                let resource = inserted_h5p_resource.data;

                //insert into mongodb
                const inserted_resource = await axios.post(global.config.laravelAPIUrl + '/activity',
                    {
                        mysqlid: resource.id,
                        playlistid: playlistid,
                        metadata: metadata,
                        action: 'create'
                    }, {
                    headers: headers
                });

                resource.id = inserted_resource.data.data._id;
                resource.mysqlid = inserted_resource.data.data.mysqlid;

                dispatch(
                    createResource(playlistid, resource, editor, editorType)
                )
            } else {
                dispatch(
                    validationErrorsResource()
                )
            }

        } catch (e) {
            throw new Error(e);
        }
    }
}

export const createResourceByH5PUploadAction = (playlistid, editor, editorType, payload, metadata) => {
    return async dispatch => {
        try {
            const { token } = JSON.parse(localStorage.getItem("auth"));
            const formData = new FormData();
            formData.append('h5p_file', payload.h5pFile);
            formData.append('action', 'upload');
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Authorization": "Bearer " + token
                }
            }



            const response_upload = await axios.post(
                global.config.h5pAjaxUrl + '/api/h5p',
                formData,
                config
            );

            let data_upload = { ...response_upload.data };
            if (data_upload instanceof Object && "id" in data_upload) {
                //insert into mongodb
                const response_activity = await axios.post(global.config.laravelAPIUrl + '/activity',
                    {
                        mysqlid: data_upload.id,
                        playlistid: playlistid,
                        metadata: metadata,
                        action: 'create'
                    }, {
                    headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token }
                });
                let resource = { ...response_activity.data.data };
                resource.id = response_activity.data.data._id;
                resource.mysqlid = response_activity.data.data.mysqlid;

                dispatch(
                    createResource(playlistid, resource, editor, editorType)
                )

            } else {
                throw new Error(e);
            }
        } catch (e) {
            throw new Error(e);
        }
    }
}

export const previewResource = (id) => ({
    type: PREVIEW_RESOURCE,
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
    type: HIDE_PREVIEW_PLAYLIST_MODAL
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



// runs delete resource ajax

export const deleteResource = (resourceid) => ({
    type: DELETE_RESOURCE,
    resourceid
});

export const deleteResourceAction = (resourceid) => {
    return async dispatch => {
        try {
            const response = await axios.delete(
                `/api/activity/${resourceid}`,
                {
                    resourceid
                }
            );

            if (response.data.status == "success") {
                dispatch(
                    deleteResource(resourceid)
                );
            }

        } catch (e) {
            throw new Error(e);
        }
    }
}


// handles the actions when some activity type is switched inside activity type wizard

export const onChangeActivityType = (activityTypeId) => {
    return ({
        type: SELECT_ACTIVITY_TYPE,
        activityTypeId
    })
};

export const onChangeActivityTypeAction = (activityTypeId) => {
    return dispatch => {
        try {
            // let activityTypeId = activityTypeId;
            dispatch(
                onChangeActivityType(activityTypeId)
            )
        } catch (e) {
            throw new Error(e);
        }
    }
}

// handles the actions when some activity switched inside select activity wizard

export const onChangeActivity = (activity) => ({
    type: SELECT_ACTIVITY,
    activity
});

export const onChangeActivityAction = (activity) => {
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

// Metadata saving inside state when metadata form is submitted

export const onSubmitDescribeActivity = (metadata) => ({
    type: DESCRIBE_ACTIVITY,
    metadata
});

export const onSubmitDescribeActivityAction = (metadata) => {
    return dispatch => {
        try {
            dispatch(
                onSubmitDescribeActivity(metadata)
            )
        } catch (e) {
            console.log(e);
        }
    }
}


// uploads the thumbnail of resource

export const uploadResourceThumbnail = (thumb_url) => ({
    type: UPLOAD_RESOURCE_THUMBNAIL,
    thumb_url
});

export const uploadResourceThumbnailAction = (formData) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            return axios.post(
                global.config.laravelAPIUrl + '/post-upload-image',
                formData,
                config
            )
                .then((response) => {
                    dispatch(
                        uploadResourceThumbnail(response.data.data.guid)
                    )

                })
        } catch (e) {
            throw new Error(e);
        }
    }
}