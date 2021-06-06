/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { loadH5pSettingsActivity } from 'store/actions/resource';

const H5PEditor = (props) => {
  const {
    match,
    h5pParams,
    resource,
    loadH5pSettings,
    handleCreateResourceSubmit,
    upload,
  } = props;

  const uploadFile = useRef();
  let defaultState = 'create';
  if (upload) {
    defaultState = 'upload';
  }
  const [submitAction, setSubmitAction] = useState(defaultState);
  const [h5pFile, setH5pFile] = useState(null);

  const setH5pFileUpload = (e) => {
    setH5pFile(e.target.files[0]);
  };

  useEffect(() => {
    loadH5pSettings();
  }, [loadH5pSettings]);

  const onSubmitActionRadioChange = (e) => {
    setSubmitAction(e.currentTarget.value);
  };

  const submitResource = (event) => {
    event.preventDefault();
    if (submitAction === 'upload' && h5pFile === null) {
      return true;
    }
    if (submitAction === 'upload' && h5pFile !== null) {
      const fileArr = h5pFile.name.split('.');
      const fileExtension = fileArr.length > 0 ? fileArr[fileArr.length - 1] : '';
      if (fileExtension !== 'h5p') {
        Swal.fire('Invalid file selected, kindly select h5p file.');
        return true;
      }
      const payload = {
        event,
        submitAction,
        h5pFile,
      };
      handleCreateResourceSubmit(
        match.params.playlistId,
        resource.newResource.activity.h5pLib,
        resource.newResource.activity.h5pLibType,
        payload,
        resource.newResource.metadata,
        match.params.projectId,
      );
      return;
    }
    const parameters = window.h5peditorCopy.getParams();
    const { metadata } = parameters;
    if (metadata.title !== undefined) {
      // Swal.fire({
      //   title: 'New Activity',
      //   html: 'Please wait! While we create a brand new activity for you.',
      //   allowOutsideClick: false,
      //   onBeforeOpen: () => {
      //     Swal.showLoading();
      //   },
      // });
      if (submitAction === 'create') {
        const payload = {
          event,
          submitAction,
          h5pFile,
        };
        handleCreateResourceSubmit(
          match.params.playlistId,
          resource.newResource.activity.h5pLib,
          resource.newResource.activity.type,
          payload,
          resource.newResource.metadata,
          match.params.projectId,
          props,
        );
      }
    }
  };

  if (h5pParams === '""') {
    return <></>;
  }

  return (
    <>
      <form
        method="POST"
        acceptCharset="UTF-8"
        className="form-horizontal"
        id="laravel-h5p-form"
      >
        <div className="form-group" style={{ position: 'inherit' }}>
          <div className="col-md-9 col-md-offset-3" style={{ position: 'inherit' }}>
            {/* <button
              type="submit"
              className="add-resource-submit-btn top"
              onClick={submitResource}
            >
              Save & Exit
            </button> */}
          </div>
        </div>

        <input
          name="_token"
          type="hidden"
          value={process.env.REACT_APP_H5P_KEY}
        />
        <input
          type="hidden"
          name="library"
          id="laravel-h5p-library"
          value={resource.newResource.activity.h5pLib}
        />
        <input
          type="hidden"
          name="parameters"
          id="laravel-h5p-parameters"
          value={JSON.parse('{"params":{},"metadata":{}}')}
        />

        <fieldset>
          <div id="laravel-h5p-create" className="form-group ">
            <div className="col-md-12">
              <div>
                <div id="laravel-h5p-editor">Loading...</div>
              </div>
            </div>
          </div>
          {upload
          && (
            <div className="form-group laravel-h5p-upload-container">
              {/* <label htmlFor="inputUpload" className="control-label col-md-3">
                Upload
              </label> */}
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
                      <span>
                        &nbsp;Browse to upload
                      </span>
                    </p>
                    {!!h5pFile
                    && (
                      <p>
                        Selected File:&nbsp;
                        {h5pFile.name}
                      </p>
                    )}
                  </div>
                </div>
                {/* <small className="h5p-disable-file-check helper-block">
                  <label>
                    <input
                      type="checkbox"
                      className="mr-2"
                      name="h5p_disable_file_check"
                      id="h5p-disable-file-check"
                    />
                    Disable file extension check
                  </label>
                </small> */}
              </div>
            </div>
          )}

          <div className="form-group methods option-choose-way">
            <label className="control-label col-md-3">Method</label>
            <div className="col-md-6">
              <label className="radio-inline mr-4">
                <input
                  type="radio"
                  name="action"
                  value="upload"
                  className="laravel-h5p-type mr-2"
                  checked={submitAction === 'upload'}
                  onChange={onSubmitActionRadioChange}
                />
                Upload
              </label>

              <label className="radio-inline">
                <input
                  type="radio"
                  name="action"
                  value="create"
                  className="laravel-h5p-type mr-2"
                  checked={submitAction === 'create'}
                  onChange={onSubmitActionRadioChange}
                />
                Create
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-9 col-md-offset-3">
              <button
                // ref={submitButtonRef}
                type="submit"
                className="add-resource-submit-btn"
                onClick={submitResource}
              >
                Save & Exit
              </button>
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
  handleCreateResourceSubmit: PropTypes.func.isRequired,
  loadH5pSettings: PropTypes.func.isRequired,
  upload: PropTypes.bool.isRequired,
};

H5PEditor.defaultProps = {
  h5pLib: '',
  h5pParams: '',
};

const mapDispatchToProps = (dispatch) => ({
  loadH5pSettings: () => dispatch(loadH5pSettingsActivity()),
});

export default withRouter(connect(null, mapDispatchToProps)(H5PEditor));
