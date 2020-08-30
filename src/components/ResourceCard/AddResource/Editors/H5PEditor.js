/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { loadH5pSettings } from "store/actions/resource";

const H5PEditor = (props) => {
  const [submitAction, setSubmitAction] = useState("create");
  const [h5pFile, setH5pFile] = useState(null);

  const setH5pFileUpload = (e) => {
    setH5pFile({ h5pFile: e.target.files[0] });
  };

  useEffect(() => {
    props.loadH5pSettings();
  }, []);

  const onSubmitActionRadioChange = (e) => {
    setSubmitAction({ submitAction: e.currentTarget.value });
  };

  const submitResource = (event) => {
    event.preventDefault();

    if (0) {
      let payload = {
        event,
        submitAction: submitAction,
        h5pFile: h5pFile,
      };
      props.handleEditResourceSubmit(
        props.match.params.playlistid,
        props.resource.newResource.activity.h5pLib,
        props.resource.newResource.activity.h5pLibType,
        payload
      );
    } else if (submitAction === "upload" && h5pFile === null) {
    } else if (submitAction === "upload" && h5pFile !== null) {
      let file_arr = h5pFile.name.split(".");
      let file_extension =
        file_arr.length > 0 ? file_arr[file_arr.length - 1] : "";
      if (file_extension !== "h5p") {
      } else {
        let payload = {
          event,
          submitAction: submitAction,
          h5pFile: h5pFile,
        };
        props.handleCreateResourceSubmit(
          props.match.params.playlistid,
          props.resource.newResource.activity.h5pLib,
          props.resource.newResource.activity.h5pLibType,
          payload,
          props.resource.newResource.metadata
        );
      }
    } else if (submitAction === "create") {
      let payload = {
        event,
        submitAction: submitAction,
        h5pFile: h5pFile,
      };
      console.log(props.resource);
      if (true) {
        props.handleCreateResourceSubmit(
          props.match.params.playlistId,
          props.resource.newResource.activity.h5pLib,
          props.resource.newResource.activity.h5pLibType,
          payload,
          props.resource.newResource.metadata
        );
      }
    }
  };

  if (props.h5pParams == '""') {
    return <></>;
  }

  return (
    <>
      <form
        method="POST"
        action={global.config.h5pAjaxUrl + "/h5p"}
        accept-charset="UTF-8"
        className="form-horizontal"
        /*enctype="multipart/form-data"*/ id="laravel-h5p-form"
      >
        <input
          name="_token"
          type="hidden"
          value="B6TFsmFD5TLZaWCAYZ91ly0D2We0xjLAtRmBJzQT"
        />
        <input
          type="hidden"
          name="library"
          id="laravel-h5p-library"
          value={props.resource.newResource.activity.h5pLib}
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
          <div className="form-group laravel-h5p-upload-container">
            <label for="inputUpload" className="control-label col-md-3">
              Upload
            </label>
            <div className="col-md-12">
              <input
                type="file"
                name="h5p_file"
                id="h5p-file"
                className="laravel-h5p-upload form-control"
                onChange={(e) => setH5pFileUpload(e)}
              />
              <small className="h5p-disable-file-check helper-block">
                <label className="">
                  <input
                    type="checkbox"
                    name="h5p_disable_file_check"
                    id="h5p-disable-file-check"
                  />{" "}
                  Disable file extension check
                </label>
              </small>
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-md-3">Method</label>
            <div className="col-md-6">
              <label className="radio-inline">
                <input
                  type="radio"
                  name="action"
                  value="upload"
                  className="laravel-h5p-type"
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
                  className="laravel-h5p-type"
                  checked={submitAction === "create"}
                  onChange={onSubmitActionRadioChange}
                />
                Create
              </label>
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-9 col-md-offset-3">
              <button
                type="submit"
                className="add-resource-submit-btn"
                onClick={submitResource}
              >
                Finish
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
  editResourcePopup: PropTypes.bool.isRequired,
  h5pLib: PropTypes.string,
  h5pParams: PropTypes.string,
  handleCreateResourceSubmit: PropTypes.func.isRequired,
  handleEditResourceSubmit: PropTypes.func.isRequired,
  loadH5pSettings: PropTypes.func.isRequired,
};

H5PEditor.defaultProps = {
  h5pLib: "",
  h5pParams: "",
};
const mapDispatchToProps = (dispatch) => ({
  loadH5pSettings: () => dispatch(loadH5pSettings()),
});

export default withRouter(connect(null, mapDispatchToProps)(H5PEditor));
