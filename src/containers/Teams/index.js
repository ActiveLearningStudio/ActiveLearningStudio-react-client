import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { loadTeamsAction } from 'store/actions/team';
// import Header from 'components/Header';
// import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import CreateTeam from './CreateTeam';
import TeamView from './TeamCard';
import TeamMemberView from './TeamMemberView';
import TeamProjectView from './TeamProjectView';
import ChannelPanel from './Channel';

import './style.scss';

// TODO: need to remove after connect API
const breadCrumbData = {
  creation: 'teams/create team',
  editMode: 'edit team',
  projectShow: 'projects',
  channelShow: 'projects',
  teamShow: 'teams',
};

function TeamsPage(props) {
  const {
    location,
    teams,
    overview,
    creation,
    teamShow,
    editMode,
    projectShow,
    channelShow,
    loadTeams,
  } = props;
  const organization = useSelector((state) => state.organization);
  const { activeOrganization } = organization;
  const [breadCrumb, setBreadCrumb] = useState([]);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      if (activeOrganization && overview && !creation && !editMode) {
        Swal.showLoading();
        await loadTeams();
        Swal.close();
      } else {
        await loadTeams();
      }
    }
    )();
  }, [loadTeams, activeOrganization, overview, creation, editMode]);

  const status = creation
    ? 'creation'
    : editMode
      ? 'editMode'
      : teamShow
        ? 'teamShow'
        : projectShow
          ? 'projectShow'
          : overview
            ? 'teamShow'
            : 'channelShow';

  const teamId = parseInt(location.pathname.split('teams/')[1], 10);
  const selectedTeam = teams.find((team) => team.id === teamId);

  useEffect(() => {
    let crumb = breadCrumbData[status];
    if (teamShow && selectedTeam) {
      crumb += (`/${selectedTeam.name} Members`);
    }

    setBreadCrumb(crumb.split('/'));
  }, [selectedTeam, status, teamShow, teams]);

  if (location.pathname.includes('teams/') && !selectedTeam && !creation) {
    return <></>;
  }

  const title = {
    creation: 'Create Team',
    editMode: 'Edit Team',
    teamShow: `${selectedTeam ? selectedTeam.name : 'Team'} Members`,
    projectShow: `${selectedTeam ? selectedTeam.name : 'Team'} Projects`,
    channelShow: 'Channels',
  };

  return (
    <>
      <div className="side-wrapper-team">
        <div className="bread-crumb">
          {breadCrumb.map((node, index, these) => (
            <div key={node}>
              <span className={index + 1 < these.length ? 'parent' : 'child'}>
                {node}
              </span>
              {index + 1 < these.length && (
                <FontAwesomeIcon icon="angle-right" />
              )}
            </div>
          ))}
          <Link className="back-button-main-page" onClick={() => history.goBack()}>
            <FontAwesomeIcon icon="chevron-left" />
            Back
          </Link>
        </div>
      </div>
      <div className="teams-page">

        <div className="content-wrapper">
          <div className="content">
            <div className="row">
              <h1 className={`title${projectShow ? ' project-title' : ''}${channelShow ? ' channel-title' : ''}`}>
                {overview ? 'Teams' : (title[status] || 'Teams')}
              </h1>

              {projectShow && (
                <></>
              )}
            </div>

            {overview && (
              <div className="row overview">
                {teams.length > 0 ? teams.map((team) => (
                  <TeamView key={team.id} team={team} />
                )) : <div>No teams available </div> }
              </div>
            )}

            {(creation || editMode) && (
              <div className="row sub-content"><CreateTeam editMode={editMode} selectedTeam={selectedTeam} /></div>
            )}

            {teamShow && selectedTeam && (
              <TeamMemberView team={selectedTeam} />
            )}

            {projectShow && selectedTeam && (
              <TeamProjectView team={selectedTeam} />
            )}

            {channelShow && selectedTeam && (
              <ChannelPanel />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

TeamsPage.propTypes = {
  location: PropTypes.object.isRequired,
  teams: PropTypes.array.isRequired,
  overview: PropTypes.bool,
  creation: PropTypes.bool,
  editMode: PropTypes.bool,
  teamShow: PropTypes.bool,
  projectShow: PropTypes.bool,
  channelShow: PropTypes.bool,
  loadTeams: PropTypes.func.isRequired,
};

TeamsPage.defaultProps = {
  overview: false,
  creation: false,
  editMode: false,
  teamShow: false,
  projectShow: false,
  channelShow: false,
};

const mapStateToProps = (state) => ({
  teams: state.team.teams,
});

const mapDispatchToProps = (dispatch) => ({
  loadTeams: () => dispatch(loadTeamsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
