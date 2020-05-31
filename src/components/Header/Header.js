import React from "react";
// import { useHistory } from "react-router-dom";

// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { connect } from "react-redux";
// import {AUTH_LOGOUT} from './../../constants/actionTypes'

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import { startLogoutAction } from "../../actions/auth";
import { showCreateProjectSubmenuAction } from './../../actions/project'
import { showUserSubMenuAction } from './../../actions/project'
import "./Header.scss";



function Header(props) {
//   const state = useSelector(state => state);
//   const dispatch = useDispatch();
  return (
      <header>
          <div className="top_header flexdiv">
               <div className="tophd_left">
                  <a href="/" className="top_logo">
                      <img src="/images/logo.png" alt="logo" title=""></img>
                  </a>
              </div>
              <div className="tophd_right flexdiv">
                    <div className="searchblock navbtn">
                        <input type="text" className="searchterm" placeholder="Search existing content"></input>
                        <button type="submit" className="search-submit">
                            <img src="/images/search.png" alt="search" title="" ></img>
                      </button>
                  </div>
                  <div className="navbar_link">
                      <ul className="top_info flexdiv">
                          <li className={props.project.showCreateProjectSubmenu ? 'active has-sub button-dropdown' : 'hide  has-sub button-dropdown'}>
                            <a href="#" className="addtop dropdown-toggle" className='addtop dropdown-toggle' onClick={() => props.showCreateProjectSubmenuAction()}>
                                <img src="/images/plus-icon.png" alt="plus" title="" />
                            </a> 
                            <div className="navmenu dropdown-menu">
                                <ul> 
                                      <li>
                                            <a href="/project/create">
                                                <div className="notifybx">
                                                    <div className="notiy_icon">
                                                        <img src="/images/create-project-icon.png" alt="create" title="" />
                                                    </div>
                                                    <div className="notiy_det">
                                                        <div className="nav_title">Create a New Project</div>
                                                        <p>A project gives you a place to build and organize the amazing learning experiences available in the Active Learning Studio.</p>
                                                    </div>
                                                </div>
                                            </a>
                                    </li>
                                      <li>
                                          <a href="#">
                                            <div className="notifybx">
                                                <div className="notiy_icon">
                                                    <img src="/images/create-team.png" alt="create-team"></img>
                                                </div>
                                                <div className="notiy_det">
                                                    <div className="nav_title">Create Team</div>
                                                    <p>Increase productivity by making it easy for your group to create memorable learning experiences together.</p>
                                                </div>
                                            </div>
                                            </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li> 
                            <a href=""><img src="/images/notification.png" alt="notification" title=""></img> </a>
                        </li>
                        <li className="mobile-links">
                            <a href="#"><img src="/images/search.png" alt="search"></img></a>
                        </li>
                        <li className={props.project.showUserSubMenu ? "active button-dropdown" : "hide active button-dropdown"}>
                              <a href="#" className="dropbtn"> <img src="/images/user.png" alt="user" title=""
                               onClick={() => props.showUserSubMenuAction()}></img></a>
                                <div id="myDropdown" className="dropdown-content ">
                                    <ul className="dropdown-menu user-dropdown">
                                        <li>Welcome to User</li>
                                        <li><a href="#">My Account</a></li>
                                        <li><a href="#" onClick={props.startLogoutAction}>Logout</a></li>
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

// export default Header;



const mapDispatchToProps = dispatch => {
  return {
    showCreateProjectSubmenuAction: () => dispatch(showCreateProjectSubmenuAction()),
    showUserSubMenuAction:()=> dispatch(showUserSubMenuAction()),
    startLogoutAction: () => dispatch(startLogoutAction())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Header);