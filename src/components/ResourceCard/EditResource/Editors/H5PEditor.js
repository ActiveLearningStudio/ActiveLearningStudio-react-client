import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loadH5pSettingsActivity } from 'store/actions/resource';
import Swal from 'sweetalert2';

const H5PEditorEdit = (props) => {
  const {
    h5pParams,
    match,
    resource,
    loadH5pSettings,
    handleEditResourceSubmit,
  } = props;

  const [submitAction, setSubmitAction] = useState('create');
  // const [h5pFile, setH5pFile] = useState(null);
  useEffect(() => {
    loadH5pSettings();
  }, [loadH5pSettings]);

  const onSubmitActionRadioChange = (e) => {
    setSubmitAction(e.currentTarget.value);
  };

  const submitResource = (event) => {
    event.preventDefault();
    const parameters = window.h5peditorCopy.getParams();
    const { metadata } = parameters;
    if (metadata.title !== undefined) {
      Swal.fire({
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      handleEditResourceSubmit(
        match.params.playlistId,
        resource.editResource.h5pLib,
        resource.editResource.h5pLibType,
        match.params.activityId,
        resource.newResource.metadata,
      );
    }
  };

  if (h5pParams === '') {
    return (
      <>
      </>
    );
  }

  return (
    <form
      method="POST"
      acceptCharset="UTF-8"
      className="form-horizontal"
      id="laravel-h5p-form"
    >
      {/* <div className="form-group" style={{ position: 'inherit' }}>
        <div className="col-md-9 col-md-offset-3" style={{ position: 'inherit' }}>
          <button
            type="submit"
            className="add-resource-submit-btn top"
            onClick={submitResource}
          >
            Save & Exit
          </button>
        </div>
      </div> */}

      <input
        name="_token"
        type="hidden"
        value={process.env.REACT_APP_H5P_KEY}
      />
      <input
        type="hidden"
        name="library"
        id="laravel-h5p-library"
        value={resource.editResource.editor}
      />
      <input
        type="hidden"
        name="parameters"
        id="laravel-h5p-parameters"
        value={resource.editResource.params}
      />

      <fieldset>
        <div id="laravel-h5p-create" className="form-group ">
          <div className="col-md-12">
            <div>
              <div id="laravel-h5p-editor">Loading...</div>
            </div>
          </div>
        </div>

        <div className="form-group" style={{ display: 'none' }}>
          <label className="control-label col-md-3">Method</label>
          <div className="col-md-6">
            <label className="radio-inline">
              <input
                type="radio"
                name="action"
                value="upload"
                className="laravel-h5p-type"
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
                className="laravel-h5p-type"
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
  );
};

H5PEditorEdit.propTypes = {
  match: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  h5pParams: PropTypes.string,
  h5pLib: PropTypes.string,
  handleEditResourceSubmit: PropTypes.func.isRequired,
  loadH5pSettings: PropTypes.func.isRequired,
};

H5PEditorEdit.defaultProps = {
  h5pParams: '',
  h5pLib: '',
};

const mapStateToProps = (state) => ({
  resource: state.resource,
});

const mapDispatchToProps = (dispatch) => ({
  loadH5pSettings: () => dispatch(loadH5pSettingsActivity()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(H5PEditorEdit));
