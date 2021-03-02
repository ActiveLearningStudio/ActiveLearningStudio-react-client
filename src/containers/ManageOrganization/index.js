/*eslint-disable */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import childOrgIcon from 'assets/images/child-organization-tag.png';
import { getOrganization, updateOrganizationScreen  } from 'store/actions/organization';
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
  useEffect(() => {
    dispatch(getOrganization(state.activeOrganization?.id));
  }, []);
  const {activeOrganization, backScreen} = state; 
  return (
    <>
      <div className="content-wrapper">
        <div className="content">
          {activeOrganization && (
            <div className="headings-org">
              <p>Parent organization: {activeOrganization?.parent?.name}</p>
              <div className="organization-container">
                <div className="title-main">
                  <img className="child-organization-icon" src={childOrgIcon} alt="child-organization-icon" />
                  <h1 className="child-organization-name">{activeOrganization?.name}</h1>
                </div>
                {backScreen ? (
                  <div 
                    className="back-button"
                    onClick={() => {
                      dispatch(updateOrganizationScreen(backScreen));
                    }}
                  >
                    <FontAwesomeIcon icon="chevron-left" />
                    Back
                  </div>
                ) : (
                  <Link className="back-button" to={`/org/${activeOrganization.domain}`}>
                    <FontAwesomeIcon icon="chevron-left" />
                    Back
                  </Link>
                )}
              </div>
            </div>
          )}
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
      <Footer />
    </>
  );
}
