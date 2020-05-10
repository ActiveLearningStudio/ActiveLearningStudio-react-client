import React from "react";
import { fadeIn } from 'react-animations';
import { connect } from "react-redux";
import styled, { keyframes } from 'styled-components';

import {
  withRouter
} from "react-router-dom";
import EditorPage from "../../../containers/EditorPage";
import { TinyEditor } from "../../../containers/TinyEditor";
import AddResourceSidebar from "./AddResourceSidebar";

const fadeAnimation = keyframes `${fadeIn}`;

const FaceDiv = styled.div`
  animation: 1s ${fadeAnimation};
`;

const ResourceActivityBuild = (props) => {
  return (
    <div className="row">
      <div className="col-md-3">
      <AddResourceSidebar {...props} />
      </div>
      <div className="col-md-9">
        <div className="resource-activity">
          <FaceDiv>
              {props.resource.newResource.editorType == 'h5p' ?  
                <EditorPage {...props} />
                : null  
               }  
              
              {props.resource.newResource.editorType == 'tinymce' ?  
                <TinyEditor {...props} />
                : null  
                }  
              
              
              {props.editResourcePopup ?  
                <EditorPage {...props} />
                : null  
                }  
              
              
          </FaceDiv>
      </div>
      </div>
    </div>
    
  );
}




const mapDispatchToProps = dispatch => ({
});

const mapStateToProps =(state) => {
  return {
    resource: state.resource
  };
}

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(ResourceActivityBuild));