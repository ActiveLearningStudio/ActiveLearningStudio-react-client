/*eslint-disable */
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import childOrgIcon from 'assets/images/child-organization-tag.png';
import {
  getOrganization,
  updateOrganizationScreen,
  setActiveOrganization,
  clearHistory
} from 'store/actions/organization';
import Footer from 'components/Footer';

import AllOrganizations from "./allOrganization";
import CreateOrganization from "./createOrganization";
import EditOrganization from "./editOrganziation";
import IntroOrganizations from "./introOrganization";
import Feedback from "./feedback";

import './style.scss';
import Users from './Users';

export default function ManageOrganizations() {
  const dispatch =  useDispatch();
  const state = useSelector((state) => state.organization);
  const {
    currentOrganization,
    activeOrganization,
    backScreen,
    history,
    permission,
  } = state;
  useMemo(() => {
    if (activeOrganization?.id && permission?.activeRole === 'admin') {
      if (permission?.Organization?.includes('organization:view')) dispatch(getOrganization(activeOrganization?.id));
    }
  }, [activeOrganization?.id, permission?.activeRole]);
  console.log(history);
  return (
    <>
      <div className="content-wrapper">
        <div className="content">
          {permission?.activeRole === 'admin' ?(
            <>
          {!!activeOrganization ? (
            <div>
              <div>
                <div className="headings-org">
                  <p>Parent organization:
                    <span>
                      &nbsp;
                      {activeOrganization?.parent?.name || 'NA'}
                    </span>
                  </p>
                  <p>Domain:
                    <span>
                    &nbsp;
                      {activeOrganization?.domain}
                    </span>
                  </p>
                  <p>Role:
                    <span>
                    &nbsp;
                      {activeOrganization?.organization_role}
                    </span>
                  </p>
                  <div className="organization-container">
                    <div className="title-main">
                      <img className="child-organization-icon" src={childOrgIcon} alt="child-organization-icon" />
                      <h1 className="child-organization-name">{activeOrganization?.name}</h1>
                    </div>
                    {(history || backScreen) ? (
                      <div
                        className="back-button"
                        onClick={() => {
                          if (history) {
                            dispatch(setActiveOrganization(history));
                            dispatch(clearHistory());
                            dispatch(updateOrganizationScreen(backScreen));
                          } else {
                            dispatch(updateOrganizationScreen('intro'));
                            window.history.back();
                          }
                        }}
                      >
                        <FontAwesomeIcon icon="chevron-left" />
                        Back
                      </div>
                    ) : (
                      <Link className="back-button" to={`/studio/org/${currentOrganization?.domain}`}>
                        <FontAwesomeIcon icon="chevron-left" />
                        View All Projects
                      </Link>
                    )}
                  </div>
                </div>

                {state.activeScreen === 'intro' &&
                  <IntroOrganizations
                    detail = {activeOrganization}
                  />
                }
                {state.activeScreen === 'Users' && <Users />}
                {state.activeScreen === 'all-list' && <AllOrganizations />}
                {state.activeScreen === 'create-org' && <CreateOrganization />}
                {state.activeScreen === 'feedback' && <Feedback />}
                {state.activeScreen ===  'edit-org' && <EditOrganization />}
              </div>
            </div>
          ) : <Alert style={{ marginTop: '15px' }} variant="primary"> Loading ...</Alert> }
          </>
          ) : <Alert style={{ marginTop: '15px' }} variant="danger">You are not authorized to view this page</Alert>}
        </div>
      </div>
      <Footer />
    </>
  );
}
