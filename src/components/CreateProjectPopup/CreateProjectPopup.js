import React, {useEffect, useCallback} from "react";
import axios from 'axios';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { createProjectAction, updateProjectAction, uploadThumbnailAction} from "../../actions/project";
import { withRouter } from "react-router-dom";

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

const required = value => value ? undefined : '* Required'
const maxLength = max => value =>
  value && value.length > max ? `* Must be ${max} characters or less` : undefined
const maxLength80 = maxLength(80)


const renderProjectNameInput = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label><h2>{label}</h2></label>
    <div>
      <input {...input}  type={type}/>
      {touched && ((error && <span className="validation-error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const renderProjectDescriptionInput = ({ input, label, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} ></textarea>
      {touched && ((error && <span className="validation-error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
const onSubmit = async (values, dispatch, props) => {
  try {
    // console.log(props.inputRef)
    if(props.editMode) {//update
      await dispatch(updateProjectAction(props.match.params.projectid, values.projectName, values.description, props.project.thumbUrl));
    } else { //create
      await dispatch(createProjectAction(values.projectName, values.description, props.project.thumbUrl));
    }
    
    props.history.push("/");
  } catch (e) {
    console.log(e.message);
  }
  // this.props.history.push("/");
  
}

export const uploadThumb = async (e, props) => {
  const formData = new FormData();
  try {
    formData.append('uploads',e.target.files[0]);
    
    await props.uploadThumbnailAction(formData);
  } catch(e){
    console.log(e);
  }
  

}
let CreateProjectPopup = props => {
  const { handleSubmit, load, pristine, reset, submitting } = props
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
        <form className="create-playlist-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="project-name">
            <Field
            name="projectName"
            component={renderProjectNameInput}
            type="text"
            label="Enter Project Name"
            validate={[ required, maxLength80 ]}
             />
            {/*
              props.project.selectedProject ?

              <Field
            name="projectName"
            component="input"
            type="text"
            placeholder="Project Name"
            value="abc"
          />
              // <input type="text" name=""  defaultValue={props.project.selectedProject.name} />
              :
              <>
              </>
              // <input type="text" name="projectName" onChange={props.onProjectNameChange}  />
            */}
            
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
              <input type="file" onChange={(e)=>uploadThumb(e, props)} />
              <span>Upload</span>
            </label>
            <p></p>
              {
                // props.project.selectedProject ?
                // <div className="thumb-display">
                //   <div className="thumb"><img src={props.project.selectedProject.thumb_url} /></div>
                // </div>
                // :
                // null
              }

{
                props.project.thumbUrl ?
                <div className="thumb-display">
                  <div className="thumb"><img src={props.project.thumbUrl} /></div>
                </div>
                :
                null
              }
              {/* <input type="hidden" name="thumb_url" value={props.thumbUrl} ref={props.inputRef} /> */}
          </div>
          <div className="project-description">
            <h2>Program Description</h2>
            <Field 
            name="description" 
            component={renderProjectDescriptionInput}
            validate={[ required]}/>
              
               {/* <textarea onChange={props.onProjectDescriptionChange}></textarea> */}
            
            
          </div>
          
          <div className="create-projct-template-wrapper">
            {
              props.editMode ?
              <button type="submit" className="create-project-submit-btn">Update Project</button>
              :
              <>
              <button type="submit" className="create-project-submit-btn">Create Project</button>
              <button className="project-template-btn">Start With Template</button>
              </>
            }
            
          </div>
        </form>
      </div>
    // </FaceDiv> 
  );
}



CreateProjectPopup = reduxForm({
  form: 'createProjectForm',
  enableReinitialize: true,
  onSubmit
})(CreateProjectPopup)


const mapDispatchToProps = dispatch => ({
  createProjectAction: (name, description, thumb_url) =>dispatch(createProjectAction(name, description, thumb_url)),
  updateProjectAction: (name, description, thumb_url) =>dispatch(updateProjectAction(projectid, name, description, thumb_url)),
  uploadThumbnailAction: (formData)=> dispatch(uploadThumbnailAction(formData))
  
})

const mapStateToProps = (state) => {
  return {
    initialValues: {
      projectName:(state.project.selectedProject)?state.project.selectedProject.name:null,
      description:(state.project.selectedProject)?state.project.selectedProject.description:null
    } // pull initial values from account reducer
  }
}

CreateProjectPopup = connect(
  mapStateToProps,
  mapDispatchToProps               // bind account loading action creator
)(CreateProjectPopup)



export default withRouter(CreateProjectPopup);