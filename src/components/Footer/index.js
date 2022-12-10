import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import logo from 'assets/images/footerlogo.png';
import './style.scss';

function Footer() {
  const organization = useSelector((state) => state.organization);
  const { currentOrganization } = organization;
  const [tosUrl, setTosUrl] = useState('');
  const [ppUrl, setPpUrl] = useState('');

  useEffect(() => {
    if (currentOrganization?.tos_type === 'URL' || currentOrganization?.tos_url != null) {
      setTosUrl(currentOrganization?.tos_url);
    } else {
      setTosUrl(`/org/${currentOrganization?.domain}/terms-policy-content/tos_content`);
    }
    if (currentOrganization?.privacy_policy_type === 'URL' || currentOrganization?.privacy_policy_url != null) {
      setPpUrl(currentOrganization?.privacy_policy_url);
    } else {
      setPpUrl(`/org/${currentOrganization?.domain}/terms-policy-content/privacy_policy_content`);
    }
  });

  return (
    <div className="footer-img-section">
      <footer className="footer-all">
        <a target="_blank" href={tosUrl} rel="noopener noreferrer">
          Terms of Use
        </a>

        <a target="_blank" href={ppUrl} rel="noopener noreferrer">
          Privacy Policy
        </a>

        {/* <a target="_blank" href="https://support.curriki.org/" rel="noopener noreferrer"> */}
        <a target="_blank" href="https://www.currikistudio.org/help/" rel="noopener noreferrer">
          Help Center
        </a>
      </footer>
      <div className="img-">
        <span>Powered by</span>
        <img src={logo} alt="" />
      </div>
    </div>
  );
}

export default Footer;
