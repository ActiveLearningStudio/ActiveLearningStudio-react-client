import React from "react";
import { connect } from "react-redux";
import { slideInRight } from 'react-animations';

import styled, { keyframes } from 'styled-components';
import { showCreateResourceActivityAction, showCreateResourceQuestionAction, showCreateResourceDescriptionAction } from "./../actions/resource";



import { withRouter } from 'react-router-dom'
import H5PPreview from "./H5PPreview";


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
                                Preview Resource
                                <button type="button" className="close-btn" data-dismiss="modal" onClick={this.props.hidePreviewResourceModalAction}>x</button>
                              </h1>
                              
                              <hr />
                            </div>
                            <div className="modal-body">
                              <div className='row'>
                                <div className="col-md-12">
                                <H5PPreview {...this.props}  /> 
                                  
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