import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
// import { fadeIn } from 'react-animations';
// import styled, { keyframes } from 'styled-components';

import {
  createProjectAction,
  updateProjectAction,
  uploadProjectThumbnailAction,
} from 'store/actions/project';

import './style.scss';

// const fadeAnimation = keyframes`${fadeIn}`;
// const FaceDiv = styled.div`
//   animation: 1s ${fadeAnimation};
// `;

const required = (value) => (value ? undefined : '* Required');
const maxLength = (max) => (value) => (value && value.length > max
  ? `* Must be ${max} characters or less`
  : undefined);
const maxLength80 = maxLength(80);

// TODO: need to restructure code, clean up attributes
// remove unused code,
const renderProjectNameInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>
      <h2>{label}</h2>
    </label>
    <div>
      <input {...input} type={type} />
      {touched
        && ((error && <span className="validation-error">{error}</span>)
          || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

renderProjectNameInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

const renderProjectDescriptionInput = ({
  input,
  label,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} />
      {touched
        && ((error && <span className="validation-error">{error}</span>)
          || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

renderProjectDescriptionInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

let imageValidation = '';

const onSubmit = async (values, dispatch, props) => {
  try {
    if (!props.project.thumbUrl) {
      imageValidation = '* Required';
      return false;
    }

    if (props.editMode) {
      // update
      await dispatch(
        updateProjectAction(
          props.match.params.projectId,
          values.projectName,
          values.description,
          props.project.thumbUrl,
        ),
      );
    } else {
      // create
      await dispatch(
        createProjectAction(
          values.projectName,
          values.description,
          props.project.thumbUrl,
        ),
      );
    }

    props.history.push('/');
  } catch (e) {
    console.log(e.message);
  }
};

export const uploadThumb = async (e, props) => {
  const formData = new FormData();
  try {
    formData.append('uploads', e.target.files[0]);

    imageValidation = '';
    await props.uploadProjectThumbnail(formData);
  } catch (err) {
    console.log(err);
  }
};

let CreateProjectPopup = (props) => {
  const {
    project,
    editMode,
    handleSubmit,
    handleHideCreatePlaylistModal,
  } = props;

  // remove popup when escape is pressed
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      handleHideCreatePlaylistModal(event);
    }
  }, [handleHideCreatePlaylistModal]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  return (
    <div className="create-program-wrapper">
      <form
        className="create-playlist-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="project-name">
          <Field
            name="projectName"
            component={renderProjectNameInput}
            type="text"
            label="Enter Project Name (Up to 80 characters)"
            validate={[required, maxLength80]}
          />
        </div>

        <div className="upload-thumbnail">
          {/* TODO: need to refactor */}
          <h2>
            {' '}
            <br />
            Upload thumbnail
          </h2>

          <label>
            <input
              type="file"
              onChange={(e) => uploadThumb(e, props)}
              accept="image/x-png,image/jpeg"
            />
            <span>Upload</span>
          </label>

          <p className="disclaimer">
            Project Image dimension should be
            {' '}
            <strong>290px width and 200px height.</strong>
          </p>

          <span className="validation-error">{imageValidation}</span>

          {project.progress}

          {project.thumbUrl ? (
            <div className="thumb-display">
              <div
                className="success"
                style={{
                  color: 'green',
                  marginBottom: '20px',
                  fontSize: '20px',
                }}
              >
                Image Uploaded:
              </div>
              <div className="thumb">
                <img src={global.config.laravelAPIUrl + project.thumbUrl} alt="" />
              </div>
            </div>
          ) : null}
        </div>

        <div className="project-description">
          {/* TODO: need to refactor */}
          <h2>
            {' '}
            <br />
            Program Description
          </h2>

          <Field
            name="description"
            component={renderProjectDescriptionInput}
            validate={[required]}
          />
        </div>

        <div className="create-project-template-wrapper">
          {editMode ? (
            <button type="submit" className="create-project-submit-btn">
              Update Project
            </button>
          ) : (
            <>
              <button type="submit" className="create-project-submit-btn">
                Create Project
              </button>
              {/* <button className="project-template-btn">Start With Template</button> */}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

CreateProjectPopup.propTypes = {
  project: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleHideCreatePlaylistModal: PropTypes.func.isRequired,
};

CreateProjectPopup = reduxForm({
  form: 'createProjectForm',
  enableReinitialize: true,
  onSubmit,
})(CreateProjectPopup);

const mapDispatchToProps = (dispatch) => ({
  createProject: (name, description, thumbUrl) => dispatch(createProjectAction(name, description, thumbUrl)),
  updateProject: (projectId, name, description, thumbUrl) => dispatch(
    updateProjectAction(projectId, name, description, thumbUrl),
  ),
  uploadProjectThumbnail: (formData) => dispatch(uploadProjectThumbnailAction(formData)),
});

const mapStateToProps = (state) => ({
  initialValues: {
    projectName: state.project.selectedProject
      ? state.project.selectedProject.name
      : null,
    description: state.project.selectedProject
      ? state.project.selectedProject.description
      : null,
  }, // pull initial values from account reducer
});

CreateProjectPopup = connect(
  mapStateToProps,
  mapDispatchToProps, // bind account loading action creator
)(CreateProjectPopup);

export default withRouter(CreateProjectPopup);
