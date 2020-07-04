import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

import './style.scss';

const fadeAnimation = keyframes`${fadeIn}`;

const FaceDiv = styled.div`
  animation: 1s ${fadeAnimation};
`;

function Popup(props) {
  const {
    ui,
    hideDeletePopupAction,
    deleteProjectAction,
    deletePlaylistAction,
    deleteResourceAction,
  } = props;

  // remove popup when escape is pressed
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      hideDeletePopupAction(event);
    }
  }, [hideDeletePopupAction]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const deleteEntity = useCallback((deleteType, id) => {
    return () => {
      if (deleteType === 'Project') {
        deleteProjectAction(id);
      } else if (deleteType === 'Playlist') {
        deletePlaylistAction(id);
      } else if (deleteType === 'Activity') {
        deleteResourceAction(id);
      }
    };
  }, [deleteProjectAction, deletePlaylistAction, deleteResourceAction]);

  return (
    <FaceDiv className="popup">
      <div className="modal fade" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h5>
                Delete &quot;
                {ui.title}
                &quot;?
              </h5>
              <p>
                You&apos;re about to permanently delete this
                {ui.deleteType}
                {' '}
                and all of its data.
              </p>
              <p>Do you want to continue?</p>
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-sm btn-danger"
                onClick={deleteEntity(ui.deleteType, ui.id)}
              >
                Delete
              </button>

              <button
                type="button"
                className="btn btn-sm btn-default"
                data-dismiss="modal"
                onClick={hideDeletePopupAction}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </FaceDiv>
  );
}

Popup.propTypes = {
  ui: PropTypes.object.isRequired,
  hideDeletePopupAction: PropTypes.func.isRequired,
  deleteProjectAction: PropTypes.func.isRequired,
  deletePlaylistAction: PropTypes.func.isRequired,
  deleteResourceAction: PropTypes.func.isRequired,
};

export default Popup;
