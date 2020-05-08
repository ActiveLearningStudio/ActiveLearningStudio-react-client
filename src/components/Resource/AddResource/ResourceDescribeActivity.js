import React from "react";
import { connect } from "react-redux";
import { fadeIn } from 'react-animations';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import styled, { keyframes } from 'styled-components';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import AddResourceSidebar from "./AddResourceSidebar";
import { showBuildActivityAction } from "./../../../actions/resource";

import './AddResource.scss'

const fadeAnimation = keyframes`${fadeIn}`;

const FadeDiv = styled.div`
  animation: 0.5s ${fadeAnimation};
`;

const required = value => value ? undefined : '* Required'
const maxLength = max => value =>
  value && value.length > max ? `* Must be ${max} characters or less` : undefined
const maxLength80 = maxLength(80)


const renderMetaTitleInput = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label><h2>{label}</h2></label>
    <div>
      <input {...input} type={type} />
      {touched && ((error && <span className="validation-error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)



const addActiveClass = event => event.target.classList.add('active');

var defaultEditor = 'H5P.MultiChoice 1.14';
var defaultEditorType = 'h5p';
function editorQuestionChange(question) {
  defaultEditor = question.h5pLib;
  defaultEditorType = question.type
}


const onSubmit = async (values, dispatch, props) => {
  try {
    props.showBuildActivityAction(defaultEditor, defaultEditorType)
  } catch (e) {
    console.log(e.message);
  }

}


let ResourceDescribeActivity = (props) => {
  const { handleSubmit, load, pristine, reset, submitting } = props;
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
                <h2 className="title">Describe Activity:</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="describe-activity-wrapper">
                  <form className="meta-form" onSubmit={handleSubmit} autoComplete="off">
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
                      <div className="col-md-12">
                        <div className="upload-thumbnail">
                          <h2>Upload thumbnail</h2>
                          <label>
                            <input type="file" onChange={(e) => uploadThumb(e, props)} />
                            <span>Upload</span>
                          </label>


                          {/* {
                      props.project.thumbUrl ?
                        <div className="thumb-display">
                          <div className="thumb"><img src={props.project.thumbUrl} /></div>
                        </div>
                        :
                        null
                    } */}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="meta-subjects">
                          <Field
                            name="metaTitle"
                            component={renderMetaTitleInput}
                            type="text"
                            label="Subjects"
                            validate={[required]}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="meta-education-levels">
                          <Field
                            name="metaTitle"
                            component={renderMetaTitleInput}
                            type="text"
                            label="Education Level"
                            validate={[required]}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button type="submit" className="add-resource-continue-btn">Continue</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </FadeDiv>
        </div>
      </div>
    </div>

  );
}

ResourceDescribeActivity = reduxForm({
  form: 'createProjectForm',
  enableReinitialize: true,
  onSubmit
})(ResourceDescribeActivity)


const mapDispatchToProps = dispatch => ({
  showBuildActivityAction: (editor, editorType) => dispatch(showBuildActivityAction(editor, editorType)),
});

const mapStateToProps = (state) => {
  return {
    resource: state.resource
  };
}

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(ResourceDescribeActivity));