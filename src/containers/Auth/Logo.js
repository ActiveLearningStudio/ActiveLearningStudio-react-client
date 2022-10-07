import React from 'react';
import { useSelector } from 'react-redux';

import bodyImg from 'assets/images/log-in.png';

export default function Logo() {
  const logoState = useSelector((state) => state.organization.currentOrganization);

  return (
    <div className="auth-leftpane">
      <img
        className="auth-header-logo"
        src={!!logoState?.image && logoState?.image.includes('dev.currikistudio') ? logoState?.image : global.config.resourceUrl + logoState?.image}
        alt="logo"
        title=""
      />

      <div className="auth-body">
        <img src={bodyImg} alt="login-background-img" className="background-img-leftpane" />
      </div>
    </div>
  );
}
