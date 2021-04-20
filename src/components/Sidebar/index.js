import React, {
  // useCallback,
  useEffect,
  useState,
} from 'react';
import userLargeIcon from 'assets/images/sidebar/user80.png';
import organizationLargeIcon from 'assets/images/sidebar/organization80.png';
import groupLargeIcon from 'assets/images/sidebar/group80.png';
import teamLargeIcon from 'assets/images/sidebar/team80.png';
import projectLargeIcon from 'assets/images/sidebar/project80.png';
import childOrgLargeIcon from 'assets/images/sidebar/childorg80.png';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Accordion } from 'react-bootstrap';
import foldericon from 'assets/images/sidebar/folder-icon.png';
import teamicon from 'assets/images/sidebar/team-icon.png';
import toggleButton from 'assets/images/sidebar/toggle-button.png';
import groupicon from 'assets/images/sidebar/group-icon.png';
import usersidebaricon from 'assets/images/sidebar/user-sidebar-icon.png';
// import dashboardicon from 'assets/images/sidebar/dashboard-icon.png';
import backgroundimg from 'assets/images/sidebar/background.png';
import menu from 'assets/images/menu_square.png';
import dashboardChevron from 'assets/images/dashboard-chevron.png';
import childOrganizationIcon from 'assets/images/child-organization-icon.png';
import {
  allSidebarProjects,
} from 'store/actions/project';
import { setActiveTab } from 'store/actions/admin';
import { updateOrganizationScreen } from 'store/actions/organization';

import './style.scss';

const PROJECTS = 'projects';
const CHANNEL = 'channel';
// const TEAM = 'team';

function Sidebar(props) {
  const {
    // history,
    location,
  } = props;

  const dispatch = useDispatch();

  const allState = useSelector((state) => state);
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const handleToggle = () => {
    if (toggleSidebar === true) {
      document.body.classList.add('collapsed');
    } else {
      document.body.classList.remove('collapsed');
    }
    setToggleSidebar(!toggleSidebar);
  };
  // const [selectedTeam, setSelectedTeam] = useState(null);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;

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

  useEffect(() => {
    if (!allState.sidebar.isLoaded && organization.activeOrganization) {
      dispatch(allSidebarProjects());
    }
  }, [allState.sidebar.isLoaded, organization.activeOrganization, dispatch]);

  // const handleClickTeam = useCallback((team) => {
  //   history.push(`/org/${allState.organization.currentOrganization?.domain}/teams/${team.id}`);
  // }, [history, allState.organization.currentOrganization?.domain]);
  // const handleClickGroup = useCallback((group) => {
  //   history.push(`/org/${allState.organization.currentOrganization?.domain}/groups/${group.id}`);
  // }, [history, allState.organization.currentOrganization?.domain]);

  return (
    <aside className="sidebar-all">
      <img
        src={toggleButton}
        alt=""
        className="toggleButton"
        onClick={handleToggle}
      />
      {toggleSidebar
        ? (
          <>
            <>
              <div className="row-org">
                <img src={menu} alt="menu_square" className="org-icon" />
                <div className="org-heading">
                  Organization
                </div>
              </div>
              <div className="org-name">
                {allState.organization.currentOrganization?.name}
              </div>
              {permission?.Organization?.includes('organization:view') && (
                <Link
                  to={`/org/${allState.organization.currentOrganization?.domain}/manage`}
                  onClick={() => dispatch(updateOrganizationScreen('intro'))}
                >
                  <div className="goto-dashboard">
                    Go to Dashboard
                    <img src={dashboardChevron} alt="" className="dashboard-chevron" />
                  </div>
                </Link>
              )}
            </>
            {permission?.Organization?.includes('organization:view')
            && (
              <>
                <Link
                  to={`/org/${allState.organization.currentOrganization?.domain}/manage`}
                  onClick={() => dispatch(updateOrganizationScreen('all-list'))}
                >
                  <div className="row-sidebar">
                    <img src={childOrganizationIcon} alt="" />
                    <div className="sidebar-headings">
                      Child Orgs
                    </div>
                    <FontAwesomeIcon icon="angle-right" className="headings-angle-right" />
                  </div>
                </Link>
              </>
            )}
            {permission?.Project?.includes('project:view')
            && (
              <>
                <Link to={`/org/${allState.organization.currentOrganization?.domain}`}>
                  <div className="row-sidebar">
                    <img src={foldericon} alt="" />
                    <div className="sidebar-headings">
                      Projects
                    </div>
                    <FontAwesomeIcon icon="angle-right" className="headings-angle-right" />
                  </div>
                </Link>
              </>
            )}
            {permission?.Team?.includes('team:view')
            && (
              <>
                <Link to={`/org/${allState.organization.currentOrganization?.domain}/teams`}>
                  <div className="row-sidebar">
                    <img src={teamicon} alt="" />
                    <div className="sidebar-headings">
                      Teams
                    </div>
                    <FontAwesomeIcon icon="angle-right" className="headings-angle-right" />
                  </div>
                </Link>
              </>
            )}
            {permission?.Group?.includes('group:view')
            && (
              <>
                <Link to={`/org/${allState.organization.currentOrganization?.domain}/groups`}>
                  <div className="row-sidebar">
                    <img src={groupicon} alt="" />
                    <div className="sidebar-headings">
                      Groups
                    </div>
                    <FontAwesomeIcon icon="angle-right" className="headings-angle-right" />
                  </div>
                </Link>
              </>
            )}
            {permission?.Organization?.includes('organization:view-user')
            && (
              <>
                <Link
                  to={`/org/${allState.organization.currentOrganization?.domain}/admin`}
                  onClick={() => {
                    dispatch(setActiveTab('Users'));
                  }}
                >
                  <div className="row-sidebar">
                    <img src={usersidebaricon} alt="" />
                    <div className="sidebar-headings">
                      Users
                    </div>
                    <FontAwesomeIcon icon="angle-right" className="headings-angle-right" />
                  </div>
                </Link>
              </>
            )}
            <img src={backgroundimg} alt="" />
          </>
        ) : (
          <>
            <div className="toggleSidebar collapsedown">
              {permission?.Organization?.includes('organization:view') && (
                <Link
                  to={`/org/${allState.organization.currentOrganization.domain}/manage`}
                  onClick={() => dispatch(updateOrganizationScreen('intro'))}
                >
                  <img src={organizationLargeIcon} alt="" />
                  <div className="tagline">
                    Manage Organization
                  </div>
                </Link>
              )}
              {permission?.Organization?.includes('organization:view') && (
                <Link
                  to={`/org/${allState.organization.currentOrganization.domain}/manage`}
                  onClick={() => dispatch(updateOrganizationScreen('all-list'))}
                >
                  <img src={childOrgLargeIcon} alt="" />
                  <div className="tagline">
                    Manage Child Org
                  </div>
                </Link>
              )}
              {permission?.Project?.includes('project:view') && (
                <Link to={`/org/${allState.organization.currentOrganization?.domain}`}>
                  <img src={projectLargeIcon} alt="" />
                  <div className="tagline">
                    Manage Projects
                  </div>
                </Link>
              )}
              {permission?.Team?.includes('team:view') && (
                <Link to={`/org/${allState.organization.currentOrganization?.domain}/teams`}>
                  <img src={teamLargeIcon} alt="" />
                  <div className="tagline">
                    Manage Teams
                  </div>
                </Link>
              )}
              {permission?.Group?.includes('group:view') && (
                <Link to={`/org/${allState.organization.currentOrganization?.domain}/groups`}>
                  <img src={groupLargeIcon} alt="" />
                  <div className="tagline">
                    Manage Groups
                  </div>
                </Link>
              )}
              {permission?.Organization?.includes('organization:view-user') && (
                <Link
                  to={`/org/${allState.organization.currentOrganization?.domain}/admin`}
                  onClick={() => {
                    dispatch(setActiveTab('Users'));
                  }}
                >
                  <img src={userLargeIcon} alt="" />
                  <div className="tagline">
                    Manage Users
                  </div>
                </Link>
              )}
            </div>
          </>
        )}
    </aside>
  );
}

Sidebar.propTypes = {
  // history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);
