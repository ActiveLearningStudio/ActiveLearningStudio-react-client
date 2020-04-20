import React from "react";
import "./Header.scss"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="header-wrapper">
        <div className="cross-icon-box">
            <div className="cross-icon">
            <Link to="/">
              <img src="/images/cross-icon.png" alt="close icon" />
              </Link>
            </div>
        </div>
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.png" className="img-responsive" alt="Curriki Logo" />
          </Link>
        </div>
        <div className="bell-user">
            <div className="bell-icon">
              <Link to="/">
                <img src="/images/bell-icon.png" alt="Bell icon" />
              </Link>
            </div>
            <div className="user-icon">
              <Link to="/">
                <img src="/images/user-icon.png" alt="User icon" />
              </Link>
            </div>
        </div>
      </div>
        <nav>
            {/* <Link to="/">
                <img src="/images/header.png" className="img-responsive header" />
            </Link> */}
	      </nav>
    </header>
  );
}

export default Header;