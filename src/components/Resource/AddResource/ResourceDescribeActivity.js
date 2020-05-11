import React from "react";
import { connect } from "react-redux";
import { fadeIn } from 'react-animations';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import styled, { keyframes } from 'styled-components';
import DropdownList from 'react-widgets/lib/DropdownList'
import 'react-widgets/dist/css/react-widgets.css'

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



const renderMetaEducationLevelInput = ({ input, label, type, meta: { touched, error, warning } }) => (
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


const subjects = [ { subject: 'Arts', value: 'Arts' },
  { subject: 'Career & Technical Education', value: 'CareerTechnicalEducation' },
  { subject: 'Computer Science', value: 'ComputerScience' },
  { subject: 'Language Arts', value: 'LanguageArts' },
  { subject: 'Mathematics', value: 'Mathematics' },
  { subject: 'Science', value: 'Science' },
  { subject: 'Social Studies', value: 'SocialStudies' },
];


const educationLevels = [ 
  { name: 'Preschool (Ages 0-4)', value: '1' },
  { name: 'Kindergarten-Grade 2 (Ages 5-7)', value: '2' },
  { name: 'Grades 3-5 (Ages 8-10)', value: '3' },
  { name: 'Grades 6-8 (Ages 11-13)', value: '4' },
  { name: 'Grades 9-10 (Ages 14-16)', value: '5' },
  { name: 'Grades 11-12 (Ages 16-18)', value: '6' },
  { name: 'College & Beyond', value: '7' },
  { name: 'Professional Development', value: '8' },
  { name: 'Special Education', value: '9' },
];


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


                    {/* <div className="row">
                      <div className="col-md-12">
                        <div className="upload-thumbnail">
                          <h2>Upload thumbnail</h2>
                          <label>
                            <input type="file" onChange={(e) => uploadThumb(e, props)} />
                            <span>Upload</span>
                          </label>


                           {
                      props.project.thumbUrl ?
                        <div className="thumb-display">
                          <div className="thumb"><img src={props.project.thumbUrl} /></div>
                        </div>
                        :
                        null
                    } 
                        </div>
                      </div>
                    </div> */}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="meta-subjects">
                          <label><h2>Subject</h2></label>
                          <Field
                            name="metaSubject"
                            component={DropdownList}
                            data={subjects}
                            valueField="value"
                            textField="subject"/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="meta-education-levels">

                          <label><h2>Education Level</h2></label>
                          <Field
                            name="metaEducationLevels"
                            component={DropdownList}
                            data={educationLevels}
                            valueField="value"
                            textField="name"/>
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