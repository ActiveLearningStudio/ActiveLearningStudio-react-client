/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import logo from 'assets/images/Katy_logo.png';

export default function Logo() {
  const logoState = useSelector((state) => state.organization.currentOrganization);
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (logoState?.id === 1) {
      setImage(null);
    } else {
      setImage(logoState?.image);
    }
  }, [logoState]);
  return (
    <div className="auth-leftpane">
      {image ? (
        <img className="auth-header-logo" src={global.config.resourceUrl + image} alt="logo" title="" />
      ) : <img className="auth-header-logo" src={logo} alt="logo" title="" />}
    </div>
  );
}
