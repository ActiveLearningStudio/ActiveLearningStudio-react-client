import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { simpleSearchAction } from 'store/actions/search';
import Swal from 'sweetalert2';

import {
  updateOrganizationScreen,
  updatePreviousScreen,
  clearSuborgList,
  saveHistory,
} from 'store/actions/organization';

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
              My Role:&nbsp;
              {detail.organization_role}
            </div>
          </div>
          {permission?.Organization?.includes('organization:create') && (
            <div className="grp-btn">
              {permission?.Organization?.includes('organization:create') && (
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
              )}
              {permission?.Organization?.includes('organization:invite-members') && (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic-org">
                    <span>
                      Invite Users
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <InviteOrganization />
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          )}
        </div>
        {permission?.Organization?.includes('organization:view') && (
          <div className="user-state-org">
            <div>
              <div className="circle">
                <div className="count">{detail.suborganization_count || 0}</div>
                <div className="value">Organizations</div>
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
                <div className="value">Users</div>
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
                <div className="value">Groups</div>
              </div>
              <div
                onClick={() => {
                  history.push(`/studio/org/${currentOrganization?.domain}/groups`);
                }}
                className="more"
              >
                See More
              </div>
            </div>
            <div>
              <div className="circle">
                <div className="count">{detail.teams_count || 0}</div>
                <div className="value">Teams</div>
              </div>
              <div
                onClick={() => {
                  history.push(`/studio/org/${currentOrganization?.domain}/teams`);
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
                  history.push(`/studio/org/${currentOrganization?.domain}/search?type=orgSearch`);
                }}
                className="more"
              >
                See More
              </div>
            </div>
          </div>
        )}
      </>
    ) : <Alert style={{ marginTop: '15px' }} variant="primary">Loading ...</Alert>
  );
}

IntroOrganizations.propTypes = {
  detail: PropTypes.object.isRequired,
};
