/*eslint-disable */
import Footer from 'components/Footer';
import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import childOrgIcon from 'assets/images/child-organization-tag.png';

import AllPrganizations from "./allOrganization";
import CreateOrganization from "./createOrganization";
import IntroOrganizations from "./intoOrganization";

import './style.scss';



export default function ManageOrganizations() {
  const state = useSelector((state) => state.organization); 
  return (
    <>
      <div className="content-wrapper">
        <div className="content">
          <div className="headings-org">
            <p>Parent organization: Nevada</p>
            <div className="organization-container">
              <div className="title-main">
                <img className="child-organization-icon" src={childOrgIcon} alt="child-organization-icon" />
                <h1 className="child-organization-name">Lake Valley Education District</h1>
              </div>
              <div className="back-button" to="/">
                <FontAwesomeIcon icon="chevron-left" />
                Back to My Projects
              </div>
            </div>
          </div>
          {state.activeScreen === 'intro' && <IntroOrganizations />}
          {state.activeScreen === 'all-list' && <AllPrganizations />}
          {state.activeScreen === 'create-org' && <CreateOrganization />}
        </div>
      </div>
      <Footer />
    </>
  );
}
