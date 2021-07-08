/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import logo from 'assets/images/studio_new_logo.png';
import Katylogo from 'assets/images/Katy_logo.png';
import bu from 'assets/images/bu.png';
import safari from 'assets/images/safari.png';
import shepherds from 'assets/images/shepherds.svg';
import sndt from 'assets/images/sndt.png';
import nevada from 'assets/images/nevada.png';

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
    </div>
  );
}
