import React from "react";
import { fadeIn } from 'react-animations';

import styled, { keyframes } from 'styled-components';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import EditorPage from "../../../containers/EditorPage";
import { TinyEditor } from "../../../containers/TinyEditor";

const fadeAnimation = keyframes `${fadeIn}`;

const FaceDiv = styled.div`
  animation: 1s ${fadeAnimation};
`;

function ResourceDescription(props) {
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
          <div className="select-question filled">
            <div className="question-box">
              <span className="top-vertical-line"></span>
              <div className="number-box ">
                  <span className="number">2</span>
              </div>
              <span className="bottom-vertical-line"></span>
            </div>
            <span className="name">Select Activity</span>
          </div>
          <div className="select-description selected">
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
              {props.resource.editorType == 'h5p' ?  
                <EditorPage {...props} />
                : null  
               }  
              
              {props.resource.editorType == 'tinymce' ?  
                <TinyEditor {...props} />
                : null  
                }  
              
              
          </FaceDiv>
      </div>
      </div>
    </div>
    
  );
}

export default ResourceDescription;