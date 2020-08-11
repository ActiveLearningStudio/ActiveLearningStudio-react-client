import React, { useEffect, useRef, useCallback } from "react";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import PexelsAPI from "../models/pexels.js";
import bgimg from "../../images/thumb-des.png";
import computer from "../../images/computer.svg";

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
      //imageValidation = "* Required";
      //return false;
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
        !!props.project.thumb_url
          ? createProjectAction(
              values.projectName,
              values.description,
              props.project.thumb_url
            )
          : createProjectAction(
              values.projectName,
              values.description,
              "https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280"
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
  const [modalShow, setModalShow] = React.useState(false);
  const openfile = useRef();
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
      <PexelsAPI
        show={modalShow}
        project={true}
        onHide={() => {
          setModalShow(false);
        }}
        // resourceName={
        //   props.resource &&
        //   props.resource.newResource &&
        //   props.resource.newResource.activity &&
        //   props.resource.newResource.activity.title
        // }
        // searchName={
        //   props.resource &&
        //   props.resource.newResource &&
        //   props.resource.newResource.activity &&
        //   !!props.resource.newResource.activity.activity_thumbnail_text
        //     ? props.resource.newResource.activity.activity_thumbnail_text
        //     : props.resource.newResource.activity.title
        // }
      ></PexelsAPI>
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

        <div className="upload-thumbnail check">
          <div className="upload_placeholder">
            {/* <h2>
              {" "}
              <br />
              Upload thumbnail
            </h2> */}
            <label style={{ display: "none" }}>
              <input
                ref={openfile}
                type="file"
                onChange={(e) => uploadThumb(e, props)}
                accept="image/x-png,image/jpeg"
              />
              <span>Upload</span>
            </label>

            <span className="validation-error">{imageValidation}</span>

            <div>
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
                  <div className="imgbox">
                    {props.project.thumb_url.includes("pexels.com") ? (
                      <img src={props.project.thumb_url} />
                    ) : (
                      <img
                        src={
                          global.config.laravelAPIUrl + props.project.thumb_url
                        }
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="new-box">
                  <h2>Default Selected thumbnail</h2>
                  <div class="imgbox">
                    <img
                      src={
                        "https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280"
                      }
                      alt=""
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="button-flex">
              <h2>Change thumbnail from below options</h2>
              <div onClick={() => setModalShow(true)} className=" pexel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  height="32px"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M2 0h28a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"
                    fill="#05A081"
                  ></path>
                  <path
                    d="M13 21h3.863v-3.752h1.167a3.124 3.124 0 1 0 0-6.248H13v10zm5.863 2H11V9h7.03a5.124 5.124 0 0 1 .833 10.18V23z"
                    fill="#fff"
                  ></path>
                </svg>
                <p>Select from Pexels</p>
              </div>
              <div
                onClick={() => {
                  openfile.current.click();
                }}
                className=" gallery"
              >
                <img src={computer} alt="" />
                <p>Upload a Photo From your computer</p>
              </div>
            </div>
          </div>
          <br />
          <p className="descliamer">
            Project Image dimension should be{" "}
            <strong>290px width and 200px height.</strong>
          </p>
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
  uploadProjectThumbnail: (img) => dispatch(uploadProjectThumbnail(img)),
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
