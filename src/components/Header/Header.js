import React from "react";
import "./Header.scss";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import {AUTH_LOGOUT} from './../../constants/actionTypes'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { logout } from "../../actions/auth";

import {showCreateProjectSubmenuAction} from './../../actions/project'



function Header(props) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
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
        <div className="search-bar">
          <input type="text" name="search" placeholder="Search existing content" />
        </div>
        <div className="bell-user">
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
                        <p>A project gives you a place to build and organize the amazing learning experiences available in the Active Learning Studio.</p>
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
                        <p>Increase productivity by making it easy for your group to create memorable learning experiences together.</p>
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
              <button>
                
              </button>
            </div>
            <div className="logout-icon">
              <button onClick={() =>
                    dispatch({
                      type: AUTH_LOGOUT
                    })}>
                <i className="fa fa-sign-out"></i>
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

// export default Header;



const mapDispatchToProps = dispatch => {
  return {
    showCreateProjectSubmenuAction: () => dispatch(showCreateProjectSubmenuAction())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Header);