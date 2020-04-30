import React from "react";
import { fadeIn } from 'react-animations';

import styled, { keyframes } from 'styled-components';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const fadeAnimation = keyframes `${fadeIn}`;

const FadeDiv = styled.div`
  animation: 0.5s ${fadeAnimation};
`;


const questions = [
  {
    text:'H5P.InteractiveVideo',
    h5pLib:'H5P.InteractiveVideo 1.21',
    type:'h5p',
    icon: '/images/multimedia-icon.png',
    overlayIcon:'/images/multimedia-icon-overlay.png',
    description:"Create vertically stacked expandable items"
  },
  {
    text:'Flash Cards',
    h5pLib:'H5P.Flashcards 1.5',
    type:'h5p',
    icon: '/images/multimedia-icon.png',
    overlayIcon:'/images/multimedia-icon-overlay.png',
    description:"Create vertically stacked expandable items"
  },
  {
    text:'Drag and Drop',
    h5pLib:'H5P.DragQuestion 1.13',
    type:'h5p',
    icon: '/images/multimedia-icon.png',
    overlayIcon:'/images/multimedia-icon-overlay.png',
    description:"Create vertically stacked expandable items"
  },
  {
    text:'Timeline',
    h5pLib:'H5P.Timeline 1.1',
    type:'h5p',
    icon: '/images/multimedia-icon.png',
    overlayIcon:'/images/multimedia-icon-overlay.png',
    description:"Create vertically stacked expandable items"
  },
  {
    text:'Drag and Drop',
    h5pLib:'H5P.DragQuestion 1.13',
    type:'h5p',
    icon: '/images/multimedia-icon.png',
    overlayIcon:'/images/multimedia-icon-overlay.png',
    description:"Create vertically stacked expandable items"
  },
  {
    text:'Accordion',
    h5pLib:'H5P.Accordion 1.0',
    type:'h5p',
    icon: '/images/multimedia-icon.png',
    overlayIcon:'/images/multimedia-icon-overlay.png',
    description:"Create vertically stacked expandable items"
  },
  {
    text:'Interactive Presentation',
    h5pLib:'H5P.CoursePresentation 1.21',
    type:'h5p',
    icon: '/images/multimedia-icon.png',
    overlayIcon:'/images/multimedia-icon-overlay.png',
    description:"Create vertically stacked expandable items"
  }
  
  
  
  
  
  
  // {
  //   text:'Multiple Choice',
  //   h5pLib:'H5P.MultiChoice 1.14',
  //   type:'h5p',
  //   icon: '/images/games-icon.png',
  //   overlayIcon:'/images/games-icon-overlay.png',
  //   description:"Create vertically stacked expandable items"
  // },
  // {
  //   text:'Post',
  //   h5pLib:'H5P.TrueFalse 1.6',
  //   type:'tinymce',
  //   icon: '/images/multimedia-icon.png',
  //   overlayIcon:'/images/multimedia-icon-overlay.png',
  //   description:"Create vertically stacked expandable items"
  // },
  // {
  //   text:'Audio',
  //   h5pLib:'H5P.Audio 1.4',
  //   type:'h5p',
  //   icon: '/images/question-icon.png',
  //   overlayIcon:'/images/question-icon-overlay.png',
  //   description:"Create vertically stacked expandable items"
  // },
  // {
  //   text:'Fill in the Blanks',
  //   h5pLib:'H5P.Blanks 1.12',
  //   type:'h5p',
  //   icon: '/images/share-icon.png',
  //   overlayIcon:'/images/share-icon-overlay.png',
  //   description:"Create vertically stacked expandable items"
  // },
  // {
  //   text:'Dialog Card',
  //   h5pLib:'H5P.Dialogcards 1.8',
  //   type:'h5p',
  //   icon: '/images/games-icon.png',
  //   overlayIcon:'/images/games-icon-overlay.png',
  //   description:"Create vertically stacked expandable items"
  // },
  // {
  //   text:'Drag Text',
  //   h5pLib:'H5P.DragText 1.8',
  //   type:'h5p',
  //   icon: '/images/question-icon.png',
  //   overlayIcon:'/images/question-icon-overlay.png',
  //   description:"Create vertically stacked expandable items"
  // },
  // {
  //   text:'Mark the words',
  //   h5pLib:'H5P.MarkTheWords 1.9',
  //   type:'h5p',
  //   icon: '/images/share-icon.png',
  //   overlayIcon:'/images/share-icon-overlay.png',
  //   description:"Create vertically stacked expandable items"
  // },
  
  // {
  //   text:'True/False',
  //   h5pLib:'H5P.TrueFalse 1.6',
  //   type:'h5p',
  //   icon: '/images/multimedia-icon.png',
  //   overlayIcon:'/images/multimedia-icon-overlay.png',
  //   description:"Create vertically stacked expandable items"
  // },
  

];

const addActiveClass = event => event.target.classList.add('active');

var defaultEditor = 'H5P.MultiChoice 1.14';
var defaultEditorType = 'h5p';
function editorQuestionChange(question){
  defaultEditor = question.h5pLib;
  defaultEditorType = question.type
}


  
function ResourceQuestion(props) {
  const questionsContent = questions.map((question, i)=>(
    <div className="col-md-3" key={i}>
      <label className="question-label">
      <input type="radio" name="editor_question" value={question.h5pLib} onChange={()=>{editorQuestionChange(question)}} />
        <div className="activity-item">
          <div className="activity-img">
            <img src={question.icon} className="activity-icon" />
            <img src={question.overlayIcon} className="overlay-activity-icon" />
          </div>
          <div className="activity-content">
            <span>
              {question.text}
            </span>
            <p>{question.description}</p>
          </div>
        </div>
      </label>
    </div>
  ));
  return (
    
    <div className="row">
      <div className="col-md-3">
        <div className="create-resource-sidebar">
          <div className="select-activity filled">
            <div className="activity-box">
              <div className="number-box ">
                  <span className="number">1</span>
              </div>
              <span className="bottom-vertical-line"></span>
            </div>
            <span className="name">Pick Activity Type</span>
          </div>
          <div className="select-question selected">
            <div className="question-box">
              <span className="top-vertical-line"></span>
              <div className="number-box ">
                  <span className="number">2</span>
              </div>
              <span className="bottom-vertical-line"></span>
            </div>
            <span className="name">Select Activity</span>
          </div>
          <div className="select-description">
            <div className="description-box">
              <span className="top-vertical-line"></span>
              <div className="number-box ">
                  <span className="number">3</span>
              </div>
            </div>
            <span className="name" onClick={()=>{props.selectDescriptionBox(defaultEditor, defaultEditorType)}}>Build Activity</span>
          </div>
          
        </div>
      </div>
      <div className="col-md-9">
        <div className="resource-question">
          <FadeDiv>
              <div className="row">
                <div className="col-md-12">
                  <h2 className="title">Select kind of question you want to create?</h2>
                </div>
              </div>
              <div className="row">
                {questionsContent}
              </div>
              <div className="col-md-12">
                <button onClick={()=>{props.selectDescriptionBox(defaultEditor, defaultEditorType)}} className="add-resource-continue-btn">Continue</button>
              </div>
              
          </FadeDiv>
      </div>
      </div>
    </div>
    
  );
}

export default ResourceQuestion;