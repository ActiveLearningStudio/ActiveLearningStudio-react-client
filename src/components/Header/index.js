import React, { /* useEffect, useRef */ } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from 'assets/images/logo.svg';
import searchImg from 'assets/images/search.png';
import createProjectIcon from 'assets/images/create-project-icon.png';
import notificationImg from 'assets/images/notification.png';
import userImg from 'assets/images/user.png';
// import createTeamImg from 'assets/images/create-team.png';
import { startLogoutAction } from 'store/actions/auth';
import {
  showUserSubMenuAction,
  closeMenuAction,
  showCreateProjectSubmenuAction,
} from 'store/actions/project';
import { Event } from '../../trackers/ga';

import './style.scss';

function Header(props) {
  const {
    // showCreateProjectSubmenu,
    // showUserSubMenu,
    startLogout,
    // closeMenu,
  } = props;

  // const createProjNode = useRef();
  // const createTeamNode = useRef();

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClick);
  //   };
  // }, []);

  // const handleClick = (e) => {
  //   if (
  //     createProjNode.current.contains(e.target) ||
  //     createTeamNode.current.contains(e.target)
  //   ) {
  //     return;
  //   }
  //   closeMenu();
  // };

  return (
    <header>
      <div className="top_header flexdiv">
        <div className="tophd_left">
          <Link to="/" className="top_logo">
            <img src={logo} alt="logo" title="" />
          </Link>
        </div>

        <div className="tophd_right flexdiv">
          <div className="searchblock navbtn">
            <input
              type="text"
              className="searchterm"
              placeholder="Search existing content"
            />
            <button type="submit" className="search-submit">
              <img src={searchImg} alt="search" title="" />
            </button>
          </div>

          <div className="navbar_link">
            <ul className="top_info flexdiv">
              <li>
                <div className="dropdown create_project">
                  <span
                    className="dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon="plus-circle" />
                  </span>

                  <div
                    className="dropdown-menu user-dropdown"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <ul>
                      <Link to="/project/create" className="menuLinks">
                        <li>
                          <div className="notifybx">
                            <div className="notiy_icon">
                              <img
                                src={createProjectIcon}
                                alt="create"
                                title=""
                              />
                            </div>

                            <div className="notiy_det">
                              <div className="nav_title">
                                Create a New Project
                              </div>
                              <p>
                                A project gives you a place to build and
                                organize the amazing learning experiences
                                available in the Active Learning Studio.
                              </p>
                            </div>
                          </div>
                        </li>
                      </Link>

                      {/*
                      <Link to="#">
                        <li>
                          <div className="notifybx">
                            <div className="notiy_icon">
                              <img src={createTeamImg} alt="create-team" />
                            </div>
                            <div className="notiy_det">
                              <div className="nav_title">Create Team</div>
                              <p>
                                Increase productivity by making it easy for your
                                group to create memorable learning experiences
                                together.
                              </p>
                            </div>
                          </div>
                        </li>
                      </Link>
                      */}
                    </ul>
                  </div>
                </div>
              </li>

              <li>
                <Link to="#">
                  <img
                    src={notificationImg}
                    alt="notification"
                    title=""
                  />
                </Link>
              </li>

              <li className="mobile-links">
                <Link to="#">
                  <img src={searchImg} alt="search" />
                </Link>
              </li>

              <li className="menu-user-settings">
                <div className="dropdown">
                  <span
                    className="dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src={userImg} alt="user" title="" />
                  </span>
                  <div
                    className="dropdown-menu user-dropdown"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <ul>
                      <Link to="#">
                        <li>
                          Welcome &nbsp;
                          <span className="user-name-login">
                            {typeof window !== 'undefined'
                            && JSON.parse(window.localStorage.getItem('auth'))
                            && JSON.parse(window.localStorage.getItem('auth')).displayName}
                          </span>
                        </li>
                      </Link>

                      <Link to="#">
                        <li>My Account</li>
                      </Link>

                      <Link
                        to="#"
                        onClick={() => {
                          Event(
                            'button click',
                            'User press Logout button',
                            'Login Page',
                          );
                          startLogout();
                        }}
                      >
                        <li>Logout</li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  // showCreateProjectSubmenu: PropTypes.func.isRequired,
  // showUserSubMenu: PropTypes.func.isRequired,
  startLogout: PropTypes.func.isRequired,
  // closeMenu: PropTypes.func.isRequired,
};

// export default Header;
const mapDispatchToProps = (dispatch) => ({
  showCreateProjectSubmenu: () => dispatch(showCreateProjectSubmenuAction()),
  showUserSubMenu: () => dispatch(showUserSubMenuAction()),
  startLogout: () => dispatch(startLogoutAction()),
  closeMenu: () => dispatch(closeMenuAction()),
});

export default connect(null, mapDispatchToProps)(Header);
