/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { SHOW_HELP } from 'store/actionTypes';
import { logoutAction } from 'store/actions/auth';
import { Event } from 'trackers/ga';

import HeaderNotification from './notification';
import MultitenancyDropdown from './multitenancyDropdown';

import './style.scss';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

function Header(props) {
  const { logout } = props;
  const dispatch = useDispatch();
  const stateHeader = useSelector((state) => state.organization);
  const { user } = useSelector((state) => state.auth);
  const { currentOrganization } = stateHeader;
  const [primaryColor, setPrimaryColor] = useState();
  useEffect(() => {
    const primaryColorFunction = getGlobalColor('--main-primary-color');
    setPrimaryColor(primaryColorFunction);
  }, [currentOrganization]);
  return (
    <header>
      <div className="top-header flex-div align-items-center">
        <div className="group-search-logo">
          <div className="tophd_left">
            <Link to={`/org/${stateHeader?.currentOrganization?.domain}`} className="top_logo">
              <div
                className="nav-logo"
                style={{
                  backgroundImage:
                    !!currentOrganization?.image && currentOrganization?.image.includes('dev.currikistudio')
                      ? `url(${currentOrganization?.image})`
                      : `url(${global.config.resourceUrl}${currentOrganization?.image})`,
                  backgroundPosition: 'left',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </Link>
          </div>
        </div>
        <div className="tophd_right flexdiv search-div  d-flex">
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
                  {/* <img src={help} alt="help" /> */}
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 21C17.4706 21 21.5 16.9706 21.5 12C21.5 7.02944 17.4706 3 12.5 3C7.52944 3 3.5 7.02944 3.5 12C3.5 16.9706 7.52944 21 12.5 21Z" stroke={primaryColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9.88086 9.30012C10.0925 8.69862 10.5101 8.19142 11.0598 7.86834C11.6095 7.54527 12.2559 7.42717 12.8843 7.53496C13.5128 7.64276 14.0828 7.96949 14.4934 8.4573C14.9041 8.9451 15.1288 9.56249 15.1279 10.2001C15.1279 12.0001 12.4279 12.9001 12.4279 12.9001" stroke={primaryColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12.5 16.5H12.5094" stroke={primaryColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p className="header-icon-text">Help</p>
                </div>
              </li>

              <HeaderNotification />

              <li className="menu-user-settings d-flex align-items-center">
                <Dropdown>
                  <Dropdown.Toggle className="align-items-center">
                    <div className="profile-avatar" style={{ backgroundColor: primaryColor }}>
                      {user?.first_name[0]}
                    </div>
                    <p className="header-icon-text">Profile</p>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="user-dropdown">
                    <div className="user-dropdown-item-name">
                      <div className="profile-avatar" style={{ backgroundColor: primaryColor }}>
                        {user?.first_name[0]}
                      </div>
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
                        {/* <img src={edit} alt="edit" /> */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.0512 4.89746H4.78915C4.31464 4.89746 3.85956 5.08596 3.52403 5.42149C3.1885 5.75702 3 6.2121 3 6.68661V19.2106C3 19.6851 3.1885 20.1402 3.52403 20.4757C3.85956 20.8113 4.31464 20.9998 4.78915 20.9998H17.3132C17.7877 20.9998 18.2428 20.8113 18.5783 20.4757C18.9138 20.1402 19.1023 19.6851 19.1023 19.2106V12.9486"
                            stroke={primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.7602 3.55582C18.1161 3.19993 18.5988 3 19.1021 3C19.6054 3 20.088 3.19993 20.4439 3.55582C20.7998 3.9117 20.9997 4.39438 20.9997 4.89768C20.9997 5.40097 20.7998 5.88365 20.4439 6.23954L11.9455 14.738L8.36719 15.6326L9.26176 12.0543L17.7602 3.55582Z"
                            stroke={primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        My Account
                      </div>
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item as={Link} to={`/org/${stateHeader.currentOrganization?.domain}/change-password`}>
                      <div className="user-dropdown-item">
                        {/* <img
                          className="img-change-password"
                          src={changePassword}
                          alt="changePassword"
                        /> */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M18.2222 11.1025H5.77778C4.79594 11.1025 4 11.9082 4 12.9021V19.2005C4 20.1944 4.79594 21.0001 5.77778 21.0001H18.2222C19.2041 21.0001 20 20.1944 20 19.2005V12.9021C20 11.9082 19.2041 11.1025 18.2222 11.1025Z"
                            stroke={primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.55567 11.1025V7.50342C7.55456 6.38774 7.96303 5.31144 8.70178 4.48347C9.44052 3.65549 10.4568 3.13491 11.5534 3.02279C12.65 2.91066 13.7487 3.21499 14.6361 3.8767C15.5235 4.5384 16.1363 5.51028 16.3557 6.60365"
                            stroke={primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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
                        {/* <img src={logoutIcon} alt="logoutIcon" /> */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
                            stroke={primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path d="M10 17L15 12L10 7" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M15 12H3" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
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
