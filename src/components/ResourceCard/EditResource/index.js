import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { slideInRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ResourceActivityBuild from './ResourceActivityBuild';
import ResourceDescribeActivity from './ResourceDescribeActivity';

import '../AddResource/style.scss';

const bounceAnimation = keyframes`${slideInRight}`;

const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

// TODO: clean up attributes
const EditResource = (props) => {
  const {
    match,
    resource,
    showResourceDescribeActivity,
    handleHideCreateResourceModal,
  } = props;

  useEffect(() => {
    showResourceDescribeActivity(resource, match.params.activityId);
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
                Edit Activity
                <button
                  type="button"
                  className="close-btn"
                  data-dismiss="modal"
                  onClick={handleHideCreateResourceModal}
                >
                  <FontAwesomeIcon icon="times" />
                </button>
              </h1>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  {/*
                  {openEditResourcePopup && (
                    <ResourceActivityBuild {...props} />
                  )}
                  */}

                  {resource.isResourceDescribeActivity && (
                    <ResourceDescribeActivity
                      selectResourceDescribeActivity={showResourceDescribeActivity}
                    />
                  )}

                  {resource.isResourceActivityBuild && (
                    <ResourceActivityBuild {...props} />
                  )}
                </div>
              </div>
            </div>
          </BouncyDiv>
        </div>
      </div>
    </div>
  );
};

EditResource.propTypes = {
  match: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  showResourceDescribeActivity: PropTypes.func.isRequired,
  handleHideCreateResourceModal: PropTypes.func.isRequired,
  handleCreateResourceSubmit: PropTypes.func.isRequired,
  handleEditResourceSubmit: PropTypes.func.isRequired,
};

export default EditResource;
