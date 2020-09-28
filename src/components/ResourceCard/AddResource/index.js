import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { slideInRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ResourceActivityType from './ResourceActivityType';
import ResourceSelectActivity from './ResourceSelectActivity';
import ResourceDescribeActivity from './ResourceDescribeActivity';
import ResourceActivityBuild from './ResourceActivityBuild';

const bounceAnimation = keyframes`${slideInRight}`;

const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

// TODO: need to clean up attributes
const AddResource = (props) => {
  const {
    resource,
    editResourcePopup,
    handleHideCreateResourceModal,
    showCreateResourceActivity,
    showResourceDescribeActivity,
  } = props;

  useEffect(() => {
    showCreateResourceActivity(); // show create resource activity wizard
  }, [showCreateResourceActivity]);

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
                  onClick={handleHideCreateResourceModal}
                >
                  <FontAwesomeIcon icon="times" />
                </button>
              </h1>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  {resource.isResourceActivityType && !editResourcePopup && (
                    <ResourceActivityType {...props} />
                  )}

                  {resource.isResourceSelectActivity && !editResourcePopup && (
                    <ResourceSelectActivity {...props} />
                  )}

                  {resource.isResourceDescribeActivity && !editResourcePopup && (
                    <ResourceDescribeActivity
                      selectResourceDescribeActivity={showResourceDescribeActivity}
                    />
                  )}

                  {resource.isResourceActivityBuild && !editResourcePopup && (
                    <ResourceActivityBuild {...props} />
                  )}

                  {/* Edit Activity */}
                  {editResourcePopup && (
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

AddResource.propTypes = {
  resource: PropTypes.object.isRequired,
  editResourcePopup: PropTypes.bool,
  handleHideCreateResourceModal: PropTypes.func.isRequired,
  showCreateResourceActivity: PropTypes.func.isRequired,
  showResourceDescribeActivity: PropTypes.func.isRequired,
  handleCreateResourceSubmit: PropTypes.func.isRequired,
  handleEditResourceSubmit: PropTypes.func.isRequired,
};

AddResource.defaultProps = {
  editResourcePopup: false,
};

export default AddResource;
