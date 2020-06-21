import React, { useEffect } from "react";
import { connect } from "react-redux";
import { slideInRight } from "react-animations";
import styled, { keyframes } from "styled-components";

import ResourceActivityBuild from "./ResourceActivityBuild";
import ResourceDescribeActivity from "./ResourceDescribeActivity";
import "./../AddResource/AddResource.scss";

const bounceAnimation = keyframes`${slideInRight}`;

const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

const EditResource = (props) => {
  useEffect(() => {
    props.showDescribeActivityAction(null, props.match.params.activityid);
    // props.showBuildActivityAction(null, null, props.match.params.activityid); // show create resource activity wizard
  }, []);

  return (
    <div className="resource-modal">
      <div
        className="modal fade right"
        id="editResourceModal"
        role="dialog"
        aria-labelledby="editResourceModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <BouncyDiv className="modal-content">
            <div className="modal-title">
              <h1>
                Edit Activity
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
                  {/* Edit Activity */}
                  {/* {props.openEditResourcePopup ?
                                        <ResourceActivityBuild {...props} />
                                        : null
                                    } */}

                  {props.resource.isResourceDescribeActivity ? (
                    <ResourceDescribeActivity
                      selectResourceDescribeActivity={
                        props.showResourceDescribeActivity
                      }
                    />
                  ) : null}
                  {props.resource.isResourceActivityBuild ? (
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
export default EditResource;
