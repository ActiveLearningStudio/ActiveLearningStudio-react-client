import React, {
  // useCallback,
  useEffect,
  // useState
} from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion } from 'react-bootstrap';
import foldericon from 'assets/images/sidebar/folder-icon.png';
import teamicon from 'assets/images/sidebar/team-icon.png';
// import toggleButton from 'assets/images/sidebar/toggle-button.png';
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
      <Accordion>
        <Accordion.Toggle>
          {/* <img src={toggleButton} alt="" /> */}
        </Accordion.Toggle>
      </Accordion>
      {permission?.activeRole === 'admin'
      && (
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
          <Link to={`/org/${allState.organization.currentOrganization?.domain}/manage`}>
            <div className="goto-dashboard">
              Go to Dashboard
              <img src={dashboardChevron} alt="" className="dashboard-chevron" />
            </div>
          </Link>
          <Link to={`/org/${allState.organization.currentOrganization?.domain}/manage`}>
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
      {permission?.Project
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
      {permission?.Team
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
      {permission?.Group
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
      {permission?.Group
      && (
        <>
          <Link to={`/org/${allState.organization.currentOrganization?.domain}/manage`}>
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
      {/* <Link to="/">
        <div className="menu-title">
          <img src={foldericon} alt="" />
          My Projects
        </div>
      </Link>
      {allState.sidebar.allProject.length > 0 && (
        <ul className="all-project">
          {allState.sidebar.allProject.slice(0, 5).map((data) => (
            <li key={data.id}>
              <Link to={`/org/${allState.organization.currentOrganization?.domain}/project/${data.id}`}>
                <FontAwesomeIcon icon="angle-right" className="mr-2" />
                {data.name}
              </Link>
            </li>
          ))}
          <Link className="expand" to={`/org/${organization.currentOrganization?.domain}`}>
            Explore All
            <FontAwesomeIcon icon="arrow-right" className="ml-2" />
          </Link>
        </ul>
      )}
      {permission?.Dashboard?.includes('dashboard:view') && (
        <Link to={`/org/${organization.currentOrganization?.domain}/dashboard`}>
          <div className="menu-title">
            <img src={dashboardicon} alt="" />
            Dashboard & Stats
          </div>
        </Link>
      )} */}
      {/* {permission?.Team?.includes('team:view') && (
        <>
          <Link to={`/org/${allState.organization.currentOrganization?.domain}/teams`}>
            <div className="menu-title">
              <img src={teamicon} alt="" />
              Teams
            </div>
          </Link>
          {allState.sidebar.teams.length > 0 && allState.sidebar.teams.slice(0, 3).map((team) => (
            <div key={team.id} className={`team-item${selectedTeam === team.id ? '' : ' collapsed'}`}>
              <div className="team-label" onClick={() => handleClickTeam(team)}>
                {team.name}
                <FontAwesomeIcon
                  icon={selectedTeam === team.id ? 'angle-up' : 'angle-down'}
                  className="ml-2 mt-1"
                />
              </div>

              <div className="team-detail-labels">
                <Link
                  to={`/org/${allState.organization.currentOrganization?.domain}/teams/${team.id}`}
                  className={selectedCategory === TEAM ? 'active-label' : ''}
                >
                  <FontAwesomeIcon icon="user-friends" className="mr-2" />
                  Team Members
                </Link>
                <Link
                  to={`/org/${allState.organization.currentOrganization?.domain}/teams/${team.id}/projects`}
                  className={selectedCategory === PROJECTS ? 'active-label' : ''}
                >
                  <span className="project-title">Projects</span>
                </Link>
                <Link
                  to={`/teams/${team.id}/channel`}
                  className={selectedCategory === CHANNEL ? 'active-label' : ''}
                >
                  <span className="channel-title">Channels</span>
                </Link>
              </div>
            </div>
          ))}
          {allState.sidebar.teams.length > 0
            && (
            <Link className="expand" style={{ paddingLeft: '20px', borderTop: 'none' }} to={`/org/${allState.organization.currentOrganization?.domain}/teams`}>
              Explore All Teams
              <FontAwesomeIcon icon="arrow-right" className="ml-2" />
            </Link>
            )}
        </>
      )} */}
      {/* {permission?.Team?.includes('team:create') && (
        <div className="menu-title create-button">
          <Link to={`/org/${allState.organization.currentOrganization?.domain}/teams/create-team`}>
            <div>
              <FontAwesomeIcon width="7px" icon="plus" className="mr-2" />
              Create Team
            </div>
          </Link>
        </div>
      )} */}
      {/* {permission?.Group?.includes('group:view') && (
        <>
          <Link to={`/org/${allState.organization.currentOrganization?.domain}/groups`}>
            <div className="menu-title">
              <FontAwesomeIcon icon="users" className="mr-2" />
              Groups
            </div>
          </Link>
          {allState.sidebar.groups.length > 0 && allState.sidebar.groups.slice(0, 3).map((group) => (
            <div key={group.id} className={`team-item${selectedTeam === group.id ? '' : ' collapsed'}`}>
              <div className="team-label" onClick={() => handleClickGroup(group)}>
                {group.name}
                <FontAwesomeIcon
                  icon={selectedTeam === group.id ? 'angle-up' : 'angle-down'}
                  className="ml-2 mt-1"
                />
              </div>

              <div className="team-detail-labels">
                <Link
                  to={`/org/${allState.organization.currentOrganization?.domain}/groups/${group.id}`}
                  className={selectedCategory === TEAM ? 'active-label' : ''}
                >
                  <FontAwesomeIcon icon="user-friends" className="mr-2" />
                  Group Members
                </Link>
                <Link
                  to={`/org/${allState.organization.currentOrganization?.domain}/groups/${group.id}/projects`}
                  className={selectedCategory === PROJECTS ? 'active-label' : ''}
                >
                  <span className="project-title">Projects</span>
                </Link>
                <Link
                  to={`/teams/${team.id}/channel`}
                  className={selectedCategory === CHANNEL ? 'active-label' : ''}
                >
                  <span className="channel-title">Channels</span>
                </Link>
              </div>
            </div>
          ))}
          {allState.sidebar.groups.length > 0
            && (
            <Link className="expand" style={{ paddingLeft: '20px', borderTop: 'none' }} to={`/org/${allState.organization.currentOrganization?.domain}/groups`}>
              Explore All Groups
              <FontAwesomeIcon icon="arrow-right" className="ml-2" />
            </Link>
            )}
        </>
      )} */}
      {/* {permission?.Group?.includes('group:create') && (
        <div className="menu-title create-button">
          <Link to={`/org/${allState.organization.currentOrganization?.domain}/groups/create-group`}>
            <div>
              <FontAwesomeIcon width="7px" icon="plus" className="mr-2" />
              Create Group
            </div>
          </Link>
        </div>
      )} */}
      <img src={backgroundimg} alt="" />
    </aside>
  );
}

Sidebar.propTypes = {
  // history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);
