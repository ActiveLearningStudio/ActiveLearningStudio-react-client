import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { SHOW_HELP } from 'store/actionTypes';
import { logoutAction } from 'store/actions/auth';
import { Event } from 'trackers/ga';

import help from 'assets/images/help.svg';
import edit from 'assets/images/edit1.png';
import changePassword from 'assets/images/changepassword.png';
import logoutIcon from 'assets/images/logout.png';

import HeaderNotification from './notification';
import SearchForm from './searchForm';
import MultitenancyDropdown from './multitenancyDropdown';

import './style.scss';

function Header(props) {
  const { logout } = props;
  const dispatch = useDispatch();
  const stateHeader = useSelector((state) => state.organization);
  const { user } = useSelector((state) => state.auth);
  const { permission } = stateHeader;
  const { currentOrganization } = stateHeader;

  return (
    <header>
      <div className="top-header flex-div align-items-center">
        <div className="group-search-logo">
          <div className="tophd_left">
            <Link to={`/org/${stateHeader?.currentOrganization?.domain}`} className="top_logo">
              <div
                className="nav-logo"
                style={{
                  backgroundImage: `url(${global.config.resourceUrl + currentOrganization?.image})`,
                  backgroundPosition: 'left',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </Link>
          </div>
        </div>
        <div className="tophd_right flexdiv search-div  d-flex">
          {(permission?.Search?.includes('search:advance') || permission?.Search?.includes('search:dashboard')) && (
            <div className="search-div">
              <SearchForm />
            </div>
          )}
          <div className="navbar-link">
            <ul className="top-info flex-div">
              <li>
                <MultitenancyDropdown />
              </li>
              <li>
                <div
                  style={{ cursor: 'pointer', textAlign: 'center' }}
                  onClick={() => {
                    dispatch({
                      type: SHOW_HELP,
                      payload: true,
                    });
                  }}
                >
                  <img src={help} alt="help" />
                  <p className="header-icon-text">Help</p>
                </div>
              </li>

              <HeaderNotification />

              <li className="menu-user-settings d-flex align-items-center">
                <Dropdown>
                  <Dropdown.Toggle className="align-items-center">
                    <div className="profile-avatar">{user?.first_name[0]}</div>
                    <p className="header-icon-text">My Profile</p>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="user-dropdown">
                    <div className="user-dropdown-item-name">
                      <div className="profile-avatar">{user?.first_name[0]}</div>
                      <div className="basic-info">
                        <b>
                          <p className="name">
                            {user?.first_name}
                            &nbsp;
                            {user?.last_name}
                          </p>
                        </b>
                        <p className="email">{user?.email}</p>
                      </div>
                    </div>
                    <hr />
                    <Dropdown.Item as={Link} to={`/org/${stateHeader.currentOrganization?.domain}/account`}>
                      <div className="user-dropdown-item">
                        <img src={edit} alt="edit" />
                        My Account
                      </div>
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item as={Link} to={`/org/${stateHeader.currentOrganization?.domain}/change-password`}>
                      <div className="user-dropdown-item">
                        <img className="img-change-password" src={changePassword} alt="changePassword" />
                        Change Password
                      </div>
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item
                      href="#"
                      onClick={() => {
                        Event('button click', 'User press Logout button', 'Login Page');
                        logout();
                      }}
                    >
                      <div className="user-dropdown-item">
                        <img src={logoutIcon} alt="logoutIcon" />
                        Logout
                      </div>
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
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
