/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import logo from 'assets/images/login_logo.svg';
import Katylogo from 'assets/images/Katy_logo.png';
import bu from 'assets/images/bu.png';
import safari from 'assets/images/safari.png';
import shepherds from 'assets/images/shepherds.svg';
import sndt from 'assets/images/SNDT-LOGO-blue.png';
import nevada from 'assets/images/nevada.png';
import openeducation from 'assets/images/openeducation.png';
import bodyImg from 'assets/images/login_bglogo.svg';

export default function Logo() {
  const logoState = useSelector((state) => state.organization.currentOrganization);
  const [image, setImage] = useState(null);
  const [defaultLogo, setdefaultLogo] = useState(logo);
  useEffect(() => {
    if (logoState?.id === 1) {
      setImage(null);
      if (window.location.host.includes('katyisd')) {
        setdefaultLogo(Katylogo);
      } else if (window.location.host.includes('baylor')) {
        setdefaultLogo(bu);
      } else if (window.location.host.includes('scde')) {
        setdefaultLogo(safari);
      } else if (window.location.host.includes('shepherds')) {
        setdefaultLogo(shepherds);
      } else if (window.location.host.includes('sndt')) {
        setdefaultLogo(sndt);
      } else if (window.location.host.includes('nvdoe')) {
        setdefaultLogo(nevada);
      } else if (window.location.host.includes('open.curriki')) {
        setdefaultLogo(openeducation);
      } else {
        setdefaultLogo(logo);
      }
    } else {
      setImage(logoState?.image);
    }
  }, [logoState]);

  return (
    <div className="auth-leftpane">
      {image ? (
        <img className="auth-header-logo" src={global.config.resourceUrl + image} alt="logo" title="" />
      ) : <img className="auth-header-logo" src={defaultLogo} alt="logo" title="" />}
      <div className="auth-body">
        <img src={bodyImg} alt="ff" className="auth-body-img" />
      </div>
    </div>
  );
}
