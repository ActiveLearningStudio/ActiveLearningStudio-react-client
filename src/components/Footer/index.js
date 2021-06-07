import React from 'react';
import logo from 'assets/images/studio_black_transparent.png';

function Footer() {
  return (
    <div className="footer-img-section">
      <footer className="footer-all">
        <a target="_blank" href="https://www.curriki.org/terms-of-service/" rel="noopener noreferrer">
          Terms of Service
        </a>
        <a target="_blank" href="https://www.curriki.org/privacy-policy/" rel="noopener noreferrer">
          Privacy Policy
        </a>
        <a target="_blank" href="https://support.curriki.org/" rel="noopener noreferrer">
          Help & Support
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
