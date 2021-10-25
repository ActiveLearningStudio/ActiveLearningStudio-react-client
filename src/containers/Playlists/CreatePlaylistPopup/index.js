import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { slideInRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';

const bounceAnimation = keyframes`${slideInRight}`;
const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;
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
    <div className="playlist-modal">
      <div className="modal fade right" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <BouncyDiv className="modal-content">
            <div className="row">
              <div className="col-md-12">
                <h1 className="mt-4 mb-0">
                  <button
                    type="button"
                    className="close-playlist-btn"
                    data-dismiss="modal"
                    onClick={handleHideCreatePlaylistModal}
                  >
                    <FontAwesomeIcon
                      icon="times"
                      style={{
                        WebkitTextStroke: '4px #fff',
                        color: '#333',
                        cursor: 'pointer',
                      }}
                    />
                  </button>
                </h1>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-title">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="mt-4 mb-0">
                      <span>
                        {' '}
                        Add new Playlist
                        {/* {`${editMode ? "Update" : "Create a"} Project`} */}
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
              <Formik
                initialValues={{
                  playlistName: '',
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.playlistName) {
                    errors.playlistName = '* Required';
                  }
                  return errors;
                }}
                onSubmit={() => {
                  handleCreatePlaylistSubmit();
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  setFieldValue,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <p className="playlistName">Playlist name</p>
                    <input
                      type="text"
                      name="playlistName"
                      className="form-control"
                      autoFocus="on"
                      autoComplete="off"
                      value={values.playlistName}
                      placeholder="Enter playlist title..."
                      handleBlur={handleBlur}
                      onChange={(e) => {
                        onPlaylistTitleChange(e);
                        setFieldValue('playlistName', e.target.value);
                      }}
                    />
                    <div style={{ color: 'red' }}>
                      {errors.playlistName && touched.playlistName && errors.playlistName}
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="add-playlist-btn">
                        <div className="add-playlist-btn-text">
                          Add Playlist
                        </div>
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </BouncyDiv>
        </div>
      </div>
    </div>

  );
}

CreatePlaylistPopup.propTypes = {
  handleCreatePlaylistSubmit: PropTypes.func.isRequired,
  handleHideCreatePlaylistModal: PropTypes.func.isRequired,
  onPlaylistTitleChange: PropTypes.func.isRequired,
};

export default CreatePlaylistPopup;
