import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import foldericon from 'assets/images/sidebar/folder-icon.png';
import teamicon from 'assets/images/sidebar/team-icon.png';
import dashboardicon from 'assets/images/sidebar/dashboard-icon.png';
import backgroundimg from 'assets/images/sidebar/background.png';

import {
  allSidebarProjects,
} from 'store/actions/project';

import './style.scss';

const PROJECTS = 'projects';
const CHANNEL = 'channel';
const TEAM = 'team';

function Sidebar(props) {
  const { history, location } = props;

  const dispatch = useDispatch();

  const allState = useSelector((state) => state);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const organization = useSelector((state) => state.organization);

  useEffect(() => {
    if (location.pathname.includes('teams/')) {
      const teamId = parseInt(location.pathname.split('teams/')[1], 10);
      if (teamId) {
        setSelectedTeam(teamId);

        if (location.pathname.includes(PROJECTS)) {
          setSelectedCategory(PROJECTS);
        } else if (location.pathname.includes(CHANNEL)) {
          setSelectedCategory(CHANNEL);
        } else {
          setSelectedCategory(TEAM);
        }
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!allState.sidebar.isLoaded && organization.activeOrganization) {
      dispatch(allSidebarProjects());
    }
  }, [allState.sidebar.isLoaded, organization.activeOrganization, dispatch]);

  const handleClickTeam = useCallback((team) => {
    history.push(`/org/${allState.organization.currentOrganization?.domain}/teams/${team.id}`);
  }, [history, allState.organization.currentOrganization?.domain]);
  const handleClickGroup = useCallback((group) => {
    history.push(`/org/${allState.organization.currentOrganization?.domain}/groups/${group.id}`);
  }, [history, allState.organization.currentOrganization?.domain]);

  return (
    <aside className="sidebar-all">
      <Link to="/">
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
          <Link className="expand" to="/projects">
            Explore All
            <FontAwesomeIcon icon="arrow-right" className="ml-2" />
          </Link>
        </ul>
      )}

      <Link to={`/org/${organization.currentOrganization?.domain}/dashboard`}>
        <div className="menu-title">
          <img src={dashboardicon} alt="" />
          Dashboard & Stats
        </div>
      </Link>

      <Link to={`/org/${allState.organization.currentOrganization?.domain}/teams`}>
        <div className="menu-title">
          <img src={teamicon} alt="" />
          Teams
        </div>
      </Link>
      {allState.sidebar.teams.length > 0 && allState.team.teams.map((team) => (
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
            {/*
            <Link
              to={`/teams/${team.id}/channel`}
              className={selectedCategory === CHANNEL ? 'active-label' : ''}
            >
              <span className="channel-title">Channels</span>
            </Link>
            */}
          </div>
        </div>
      ))}
      <div className="menu-title create-button">
        <Link to={`/org/${allState.organization.currentOrganization?.domain}/teams/create-team`}>
          <div>
            <FontAwesomeIcon width="7px" icon="plus" className="mr-2" />
            Create Team
          </div>
        </Link>
      </div>
      <Link to={`/org/${allState.organization.currentOrganization?.domain}/groups`}>
        <div className="menu-title">
          <FontAwesomeIcon icon="users" className="mr-2" />
          Groups
        </div>
      </Link>
      {allState.sidebar.groups.length > 0 && allState.group.groups.map((group) => (
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
            {/*
            <Link
              to={`/teams/${team.id}/channel`}
              className={selectedCategory === CHANNEL ? 'active-label' : ''}
            >
              <span className="channel-title">Channels</span>
            </Link>
            */}
          </div>
        </div>
      ))}
      <div className="menu-title create-button">
        <Link to={`/org/${allState.organization.currentOrganization?.domain}/groups/create-group`}>
          <div>
            <FontAwesomeIcon width="7px" icon="plus" className="mr-2" />
            Create Group
          </div>
        </Link>
      </div>
      <img src={backgroundimg} alt="" />
    </aside>
  );
}

Sidebar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);
