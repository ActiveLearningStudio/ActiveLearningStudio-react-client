/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import { SHOW_HELP } from "store/actionTypes";
import { logoutAction } from "store/actions/auth";
import { toggleSideBar } from "store/actions/msTeams";
import { Event } from "trackers/ga";

import HeaderNotification from "./notification";
import MultitenancyDropdown from "./multitenancyDropdown";

import "./style.scss";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import HelpSvg from "iconLibrary/header/HelpSvg";
import EditMdSvg from "iconLibrary/mainContainer/EditMdSvg";
import ChangePasswordMdSvg from "iconLibrary/header/ChangePasswordMdSvg";
import LogoutMdSvg from "iconLibrary/header/LogoutMdSvg";
import HeaderHambergSvg from "iconLibrary/header/HeaderHambergSvg";
import Forum from "iconLibrary/header/Forum";
import Community from "iconLibrary/header/Community";
import Group from "iconLibrary/header/Group";
function Header(props) {
  const { logout, toggleMenuSideBar } = props;
  const dispatch = useDispatch();
  const stateHeader = useSelector((state) => state.organization);
  const { user } = useSelector((state) => state.auth);
  const { currentOrganization } = stateHeader;
  const [primaryColor, setPrimaryColor] = useState();
  const hideShowSideBar = useSelector(
    (state) => state.msTeams.toggle_sidebar
  );
  const isMsTeam = useSelector((state) => state.msTeams.is_msteam);
  useEffect(() => {
    const primaryColorFunction = getGlobalColor(
      "--main-primary-color"
    );
    setPrimaryColor(primaryColorFunction);
  }, [currentOrganization]);

  // const toggleSideBar = () =>{
  //   console.log(user?.lms);
  //   console.log(hideShowSideBar);
  //     setHideShowSideBar(!hideShowSideBar)
  // }
  return (
    <header>
      <div className="top-header flex-div align-items-center">
        <div className="group-search-logo">
          {isMsTeam == true && (
            <a
              href="#"
              style={{ marginRight: "12px" }}
              onClick={() => toggleMenuSideBar(!hideShowSideBar)}
              className={`${
                hideShowSideBar == false ? "expand-hamberg" : ""
              }`}
            >
              <HeaderHambergSvg primaryColor={primaryColor} />
            </a>
          )}
          <div className="tophd_left">
            <Link
              to={`/org/${stateHeader?.currentOrganization?.domain}`}
              className="top_logo"
            >
              <div
                className="nav-logo"
                style={{
                  backgroundImage:
                    !!currentOrganization?.image &&
                    currentOrganization?.image.includes(
                      "dev.currikistudio"
                    )
                      ? `url(${currentOrganization?.image})`
                      : `url(${global.config.resourceUrl}${currentOrganization?.image})`,
                  backgroundPosition: "left",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
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
              {/* <li className="menu-user-settings d-flex align-items-center">
                <Dropdown>
                  <Dropdown.Toggle className="align-items-center">
                    <Community primaryColor={primaryColor} />
                    <p className="header-icon-text">Community</p>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="user-dropdown">
                    <Dropdown.Item
                      target="_blank"
                      href={`https://www.currikistudio.org/groups/`}
                    >
                      <div className="user-dropdown-item">
                        <Group primaryColor={primaryColor} />
                        Groups
                      </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                      target="_blank"
                      href={`https://www.currikistudio.org/forums/`}
                    >
                      <div className="user-dropdown-item">
                        <Forum primaryColor={primaryColor} />
                        Forums
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li> */}
              <li>
                <a
                  style={{ cursor: "pointer", textAlign: "center" }}
                  onClick={() => {
                    Swal.fire({
                      customClass: "help-redirect-icon",
                      text:
                        "Curriki Help will open in a new tab in your browser. Click Open to proceed or Cancel to stay where you are.",
                      showCancelButton: true,
                      confirmButtonText: "Open",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        window.open(
                          "https://www.currikistudio.org/help/",
                          "_blank"
                        );
                      } else if (result.isDenied) {
                        Swal.close();
                      }
                    });
                  }}
                  // href="https://www.currikistudio.org/help/"
                  // target="_blank"
                >
                  <HelpSvg primaryColor={primaryColor} />

                  <p className="header-icon-text">Help</p>
                </a>
              </li>

              <HeaderNotification />

              {!isMsTeam && (
                <li className="menu-user-settings d-flex align-items-center">
                  <Dropdown>
                    <Dropdown.Toggle className="align-items-center">
                      <div
                        className="profile-avatar"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {user?.first_name[0]}
                      </div>
                      <p className="header-icon-text">Profile</p>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="user-dropdown">
                      <div className="user-dropdown-item-name">
                        <div
                          className="profile-avatar"
                          style={{ backgroundColor: primaryColor }}
                        >
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
                      <Dropdown.Item
                        as={Link}
                        to={`/org/${stateHeader.currentOrganization?.domain}/account`}
                      >
                        <div className="user-dropdown-item">
                          <EditMdSvg primaryColor={primaryColor} />
                          My Account
                        </div>
                      </Dropdown.Item>

                      <Dropdown.Item
                        as={Link}
                        to={`/org/${stateHeader.currentOrganization?.domain}/change-password`}
                      >
                        <div className="user-dropdown-item">
                          {/* <img
                            className="img-change-password"
                            src={changePassword}
                            alt="changePassword"
                          /> */}
                          <ChangePasswordMdSvg
                            primaryColor={primaryColor}
                          />
                          Change Password
                        </div>
                      </Dropdown.Item>

                      <Dropdown.Item
                        href="#"
                        onClick={() => {
                          Event(
                            "button click",
                            "User press Logout button",
                            "Login Page"
                          );
                          logout();
                        }}
                      >
                        <div className="user-dropdown-item">
                          <LogoutMdSvg primaryColor={primaryColor} />
                          Logout
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              )}
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
  toggleMenuSideBar: (action) => dispatch(toggleSideBar(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
