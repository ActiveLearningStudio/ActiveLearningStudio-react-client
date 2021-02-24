import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';

import { updateOrganizationScreen } from 'store/actions/organization';
import childOrgImage from 'assets/images/child-organization-image.png';

import InviteOrganization from './inviteAdmin';

export default function IntroOrganizations() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="organization-container organization-intro">
        <img className="child-organization-image" src={childOrgImage} alt="org-img" />
        <div className="description-meta">
          <h2>
            Description
          </h2>
          <p className="content-data">
            Ed ut perspiciatis unde omnis
            iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis
            et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur.
          </p>
          <div className="role">My Role: Admin</div>
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
        <div onClick={() => dispatch(updateOrganizationScreen('all-list'))}>
          <div className="circle">
            <div className="count">100</div>
            <div className="value">Organization</div>
          </div>
        </div>
        <div onClick={() => dispatch(updateOrganizationScreen('all-list'))}>
          <div className="circle">
            <div className="count">30</div>
            <div className="value">Users</div>
          </div>
        </div>
        <div onClick={() => dispatch(updateOrganizationScreen('all-list'))}>
          <div className="circle">
            <div className="count">5</div>
            <div className="value">See More</div>
          </div>
        </div>
        <div onClick={() => dispatch(updateOrganizationScreen('all-list'))}>
          <div className="circle">
            <div className="count">50</div>
            <div className="value">See More</div>
          </div>
        </div>
      </div>
    </>
  );
}
