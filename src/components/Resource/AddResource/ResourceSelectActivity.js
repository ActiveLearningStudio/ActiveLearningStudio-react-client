import React from "react";
import { fadeIn } from 'react-animations';
import { connect } from "react-redux";

import styled, { keyframes } from 'styled-components';
import { Field, reduxForm, formValueSelector } from 'redux-form'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import AddResourceSidebar from "./AddResourceSidebar";
import { showDescribeActivityAction } from "./../../../actions/resource";
import h5pLibraries from "../../../constants/h5pLibraries";

const fadeAnimation = keyframes `${fadeIn}`;

const FadeDiv = styled.div`
  animation: 0.5s ${fadeAnimation};
`;


const questions = h5pLibraries;

const addActiveClass = event => event.target.classList.add('active');


const onSubmit = async (values, dispatch, props) => {
  try {
    let data = values.activity;
    props.showDescribeActivityAction(data);
  } catch (e) {
    console.log(e.message);
  }

}
const required = (value) =>{
  return value ? undefined : '* Required';
} 

const renderResourceActivityType = ({ input, label, type, meta: { touched, error, warning } }) => (
  <>
      <input {...input} type={type} />
      {touched && ((error && <span className="validation-error">{error}</span>) || (warning && <span>{warning}</span>))}
  </>
)


// var defaultEditor = 'H5P.MultiChoice 1.14';
// var defaultEditorType = 'h5p';
// function editorQuestionChange(activity){
//   defaultEditor = activity.h5pLib;
//   defaultEditorType = activity.type
// }



  
let ResourceSelectActivity = (props) => {
  console.log(props);
  const { handleSubmit, load, pristine, reset, submitting } = props;
  const questionsContent = questions.map((activity, i)=>(
    <div className="col-md-3" key={i}>
      <label className="question-label">
        <Field
            name="activity"
            component={renderResourceActivityType}
            type="radio"
            value={activity.h5pLib}
            onChange={(e) => props.onChangeActivityAction(activity, e)}
            validate={[required]}
          />
        <div className="activity-item">
          <div className="activity-img" style={{backgroundImage:'url('+activity.icon+')'}}>
            {/* <img src={activity.icon} className="activity-icon" /> */}
            {/* <img src={activity.overlayIcon} className="overlay-activity-icon" /> */}
          </div>
          <div className="activity-content">
            <span>
              {activity.text}
            </span>
            <p>{activity.description}</p>
          </div>
        </div>
      </label>
    </div>
  ));
  return (
    
    <div className="row">
      <div className="col-md-3">
      <AddResourceSidebar {...props}/>
      </div>
      <div className="col-md-9">
        <div className="resource-question">
          <FadeDiv>
              <div className="row">
                <div className="col-md-12">
                  <h2 className="title">Select the activity you want to build from the options below:</h2>
                </div>
              </div>
              <div className="row">
                <form className="row meta-form" onSubmit={handleSubmit} autoComplete="off">
                  {questionsContent}
                  <div className="col-md-12">
                    <button type="submit" className="add-resource-continue-btn">Continue</button>
                  </div>
                </form>
              </div>
              
          </FadeDiv>
      </div>
      </div>
    </div>
    
  );
}

ResourceSelectActivity = reduxForm({
  form: 'SelectActivityForm',
  enableReinitialize: true,
  onSubmit
})(ResourceSelectActivity)


const mapDispatchToProps = dispatch => ({
  showDescribeActivityAction: (activity) => dispatch(showDescribeActivityAction(activity)),
});

const mapStateToProps =(state) => {
  return {
    resource: state.resource
  };
}

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(ResourceSelectActivity));