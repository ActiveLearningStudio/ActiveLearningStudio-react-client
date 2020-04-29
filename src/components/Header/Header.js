import React from "react";
import "./Header.scss"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { logout } from "../../actions/auth";



function Header(props) {
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
          <div className="search form-inline">
            <input type="text" className="form-control" placeholder="Search existing content"/>
            <button className="btn navbar-search-btn"><i className="fa fa-search"></i></button>
          </div>
          <div id="create-project-icon" className={props.project.showCreateProjectSubmenu ? 'active': null} onClick={()=>props.showCreateProjectSubmenuAction()}>
              <a>
                +
              </a>
              <ul className="create-project-dropdown sub-menu">
                <li>
                  <Link to="/project/create">
                    <div className="icon">
                      <img src="/images/create-project-icon.png" />
                    </div>
                    <div className="description">
                      <div>
                        <h4>Create a New Project</h4>
                      </div>
                      <div>
                        <p>Lorem ipsum dolor sit amet, tetur adipiscing elit. Nullam ac sapien in erat commodo molestie.</p>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </Link>
                </li>
                <li>
                  <a href="#">
                  <div className="icon">
                      <img src="/images/create-team-icon.png" />
                    </div>
                    <div className="description">
                      <div>
                        <h4>Create Team</h4>
                      </div>
                      <div>
                        <p>Lorem ipsum dolor sit amet, tetur adipiscing elit. Nullam ac sapien in erat commodo molestie.</p>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </a>
                </li>
              </ul>
              <div className="submenu-backdrop active"></div>
            </div>
            <div className="bell-icon">
              <Link to="/">
                
              </Link>
            </div>
            <div className="user-icon">
              <button  className="logout-user">
                
              </button>
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