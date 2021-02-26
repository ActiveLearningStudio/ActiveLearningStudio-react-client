import React from 'react';
import { useSelector } from 'react-redux';

import logo from 'assets/images/studio_new_logo.png';

export default function Logo() {
  const logoState = useSelector((state) => state.organization.activeOrganization);
  return logoState?.image ? <img src={global.config.resourceUrl + logoState.image} className="auth-header-logo" alt="" /> : <img src={logo} className="auth-header-logo" alt="" />;
}
