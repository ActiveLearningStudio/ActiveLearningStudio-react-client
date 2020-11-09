import React, { useEffect /* , useCallback, useState */ } from 'react';
// import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Swal from 'sweetalert2';

// import logo from 'assets/images/logo.svg';
import {
  allSidebarProjects,
  // allUpdateProject,
  // sampleProjects,
} from 'store/actions/project';
// import { loadTeamsAction } from 'store/actions/team';

import './style.scss';

// const PROJECTS = 'projects';
// const CHANNEL = 'channel';
// const TEAM = 'team';

function Sidebar(/* props */) {
  // const { history, location } = props;

  const dispatch = useDispatch();

  const allState = useSelector((state) => state);

  // const [myProjects, setMyProjects] = useState([]);
  // const [sampleProject, setSampleProjects] = useState([]);
  // const [updateProject, setUpdateProject] = useState([]);

  // const [selectedTeam, setSelectedTeam] = useState(null);
  // const [selectedCategory, setSelectedCategory] = useState(null);

  // useEffect(() => {
  //   if (location.pathname.includes('teams/')) {
  //     const teamId = parseInt(location.pathname.split('teams/')[1], 10);
  //     if (teamId) {
  //       setSelectedTeam(teamId);
  //
  //       if (location.pathname.includes(PROJECTS)) {
  //         setSelectedCategory(PROJECTS);
  //       } else if (location.pathname.includes(CHANNEL)) {
  //         setSelectedCategory(CHANNEL);
  //       } else {
  //         setSelectedCategory(TEAM);
  //       }
  //     }
  //   }
  // }, [location.pathname]);

  useEffect(() => {
    if (!allState.sidebar.isLoaded) {
      dispatch(allSidebarProjects());
      // dispatch(sampleProjects());
      // dispatch(allUpdateProject());
      // dispatch(loadTeamsAction());
    }
  }, [allState.sidebar.isLoaded, dispatch]);

  // useEffect(() => {
  //   if (allState.sidebar.allProject.length > 0) {
  //     setMyProjects(allState.sidebar.allProject);
  //   }
  // }, [allState.sidebar.allProject]);

  // useEffect(() => {
  //   if (allState.sidebar.sampleProject.length > 0) {
  //     setSampleProjects(allState.sidebar.sampleProject);
  //   }
  // }, [allState.sidebar.sampleProject]);

  // useEffect(() => {
  //   if (allState.sidebar.updateProject.length > 0) {
  //     setUpdateProject(allState.sidebar.updateProject);
  //   }
  // }, [allState.sidebar.updateProject]);

  // const handleClickTeam = useCallback((team) => {
  //   history.push(`/teams/${team.id}`);
  // }, [history]);

  return (
    <aside className="sidebar-all">
      <Link to="/">
        <div className="menu-title">
          <FontAwesomeIcon icon="tasks" className="mr-2" />
          My Projects
        </div>
      </Link>

      <ul className="all-project">
        {allState.sidebar.allProject.slice(0, 5).map((data) => (
          <li key={data.id}>
            <Link to={`/project/${data.id}`}>
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

      {/* <div
        className="menu-title"
        onClick={() => {
          Swal.fire({
            title: 'STAY TUNED!',
            text: 'COMING SOON',
            imageUrl: logo,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          });
        }}
      >
        <FontAwesomeIcon icon="user-friends" className="mr-2" />
        My Teams
      </div> */}

      {/*
      <div className="menu-title">
        <FontAwesomeIcon icon="tasks" className="mr-2" />
        Sample Projects
      </div>

      <ul className="all-project">
        {allState.sidebar.sampleProject.slice(0, 5).map((data) => (
          <li key={data.id}>
            <a target="_blank" rel="noreferrer" href={`/project/${data.id}/shared`}>
              <FontAwesomeIcon icon="angle-right" className="mr-2" />
              {data.name}
            </a>
          </li>
        ))}
      </ul>
      */}

      {/*
      {!!updateProject && (
        <>
          <div className="menu-title">
            <FontAwesomeIcon icon="tasks" className="mr-2" />
            What&apos;s New
          </div>

          <ul className="all-project">
            {updateProject.slice(0, 5).map((data, counter) => (
              <li key={data.id}>
                <a target="_blank" rel="noreferrer" href={`/project/${data.id}/shared`}>
                  <FontAwesomeIcon icon="angle-right" className="mr-2" />
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      */}

      <Link to="/dashboard">
        <div className="menu-title">
          <FontAwesomeIcon icon="tachometer-alt" className="mr-2" />
          Utilization Dashboard
        </div>
      </Link>

      {/*
      <Link to="/teams">
        <div className="menu-title">
          <FontAwesomeIcon icon="user-friends" className="mr-2" />
          Teams
        </div>
      </Link>

      {allState.team.teams.map((team) => (
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
              to={`/teams/${team.id}`}
              className={selectedCategory === TEAM ? 'active-label' : ''}
            >
              <FontAwesomeIcon icon="user-friends" className="mr-2" />
              Team Members
            </Link>
            <Link
              to={`/teams/${team.id}/projects`}
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

      <div className="menu-title create-button">
        <Link to="/teams/create-team">
          <FontAwesomeIcon width="7px" icon="plus" className="mr-2" />
          Create Team
        </Link>
      </div>
      */}
    </aside>
  );
}

Sidebar.propTypes = {
  // history: PropTypes.object.isRequired,
  // location: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);
