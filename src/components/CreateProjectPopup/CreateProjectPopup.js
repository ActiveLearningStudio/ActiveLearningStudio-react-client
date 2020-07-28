import React, { useEffect, useCallback } from "react";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import {
  createProjectAction,
  updateProjectAction,
  uploadProjectThumbnailAction,
} from "../../actions/project";
import { withRouter } from "react-router-dom";

import "./CreateProjectPopup.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const fadeAnimation = keyframes`${fadeIn}`;

const FaceDiv = styled.div`
  animation: 1s ${fadeAnimation};
`;

const required = (value) => (value ? undefined : "* Required");
const maxLength = (max) => (value) =>
  value && value.length > max
    ? `* Must be ${max} characters or less`
    : undefined;
const maxLength80 = maxLength(80);

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
      {touched &&
        ((error && <span className="validation-error">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderProjectDescriptionInput = ({
  input,
  label,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input}></textarea>
      {touched &&
        ((error && <span className="validation-error">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
var imageValidation = "";

const onSubmit = async (values, dispatch, props) => {
  try {
    if (!props.project.thumb_url) {
      imageValidation = "* Required";
      return false;
    }
    if (props.editMode) {
      //update
      await dispatch(
        updateProjectAction(
          props.match.params.projectid,
          values.projectName,
          values.description,
          props.project.thumb_url
        )
      );
    } else {
      //create
      await dispatch(
        createProjectAction(
          values.projectName,
          values.description,
          props.project.thumb_url
        )
      );
    }

    props.history.push("/");
  } catch (e) {
    console.log(e.message);
  }
};

export const uploadThumb = async (e, props) => {
  const formData = new FormData();
  try {
    formData.append("uploads", e.target.files[0]);

    imageValidation = "";
    await props.uploadProjectThumbnailAction(formData);
  } catch (e) {
    console.log(e);
  }
};

let CreateProjectPopup = (props) => {
  const { handleSubmit, load, pristine, reset, submitting } = props;
  //remoe popup when escape is pressed
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      props.handleHideCreatePlaylistModal(event);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    // <FaceDiv className='popup'>
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
          <h2>
            {" "}
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
          <p className="descliamer">
            Project Image dimension should be{" "}
            <strong>290px width and 200px height.</strong>
          </p>
          <span className="validation-error">{imageValidation}</span>

          {props.project.progress}

          {props.project.thumb_url ? (
            <div className="thumb-display">
              <div
                className="success"
                style={{
                  color: "green",
                  marginBottom: "20px",
                  fontSize: "20px",
                }}
              >
                Image Uploaded:
              </div>
              <div className="thumb">
                <img
                  src={global.config.laravelAPIUrl + props.project.thumb_url}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="project-description">
          <h2>
            {" "}
            <br />
            Program Description
          </h2>
          <Field
            name="description"
            component={renderProjectDescriptionInput}
            validate={[required]}
          />
        </div>

        <div className="create-projct-template-wrapper">
          {props.editMode ? (
            <button type="submit" className="create-project-submit-btn">
              Update Project
            </button>
          ) : (
            <>
              <button type="submit" className="create-project-submit-btn">
                Create Project
              </button>
              {/* <button className="project-template-btn">Start With Template</button>
               */}
            </>
          )}
        </div>
      </form>
    </div>
    // </FaceDiv>
  );
};

CreateProjectPopup = reduxForm({
  form: "createProjectForm",
  enableReinitialize: true,
  onSubmit,
})(CreateProjectPopup);

const mapDispatchToProps = (dispatch) => ({
  createProjectAction: (name, description, thumb_url) =>
    dispatch(createProjectAction(name, description, thumb_url)),
  updateProjectAction: (projectid, name, description, thumb_url) =>
    dispatch(updateProjectAction(projectid, name, description, thumb_url)),
  uploadProjectThumbnailAction: (formData) =>
    dispatch(uploadProjectThumbnailAction(formData)),
});

const mapStateToProps = (state) => {
  return {
    initialValues: {
      projectName: state.project.selectedProject
        ? state.project.selectedProject.name
        : null,
      description: state.project.selectedProject
        ? state.project.selectedProject.description
        : null,
    }, // pull initial values from account reducer
  };
};

CreateProjectPopup = connect(
  mapStateToProps,
  mapDispatchToProps // bind account loading action creator
)(CreateProjectPopup);

export default withRouter(CreateProjectPopup);
