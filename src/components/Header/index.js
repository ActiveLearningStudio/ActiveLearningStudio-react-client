import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from 'assets/images/logo.svg';
import { startLogoutAction } from 'store/actions/auth';
import {
  showUserSubMenuAction,
  closeMenuAction,
  showCreateProjectSubmenuAction,
} from 'store/actions/project';

import './style.scss';

function Header(props) {
  const createProjNode = useRef();
  const createTeamNode = useRef();

  const {
    project,
    closeMenu,
    showCreateProjectSubmenu,
    showUserSubMenu,
    startLogout,
  } = props;

  const handleClick = useCallback((e) => {
    if (
      createProjNode.current.contains(e.target)
      || createTeamNode.current.contains(e.target)
    ) {
      return;
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
              <img src="/assets/images/search.png" alt="search" title="" />
            </button>
          </div>
          <div className="navbar_link">
            <ul className="top_info flexdiv">
              <li
                className={
                  project.showCreateProjectSubmenu
                    ? 'active has-sub button-dropdown'
                    : 'hide has-sub button-dropdown'
                }
              >
                <Link
                  to="#"
                  className="addtop dropdown-toggle"
                  onClick={showCreateProjectSubmenu}
                >
                  <i className="fa fa-plus-circle" aria-hidden="true" />
                </Link>

                <div className="navmenu dropdown-menu" ref={createProjNode}>
                  <ul>
                    <Link to="/project/create" className="menuLinks">
                      <li>
                        <div className="notifybx">
                          <div className="notiy_icon">
                            <img src="/assets/images/create-project-icon.png" alt="create" />
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
                            <img src="/assets/images/create-team.png" alt="create-team" />
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

              <li>
                <Link to="#">
                  <img src="/assets/images/notification.png" alt="notification" />
                </Link>
              </li>

              <li className="mobile-links">
                <Link to="#">
                  <img src="/assets/images/search.png" alt="search" />
                </Link>
              </li>

              <li
                className={
                  project.showUserSubMenu
                    ? 'active button-dropdown'
                    : 'hide active button-dropdown'
                }
              >
                <Link to="#" className="dropbtn">
                  <img
                    src="/assets/images/user.png"
                    alt="user"
                    onClick={showUserSubMenu}
                  />
                </Link>

                <div className="dropdown-content" ref={createTeamNode}>
                  <ul className="dropdown-menu user-dropdown">
                    <Link to="#">
                      <li>
                        Welcome &nbsp;
                        <span className="usernamelogin">
                          {typeof window !== 'undefined'
                            && JSON.parse(window.localStorage.getItem('auth'))
                            && JSON.parse(window.localStorage.getItem('auth')).displayName}
                        </span>
                      </li>
                    </Link>

                    <Link to="#">
                      <li>My Account</li>
                    </Link>

                    <Link to="#" onClick={startLogout}>
                      <li>Logout</li>
                    </Link>
                  </ul>
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
  project: PropTypes.object.isRequired,
  closeMenu: PropTypes.func.isRequired,
  showCreateProjectSubmenu: PropTypes.func.isRequired,
  showUserSubMenu: PropTypes.func.isRequired,
  startLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showCreateProjectSubmenu: () => dispatch(showCreateProjectSubmenuAction()),
  showUserSubMenu: () => dispatch(showUserSubMenuAction()),
  startLogout: () => dispatch(startLogoutAction()),
  closeMenu: () => dispatch(closeMenuAction()),
});

export default connect(null, mapDispatchToProps)(Header);
