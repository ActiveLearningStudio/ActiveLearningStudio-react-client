import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import childOrgImage from 'assets/images/child-organization-image.png';
import { updateOrganizationScreen, updatePreviousScreen } from 'store/actions/organization';

import InviteOrganization from './inviteAdmin';

export default function IntroOrganizations(props) {
  const dispatch = useDispatch();
  const { detail } = props;
  return (
    detail ? (
      <>
        <div className="organization-container organization-intro">
          <img className="child-organization-image" src={childOrgImage} alt="org-img" />
          <div className="description-meta">
            <h2>
              Description
            </h2>
            <p className="content-data">
              {detail.description}
            </p>
            <div className="role">
              My Role:
              {detail.organization_role}
            </div>
          </div>
          <div className="grp-btn">
            <button className="sub-organization-button" type="button">
              <div className="button-text"> New Sub-organization </div>
            </button>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Invite Admin
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <InviteOrganization />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="user-state-org">
          <div>
            <div className="circle">
              <div className="count">{detail.suborganization_count || 0}</div>
              <div className="value">Organization</div>
            </div>
            <div
              onClick={() => {
                dispatch(updateOrganizationScreen('all-list'));
                dispatch(updatePreviousScreen('intro'));
              }}
              className="more"
            >
              See More
            </div>
          </div>
          <div>
            <div className="circle">
              <div className="count">{detail.users_count || 0}</div>
              <div className="value">Users</div>
            </div>
            <div
              onClick={() => {
                dispatch(updateOrganizationScreen('all-list'));
                dispatch(updatePreviousScreen('projects'));
              }}
              className="more"
            >
              See More
            </div>
          </div>
          <div>
            <div className="circle">
              <div className="count">{detail.groups_count || 0}</div>
              <div className="value">Groups</div>
            </div>
            <div
              onClick={() => {
                dispatch(updateOrganizationScreen('all-list'));
                dispatch(updatePreviousScreen('projects'));
              }}
              className="more"
            >
              See More
            </div>
          </div>
          <div>
            <div className="circle">
              <div className="count">{detail.projects_count || 0}</div>
              <div className="value">Projects</div>
            </div>
            <div
              onClick={() => {
                dispatch(updateOrganizationScreen('all-list'));
                dispatch(updatePreviousScreen('projects'));
              }}
              className="more"
            >
              See More
            </div>
          </div>
        </div>
      </>
    ) : <Alert style={{ marginTop: '15px' }} variant="primary">Loading ...</Alert>
  );
}

IntroOrganizations.propTypes = {
  detail: PropTypes.object.isRequired,
};
