import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { simpleSearchAction } from 'store/actions/search';
import Swal from 'sweetalert2';
import childOrganizationIcon from 'assets/images/child-organization-icon.png';
import foldericon from 'assets/images/sidebar/folder-icon.png';
import teamicon from 'assets/images/sidebar/team-icon.png';
import groupicon from 'assets/images/sidebar/group-icon.png';
import usericon from 'assets/images/sidebar/user-sidebar-icon.png';
import homeicon from 'assets/images/home.png';
import organizationLargeIcon from 'assets/images/sidebar/organization80.png';

import {
  editOrganization,
  setActiveOrganization,
  updateOrganizationScreen,
  updatePreviousScreen,
  clearSuborgList,
  saveHistory,
} from 'store/actions/organization';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InviteOrganization from './inviteAdmin';

export default function IntroOrganizations(props) {
  const dispatch = useDispatch();
  const { detail } = props;
  const history = useHistory();
  const allState = useSelector((state) => state.organization);
  const { currentOrganization, permission } = allState;
  // useMemo(() => {
  //   if() {
  //     dispatch(updatePreviousScreen(''));
  //   }
  // }, []);
  return (
    detail ? (
      <>
        <div className="intro-container">
          <div className="breadcrumb-intro">
            <img src={homeicon} alt="homeicon" />
            Home
            <FontAwesomeIcon icon="angle-right" />
            Dashboard
          </div>
          <div className="orgs">Organization</div>
          <div className="organization">
            <img src={organizationLargeIcon} alt="orgicon" />
            <div className="organization-name">{currentOrganization?.name}</div>
            {permission?.Organization?.includes('organization:create') && (
              <button className="sub-organization-button" type="button">
                <div
                  className="button-text"
                  onClick={() => {
                    dispatch(updateOrganizationScreen('create-org'));
                  }}
                >
                  + Create
                </div>
              </button>
            )}
          </div>
          <div className="organization-intro">
            <div className="description-meta">
              <h2>
                About
              </h2>
              <p className="content-data">
                {detail.description}
              </p>
              <div className="details">
                <div className="heading">Domain:</div>
                <div className="heading">Parent:</div>
                <div className="heading">Your Role:</div>
              </div>
              <div className="details">
                <div className="content-data">{detail?.domain}</div>
                <div className="content-data">{detail?.parent ? detail?.parent : 'none'}</div>
                <div className="content-data">{detail?.organization_role}</div>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  onClick={() => {
                    history.push(`/org/${currentOrganization?.domain}/manage`);
                  }}
                >
                  Manage Organization
                </button>
                {permission?.Organization?.includes('organization:create') && (
                  <div className="grp-btn">
                    {permission?.Organization?.includes('organization:invite-members') && (
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Invite Admin
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <InviteOrganization />
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                )}
                <a
                  className="edit-button"
                  onClick={() => {
                    dispatch(updatePreviousScreen('intro'));
                    dispatch(updateOrganizationScreen('edit-org'));
                    dispatch(setActiveOrganization(currentOrganization));
                    dispatch(editOrganization(currentOrganization));
                    dispatch(saveHistory(allState?.activeOrganization));
                  }}
                >
                  Edit Organization
                </a>
              </div>
            </div>
            <div className="img-section">
              <div
                className="child-organization-image"
                style={{
                  backgroundImage: `url(${global.config.resourceUrl}${detail.image})`,
                }}
              />
            </div>
          </div>
          <div className="divider" />
          <div className="stats">Stats</div>
          {permission?.Organization?.includes('organization:view') && (
            <div className="user-state-org">
              <div>
                <div className="circle">
                  <div className="count">{detail.suborganization_count || 0}</div>
                  <div className="split" />
                  <div className="icon">
                    <img src={childOrganizationIcon} alt="organization-icon" />
                    <div className="value">Child-orgs</div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    dispatch(updateOrganizationScreen('all-list'));
                    dispatch(updatePreviousScreen('intro'));
                    dispatch(clearSuborgList());
                    dispatch(saveHistory(detail));
                  }}
                  className="more"
                >
                  See More
                </div>
              </div>
              <div>
                <div className="circle">
                  <div className="count">{detail.users_count || 0}</div>
                  <div className="split" />
                  <div className="icon">
                    <img src={usericon} alt="user-icon" />
                    <div className="value">Users</div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    dispatch(updateOrganizationScreen('Users'));
                    dispatch(updatePreviousScreen('intro'));
                    dispatch(clearSuborgList());
                    dispatch(saveHistory(detail));
                  }}
                  className="more"
                >
                  See More
                </div>
              </div>
              <div>
                <div className="circle">
                  <div className="count">{detail.groups_count || 0}</div>
                  <div className="split" />
                  <div className="icon">
                    <img src={groupicon} alt="group-icon" />
                    <div className="value">Groups</div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    history.push(`/org/${currentOrganization?.domain}/groups`);
                  }}
                  className="more"
                >
                  See More
                </div>
              </div>
              <div>
                <div className="circle">
                  <div className="count">{detail.teams_count || 0}</div>
                  <div className="split" />
                  <div className="icon">
                    <img src={teamicon} alt="team-icon" />
                    <div className="value">Teams</div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    history.push(`/org/${currentOrganization?.domain}/teams`);
                  }}
                  className="more"
                >
                  See More
                </div>
              </div>
              <div>
                <div className="circle">
                  <div className="count">{detail.projects_count || 0}</div>
                  <div className="split" />
                  <div className="icon">
                    <img src={foldericon} alt="project-icon" />
                    <div className="value">Projects</div>
                  </div>
                </div>
                <div
                  onClick={async () => {
                    Swal.fire({
                      html: 'Searching...', // add html attribute if you want or remove
                      allowOutsideClick: false,
                      onBeforeOpen: () => {
                        Swal.showLoading();
                      },
                    });
                    await dispatch(simpleSearchAction({
                      from: 0,
                      size: 20,
                      type: 'orgSearch',
                    }));
                    Swal.close();
                    history.push(`/org/${currentOrganization?.domain}/search?type=orgSearch`);
                  }}
                  className="more"
                >
                  See More
                </div>
              </div>
            </div>
          )}
        </div>

      </>
    ) : <Alert style={{ marginTop: '15px' }} variant="primary">Loading ...</Alert>
  );
}

IntroOrganizations.propTypes = {
  detail: PropTypes.object.isRequired,
};
