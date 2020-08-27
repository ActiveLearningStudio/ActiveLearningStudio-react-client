import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';

import logo from 'assets/images/logo.svg';
import searchImg from 'assets/images/search.png';
import createProjectIcon from 'assets/images/create-project-icon.png';
import notificationImg from 'assets/images/notification.png';
import userImg from 'assets/images/user.png';
// import createTeamImg from 'assets/images/create-team.png';
import { logoutAction } from 'store/actions/auth';
import { Event } from '../../trackers/ga';

import './style.scss';

function Header(props) {
  const { user, logout } = props;

  return (
    <header>
      <div className="top-header flex-div align-items-center">
        <div className="tophd_left">
          <Link to="/" className="top_logo">
            <img src={logo} alt="logo" title="" />
          </Link>
        </div>

        <div className="top-header-right d-flex flex-wrap align-items-center">
          <div className="search-block navbtn">
            <input
              type="text"
              className="search-term"
              placeholder="Search existing content"
            />
            <button type="submit" className="search-submit">
              <img src={searchImg} alt="search" title="" />
            </button>
          </div>

          <div className="navbar-link">
            <ul className="top-info flex-div">
              <li className="d-flex align-items-center">
                <Dropdown className="create-project">
                  <Dropdown.Toggle className="d-flex align-items-center">
                    <FontAwesomeIcon icon="plus-circle" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="user-dropdown">
                    <Dropdown.Item as={Link} to="/project/create" className="menuLinks">
                      <div className="notify-box">
                        <div className="notify-icon">
                          <img src={createProjectIcon} alt="create" />
                        </div>

                        <div className="notify-description">
                          <div className="nav-title">
                            Create a New Project
                          </div>
                          <p>
                            A project gives you a place to build and
                            organize the amazing learning experiences
                            available in the Active Learning Studio.
                          </p>
                        </div>
                      </div>
                    </Dropdown.Item>

                    {/*
                    <Dropdown.Item to="#" className="menuLinks">
                      <div className="notify-box">
                        <div className="notify-icon">
                          <img src={createTeamImg} alt="create-team" />
                        </div>
                        <div className="notify-description">
                          <div className="nav-title">Create Team</div>
                          <p>
                            Increase productivity by making it easy for your
                            group to create memorable learning experiences
                            together.
                          </p>
                        </div>
                      </div>
                    </Dropdown.Item>
                    */}
                  </Dropdown.Menu>
                </Dropdown>
              </li>

              <li className="d-flex align-items-center justify-content-center">
                <Link to="#">
                  <img src={notificationImg} alt="notification" />
                </Link>
              </li>

              <li className="mobile-links">
                <Link to="#">
                  <img src={searchImg} alt="search" />
                </Link>
              </li>

              <li className="menu-user-settings d-flex align-items-center">
                <Dropdown>
                  <Dropdown.Toggle className="d-flex align-items-center">
                    <img src={userImg} alt="user" title="" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="user-dropdown">
                    <Dropdown.Item to="#">
                      Welcome &nbsp;
                      <span className="user-name-login">
                        {user && user.displayName}
                      </span>
                    </Dropdown.Item>

                    <Dropdown.Item as={Link} to="/account">
                      My Account
                    </Dropdown.Item>

                    <Dropdown.Item
                      href="#"
                      onClick={() => {
                        Event(
                          'button click',
                          'User press Logout button',
                          'Login Page',
                        );
                        logout();
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
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
