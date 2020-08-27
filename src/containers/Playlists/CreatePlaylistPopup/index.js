import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

import './style.scss';

const fadeAnimation = keyframes`${fadeIn}`;

const FaceDiv = styled.div`
  animation: 1s ${fadeAnimation};
`;

// TODO: need to clean up attributes
function CreatePlaylistPopup(props) {
  const {
    handleCreatePlaylistSubmit,
    handleHideCreatePlaylistModal,
    onPlaylistTitleChange,
  } = props;

  // remove popup when escape is pressed
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      handleHideCreatePlaylistModal();
    }
  }, [handleHideCreatePlaylistModal]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  return (
    <FaceDiv className="popup">
      <form onSubmit={handleCreatePlaylistSubmit}>
        <div className="modal fade" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <input
                  type="text"
                  name="playlistName"
                  className="playlistName form-control"
                  autoFocus="on"
                  autoComplete="off"
                  placeholder="Enter playlist title..."
                  onChange={onPlaylistTitleChange}
                />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary add-playlist-btn">Add</button>
                <button
                  type="button"
                  className="close-playlist-btn"
                  data-dismiss="modal"
                  onClick={handleHideCreatePlaylistModal}
                >
                  x
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FaceDiv>
  );
}

CreatePlaylistPopup.propTypes = {
  handleCreatePlaylistSubmit: PropTypes.func.isRequired,
  handleHideCreatePlaylistModal: PropTypes.func.isRequired,
  onPlaylistTitleChange: PropTypes.func.isRequired,
};

export default CreatePlaylistPopup;
