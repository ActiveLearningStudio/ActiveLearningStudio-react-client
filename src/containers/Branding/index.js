/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import { Link } from 'react-router-dom';
import { Dropdown, Tabs, Tab } from 'react-bootstrap';
import logo from '../../assets/images/GCLogo.png';
import cardBg from '../../assets/images/myproject2.png';
import './style.scss';
import Headings from 'curriki-design-system/dist/utils/Headings/headings';
import Buttons from 'utils/Buttons/buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'assets/css/previewBranding.css';
const BrandingPage = ({ getShow }) => {
  const primaryColor = getGlobalColor('--main-preview-primary-color');
  const secondaryColorIcon = getGlobalColor('--main-preview-secondary-color');
  const [selectTab, setSelectTab] = useState('My Projects');
  const [show, setShow] = useState(true);
  useEffect(() => {
    setShow(getShow);
  }, [getShow]);
  return (
    <div className="branding-preview">
      <div className="disablelayer"></div>

      <header>
        <div className="top-header-preview flex-div align-items-center">
          <div className="group-search-logo">
            <div className="tophd_left">
              <Link to="#" className="top_logo">
                <div
                  className="nav-logo"
                  style={{
                    backgroundImage: `url(${logo})`,
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
                  {' '}
                  <div style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.28366 3H4.31782C3.59167 3 3.00098 3.59076 3.00098 4.31699V9.28336C3.00098 10.0096 3.59167 10.6003 4.31782 10.6003H9.28366C10.0098 10.6003 10.6005 10.0096 10.6005 9.28336V4.31699C10.6004 3.59076 10.0098 3 9.28366 3Z"
                        stroke={primaryColor}
                        strokeWidth="2"
                      />
                      <path
                        d="M19.6831 3H14.7172C13.9911 3 13.4004 3.59076 13.4004 4.31699V9.28336C13.4004 10.0096 13.9911 10.6003 14.7172 10.6003H19.6831C20.4092 10.6003 20.9999 10.0096 20.9999 9.28336V4.31699C20.9999 3.59076 20.4092 3 19.6831 3Z"
                        stroke={primaryColor}
                        strokeWidth="2"
                      />
                      <path
                        d="M9.28269 13.3994H4.31685C3.59069 13.3994 3 13.9901 3 14.7163V19.6827C3 20.4089 3.59069 20.9997 4.31685 20.9997H9.28269C10.0088 20.9997 10.5995 20.4089 10.5995 19.6827V14.7163C10.5994 13.9901 10.0088 13.3994 9.28269 13.3994Z"
                        stroke={primaryColor}
                        strokeWidth="2"
                      />
                      <path
                        d="M19.6821 13.3994H14.7163C13.9901 13.3994 13.3994 13.9902 13.3994 14.7164V19.6828C13.3994 20.409 13.9901 20.9998 14.7163 20.9998H19.6821C20.4083 20.9997 20.999 20.409 20.999 19.6827V14.7163C20.999 13.9901 20.4083 13.3994 19.6821 13.3994Z"
                        stroke={primaryColor}
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="header-icon-text">Currikistudio</div>
                  </div>
                </li>
                <li>
                  <div style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                        stroke={primaryColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.38086 9.30012C9.59245 8.69862 10.0101 8.19142 10.5598 7.86834C11.1095 7.54527 11.7559 7.42717 12.3843 7.53496C13.0128 7.64276 13.5828 7.96949 13.9934 8.4573C14.4041 8.9451 14.6288 9.56249 14.6279 10.2001C14.6279 12.0001 11.9279 12.9001 11.9279 12.9001"
                        stroke={primaryColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M12 16.5H12.0094" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <p className="header-icon-text">Help</p>
                  </div>
                </li>

                <li>
                  {' '}
                  <div style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17.2514 8.40096C17.2514 6.96854 16.6981 5.59478 15.7134 4.5819C14.7286 3.56903 13.3931 3 12.0004 3C10.6078 3 9.27219 3.56903 8.28745 4.5819C7.30271 5.59478 6.74949 6.96854 6.74949 8.40096C6.74949 14.7021 4.12402 16.5024 4.12402 16.5024H19.8768C19.8768 16.5024 17.2514 14.7021 17.2514 8.40096Z"
                        stroke={primaryColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5144 20.1025C13.3605 20.3754 13.1397 20.6018 12.8739 20.7592C12.6082 20.9166 12.307 20.9995 12.0003 20.9995C11.6937 20.9995 11.3925 20.9166 11.1267 20.7592C10.861 20.6018 10.6402 20.3754 10.4863 20.1025"
                        stroke={primaryColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p className="header-icon-text">Notifications</p>
                  </div>
                </li>

                <li className="menu-user-settings d-flex align-items-center">
                  <Dropdown show={show}>
                    <Dropdown.Toggle className="align-items-center">
                      <div className="profile-avatar" style={{ backgroundColor: primaryColor }}>
                        B
                      </div>
                      <p className="header-icon-text">My Profile</p>
                    </Dropdown.Toggle>

                    <Dropdown.Menu show={show} className="user-dropdown">
                      <div className="user-dropdown-item-name">
                        <div className="profile-avatar" style={{ backgroundColor: primaryColor }}>
                          B
                        </div>
                        <div className="basic-info">
                          <b>
                            <p className="name">Branding &nbsp;Style</p>
                          </b>
                          <p className="email">brandingStyle@gmail.com</p>
                        </div>
                      </div>
                      <hr />
                      <Dropdown.Item as={Link} to="#">
                        <div className="user-dropdown-item">
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
                      <Dropdown.Item as={Link} to="#">
                        <div className="user-dropdown-item">
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
                      <Dropdown.Item href="#">
                        <div className="user-dropdown-item">
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

      <div className="main-content-wrapper-preivew">
        <div className="sidebar-wrapper">
          {/* Side Bar Portion */}
          <aside className="sidebar-all">
            <Link to="#">
              <div className="row-sidebar">
                <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0)">
                    <path
                      d="M4 9.60938V24.6094C4 25.2998 4.55965 25.8594 5.25 25.8594H25.25C25.9404 25.8594 26.5 25.2998 26.5 24.6094V11.3402C26.5 10.6498 25.9404 10.0902 25.25 10.0902H16.4038"
                      stroke={primaryColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16.4038 10.0902L12.933 6.04244C12.8159 5.92523 12.6569 5.85938 12.4911 5.85938H4.625C4.27983 5.85938 4 6.1392 4 6.48437V9.60937"
                      stroke={primaryColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="30" height="30" stroke={primaryColor} transform="translate(0 0.859375)" />
                    </clipPath>
                  </defs>
                </svg>
                <div className="sidebar-headings">My Projects</div>
              </div>
            </Link>
            {/* Interactive videos */}
            <Link to="#">
              <div className="row-sidebar">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1.5" width="20" height="12" rx="2" stroke={primaryColor} strokeWidth="2" />
                  <path d="M1 18.5H21" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
                  <circle cx="15" cy="18.5" r="2" fill="white" stroke={primaryColor} strokeWidth="2" />
                  <path
                    d="M9 9.66667V5.43426C9 5.03491 9.44507 4.79672 9.77735 5.01823L13.3044 7.36957C13.619 7.5793 13.5959 8.04885 13.2623 8.22677L9.73529 10.1078C9.40224 10.2855 9 10.0441 9 9.66667Z"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="sidebar-headings">My Interactive videos</div>
              </div>
            </Link>
            <Link to="#">
              <div className="row-sidebar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.25315 15.0622C10.8934 15.0622 13.0336 12.9219 13.0336 10.2817C13.0336 7.64152 10.8934 5.50122 8.25315 5.50122C5.61296 5.50122 3.47266 7.64152 3.47266 10.2817C3.47266 12.9219 5.61296 15.0622 8.25315 15.0622Z"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M14.4512 5.67916C15.1086 5.49391 15.7982 5.45171 16.4734 5.5554C17.1487 5.65909 17.7939 5.90627 18.3654 6.28029C18.9371 6.65431 19.4219 7.14649 19.7874 7.72367C20.1527 8.30085 20.3902 8.94963 20.4838 9.62631C20.5773 10.303 20.5247 10.9919 20.3296 11.6465C20.1345 12.3012 19.8014 12.9065 19.3527 13.4215C18.9039 13.9366 18.35 14.3495 17.7283 14.6326C17.1065 14.9155 16.4314 15.062 15.7483 15.0621"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.63379 18.5C2.38041 17.438 3.37158 16.5712 4.52365 15.9728C5.67571 15.3745 6.95484 15.062 8.25302 15.062C9.55121 15.062 10.8304 15.3743 11.9825 15.9726C13.1346 16.5708 14.1258 17.4375 14.8725 18.4995"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.748 15.062C17.0463 15.0611 18.3257 15.373 19.478 15.9713C20.6302 16.5697 21.6213 17.4369 22.3672 18.4995"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="sidebar-headings">Teams</div>
              </div>
            </Link>
            <Link to="#">
              <div className="row-sidebar">
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.6089 14.4799H16.5248C16.186 13.3522 15.1498 12.5234 13.9133 12.5234C12.6768 12.5234 11.6413 13.3522 11.3017 14.4799H1.39148C0.959483 14.4799 0.608887 14.8306 0.608887 15.2626C0.608887 15.6946 0.959483 16.0452 1.39148 16.0452H11.3017C11.6405 17.1729 12.6767 18.0017 13.9132 18.0017C15.1497 18.0017 16.1851 17.1729 16.5248 16.0452H18.6089C19.0416 16.0452 19.3915 15.6946 19.3915 15.2626C19.3915 14.8306 19.0417 14.4799 18.6089 14.4799ZM13.9133 16.4365C13.266 16.4365 12.7393 15.9098 12.7393 15.2626C12.7393 14.6154 13.266 14.0887 13.9133 14.0887C14.5605 14.0887 15.0872 14.6154 15.0872 15.2626C15.0872 15.9098 14.5604 16.4365 13.9133 16.4365Z"
                    fill={primaryColor}
                  />
                  <path
                    d="M18.6089 1.95651H16.5248C16.1851 0.828783 15.1498 0 13.9133 0C12.6768 0 11.6413 0.828783 11.3017 1.95651H1.39148C0.959483 1.95651 0.608887 2.30711 0.608887 2.73911C0.608887 3.17111 0.959483 3.5217 1.39148 3.5217H11.3017C11.6413 4.64947 12.6767 5.47825 13.9133 5.47825C15.1498 5.47825 16.1852 4.64947 16.5248 3.52174H18.6089C19.0417 3.52174 19.3915 3.17114 19.3915 2.73914C19.3915 2.30714 19.0417 1.95651 18.6089 1.95651ZM13.9133 3.91302C13.266 3.91302 12.7393 3.38634 12.7393 2.73911C12.7393 2.09188 13.266 1.56519 13.9133 1.56519C14.5605 1.56519 15.0872 2.09188 15.0872 2.73911C15.0872 3.38634 14.5604 3.91302 13.9133 3.91302Z"
                    fill={primaryColor}
                  />
                  <path
                    d="M18.6089 8.21823H8.69873C8.35907 7.0905 7.32367 6.26172 6.08718 6.26172C4.85068 6.26172 3.81525 7.0905 3.47562 8.21823H1.39148C0.959483 8.21823 0.608887 8.56883 0.608887 9.00083C0.608887 9.43283 0.959483 9.78343 1.39148 9.78343H3.47558C3.81525 10.9112 4.85064 11.7399 6.08714 11.7399C7.32364 11.7399 8.35907 10.9112 8.69869 9.78343H18.6089C19.0416 9.78343 19.3915 9.43283 19.3915 9.00083C19.3915 8.56883 19.0417 8.21823 18.6089 8.21823ZM6.08714 10.1747C5.43991 10.1747 4.91322 9.64806 4.91322 9.00083C4.91322 8.3536 5.43991 7.82691 6.08714 7.82691C6.73437 7.82691 7.26105 8.3536 7.26105 9.00083C7.26105 9.64806 6.73437 10.1747 6.08714 10.1747Z"
                    fill={primaryColor}
                  />
                </svg>

                <div className="sidebar-headings">Admin Panel</div>
              </div>
            </Link>

            <Link to="#">
              <div className="row-sidebar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.7273 14.7273C18.6063 15.0015 18.5702 15.3056 18.6236 15.6005C18.6771 15.8954 18.8177 16.1676 19.0273 16.3818L19.0818 16.4364C19.2509 16.6052 19.385 16.8057 19.4765 17.0265C19.568 17.2472 19.6151 17.4838 19.6151 17.7227C19.6151 17.9617 19.568 18.1983 19.4765 18.419C19.385 18.6397 19.2509 18.8402 19.0818 19.0091C18.913 19.1781 18.7124 19.3122 18.4917 19.4037C18.271 19.4952 18.0344 19.5423 17.7955 19.5423C17.5565 19.5423 17.3199 19.4952 17.0992 19.4037C16.8785 19.3122 16.678 19.1781 16.5091 19.0091L16.4545 18.9545C16.2403 18.745 15.9682 18.6044 15.6733 18.5509C15.3784 18.4974 15.0742 18.5335 14.8 18.6545C14.5311 18.7698 14.3018 18.9611 14.1403 19.205C13.9788 19.4489 13.8921 19.7347 13.8909 20.0273V20.1818C13.8909 20.664 13.6994 21.1265 13.3584 21.4675C13.0174 21.8084 12.5549 22 12.0727 22C11.5905 22 11.1281 21.8084 10.7871 21.4675C10.4461 21.1265 10.2545 20.664 10.2545 20.1818V20.1C10.2475 19.7991 10.1501 19.5073 9.97501 19.2625C9.79991 19.0176 9.55521 18.8312 9.27273 18.7273C8.99853 18.6063 8.69437 18.5702 8.39947 18.6236C8.10456 18.6771 7.83244 18.8177 7.61818 19.0273L7.56364 19.0818C7.39478 19.2509 7.19425 19.385 6.97353 19.4765C6.7528 19.568 6.51621 19.6151 6.27727 19.6151C6.03834 19.6151 5.80174 19.568 5.58102 19.4765C5.36029 19.385 5.15977 19.2509 4.99091 19.0818C4.82186 18.913 4.68775 18.7124 4.59626 18.4917C4.50476 18.271 4.45766 18.0344 4.45766 17.7955C4.45766 17.5565 4.50476 17.3199 4.59626 17.0992C4.68775 16.8785 4.82186 16.678 4.99091 16.5091L5.04545 16.4545C5.25503 16.2403 5.39562 15.9682 5.4491 15.6733C5.50257 15.3784 5.46647 15.0742 5.34545 14.8C5.23022 14.5311 5.03887 14.3018 4.79497 14.1403C4.55107 13.9788 4.26526 13.8921 3.97273 13.8909H3.81818C3.33597 13.8909 2.87351 13.6994 2.53253 13.3584C2.19156 13.0174 2 12.5549 2 12.0727C2 11.5905 2.19156 11.1281 2.53253 10.7871C2.87351 10.4461 3.33597 10.2545 3.81818 10.2545H3.9C4.2009 10.2475 4.49273 10.1501 4.73754 9.97501C4.98236 9.79991 5.16883 9.55521 5.27273 9.27273C5.39374 8.99853 5.42984 8.69437 5.37637 8.39947C5.3229 8.10456 5.18231 7.83244 4.97273 7.61818L4.91818 7.56364C4.74913 7.39478 4.61503 7.19425 4.52353 6.97353C4.43203 6.7528 4.38493 6.51621 4.38493 6.27727C4.38493 6.03834 4.43203 5.80174 4.52353 5.58102C4.61503 5.36029 4.74913 5.15977 4.91818 4.99091C5.08704 4.82186 5.28757 4.68775 5.50829 4.59626C5.72901 4.50476 5.96561 4.45766 6.20455 4.45766C6.44348 4.45766 6.68008 4.50476 6.9008 4.59626C7.12152 4.68775 7.32205 4.82186 7.49091 4.99091L7.54545 5.04545C7.75971 5.25503 8.03183 5.39562 8.32674 5.4491C8.62164 5.50257 8.9258 5.46647 9.2 5.34545H9.27273C9.54161 5.23022 9.77093 5.03887 9.93245 4.79497C10.094 4.55107 10.1807 4.26526 10.1818 3.97273V3.81818C10.1818 3.33597 10.3734 2.87351 10.7144 2.53253C11.0553 2.19156 11.5178 2 12 2C12.4822 2 12.9447 2.19156 13.2856 2.53253C13.6266 2.87351 13.8182 3.33597 13.8182 3.81818V3.9C13.8193 4.19253 13.906 4.47834 14.0676 4.72224C14.2291 4.96614 14.4584 5.15749 14.7273 5.27273C15.0015 5.39374 15.3056 5.42984 15.6005 5.37637C15.8954 5.3229 16.1676 5.18231 16.3818 4.97273L16.4364 4.91818C16.6052 4.74913 16.8057 4.61503 17.0265 4.52353C17.2472 4.43203 17.4838 4.38493 17.7227 4.38493C17.9617 4.38493 18.1983 4.43203 18.419 4.52353C18.6397 4.61503 18.8402 4.74913 19.0091 4.91818C19.1781 5.08704 19.3122 5.28757 19.4037 5.50829C19.4952 5.72901 19.5423 5.96561 19.5423 6.20455C19.5423 6.44348 19.4952 6.68008 19.4037 6.9008C19.3122 7.12152 19.1781 7.32205 19.0091 7.49091L18.9545 7.54545C18.745 7.75971 18.6044 8.03183 18.5509 8.32674C18.4974 8.62164 18.5335 8.9258 18.6545 9.2V9.27273C18.7698 9.54161 18.9611 9.77093 19.205 9.93245C19.4489 10.094 19.7347 10.1807 20.0273 10.1818H20.1818C20.664 10.1818 21.1265 10.3734 21.4675 10.7144C21.8084 11.0553 22 11.5178 22 12C22 12.4822 21.8084 12.9447 21.4675 13.2856C21.1265 13.6266 20.664 13.8182 20.1818 13.8182H20.1C19.8075 13.8193 19.5217 13.906 19.2778 14.0676C19.0339 14.2291 18.8425 14.4584 18.7273 14.7273Z"
                    fill="white"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 11.5C13.1046 11.5 14 10.6046 14 9.5C14 8.39544 13.1046 7.5 12 7.5C10.8954 7.5 10 8.39544 10 9.5C10 10.6046 10.8954 11.5 12 11.5Z"
                    fill="white"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M12 12C11.2184 12 10.452 12.259 9.78571 12.7483C9.30733 13.0996 8.89394 13.4408 8.56767 13.9655C8.52188 14.0392 8.5 14.1249 8.5 14.2116V15C8.5 15.2761 8.72386 15.5 9 15.5H15C15.2761 15.5 15.5 15.2761 15.5 15V14.2116C15.5 14.1249 15.4781 14.0392 15.4323 13.9655C15.106 13.4408 14.6926 13.0996 14.2143 12.7483C13.548 12.259 12.7816 12 12 12Z"
                    fill="white"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="sidebar-headings">Instance Admin</div>
              </div>
            </Link>
          </aside>
        </div>
        <div className="content-wrapper">
          <div className="inner-content">
            {/* Project headline */}
            <div className="project-headline">
              <div className="title">
                <div className="title-name-heading-image">
                  <Headings text="CurrikiStudio" headingType="body2" color="#084892" />
                  <div className="heading-image " id="preview-heading-myproject">
                    <svg width="35" height="35" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0)">
                        <path
                          d="M4 9.60938V24.6094C4 25.2998 4.55965 25.8594 5.25 25.8594H25.25C25.9404 25.8594 26.5 25.2998 26.5 24.6094V11.3402C26.5 10.6498 25.9404 10.0902 25.25 10.0902H16.4038"
                          stroke={primaryColor}
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M16.4038 10.0902L12.933 6.04244C12.8159 5.92523 12.6569 5.85938 12.4911 5.85938H4.625C4.27983 5.85938 4 6.1392 4 6.48437V9.60937"
                          stroke={primaryColor}
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="30" height="30" fill="white" transform="translate(0 0.859375)" />
                        </clipPath>
                      </defs>
                    </svg>

                    {/* Projects */}
                    <Headings className="preview-myproject-heading" text="My Projects" headingType="h2" color="#084892" />
                  </div>
                </div>
                <div className="search-main-relaced">
                  <FontAwesomeIcon icon="add" style={{ marginRight: '16px' }} color={secondaryColorIcon} />

                  <Buttons primary text="Create a project" icon={faPlus} width="auto" height="35px" hover />
                </div>
              </div>
              <Headings text="Create and organize your activities into projects to create complete courses." headingType="body2" color="#515151" className="top-heading-detail" />
            </div>

            {/* Project card */}
            <div>
              <Tabs defaultActiveKey={selectTab} activeKey={selectTab} id="uncontrolled-tab-example" onSelect={(k) => setSelectTab(k)} className="main-tabs">
                <Tab eventKey="My Projects" title="My Projects">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="project-list-all">
                        <div className="playlist-resource">
                          <div className="main-myproject-card">
                            <div>
                              <>
                                <div
                                  className="myproject-card-top"
                                  style={{
                                    backgroundImage: `url(${cardBg})`,
                                  }}
                                >
                                  <div className="myproject-card-dropdown">
                                    <Dropdown show={show} className="project-dropdown check d-flex  align-items-center text-added-project-dropdown">
                                      <Dropdown.Toggle className="project-dropdown-btn project d-flex justify-content-center align-items-center">
                                        <FontAwesomeIcon
                                          icon="ellipsis-v"
                                          style={{
                                            fontSize: '13px',
                                            color: '#ffffff',
                                            marginLeft: '5px',
                                          }}
                                        />
                                        {/* <span>{text}</span> */}
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu show>
                                        <Dropdown.Item to="#">
                                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                                            <path
                                              d="M11.6667 1H2.33333C1.59695 1 1 1.59695 1 2.33333V11.6667C1 12.403 1.59695 13 2.33333 13H11.6667C12.403 13 13 12.403 13 11.6667V2.33333C13 1.59695 12.403 1 11.6667 1Z"
                                              stroke={primaryColor}
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path d="M7 4.33325V9.66659" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.33301 7H9.66634" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                          </svg>
                                          Duplicate
                                        </Dropdown.Item>

                                        <Dropdown.Item to="#">
                                          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                                            <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path
                                              d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                                              stroke={primaryColor}
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                          </svg>
                                          Delete
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                  <Link to="#">
                                    <div className="myproject-card-title" id="preview-myproject-card-title">
                                      <h2>Design, Art & History tagr</h2>
                                    </div>
                                  </Link>
                                </div>
                              </>
                            </div>
                            <Link className="project-description" to="#">
                              <div className="myproject-card-detail">
                                <p>Within the six categories, there are over 50 learning activity types. These range from Interactive Video.</p>
                              </div>
                            </Link>
                            <div className="updated-date">Updated: 07/19/2021</div>
                            <div className="myproject-card-add-share">
                              <button type="button">
                                <Link
                                  to="#"
                                  style={{
                                    textDecoration: 'none',
                                    color: '#084892',
                                  }}
                                >
                                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                                    <path
                                      d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V28C24 30.2091 22.2091 32 20 32H4C1.79086 32 0 30.2091 0 28V4Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M2.375 16C2.375 16 5.875 9 12 9C18.125 9 21.625 16 21.625 16C21.625 16 18.125 23 12 23C5.875 23 2.375 16 2.375 16Z"
                                      stroke={primaryColor}
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M12 18.625C13.4497 18.625 14.625 17.4497 14.625 16C14.625 14.5503 13.4497 13.375 12 13.375C10.5503 13.375 9.375 14.5503 9.375 16C9.375 17.4497 10.5503 18.625 12 18.625Z"
                                      stroke={primaryColor}
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>

                                  <span className="textinButton">Preview</span>
                                </Link>
                              </button>
                              <button type="button">
                                <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                                  <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V28C24 30.2091 22.2091 32 20 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="white" />
                                  <path
                                    d="M11.0513 8.89767H4.78927C4.31476 8.89767 3.85968 9.08617 3.52415 9.4217C3.18862 9.75723 3.00012 10.2123 3.00012 10.6868V23.2108C3.00012 23.6854 3.18862 24.1404 3.52415 24.476C3.85968 24.8115 4.31476 25 4.78927 25H17.3133C17.7878 25 18.2429 24.8115 18.5784 24.476C18.9139 24.1404 19.1024 23.6854 19.1024 23.2108V16.9488"
                                    stroke={primaryColor}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M17.7605 7.55582C18.1163 7.19993 18.599 7 19.1023 7C19.6056 7 20.0883 7.19993 20.4442 7.55582C20.8001 7.9117 21 8.39438 21 8.89768C21 9.40097 20.8001 9.88365 20.4442 10.2395L11.9457 18.738L8.36743 19.6326L9.262 16.0543L17.7605 7.55582Z"
                                    stroke={primaryColor}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>

                                <span className="textinButton">Edit</span>
                              </button>
                              <button type="button">
                                <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                                  <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V28C24 30.2091 22.2091 32 20 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="white" />
                                  <path
                                    d="M10.1899 16.906C10.5786 17.4262 11.0746 17.8566 11.644 18.168C12.2135 18.4795 12.8433 18.6647 13.4905 18.7111C14.1378 18.7575 14.7875 18.664 15.3955 18.437C16.0035 18.21 16.5557 17.8547 17.0144 17.3953L19.7298 14.6772C20.5541 13.8228 21.0103 12.6785 21 11.4907C20.9897 10.303 20.5137 9.16675 19.6746 8.32683C18.8356 7.48692 17.7005 7.01049 16.5139 7.00017C15.3273 6.98985 14.1842 7.44646 13.3307 8.27165L11.7739 9.82094"
                                    stroke={primaryColor}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M13.8101 15.094C13.4214 14.5738 12.9255 14.1434 12.356 13.832C11.7865 13.5205 11.1567 13.3353 10.5095 13.2889C9.86218 13.2425 9.2125 13.336 8.60449 13.563C7.99648 13.7901 7.44435 14.1453 6.98557 14.6048L4.27025 17.3228C3.44589 18.1772 2.98974 19.3215 3.00005 20.5093C3.01036 21.6971 3.48631 22.8333 4.32538 23.6732C5.16445 24.5131 6.29951 24.9895 7.48609 24.9999C8.67267 25.0102 9.81583 24.5536 10.6694 23.7284L12.2171 22.1791"
                                    stroke={primaryColor}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>

                                <span className="textinButton">Shared link</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="playlist-resource">
                          <div className="main-myproject-card">
                            <div>
                              <>
                                <div
                                  className="myproject-card-top"
                                  style={{
                                    backgroundImage: `url(${cardBg})`,
                                  }}
                                >
                                  <div className="myproject-card-dropdown">
                                    <Dropdown className="project-dropdown check d-flex  align-items-center text-added-project-dropdown">
                                      <Dropdown.Toggle className="project-dropdown-btn project d-flex justify-content-center align-items-center">
                                        <FontAwesomeIcon
                                          icon="ellipsis-v"
                                          style={{
                                            fontSize: '13px',
                                            color: '#ffffff',
                                            marginLeft: '5px',
                                          }}
                                        />
                                        {/* <span>{text}</span> */}
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item to="#">
                                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                                            <path
                                              d="M11.6667 1H2.33333C1.59695 1 1 1.59695 1 2.33333V11.6667C1 12.403 1.59695 13 2.33333 13H11.6667C12.403 13 13 12.403 13 11.6667V2.33333C13 1.59695 12.403 1 11.6667 1Z"
                                              stroke={primaryColor}
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path d="M7 4.33325V9.66659" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.33301 7H9.66634" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                          </svg>
                                          Duplicate
                                        </Dropdown.Item>

                                        <Dropdown.Item to="#">
                                          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                                            <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path
                                              d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                                              stroke={primaryColor}
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                          </svg>
                                          Delete
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                  <Link to="#">
                                    <div className="myproject-card-title" id="preview-myproject-card-title">
                                      <h2>Design, Art & History</h2>
                                    </div>
                                  </Link>
                                </div>
                              </>
                            </div>
                            <Link className="project-description" to="#">
                              <div className="myproject-card-detail">
                                <p>Within the six categories, there are over 50 learning activity types. These range from Interactive Video.</p>
                              </div>
                            </Link>
                            <div className="updated-date">Updated: 07/19/2021</div>
                            <div className="myproject-card-add-share">
                              <button type="button">
                                <Link
                                  to="#"
                                  style={{
                                    textDecoration: 'none',
                                    color: '#084892',
                                  }}
                                >
                                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                                    <path
                                      d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V28C24 30.2091 22.2091 32 20 32H4C1.79086 32 0 30.2091 0 28V4Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M2.375 16C2.375 16 5.875 9 12 9C18.125 9 21.625 16 21.625 16C21.625 16 18.125 23 12 23C5.875 23 2.375 16 2.375 16Z"
                                      stroke={primaryColor}
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M12 18.625C13.4497 18.625 14.625 17.4497 14.625 16C14.625 14.5503 13.4497 13.375 12 13.375C10.5503 13.375 9.375 14.5503 9.375 16C9.375 17.4497 10.5503 18.625 12 18.625Z"
                                      stroke={primaryColor}
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>

                                  <span className="textinButton">Preview</span>
                                </Link>
                              </button>
                              <button type="button">
                                <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                                  <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V28C24 30.2091 22.2091 32 20 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="white" />
                                  <path
                                    d="M11.0513 8.89767H4.78927C4.31476 8.89767 3.85968 9.08617 3.52415 9.4217C3.18862 9.75723 3.00012 10.2123 3.00012 10.6868V23.2108C3.00012 23.6854 3.18862 24.1404 3.52415 24.476C3.85968 24.8115 4.31476 25 4.78927 25H17.3133C17.7878 25 18.2429 24.8115 18.5784 24.476C18.9139 24.1404 19.1024 23.6854 19.1024 23.2108V16.9488"
                                    stroke={primaryColor}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M17.7605 7.55582C18.1163 7.19993 18.599 7 19.1023 7C19.6056 7 20.0883 7.19993 20.4442 7.55582C20.8001 7.9117 21 8.39438 21 8.89768C21 9.40097 20.8001 9.88365 20.4442 10.2395L11.9457 18.738L8.36743 19.6326L9.262 16.0543L17.7605 7.55582Z"
                                    stroke={primaryColor}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>

                                <span className="textinButton">Edit</span>
                              </button>
                              <button type="button">
                                <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                                  <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V28C24 30.2091 22.2091 32 20 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="white" />
                                  <path
                                    d="M10.1899 16.906C10.5786 17.4262 11.0746 17.8566 11.644 18.168C12.2135 18.4795 12.8433 18.6647 13.4905 18.7111C14.1378 18.7575 14.7875 18.664 15.3955 18.437C16.0035 18.21 16.5557 17.8547 17.0144 17.3953L19.7298 14.6772C20.5541 13.8228 21.0103 12.6785 21 11.4907C20.9897 10.303 20.5137 9.16675 19.6746 8.32683C18.8356 7.48692 17.7005 7.01049 16.5139 7.00017C15.3273 6.98985 14.1842 7.44646 13.3307 8.27165L11.7739 9.82094"
                                    stroke={primaryColor}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M13.8101 15.094C13.4214 14.5738 12.9255 14.1434 12.356 13.832C11.7865 13.5205 11.1567 13.3353 10.5095 13.2889C9.86218 13.2425 9.2125 13.336 8.60449 13.563C7.99648 13.7901 7.44435 14.1453 6.98557 14.6048L4.27025 17.3228C3.44589 18.1772 2.98974 19.3215 3.00005 20.5093C3.01036 21.6971 3.48631 22.8333 4.32538 23.6732C5.16445 24.5131 6.29951 24.9895 7.48609 24.9999C8.67267 25.0102 9.81583 24.5536 10.6694 23.7284L12.2171 22.1791"
                                    stroke={primaryColor}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>

                                <span className="textinButton">Shared link</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="Favorite Projects" title="Favorite Projects">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="flex-smaple">
                        <>
                          <div className="playlist-resource">
                            <div className="col-md-3 check">
                              <div className="program-tile">
                                <div className="program-thumb">
                                  <div
                                    className="project-thumb"
                                    style={{
                                      backgroundImage: `url(${cardBg})`,
                                    }}
                                  />
                                </div>

                                <div className="program-content" style={{ padding: '10px 15px' }}>
                                  <div>
                                    <div className="row">
                                      <div className="col-md-10">
                                        <h3 className="program-title">
                                          <a>The Curriki Vision</a>
                                        </h3>
                                      </div>

                                      <div className="col-md-2">
                                        <Dropdown className="project-dropdown check d-flex justify-content-center align-items-center">
                                          <Dropdown.Toggle className="project-dropdown-btn project d-flex justify-content-center align-items-center">
                                            <FontAwesomeIcon icon="ellipsis-v" />
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item as={Link}>
                                              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                                                <path
                                                  d="M1.125 6C1.125 6 3.625 1 8 1C12.375 1 14.875 6 14.875 6C14.875 6 12.375 11 8 11C3.625 11 1.125 6 1.125 6Z"
                                                  stroke={primaryColor}
                                                  strokeWidth="1.5"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path
                                                  d="M8 7.875C9.03553 7.875 9.875 7.03553 9.875 6C9.875 4.96447 9.03553 4.125 8 4.125C6.96447 4.125 6.125 4.96447 6.125 6C6.125 7.03553 6.96447 7.875 8 7.875Z"
                                                  stroke={primaryColor}
                                                  strokeWidth="1.5"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                              Preview
                                            </Dropdown.Item>
                                            <Dropdown.Item to="#">
                                              <FontAwesomeIcon icon="share" className="mr-2" />
                                              Share
                                            </Dropdown.Item>

                                            <Dropdown.Item
                                              to="#"
                                              onClick={() => {
                                                Swal.showLoading();
                                                cloneProject(project.id);
                                              }}
                                            >
                                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                                                <path
                                                  d="M11.6667 1H2.33333C1.59695 1 1 1.59695 1 2.33333V11.6667C1 12.403 1.59695 13 2.33333 13H11.6667C12.403 13 13 12.403 13 11.6667V2.33333C13 1.59695 12.403 1 11.6667 1Z"
                                                  stroke={primaryColor}
                                                  strokeWidth="1.5"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                                <path d="M7 4.33325V9.66659" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4.33301 7H9.66634" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                              </svg>
                                              Duplicate
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </div>

                                    <div className="lessons-duration">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div>An introduction to Curriki and our vision.</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingPage;
