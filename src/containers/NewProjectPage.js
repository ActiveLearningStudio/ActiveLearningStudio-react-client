import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { slideInRight } from 'react-animations';

import styled, { keyframes } from 'styled-components';


import { withRouter } from 'react-router-dom'

import CreateProjectPopup from "../components/CreateProjectPopup/CreateProjectPopup";


const bounceAnimation = keyframes`${slideInRight}`;

const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

export class NewProjectPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (

      <div className="resource-modal">
        <div className="modal fade right" id="createPlaylistModal" role="dialog" aria-labelledby="createPlaylistModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">

            <BouncyDiv className="modal-content">

              <div className="modal-title">
                <div className="row">
                  <div className="col-md-12">
                    <h1>
                      {
                        this.props.editMode ?
                          'Update '
                          :
                          'Create New '
                      }
                                  Project
                                  <button type="button" className="close-btn" data-dismiss="modal" onClick={this.props.handleCloseProjectModal}>x</button>
                    </h1>
                    <hr />
                  </div>
                </div>

              </div>
              <div className="modal-body">
                <div className='row'>
                  <div className="col-md-12">
                    <CreateProjectPopup
                      {...this.props}
                      thumbUrl={this.props.project.thumbUrl} />

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

});

const mapStateToProps = (state) => {
  return {

  };
}

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(NewProjectPage));