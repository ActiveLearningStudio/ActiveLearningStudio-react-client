/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { loadH5pSettingsActivity } from "store/actions/resource";
import { Alert } from "react-bootstrap";
import {
  createResourceAction,
  editResourceAction,
} from "store/actions/resource";
import Buttons from "utils/Buttons/buttons";

const H5PEditor = (props) => {
  const {
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
  } = props;

  const uploadFile = useRef();
  let defaultState = "create";
  if (upload) {
    defaultState = "upload";
  }
  const dispatch = useDispatch();
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
    const parameters = window.h5peditorCopy.getParams();
    const { metadata } = parameters;
    if (metadata.title !== undefined) {
      if (editActivity) {
        dispatch(
          editResourceAction(
            playlistId,
            h5pLib,
            h5pLibType,
            activityId,
            formData,
            hide
          )
        );
      } else {
        const payload = {
          event,
          submitAction,
          h5pFile,
        };
        handleCreateResourceSubmit(
          playlistId,
          h5pLib,
          h5pLibType,
          payload,
          formData,
          projectId,
          hide
        );
      }
    }
  };
  const handleCreateResourceSubmit = async (
    currentPlaylistId,
    editor,
    editorType,
    payload,
    formData,
    projectId,
    hide
  ) => {
    // try {
    if (payload.submitAction === "create") {
      await dispatch(
        createResourceAction(
          currentPlaylistId,
          editor,
          editorType,
          formData,
          hide
        )
      );
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
        <div className="form-group" style={{ position: "inherit" }}>
          <div
            className="col-md-9 col-md-offset-3"
            style={{ position: "inherit" }}
          ></div>
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
          value={h5pLib}
        />
        <input
          type="hidden"
          name="parameters"
          id="laravel-h5p-parameters"
          value={h5pParams || JSON.parse('{"params":{},"metadata":{}}')}
        />

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
                    style={{ cursor: "pointer" }}
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

          <div
            className="form-group methods option-choose-way"
            style={{ display: "none" }}
          >
            <label className="control-label col-md-3">Method</label>
            <div className="col-md-6">
              <label className="radio-inline mr-4">
                <input
                  type="radio"
                  name="action"
                  value="upload"
                  className="laravel-h5p-type mr-2"
                  checked={submitAction === "upload"}
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
                  checked={submitAction === "create"}
                  onChange={onSubmitActionRadioChange}
                />
                Create
              </label>
            </div>
          </div>

          <div className="interactive-btns" style={{ marginTop: "20px" }}>
            <div className="cancel">
              <Buttons
                text="Cancel"
                width="151px"
                secondary
                onClick={() => {
                  hide();
                }}
              />
            </div>
            <div className="save-close">
              <Buttons
                text="Create & Close"
                width="151px"
                primary
                onClick={() => {
                  submitResource();
                }}
              />
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
  h5pLib: "",
  h5pParams: "",
};

const mapDispatchToProps = (dispatch) => ({
  loadH5pSettings: () => dispatch(loadH5pSettingsActivity()),
});

export default withRouter(connect(null, mapDispatchToProps)(H5PEditor));
