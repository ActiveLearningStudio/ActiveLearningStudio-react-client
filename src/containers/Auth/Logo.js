/* eslint-disable max-len */
import React from 'react';
import { useSelector } from 'react-redux';

import logo from 'assets/images/studio_new_logo.png';
import currikistudio from 'assets/images/currikistudio.png';

export default function Logo() {
  const logoState = useSelector((state) => state.organization.currentOrganization);
  return (
    <div className="auth-leftpane">
      {/* <img src={logoState?.image ? global.config.resourceUrl + logoState.image : logo} className="auth-header-logo" alt="" /> */}
      <img src={logoState?.domain === 'currikistudio' ? currikistudio : logoState?.image ? global.config.resourceUrl + logoState.image : logo} className="auth-header-logo" alt="" />
    </div>
  );
}
