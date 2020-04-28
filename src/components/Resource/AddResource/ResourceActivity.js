import React from "react";
import { fadeIn } from 'react-animations';

import styled, { keyframes } from 'styled-components';

import './AddResource.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const fadeAnimation = keyframes `${fadeIn}`;

const FaceDiv = styled.div`
  animation: 1s ${fadeAnimation};
`;


const activities = [
  {
    id:1,
    title:'Games',
    icon: '/images/games-icon.png',
    overlayIcon:'/images/games-icon-overlay.png'
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

const addActiveClass = event => event.target.classList.add('active');

function ResourceActivity(props) {
  const activitiesContent = activities.map((activity, i)=>(
    <div className="col-md-3" key={i}>
      <label className="activity-label">
        <input type="radio" name="site_name"  />
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
        <div className="create-resource-sidebar">
          <div className="select-activity selected">
            <div className="activity-box">
              <div className="number-box ">
                  <span className="number">1</span>
              </div>
              <span className="bottom-vertical-line"></span>
            </div>
            <span className="name">Pick Activity Type</span>
          </div>
          <div className="select-question">
            <div className="question-box">
              <span className="top-vertical-line"></span>
              <div className="number-box ">
                  <span className="number">2</span>
              </div>
              <span className="bottom-vertical-line"></span>
            </div>
            <span className="name" onClick={props.selectQuestionBox}>Select Activity</span>
          </div>
          <div className="select-description">
            <div className="description-box">
              <span className="top-vertical-line"></span>
              <div className="number-box ">
                  <span className="number">3</span>
              </div>
            </div>
            <span className="name">Build Activity</span>
          </div>
          
        </div>
      </div>
      <div className="col-md-9">
        <div className="resource-activity">
          <FaceDiv>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title">Select kind of activity you want to create?</h2>
                <div className="activity-content">
                  <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  </p>
                </div>
              </div>
            </div>
              
              <div className="row">
                {activitiesContent}
                <div className="col-md-12">
                  <button onClick={props.selectQuestionBox} className="add-resource-continue-btn">Continue</button>
                </div>
              </div>
          </FaceDiv>
      </div>
      </div>
    </div>    
    
    
    
  );
}

export default ResourceActivity;