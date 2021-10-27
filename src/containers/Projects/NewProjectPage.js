/*eslint-disable*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { slideInRight } from 'react-animations';
import close from 'assets/images/grayclose.png';

import CreateProjectPopup from './CreateProjectPopup';

const bounceAnimation = keyframes`${slideInRight}`;

const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

function NewProjectPage(props) {
  const { editMode, project, handleCloseProjectModal } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="resource-modal">
      <div className="modal fade right" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <BouncyDiv className="modal-content">
            <div className="modal-title">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="mt-4 mb-0">
                    <span> {`${editMode ? 'Update' : 'Create a'} Project`}</span>

                    <button type="button" className="close-btn" data-dismiss="modal" onClick={() => handleCloseProjectModal(false)}>
                      <img
                        style={{
                          cursor: 'pointer',
                        }}
                        src={close}
                        alt="close"
                      />
                    </button>
                  </h1>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <CreateProjectPopup editMode {...props} thumbUrl={project.thumbUrl} />
                </div>
              </div>
            </div>
          </BouncyDiv>
        </div>
      </div>
    </div>
  );
}

NewProjectPage.propTypes = {
  project: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  handleCloseProjectModal: PropTypes.func.isRequired,
};

export default React.memo(withRouter(NewProjectPage));
