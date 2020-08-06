import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { fadeIn } from "react-animations";
import { Field, reduxForm, formValueSelector } from "redux-form";
import styled, { keyframes } from "styled-components";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";
import { uploadResourceThumbnailAction } from "../../../actions/resource";
//import PexelsAPI from "../../models/pexels.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import AddResourceSidebar from "./AddResourceSidebar";
import {
  showBuildActivityAction,
  onSubmitDescribeActivityAction,
  showSelectActivity,
} from "./../../../actions/resource";

const fadeAnimation = keyframes`${fadeIn}`;

const FadeDiv = styled.div`
  animation: 0.5s ${fadeAnimation};
`;

const required = (value) => (value ? undefined : "* Required");
const maxLength = (max) => (value) =>
  value && value.length > max
    ? `* Must be ${max} characters or less`
    : undefined;
const maxLength80 = maxLength(80);

const renderMetaTitleInput = ({
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

export const uploadThumb = async (e, props) => {
  const formData = new FormData();
  try {
    formData.append("uploads", e.target.files[0]);
    imageValidation = "";
    await props.uploadResourceThumbnailAction(formData);
  } catch (e) {
    console.log(e);
  }
};

const subjects = [
  { subject: "Arts", value: "Arts" },
  {
    subject: "Career & Technical Education",
    value: "CareerTechnicalEducation",
  },
  { subject: "Computer Science", value: "ComputerScience" },
  { subject: "Language Arts", value: "LanguageArts" },
  { subject: "Mathematics", value: "Mathematics" },
  { subject: "Science", value: "Science" },
  { subject: "Social Studies", value: "SocialStudies" },
];

const educationLevels = [
  { name: "Preschool (Ages 0-4)", value: "1" },
  { name: "Kindergarten-Grade 2 (Ages 5-7)", value: "2" },
  { name: "Grades 3-5 (Ages 8-10)", value: "3" },
  { name: "Grades 6-8 (Ages 11-13)", value: "4" },
  { name: "Grades 9-10 (Ages 14-16)", value: "5" },
  { name: "Grades 11-12 (Ages 16-18)", value: "6" },
  { name: "College & Beyond", value: "7" },
  { name: "Professional Development", value: "8" },
  { name: "Special Education", value: "9" },
];

var imageValidation = "";

const onSubmit = async (values, dispatch, props) => {
  try {
    //image validation
    if (!props.resource.newResource.metadata.thumb_url) {
      imageValidation = "* Required";
      return false;
    }
    props.onSubmitDescribeActivityAction(values);
    props.showBuildActivityAction(
      props.resource.newResource.activity.h5pLib,
      props.resource.newResource.activity.type
    );
  } catch (e) {
    console.log(e.message);
  }
};

const renderMetaSubjects = ({ input, ...rest }) => (
  <DropdownList {...input} {...rest} />
);

const renderMetaEducationLevelInput = ({ input, ...rest }) => (
  <DropdownList {...input} {...rest} />
);

let ResourceDescribeActivity = (props) => {
  console.log(props);
  const [modalShow, setModalShow] = React.useState(false);
  const openfile = useRef();
  const {
    handleSubmit,
    metaSubject,
    load,
    pristine,
    reset,
    submitting,
  } = props;

  return (
    <div className="row">
      <div className="col-md-3">
        <AddResourceSidebar {...props} />
      </div>
      <div className="col-md-9">
        <div className="resource-question">
          <FadeDiv>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title">
                  <div className="back-button" onClick={props.goBacktoActivity}>
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    Back
                  </div>
                  Describe Activity:
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="describe-activity-wrapper">
                  <form
                    className="meta-form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <div className="flex-form-imag-upload">
                      <div className="upload-thumbnail check">
                        <h2>Upload thumbnail</h2>

                        <label>
                          <input
                            ref={openfile}
                            type="file"
                            onChange={(e) => uploadThumb(e, props)}
                            accept="image/x-png,image/jpeg"
                          />
                          <span>Upload</span>
                        </label>
                        <span className="validation-error">
                          {imageValidation}
                        </span>

                        {props.resource.progress}

                        {props.resource.newResource.metadata.thumb_url ? (
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
                            <div
                              className="thumb"
                              onClick={() => {
                                openfile.current.click();
                              }}
                            >
                              <img
                                src={
                                  global.config.laravelAPIUrl +
                                  props.resource.newResource.metadata.thumb_url
                                }
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="upload_placeholder">
                            {/* <div
                              onClick={() => setModalShow(true)}
                              className=" pexel"
                            >
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
                            </div> */}
                            <div
                              onClick={() => {
                                openfile.current.click();
                              }}
                              className=" gallery"
                            >
                              <i className="fa fa-image" />
                              {/* <p>Select from Gallery</p> */}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="leftdata">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="meta-title">
                              <Field
                                name="metaTitle"
                                component={renderMetaTitleInput}
                                type="text"
                                label="Title"
                                validate={[required]}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="meta-subjects">
                              <label>
                                <h2>Subject</h2>
                              </label>
                              <Field
                                name="metaSubject"
                                component={renderMetaSubjects}
                                data={subjects}
                                valueField="value"
                                textField="subject"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="meta-education-levels">
                              <label>
                                <h2>Education Level</h2>
                              </label>
                              <Field
                                name="metaEducationLevels"
                                component={renderMetaEducationLevelInput}
                                data={educationLevels}
                                valueField="value"
                                textField="name"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="add-resource-continue-btn"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </FadeDiv>
        </div>
      </div>
      {/* <PexelsAPI
        show={modalShow}
        resourceName={
          props.resource &&
          props.resource.newResource &&
          props.resource.newResource.activity &&
          props.resource.newResource.activity.title
        }
        searchName={
          props.resource &&
          props.resource.newResource &&
          props.resource.newResource.activity &&
          !!props.resource.newResource.activity.activity_thumbnail_text
            ? props.resource.newResource.activity.activity_thumbnail_text
            : props.resource.newResource.activity.title
        }
        onHide={() => setModalShow(false)}
      /> */}
    </div>
  );
};

ResourceDescribeActivity = reduxForm({
  form: "describeActivityForm",
  enableReinitialize: true,
  onSubmit,
})(ResourceDescribeActivity);

const mapDispatchToProps = (dispatch) => ({
  showBuildActivityAction: (editor, editorType) =>
    dispatch(showBuildActivityAction(editor, editorType)),
  onSubmitDescribeActivityAction: (metadata) =>
    dispatch(onSubmitDescribeActivityAction(metadata)),
  uploadResourceThumbnailAction: (formData) =>
    dispatch(uploadResourceThumbnailAction(formData)),
  goBacktoActivity: () => {
    dispatch(showSelectActivity());
  },
});

const mapStateToProps = (state) => {
  return {
    resource: state.resource,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceDescribeActivity)
);
