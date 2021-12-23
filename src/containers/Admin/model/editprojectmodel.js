/* eslint-disable */
import React, { memo } from 'react';
import { Modal } from 'react-bootstrap';
import Buttons from 'utils/Buttons/buttons';
import PlaylistsPage from 'containers/Playlists';
import adminService from 'services/admin.service';
import './style.scss';

const EditProjectModel = (props) => {
  const { row, onHide, setAllProjectTab, activePage, activeOrganization, showFooter } = props;

  return (
    <Modal
      {...props}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header />

      <Modal.Body>
        <PlaylistsPage {...props} />
      </Modal.Body>
      <Modal.Footer>
        <div className="model-footer-detail">
          <div className="detail-auther">
            <p>
              Author:
              <span> / {row?.users?.[0]?.name}</span>
            </p>
            <p>
              ID:
              <span> {row?.id}</span>
            </p>
          </div>
          <div className="detail-btn">
            <Buttons
              onClick={async () => {
                onHide();
                const result = await adminService.getAllProject(activeOrganization?.id, activePage || 1);
                setAllProjectTab(result);
              }}
              text="Close"
              width="95px"
              height="32px"
              secondary
              className="mr-16"
            />
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(EditProjectModel);
