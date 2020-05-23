import React, { useEffect, useCallback } from "react";
import { fadeIn } from 'react-animations';
import { connect } from "react-redux";
import styled, { keyframes } from 'styled-components';

import {
  withRouter
} from "react-router-dom";

import EditResourceSidebar from "./EditResourceSidebar";
import axios from "axios";
import { showBuildActivityAction } from "./../../../actions/resource";
import H5PEditor from "./Editors/H5PEditor";


const fadeAnimation = keyframes`${fadeIn}`;

const FaceDiv = styled.div`
  animation: 1s ${fadeAnimation};
`;




const ResourceActivityBuild = (props) => {
  console.log(props.resource);
  return (
    <div className="row">
      <div className="col-md-3">
        <EditResourceSidebar {...props} />
      </div>
      <div className="col-md-9">
        <div className="resource-activity">
          <FaceDiv>
            {/* {props.resource.newResource.activity.type == 'h5p' ?  
                <H5PEditor {...props} />
                : null  
               }   */}

            {/* {props.resource.newResource.activity.type == 'tinymce' ?  
                <TinyEditor {...props} />
                : null  
                }   */}



            {props.resource.editResource.params.data != '' ?
              <H5PEditor {...props}
                h5pParams={JSON.stringify(props.resource.editResource.params)}
                h5pLib={props.resource.editResource.editor}
              />
              :
              <h3>Loading...</h3>
            }


          </FaceDiv>
        </div>
      </div>
    </div>

  );
}




const mapDispatchToProps = dispatch => ({

});

const mapStateToProps = (state) => {
  return {
    resource: state.resource
  };
}

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(ResourceActivityBuild));