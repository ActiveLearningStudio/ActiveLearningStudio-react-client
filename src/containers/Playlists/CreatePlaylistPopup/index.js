import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { FadeDiv } from 'utils';

import './style.scss';

// TODO: need to clean up attributes
function CreatePlaylistPopup(props) {
  const {
    handleCreatePlaylistSubmit,
    handleHideCreatePlaylistModal,
    onPlaylistTitleChange,
    error,
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
    <FadeDiv className="popup">
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
                <div style={{ color: 'red' }}>
                  {error}
                </div>
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
    </FadeDiv>
  );
}

CreatePlaylistPopup.propTypes = {
  handleCreatePlaylistSubmit: PropTypes.func.isRequired,
  handleHideCreatePlaylistModal: PropTypes.func.isRequired,
  onPlaylistTitleChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};

export default CreatePlaylistPopup;
