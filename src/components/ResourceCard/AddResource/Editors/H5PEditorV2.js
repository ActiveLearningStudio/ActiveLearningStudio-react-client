/* eslint-disable  */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { loadH5pSettingsActivity } from 'store/actions/resource';
import { Alert } from 'react-bootstrap';
import { createResourceAction, editResourceAction } from 'store/actions/resource';
import { createIndResourceAction } from 'store/actions/indActivities';
import { edith5pVideoActivity } from 'store/actions/videos';
import { editIndActivityItem } from 'store/actions/indActivities';
import Swal from 'sweetalert2';
const H5PEditor = (props) => {
  const {
    setOpenVideo,
    editVideo,
    playlistId,
    h5pLib,
    h5pLibType,
    formData,
    projectId,
    upload,
    loadH5pSettings,
    h5pParams,
    hide,
    editActivity,
    activityId,
    contentId,
    type,
    accountId,
    settingId,
    reverseType,
    submitForm,
    activityPreview,
    setisSubmitActivty,
  } = props;

  const uploadFile = useRef();
  let defaultState = 'create';
  if (upload) {
    defaultState = 'upload';
  }
  const dispatch = useDispatch();
  const [submitAction, setSubmitAction] = useState(defaultState);
  const [h5pFile, setH5pFile] = useState(null);

  const setH5pFileUpload = (e) => {
    setH5pFile(e.target.files[0]);
  };
  useEffect(() => {
    submitForm.current = submitResource;
  }, [formData]);

  useEffect(() => {
    if (h5pLib === 'H5P.BrightcoveInteractiveVideo 1.0') {
      let bcAccountId = accountId ? accountId : typeof editVideo === 'object' && editVideo.hasOwnProperty('brightcoveData') ? editVideo.brightcoveData.accountId : null;
      let apiSettingId = settingId ? settingId : typeof editVideo === 'object' && editVideo.hasOwnProperty('brightcoveData') ? editVideo.brightcoveData.apiSettingId : null;
      loadH5pSettings('H5P.BrightcoveInteractiveVideo 1.0', bcAccountId, apiSettingId);
    } else {
      loadH5pSettings();
    }
  }, [loadH5pSettings]);

  const onSubmitActionRadioChange = (e) => {
    setSubmitAction(e.currentTarget.value);
  };

  const formatSelectBoxData = (data) => {
    let ids = [];
    if (data.length > 0) {
      data?.map((datum) => {
        ids.push(datum.value);
      });
    }
    return ids;
  };

  const submitResource = async (event) => {
    const parameters = window.h5peditorCopy.getParams();

    formData.subject_id = formatSelectBoxData(formData.subject_id);
    formData.education_level_id = formatSelectBoxData(formData.education_level_id);
    formData.author_tag_id = formatSelectBoxData(formData.author_tag_id);
    const { metadata } = parameters;
    if (metadata?.title !== undefined) {
      if (editActivity) {
        dispatch(editResourceAction(playlistId, h5pLib, h5pLibType, activityId, { ...formData, title: metadata?.title || formData.title }, hide, projectId));
      } else if (editVideo) {
        if (activityPreview) {
          const h5pdata = {
            library: window.h5peditorCopy.getLibrary(),
            parameters: JSON.stringify(window.h5peditorCopy.getParams()),
            action: 'create',
          };
          await dispatch(
            editIndActivityItem(editVideo.id, {
              ...formData,
              organization_visibility_type_id: editVideo.organization_visibility_type_id || 1,
              data: h5pdata,
              type: 'h5p',
              content: 'place_holder',
              title: metadata?.title || formData.title,
            }),
          );
          setOpenVideo(false);
        } else {
          await dispatch(
            edith5pVideoActivity(editVideo.id, {
              ...formData,
              title: metadata?.title || formData.title,
            }),
          );
          setOpenVideo(false);
        }
      } else {
        const payload = {
          event,
          submitAction,
          h5pFile,
        };
        if (activityPreview) {
          dispatch(createIndResourceAction({ ...formData, title: metadata?.title || formData.title }, hide, accountId, settingId));
        } else {
          handleCreateResourceSubmit(playlistId, h5pLib, h5pLibType, payload, { ...formData, title: metadata?.title || formData.title }, projectId, hide, reverseType);
        }
      }
      delete window.H5PEditor; // Unset H5PEditor after saving the or editing the activity
    }
  };
  const handleCreateResourceSubmit = async (currentPlaylistId, editor, editorType, payload, formData, projectId, hide, reverseType) => {
    // try {

    if (payload.submitAction === 'create') {
      await dispatch(createResourceAction(currentPlaylistId, editor, editorType, formData, hide, type, accountId, settingId, reverseType));
      if (type === 'videoModal') {
        if (setOpenVideo) {
          setOpenVideo(false);
        }
      }
    }
  };
  if (h5pParams === '""') {
    return <></>;
  }

  return (
    <>
      <form method="POST" acceptCharset="UTF-8" className="form-horizontal" id="laravel-h5p-form">
        <div className="form-group" style={{ position: 'inherit' }}>
          <div className="col-md-9 col-md-offset-3" style={{ position: 'inherit' }}></div>
        </div>

        <input name="_token" type="hidden" value={process.env.REACT_APP_H5P_KEY} />
        <input type="hidden" name="library" id="laravel-h5p-library" value={h5pLib} />
        <input type="hidden" name="parameters" id="laravel-h5p-parameters" value={h5pParams || JSON.parse('{"params":{},"metadata":{}}')} />
        <input type="hidden" name="contentId" id="laravel-h5p-contentId" value={contentId} />
        <input type="hidden" name="brightcoveApiSettingId" id="laravel-h5p-brightcove-api-settingId" value={ settingId ? settingId : typeof editVideo === 'object' && editVideo.hasOwnProperty('brightcoveData') ? editVideo.brightcoveData.apiSettingId : null} />

        <fieldset>
          <div id="laravel-h5p-create" className="form-group ">
            <div className="col-md-12">
              <div>
                <div id="laravel-h5p-editor">
                  <br />
                  <Alert variant="primary">Loading ...</Alert>
                </div>
              </div>
            </div>
          </div>
          {upload && (
            <div className="form-group laravel-h5p-upload-container">
              <div className="col-md-12">
                <div className="drop-area">
                  <input
                    type="file"
                    name="h5p_file"
                    id="h5p-file"
                    className="laravel-h5p-upload form-control"
                    onChange={setH5pFileUpload}
                    ref={uploadFile}
                    style={{ cursor: 'pointer' }}
                    // style={{ display: 'none' }}
                  />
                  <div className="upload-holder">
                    <FontAwesomeIcon icon="file-upload" className="mr-2" />
                    <p>
                      Drag & Drop File or
                      <span>&nbsp;Browse to upload</span>
                    </p>
                    {!!h5pFile && (
                      <p>
                        Selected File:&nbsp;
                        {h5pFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="form-group methods option-choose-way" style={{ display: 'none' }}>
            <label className="control-label col-md-3">Method</label>
            <div className="col-md-6">
              <label className="radio-inline mr-4">
                <input type="radio" name="action" value="upload" className="laravel-h5p-type mr-2" checked={submitAction === 'upload'} onChange={onSubmitActionRadioChange} />
                Upload
              </label>

              <label className="radio-inline">
                <input type="radio" name="action" value="create" className="laravel-h5p-type mr-2" checked={submitAction === 'create'} onChange={onSubmitActionRadioChange} />
                Create
              </label>
            </div>
          </div>

          <div className="interactive-btns" style={{ marginTop: '20px' }}>
            <div className="cancel">
              <div
                className="backclosemodel"
                width="151px"
                secondary
                onClick={() => {
                  Swal.fire({
                    text: 'All changes will be lost if you don’t save them',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#084892',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Close it!',
                    allowOutsideClick: false,
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      hide();
                    }
                  });
                }}
              >
                Cancel
              </div>
            </div>
            <div className="save-close">
              <div
                className="saveclosemodel"
                onClick={() => {
                  submitResource();
                  if (!editVideo) {
                    if (setisSubmitActivty) {
                      setisSubmitActivty(true);
                    }
                  }
                }}
              >
                Save & Close
              </div>
              {/* <Buttons
              text="Save"
              width="97px"
              className="save-btn"
              onClick={() => {
                props.onHide();
                props.setSuccessMessage(true);
              }}
            /> */}
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};

H5PEditor.propTypes = {
  match: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  h5pLib: PropTypes.string,
  h5pParams: PropTypes.string,
  loadH5pSettings: PropTypes.func.isRequired,
  upload: PropTypes.bool.isRequired,
  layoutActviityH5p: PropTypes.string.isRequired,
};

H5PEditor.defaultProps = {
  h5pLib: '',
  h5pParams: '',
};

const mapDispatchToProps = (dispatch) => ({
  loadH5pSettings: (library, accountId, settingId) => dispatch(loadH5pSettingsActivity(library, accountId, settingId)),
});

export default withRouter(connect(null, mapDispatchToProps)(H5PEditor));
