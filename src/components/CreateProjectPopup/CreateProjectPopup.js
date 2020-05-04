import React, {useEffect, useCallback} from "react";
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import './CreateProjectPopup.scss'

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

function CreateProjectPopup(props) {
  //remoe popup when escape is pressed
  const escFunction = useCallback((event) => {
    if(event.keyCode === 27) {
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
        <form className="create-playlist-form" onSubmit={props.handleCreateProjectSubmit}>
          <div className="project-name">
            <h2>Enter Project Name</h2>
            <input type="text" name="projectName" onChange={props.onProjectNameChange} />
          </div>
          
          {/* <div className="available-teams">
            <h2>Enter Project Name</h2>
            <div className="teams">
              <label>
                <input type="radio" name="teams" />
                <span>Team Member 1</span>
              </label>
            </div>
          </div> */}
          {/* <div className="visibility-setting">
            <h2>visibility Setting</h2>
            <div className="visibility-switch">
              <label>
                <input type="radio" />
                <span>On</span>
              </label>
              <label>
                <input type="radio" />
                <span>Off</span>
              </label>
            </div>
          </div> */}
          <div className="upload-thumbnail">
            <h2>Upload thumbnail</h2>
            <label>
              <input type="file" onChange={props.uploadThumbnail} />
              <span>Upload</span>
            </label>
            
              {
                props.thumbUrl != "" ?
                <div className="thumb-display">
                  <div className="thumb"><img src={props.thumbUrl} /></div>
                </div>
                :
                null
              }
              <input type="hidden" name="thumb_url" value={props.thumbUrl} ref={props.inputRef} />
                
          </div>
          <div className="project-description">
            <h2>Program Description</h2>
            <textarea onChange={props.onProjectDescriptionChange}></textarea>
          </div>
          <div className="create-projct-template-wrapper">
            <button type="submit" className="create-project-submit-btn">Create Project</button>
            <button className="project-template-btn">Start With Template</button>
          </div>
        </form>
      </div>
    // </FaceDiv> 
  );
}

export default CreateProjectPopup;