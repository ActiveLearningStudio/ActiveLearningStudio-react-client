import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Event } from "../../trackers/ga";
import { Link } from "react-router-dom";
import { startLogoutAction } from "../../actions/auth";
import {
  showUserSubMenuAction,
  closeMenuAction,
  showCreateProjectSubmenuAction,
} from "./../../actions/project";
import logo from "../../images/logo.svg";
import "./Header.scss";

function Header(props) {
  const createProjNode = useRef();
  const createTeamNode = useRef();

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClick);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClick);
  //   };
  // }, []);

  // const handleClick = (e) => {
  //   const { closeMenuAction } = props;
  //   if (
  //     createProjNode.current.contains(e.target) ||
  //     createTeamNode.current.contains(e.target)
  //   ) {
  //     return;
  //   }

  // closeMenuAction();
  //};

  return (
    <header>
      <div className="top_header flexdiv">
        <div className="tophd_left">
          <Link to="/" className="top_logo">
            <img src={logo} alt="logo" title=""></img>
          </Link>
        </div>
        <div className="tophd_right flexdiv">
          <div className="searchblock navbtn">
            <input
              type="text"
              className="searchterm"
              placeholder="Search existing content"
            ></input>
            <button type="submit" className="search-submit">
              <img src="/images/search.png" alt="search" title=""></img>
            </button>
          </div>
          <div className="navbar_link">
            <ul className="top_info flexdiv">
              <li>
                <div class="dropdown create_project  ">
                  <span
                    class="dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>{" "}
                  </span>
                  <div
                    class="dropdown-menu user-dropdown"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <ul>
                      <Link to="/project/create" className="menuLinks">
                        <li>
                          <div className="notifybx">
                            <div className="notiy_icon">
                              <img
                                src="/images/create-project-icon.png"
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
                      <Link to="#">
                        <li>
                          <div className="notifybx">
                            <div className="notiy_icon">
                              <img
                                src="/images/create-team.png"
                                alt="create-team"
                              ></img>
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
                </div>
              </li>
              <li>
                <Link to="#">
                  <img
                    src="/images/notification.png"
                    alt="notification"
                    title=""
                  ></img>{" "}
                </Link>
              </li>
              <li className="mobile-links">
                <Link to="#">
                  <img src="/images/search.png" alt="search"></img>
                </Link>
              </li>
              <li className="menuusersettings">
                <div class="dropdown">
                  <span
                    class="dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src="/images/user.png" alt="user" title="" />
                  </span>
                  <div
                    class="dropdown-menu user-dropdown"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <ul>
                      <Link to="#">
                        <li>
                          Welcome &nbsp;
                          <span className="usernamelogin">
                            {typeof window != "undefined" &&
                              JSON.parse(window.localStorage.getItem("auth")) &&
                              JSON.parse(window.localStorage.getItem("auth"))
                                .displayName}
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
                            "button click",
                            "User press Logout button",
                            "Login Page"
                          );
                          props.startLogoutAction();
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

// export default Header;
const mapDispatchToProps = (dispatch) => {
  return {
    showCreateProjectSubmenuAction: () =>
      dispatch(showCreateProjectSubmenuAction()),
    showUserSubMenuAction: () => dispatch(showUserSubMenuAction()),
    startLogoutAction: () => dispatch(startLogoutAction()),
    closeMenuAction: () => dispatch(closeMenuAction()),
  };
};

export default connect(null, mapDispatchToProps)(Header);
