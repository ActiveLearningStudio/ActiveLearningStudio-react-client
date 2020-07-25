import React, {
  useCallback,
  useEffect,
  useRef,
  // useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from 'assets/images/logo.svg';
import searchImg from 'assets/images/search.png';
// import createProjectImg from 'assets/images/create-project-icon.png';
// import createTeamImg from 'assets/images/create-team.png';
import notificationImg from 'assets/images/notification.png';
import userImg from 'assets/images/user.png';
import { logoutAction } from 'store/actions/auth';
import {
  showUserSubMenuAction,
  closeMenuAction,
  showCreateProjectSubmenuAction,
} from 'store/actions/project';
import { Event } from 'trackers/ga';

import './style.scss';

// TODO: need to clean up attributes, update import asset
function Header(props) {
  const createProjNode = useRef();
  const createTeamNode = useRef();

  const {
    // project,
    closeMenu,
    // showCreateProjectSubmenu,
    // showUserSubMenu,
    startLogout,
  } = props;

  const handleClick = useCallback((e) => {
    if (
      createProjNode.current && createTeamNode.current
      && (createProjNode.current.contains(e.target) || createTeamNode.current.contains(e.target))
    ) {
      // return;
    }

    closeMenu();
  }, [closeMenu]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

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
              {/*
              <li
                className={
                  project && project.showCreateProjectSubmenu
                    ? 'active has-sub button-dropdown'
                    : 'hide has-sub button-dropdown'
                }
              >
                <Link
                  to="#"
                  className="addtop dropdown-toggle"
                  onClick={showCreateProjectSubmenu}
                >
                  <FontAwesomeIcon icon="plus-circle" />
                </Link>

                <div className="navmenu dropdown-menu" ref={createProjNode}>
                  <ul>
                    <Link to="/project/create" className="menuLinks">
                      <li>
                        <div className="notifybx">
                          <div className="notiy_icon">
                            <img src={createProjectImg} alt="create" />
                          </div>

                          <div className="notiy_det">
                            <div className="nav_title">
                              Create a New Project
                            </div>
                            <p>
                              A project gives you a place to build and organize
                              the amazing learning experiences available in the
                              Active Learning Studio.
                            </p>
                          </div>
                        </div>
                      </li>
                    </Link>

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
                  </ul>
                </div>
              </li>
              */}

              <li>
                <Link to="#" style={{ marginTop: 6 }}>
                  <img src={notificationImg} alt="notification" style={{ verticalAlign: 'top' }} />
                </Link>
              </li>

              <li className="mobile-links">
                <Link to="#">
                  <img src={searchImg} alt="search" />
                </Link>
              </li>

              <li>
                <Dropdown>
                  <Dropdown.Toggle>
                    <img src={userImg} alt="user" title="" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#">
                      Welcome &nbsp;
                      <span className="user-name-login">
                        {typeof window !== 'undefined'
                        && JSON.parse(window.localStorage.getItem('auth'))
                        && JSON.parse(window.localStorage.getItem('auth')).displayName}
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item href="#">My Account</Dropdown.Item>
                    <Dropdown.Item
                      href="#"
                      onClick={() => {
                        Event(
                          'button click',
                          'User press Logout button',
                          'Login Page',
                        );
                        startLogout();
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  // project: PropTypes.object,
  closeMenu: PropTypes.func.isRequired,
  // showCreateProjectSubmenu: PropTypes.func.isRequired,
  // showUserSubMenu: PropTypes.func.isRequired,
  startLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  // project: null,
};

const mapDispatchToProps = (dispatch) => ({
  showCreateProjectSubmenu: () => dispatch(showCreateProjectSubmenuAction()),
  showUserSubMenu: () => dispatch(showUserSubMenuAction()),
  startLogout: () => dispatch(logoutAction()),
  closeMenu: () => dispatch(closeMenuAction()),
});

export default connect(null, mapDispatchToProps)(Header);
