import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import
{
// setActiveOrganization,
  updateOrganizationScreen,
//  getOrganizationFirstTime
}
  from 'store/actions/organization';
import logo from 'assets/images/studio_new_logo.png';
import Katylogo from 'assets/images/Katy_logo.png';
import bu from 'assets/images/bu.png';
import safari from 'assets/images/safari.png';
import shepherds from 'assets/images/shepherds.svg';
import sndt from 'assets/images/SNDT-LOGO-blue.png';
import nevada from 'assets/images/nevada.png';
import { SHOW_HELP } from 'store/actionTypes';
import add from 'assets/images/add-icon.png';
// import profile from 'assets/images/user-profile.png';
import searchImg from 'assets/images/search.png';
import createProjectIcon from 'assets/images/create-project-icon.png';
import help from 'assets/images/help.png';
import edit from 'assets/images/edit1.png';
import changePassword from 'assets/images/changepassword.png';
import logoutIcon from 'assets/images/logout.png';
import openeducation from 'assets/images/openeducation.png';
// import dashboard from 'assets/images/dashboard.png';
import { logoutAction } from 'store/actions/auth';
import { Event } from 'trackers/ga';

import MultitenancyDropdown from './multitenancyDropdown';
import SearchForm from './searchForm';
import HeaderNotification from './notification';

import './style.scss';
// import urllink from 'socket.io-client/lib/url';

function Header(props) {
  const { /* user, */ logout } = props;
  const stateHeader = useSelector((state) => state.organization);
  const { user } = useSelector((state) => state.auth);
  const { permission: { Project } } = stateHeader;
  const { permission } = stateHeader;
  const dispatch = useDispatch();
  const { currentOrganization } = stateHeader;
  const [image, setImage] = useState(null);
  const [defaultLogo, setdefaultLogo] = useState(logo);
  // useMemo(() => {
  //   dispatch(getOrganizationFirstTime(stateHeader?.currentOrganization?.id));
  // }, [stateHeader?.currentOrganization?.id]);
  useEffect(() => {
    if (currentOrganization?.id === 1) {
      setImage(null);
      if (window.location.host.includes('katyisd')) {
        setdefaultLogo(Katylogo);
      } else if (window.location.host.includes('baylor')) {
        setdefaultLogo(bu);
      } else if (window.location.host.includes('scde')) {
        setdefaultLogo(safari);
      } else if (window.location.host.includes('shepherds')) {
        setdefaultLogo(shepherds);
      } else if (window.location.host.includes('sndt')) {
        setdefaultLogo(sndt);
      } else if (window.location.host.includes('nvdoe')) {
        setdefaultLogo(nevada);
      } else if (window.location.host.includes('open.curriki')) {
        setdefaultLogo(openeducation);
      } else {
        setdefaultLogo(logo);
      }
    } else {
      setImage(currentOrganization?.image);
    }
  }, [currentOrganization]);
  return (
    <header>
      <div className="top-header flex-div align-items-center">
        <div className="group-search-logo">
          <div className="tophd_left">
            <Link to={`/studio/org/${stateHeader?.currentOrganization?.domain}`} className="top_logo">
              {image ? (
                <div
                  className="nav-logo"
                  style={{
                  backgroundImage: `url(${global.config.resourceUrl + image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  }}
                />
              ) : (
                <div
                  className="nav-logo"
                  style={{
                  backgroundImage: `url(${defaultLogo})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  }}
                />
              )}
            </Link>
          </div>
        </div>
        <div className="tophd_right flexdiv search-div  d-flex flex-wrap ">
          {(permission?.Search?.includes('search:advance') || permission?.Search?.includes('search:dashboard'))
           && (
             <div className="search-div">
               <SearchForm />
             </div>
           )}
          <div className="navbar-link">
            <ul className="top-info flex-div">
              {false && permission?.Organization?.includes('organization:view') && (
                <>
                  <li>
                    <Link
                      to={`/studio/org/${stateHeader.currentOrganization?.domain}/manage`}
                      onClick={() => {
                        if (stateHeader.currentOrganization) {
                          // dispatch(setActiveOrganization(stateHeader.currentOrganization));
                          dispatch(updateOrganizationScreen('intro'));
                        }
                      }}
                    >
                      <FontAwesomeIcon icon="briefcase" />
                      <p className="header-icon-text">
                        Manage Organization
                        {/* {stateHeader.currentOrganization?.domain} */}
                      </p>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <MultitenancyDropdown />
              </li>
              <li>
                <div
                  style={{ padding: '0.375rem 0.75rem', cursor: 'pointer' }}
                  onClick={() => {
                    dispatch({
                      type: SHOW_HELP,
                      payload: true,
                    });
                  }}
                >
                  <img src={help} alt="help" />
                  <p className="header-icon-text">
                    Help
                  </p>
                </div>
              </li>
              {false && Project?.includes('project:create') && (
                <li className="align-items-center" style={{ paddingTop: '4px' }}>
                  <Dropdown className="create-project">
                    <Dropdown.Toggle className="align-items-center">
                      <img src={add} alt="add" />
                      <p className="header-icon-text">Create</p>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="user-dropdown">
                      <Dropdown.Item as={Link} to={`/studio/org/${stateHeader.currentOrganization?.domain}/project/create`} className="menuLinks">
                        <div className="notify-box">
                          <div className="notify-icon">
                            <img src={createProjectIcon} alt="create" />
                          </div>
                          <div className="notify-description">
                            <div className="nav-title">Create a New Project</div>
                            <p>
                              A project gives you a place to build and organize the
                              amazing learning experiences available in the Active
                              Learning Studio.
                            </p>
                          </div>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              )}
              <HeaderNotification />
              <li className="mobile-links">
                <Link to="#">
                  <img src={searchImg} alt="search" />
                </Link>
              </li>
              <li className="menu-user-settings d-flex align-items-center">
                <Dropdown>
                  <Dropdown.Toggle className="align-items-center">
                    <div className="profile-avatar">
                      {user?.first_name[0]}
                    </div>
                    <p className="header-icon-text">My Profile</p>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="user-dropdown">
                    {/* <Dropdown.Item to="#">
                      Welcome &nbsp;
                      <span className="user-name-login">
                        {user && user.displayName}
                      </span>
                    </Dropdown.Item> */}
                    {/* <Dropdown.Item className="align-items-center"> */}
                    <div className="user-dropdown-item-name">
                      <div className="profile-avatar">
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
                    {/* </Dropdown.Item> */}
                    {/* <Dropdown.Item as={Link} to={`/org/${stateHeader.currentOrganization?.domain}/dashboard`}>
                      <div className="user-dropdown-item">
                        <img className="img-dhashboard" src={dashboard} alt="dashboard" />
                        Dashboard
                      </div>
                      <hr />
                    </Dropdown.Item> */}

                    <Dropdown.Item as={Link} to={`/studio/org/${stateHeader.currentOrganization?.domain}/account`}>
                      <div className="user-dropdown-item">
                        <img src={edit} alt="edit" />
                        My Account
                      </div>
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item as={Link} to={`/studio/org/${stateHeader.currentOrganization?.domain}/change-password`}>
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
