import React from "react";
import { connect } from "react-redux";
import { slideInRight } from 'react-animations';

import styled, { keyframes } from 'styled-components';
import { showCreateResourceActivityAction, showCreateResourceQuestionAction, showCreateResourceDescriptionAction } from "./../actions/resource";

import ResourceActivity from '../components/Resource/AddResource/ResourceActivity';
import ResourceQuestion from '../components/Resource/AddResource/ResourceQuestion';
import ResourceDescription from '../components/Resource/AddResource/ResourceDescription';

import { withRouter } from 'react-router-dom'
import H5PPreview from "./H5PPreview";
import CreateProjectPopup from "../components/CreateProjectPopup/CreateProjectPopup";


const bounceAnimation = keyframes `${slideInRight}`;

const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

export class NewResourcePage extends React.Component {
  constructor(props) {
    super(props);
    

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    //show activity content
    this.props.showCreateResourceActivity();
  }

  

  render() {
    return (
    
    <div className="resource-modal">
        <div className="modal fade right" id="createPlaylistModal"  role="dialog" aria-labelledby="createPlaylistModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                  
                      <BouncyDiv className="modal-content">
                        
                          <div className="modal-title">
                            <h1>
                              Create New Activity
                              <button type="button" className="close-btn" data-dismiss="modal" onClick={this.props.handleHideCreateResourceModal}>x</button>
                            </h1>
                            
                            <hr />
                          </div>
                          <div className="modal-body">
                            <div className='row'>
                              <div className="col-md-12"> 
                              {this.props.resource.isResourceActivity ?  
                                <ResourceActivity selectQuestionBox={this.props.showCreateResourceQuestion}  />  
                                : null  
                                }  
                                {this.props.resource.isResourceQuestion ?  
                                <ResourceQuestion  selectDescriptionBox={this.props.showCreateResourceDescription}  />  
                                : null  
                                }  
                                {this.props.resource.isResourceDescription ?  
                                <ResourceDescription {...this.props} />  
                                : null  
                                }
                                
                              </div>
                            </div>
                          </div>
                      </BouncyDiv>
                </div>
          </div>
    </div>
    
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showCreateResourceActivity: () => dispatch(showCreateResourceActivityAction()),
  showCreateResourceQuestion: () => dispatch(showCreateResourceQuestionAction()),
  showCreateResourceDescription: (editor, editorType) => dispatch(showCreateResourceDescriptionAction(editor, editorType)),
});

const mapStateToProps =(state) => {
  // console.log(state);
  return {
    resource: state.resource
  };
}


// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(NewResourcePage);

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(NewResourcePage));