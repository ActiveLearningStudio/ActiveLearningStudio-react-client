import React from "react";
import { connect } from "react-redux";
import { fadeIn } from 'react-animations';

import styled, { keyframes } from 'styled-components';


import { Field, reduxForm, formValueSelector } from 'redux-form'


import { showSelectActivityAction } from "./../../../actions/resource";

import './AddResource.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter 
} from "react-router-dom";
import AddResourceSidebar from "./AddResourceSidebar";

const fadeAnimation = keyframes `${fadeIn}`;

const FaceDiv = styled.div`
  animation: 1s ${fadeAnimation};
`;


const activities = [
  {
    id:1,
    title:'Interactive',
    icon: '/images/course-presentation.png',
    overlayIcon:'/images/course-presentation-overlay.png'
  },
  {
    id:2,
    title:'Multimedia',
    icon: '/images/multimedia-icon.png',
    overlayIcon:'/images/multimedia-icon-overlay.png'
  },
  {
    id:3,
    title:'Questions',
    icon: '/images/question-icon.png',
    overlayIcon:'/images/question-icon-overlay.png'
  },
  {
    id:4,
    title:'Social Media',
    icon: '/images/share-icon.png',
    overlayIcon:'/images/share-icon-overlay.png'
  }
];



const onSubmit = async (values, dispatch, props) => {
  try {
    let data = values.activityType;
    props.showSelectActivityAction(data);
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

let ResourceActivityType = (props, showSelectActivityAction)=> {
  const { handleSubmit, load, pristine, reset, submitting } = props;
  const activitiesContent = activities.map((activity, i)=>(
    <div className="col-md-3" key={i}>
      <label className="activity-label">
        
        <Field
            name="activityType"
            component={renderResourceActivityType}
            type="radio"
            value={""+activity.id}
            onChange= {props.onChangeActivityTypeAction}
            validate={[required]}
          />

        
        <div className="activity-item">
          <div className="activity-img">
            <img src={activity.icon} className="activity-icon" />
            <img src={activity.overlayIcon} className="overlay-activity-icon" />
          </div>
          <div className="activity-content">
            <span>
              {activity.title}
            </span>
          </div>
        </div>
      </label>
    </div>
  ));
  
  return (
    <div className="row">
      <div className="col-md-3">
        <AddResourceSidebar {...props} />
      </div>
      <div className="col-md-9">
        <div className="resource-activity">
          <FaceDiv>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title">Select the type of activity you want to create?</h2>
                <div className="activity-content">
                  <p>
                    Create memorable learning experiences from one of the activity types below:
                  </p>
                </div>
              </div>
            </div>
              
              
            <form className="row meta-form" onSubmit={handleSubmit} autoComplete="off">
              {activitiesContent}
              <div className="row">
                <div className="col-md-12">
                  <button type="submit" className="add-resource-continue-btn">Continue</button>
                </div>
              </div>
            </form>
              
          </FaceDiv>
      </div>
      </div>
    </div>    
    
    
    
  );
}

ResourceActivityType = reduxForm({
  form: 'activityTypeForm',
  enableReinitialize: true,
  onSubmit
})(ResourceActivityType)

const mapDispatchToProps = dispatch => ({
  showSelectActivityAction: (activityType) => dispatch(showSelectActivityAction(activityType)),
});

const mapStateToProps =(state) => {
  return {
    resource: state.resource
  };
}




export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(ResourceActivityType));