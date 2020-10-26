import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { slideInRight } from 'react-animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProjectList from 'containers/Dashboard/ProjectList';
import ActivityList from 'containers/Dashboard/ActivityList';
import PlaylistList from 'containers/Dashboard/PlaylistList';

import './styles.scss';

const bounceAnimation = keyframes`${slideInRight}`;
const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

function SlideModal(props) {
  const { modalSection, closeModal } = props;

  let content;
  let title;
  if (modalSection === 'project-count') {
    content = (<ProjectList />);
    title = 'Project List';
  } else if (modalSection === 'project-shared-count') {
    content = (<ProjectList shared />);
    title = 'Shared Project List';
  } else if (modalSection === 'activity-shared-count') {
    content = (<ActivityList shared />);
    title = 'Shared Activities List';
  } else if (modalSection === 'activity-count') {
    content = (<ActivityList />);
    title = 'Activities List';
  } else if (modalSection === 'playlist-count') {
    content = (<PlaylistList />);
    title = 'Playlists List';
  }

  useEffect(() => {
    window.scrollTo(0, 0);
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
              <div className="row dashboard-modal-title-row">
                <div className="col">
                  <h1>{title}</h1>
                </div>

                <div className="col text-right">
                  <button type="button" className="close-btn" data-dismiss="modal" onClick={closeModal}>
                    <FontAwesomeIcon
                      icon="times"
                      style={{
                        WebkitTextStroke: '4px #fff',
                        color: '#333',
                        cursor: 'pointer',
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  {content}
                </div>
              </div>
            </div>
          </BouncyDiv>
        </div>
      </div>
    </div>
  );
}

SlideModal.propTypes = {
  modalSection: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default SlideModal;
