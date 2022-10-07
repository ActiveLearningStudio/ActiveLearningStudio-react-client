/*eslint-disable*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { slideInRight } from 'react-animations';
import close from 'assets/images/grayclose.png';

import CreateProjectPopup from './CreateProjectPopup';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
const bounceAnimation = keyframes`${slideInRight}`;

const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

function NewProjectPage(props) {
  const { project, handleCloseProjectModal } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const paragraphColor = getGlobalColor('--main-paragraph-text-color');
  return (
    <div className="resource-modal">
      <div className="modal fade right" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <BouncyDiv className="modal-content">
            <div className="modal-title">
              <div className="row">
                <button type="button" className="close-btn" data-dismiss="modal" onClick={() => handleCloseProjectModal(false)}>
                  {/* <img
                    style={{
                      cursor: 'pointer',
                    }}
                    src={close}
                    alt="close"
                  /> */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 1L1 15" stroke={paragraphColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 1L15 15" stroke={paragraphColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="col-md-12">
                  <h1 className="mb-0">
                    <span>Create a Project</span>
                  </h1>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <CreateProjectPopup {...props} thumbUrl={project?.thumbUrl} />
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
  handleCloseProjectModal: PropTypes.func.isRequired,
};

export default React.memo(withRouter(NewProjectPage));
