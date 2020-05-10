import React from "react";
import { connect } from "react-redux";
import { slideInRight } from 'react-animations';

import styled, { keyframes } from 'styled-components';
import { showCreateResourceActivityAction } from "./../actions/resource";

import ResourceActivityType from '../components/Resource/AddResource/ResourceActivityType';
import ResourceSelectActivity from '../components/Resource/AddResource/ResourceSelectActivity';
import ResourceDescribeActivity from '../components/Resource/AddResource/ResourceDescribeActivity';
import ResourceActivityBuild from '../components/Resource/AddResource/ResourceActivityBuild';


import { withRouter } from 'react-router-dom'



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
                              
                                { this.props.resource.isResourceActivityType && !this.props.editResourcePopup ?  
                                  <ResourceActivityType {...this.props}  />  
                                : null  
                                }  
                                { this.props.resource.isResourceSelectActivity && !this.props.editResourcePopup  ?  
                                  <ResourceSelectActivity  {...this.props}  />  
                                  : null  
                                }  
                                { this.props.resource.isResourceDescribeActivity && !this.props.editResourcePopup  ?  
                                  <ResourceDescribeActivity  selectResourceDescribeActivity={this.props.showResourceDescribeActivity}  />  
                                  : null  
                                }  
                                { this.props.resource.isResourceActivityBuild && !this.props.editResourcePopup ?  
                                  <ResourceActivityBuild {...this.props} />  
                                  : null  
                                }

                                {/* Edit Activity */}
                                { this.props.editResourcePopup ?  
                                  <ResourceActivityBuild {...this.props} />  
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
});

const mapStateToProps =(state) => {
  return {
    resource: state.resource
  };
}

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(NewResourcePage));