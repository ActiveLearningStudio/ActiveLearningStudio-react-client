/* eslint-disable */
import React from 'react';
import { Modal } from 'react-bootstrap';
import Buttons from 'utils/Buttons/buttons';
import PlaylistsPage from 'containers/Playlists';

import './style.scss';

const EditProjectModel = (props) => {
  const { row, onHide } = props;
  return (
    <Modal
      {...props}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />

      <Modal.Body>
        <PlaylistsPage {...props} />
      </Modal.Body>
      <Modal.Footer>
        <div className="model-footer-detail">
          <div className="detail-auther">
            <p>
              Author:
              <span> / {row?.users?.[0].name}</span>
            </p>
            <p>
              ID:
              <span> {row?.id}</span>
            </p>
          </div>
          <div className="detail-btn">
            <Buttons onClick={() => onHide()} text="Cancel" width="95px" height="32px" secondary className="mr-16" />
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProjectModel;
