import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { updateOrganizationScreen, updatePreviousScreen, clearSuborgList } from 'store/actions/organization';

import InviteOrganization from './inviteAdmin';

export default function IntroOrganizations(props) {
  const dispatch = useDispatch();
  const { detail } = props;
  const history = useHistory();
  useMemo(() => {
    dispatch(updatePreviousScreen(''));
  }, []);
  return (
    detail ? (
      <>
        <div className="organization-container organization-intro">
          <div className="img-section">
            <div
              className="child-organization-image"
              style={{
                backgroundImage: `url(${global.config.resourceUrl}${detail.image})`,
              }}
            />
          </div>
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
              <div
                className="button-text"
                onClick={() => {
                  dispatch(updateOrganizationScreen('create-org'));
                }}
              >
                New Sub-organization
              </div>
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
                dispatch(clearSuborgList());
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
                history.push('/');
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
                history.push('/');
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
