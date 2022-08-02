/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';

import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import teamicon from 'assets/images/sidebar/users-team.svg';
import administrate from 'assets/images/sidebar/administrate.png';
import foldericon from 'assets/images/svg/projectFolder.svg';
// import { allSidebarProjects } from 'store/actions/project';
import interactiveVideo from 'assets/images/svg/Interactivevideos.svg';
import { allSidebarProjects } from 'store/actions/project';
import instanceadmin from 'assets/images/Instanceadmin.svg';
import { clearSearch } from 'store/actions/search';
import './style.scss';
import { clearFormData } from 'store/actions/playlist';

import { clearTeamPermissions } from 'store/actions/team';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

const PROJECTS = 'projects';
const CHANNEL = 'channel';

function Sidebar(props) {
  const { location } = props;
  const active = useMemo(() => location.pathname, [location]);
  const dispatch = useDispatch();

  const allState = useSelector((state) => state);
  useEffect(() => {
    document.body.classList.add('collapsed');
  }, []);

  const organization = useSelector((state) => state.organization);
  const { permission, currentOrganization } = organization;

  useEffect(() => {
    if (location.pathname.includes('teams/')) {
      const teamId = parseInt(location.pathname.split('teams/')[1], 10);
      if (teamId) {
        // setSelectedTeam(teamId);

        if (location.pathname.includes(PROJECTS)) {
          // setSelectedCategory(PROJECTS);
        } else if (location.pathname.includes(CHANNEL)) {
          // setSelectedCategory(CHANNEL);
        } else {
          // setSelectedCategory(TEAM);
        }
      }
    }
  }, [location.pathname]);

  // useEffect(() => {
  //   if (!allState.sidebar.isLoaded && organization.activeOrganization) {
  //     dispatch(allSidebarProjects());
  //   }
  // }, [allState.sidebar.isLoaded, organization.activeOrganization, dispatch]);
  const clearStatesOnSidebarClick = () => {
    dispatch(clearFormData());
    dispatch(clearSearch());
    dispatch({
      type: 'SET_ACTIVE_VIDEO_SCREEN',
      payload: '',
    });
    dispatch({
      type: 'SET_ACTIVE_ACTIVITY_SCREEN',
      payload: '',
    });
  };

  // const [primaryColor, setPrimaryColor] = useState(
  //   getGlobalColor("--main-primary-color")
  // );
  const primaryColor = getGlobalColor('--main-primary-color');

  return (
    <aside className="sidebar-all">
      {permission?.['Independent Activity']?.includes('independent-activity:view-author') && (
        <>
          <Link
            to={`/org/${allState.organization.currentOrganization?.domain}/activities`}
            onClick={() => {
              clearStatesOnSidebarClick();
              dispatch(clearTeamPermissions());
            }}
          >
            <div className={active === `/org/${allState.organization.currentOrganization?.domain}/activities` ? 'row-sidebar activeLink' : 'row-sidebar'}>
              {/* <img src={foldericon} alt="" /> */}

              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M17.2 1H2.8C1.80589 1 1 1.80589 1 2.8V6.4C1 7.39411 1.80589 8.2 2.8 8.2H17.2C18.1941 8.2 19 7.39411 19 6.4V2.8C19 1.80589 18.1941 1 17.2 1Z"
                  stroke={primaryColor}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.2 11.7998H2.8C1.80589 11.7998 1 12.6057 1 13.5998V17.1998C1 18.1939 1.80589 18.9998 2.8 18.9998H17.2C18.1941 18.9998 19 18.1939 19 17.1998V13.5998C19 12.6057 18.1941 11.7998 17.2 11.7998Z"
                  stroke={primaryColor}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M4.6001 4.59961H4.60955" stroke={primaryColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4.6001 15.3999H4.60955" stroke={primaryColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div className="sidebar-headings">My Activities</div>
            </div>
          </Link>
        </>
      )}
      {permission?.Project?.includes('project:view') && (
        <>
          <Link
            to={`/org/${allState.organization.currentOrganization?.domain}`}
            onClick={() => {
              clearStatesOnSidebarClick();
              dispatch(clearTeamPermissions());
            }}
          >
            <div className={active === `/org/${allState.organization.currentOrganization?.domain}` ? 'row-sidebar activeLink' : 'row-sidebar'}>
              {/* <img src={foldericon} alt="" /> */}

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
        </>
      )}
      {/* Interactive videos */}
      {permission?.Video?.includes('video:view') && (
        <>
          <Link
            to={`/org/${allState.organization.currentOrganization?.domain}/video`}
            onClick={() => {
              clearStatesOnSidebarClick();
              dispatch(clearTeamPermissions());
            }}
          >
            <div className={active === `/org/${allState.organization.currentOrganization?.domain}/video` ? 'row-sidebar activeLink' : 'row-sidebar'}>
              {/* <img src={interactiveVideo} alt="" /> */}
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

              <div className="sidebar-headings">My Interactive Videos</div>
            </div>
          </Link>
        </>
      )}
      {permission?.['Independent Activity']?.includes('independent-activity:view-author') && (
        <>
          <Link to={`/org/${allState.organization.currentOrganization?.domain}/search`} onClick={() => {}}>
            <div className={active === `/org/${allState.organization.currentOrganization?.domain}/search` ? 'row-sidebar activeLink' : 'row-sidebar'}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                  stroke={primaryColor}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M18.9999 18.9999L14.6499 14.6499" stroke={primaryColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <div className="sidebar-headings">Explore Library</div>
            </div>
          </Link>
        </>
      )}

      {permission?.Team?.includes('team:view') && (
        <>
          <Link
            to={`/org/${allState.organization.currentOrganization?.domain}/teams`}
            onClick={() => clearStatesOnSidebarClick()}
            className={active.includes(`/org/${allState.organization.currentOrganization?.domain}/teams`) ? 'activeLink' : ''}
          >
            <div className={active.includes(`/org/${allState.organization.currentOrganization?.domain}/teams`) ? 'row-sidebar activeLink' : 'row-sidebar'}>
              {/* <img src={teamicon} alt="" /> */}
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
        </>
      )}
      {permission?.Organization?.length && (
        <>
          <Link
            to={`/org/${allState.organization.currentOrganization?.domain}/admin`}
            onClick={() => {
              clearStatesOnSidebarClick();
              dispatch(clearTeamPermissions());
            }}
          >
            <div className={active === `/org/${allState.organization.currentOrganization?.domain}/admin` ? ' row-sidebar activeLink' : 'row-sidebar'}>
              {/* <img src={administrate} alt="" /> */}
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
        </>
      )}

      {!currentOrganization?.parent && permission.activeRole?.includes('admin') && (
        <>
          <Link
            to={`/org/${allState.organization.currentOrganization?.domain}/instance-admin`}
            onClick={() => {
              clearStatesOnSidebarClick();
              dispatch(clearTeamPermissions());
            }}
          >
            <div className={active === `/org/${allState.organization.currentOrganization?.domain}/instance-admin` ? 'row-sidebar activeLink' : 'row-sidebar'}>
              {/* <img src={instanceadmin} alt="" /> */}
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
        </>
      )}
    </aside>
  );
}

Sidebar.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);
