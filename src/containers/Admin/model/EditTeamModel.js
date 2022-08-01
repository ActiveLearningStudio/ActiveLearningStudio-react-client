/* eslint-disable */
import React, { memo } from 'react';
import { Modal } from 'react-bootstrap';
import Buttons from 'utils/Buttons/buttons';
import './editTeamModel.scss';
import TeamDetail from 'containers/Teams/TeamDetailView';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from 'store/actionTypes';
import { teamsActionAdminPanel } from 'store/actions/admin';

function EditTeamModel(props) {
  const { show, onHide, activePage, activeOrganization } = props;
  const { selectedTeam } = useSelector(state => state.team);
  const dispatch = useDispatch();
  const onClickHandler = async () => {
    onHide();
    dispatch({
      type: actionTypes.UPDATE_SELECTED_TEAM,
      payload: {},
    })
    dispatch(teamsActionAdminPanel(activeOrganization?.id, '', activePage || 1, 10));
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
        <TeamDetail {...props} adminPanel />
      </Modal.Body>
      <Modal.Footer>
        <div className="model-footer-detail">
          <div className="detail-auther">
            <p>
              Authors:
              {selectedTeam?.users?.map((user, index) => (
                <span key={user?.id}>{user?.first_name + ' ' + user?.last_name}{index === selectedTeam?.users.length - 1 ? '.' : ','}</span>
              ))}
            </p>
            <p>
              ID:
              <span> {selectedTeam?.id}</span>
            </p>
          </div>
          <div className="detail-btn">
            <Buttons
              onClick={onClickHandler}
              text="Cancel"
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
