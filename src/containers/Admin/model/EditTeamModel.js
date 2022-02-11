/* eslint-disable */
import React, { memo } from 'react';
import { Modal } from 'react-bootstrap';
import Buttons from 'utils/Buttons/buttons';
import adminService from 'services/admin.service';
import './style.scss';
import TeamDetail from 'containers/Teams/TeamDetailView';
import { useSelector } from 'react-redux';
import * as actionTypes from 'store/actionTypes';

function EditTeamModel(props) {
  const { show, onHide, activePage, activeOrganization } = props;
  const { selectedTeam } = useSelector(state => state.team);
  const onClickHandler = async () => {
    onHide();
    dispatch({
      type: actionTypes.UPDATE_SELECTED_TEAM,
      payload: {},
    })
    await adminService.teamsActionAdminPanel(activeOrganization?.id, activePage || 1);
  };
  return (
    show && <Modal
      // {...props}
      show={show}
      onHide={onHide}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header />

      <Modal.Body>
        <TeamDetail {...props} />
      </Modal.Body>
      <Modal.Footer>
        <div className="model-footer-detail">
          <div className="detail-auther">
            <p>
              Author:
              {/* <span> / {selectedTeam?.users?.[0]?.name}</span> */}
            </p>
            <p>
              ID:
              {/* <span> {selectedTeam?.id}</span> */}
            </p>
          </div>
          <div className="detail-btn">
            <Buttons
              onClick={onClickHandler}
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

export default memo(EditTeamModel);
