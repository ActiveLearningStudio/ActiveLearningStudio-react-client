import React, { useEffect } from "react";
import { connect } from "react-redux";
import { slideInRight } from "react-animations";

import styled, { keyframes } from "styled-components";
// import { showCreateResourceActivityAction, showBuildActivityAction } from "./store.actions/resource";

import ResourceActivityType from "./ResourceActivityType";
import ResourceSelectActivity from "./ResourceSelectActivity";
import ResourceDescribeActivity from "./ResourceDescribeActivity";
import ResourceActivityBuild from "./ResourceActivityBuild";

import { withRouter } from "react-router-dom";

const bounceAnimation = keyframes`${slideInRight}`;

const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

const AddResource = (props) => {
  useEffect(() => {
    props.showCreateResourceActivity(); // show create resource activity wizard
  }, []);

  return (
    <div className="resource-modal">
      <div
        className="modal fade right"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <BouncyDiv className="modal-content">
            <div className="modal-title">
              <h1>
                Create New Activity
                <button
                  type="button"
                  className="close-btn"
                  data-dismiss="modal"
                  onClick={props.handleHideCreateResourceModal}
                >
                  <i className="fa fa-times" />
                </button>
              </h1>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  {props.resource.isResourceActivityType &&
                  !props.editResourcePopup ? (
                    <ResourceActivityType {...props} />
                  ) : null}
                  {props.resource.isResourceSelectActivity &&
                  !props.editResourcePopup ? (
                    <ResourceSelectActivity {...props} />
                  ) : null}
                  {props.resource.isResourceDescribeActivity &&
                  !props.editResourcePopup ? (
                    <ResourceDescribeActivity
                      selectResourceDescribeActivity={
                        props.showResourceDescribeActivity
                      }
                    />
                  ) : null}
                  {props.resource.isResourceActivityBuild &&
                  !props.editResourcePopup ? (
                    <ResourceActivityBuild {...props} />
                  ) : null}

                  {/* Edit Activity */}
                  {props.editResourcePopup ? (
                    <ResourceActivityBuild {...props} />
                  ) : null}
                </div>
              </div>
            </div>
          </BouncyDiv>
        </div>
      </div>
    </div>
  );
};
export default AddResource;
