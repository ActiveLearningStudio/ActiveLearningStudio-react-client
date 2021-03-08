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

import AllPrganizations from "./allOrganization";
import CreateOrganization from "./createOrganization";
import EditOrganization from "./editOrganziation";
import IntroOrganizations from "./intoOrganization";
import Feedback from "./feedback";

import './style.scss';

export default function ManageOrganizations() {
  const dispatch =  useDispatch();
  const state = useSelector((state) => state.organization);
  const {
    currentOrganization,
    activeOrganization,
    backScreen,
    history,
  } = state;
  useMemo(() => {
    if (activeOrganization?.id) {
      dispatch(getOrganization(activeOrganization?.id));
    }
  }, [activeOrganization?.id]);
  return (
    <>
      <div className="content-wrapper">
        <div className="content">
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
                    {backScreen ? (
                      <div 
                        className="back-button"
                        onClick={() => {
                          if (history) {
                            dispatch(setActiveOrganization(history));
                            dispatch(clearHistory());
                            dispatch(updateOrganizationScreen(backScreen));
                          } else {
                            dispatch(updateOrganizationScreen('intro'));
                          }
                        }}
                      >
                        <FontAwesomeIcon icon="chevron-left" />
                        Back
                      </div>
                    ) : (
                      <Link className="back-button" to={`/org/${currentOrganization?.domain}`}>
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
                {state.activeScreen === 'all-list' && <AllPrganizations />}
                {state.activeScreen === 'create-org' && <CreateOrganization />}
                {state.activeScreen === 'feedback' && <Feedback />}
                {state.activeScreen ===  'edit-org' && <EditOrganization />}
              </div> 
            </div>
          ) : <Alert style={{ marginTop: '15px' }} variant="primary"> Loading ...</Alert> }
        </div>
      </div>
      <Footer />
    </>
  );
}
