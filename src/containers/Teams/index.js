import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { inviteMemberAction, loadTeamsAction, removeMemberAction } from 'store/actions/team';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
import CreateTeam from './CreateTeam';
import TeamView from './TeamCard';
import TeamMemberView from './TeamMemberView';
import TeamProjectView from './TeamProjectView';
import ChannelPanel from './Channel';

import './style.scss';

// TODO: need to remove after connect API
const breadCrumbData = {
  creation: 'teams/create team',
  projectShow: 'projects',
  channelShow: 'projects',
  teamShow: 'teams',
};

function TeamsPage(props) {
  const {
    location,
    isInviting,
    user,
    teams,
    overview,
    creation,
    teamShow,
    projectShow,
    channelShow,
    loadTeams,
    inviteMember,
    removeMember,
  } = props;

  const [breadCrumb, setBreadCrumb] = useState([]);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  const status = creation
    ? 'creation'
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
    teamShow: `${selectedTeam ? selectedTeam.name : 'Team'} Members`,
    projectShow: `${selectedTeam ? selectedTeam.name : 'Team'} Projects`,
    channelShow: 'Channels',
  };

  return (
    <>
      <Header {...props} />

      <div className="teams-page main-content-wrapper">
        <div className="sidebar-wrapper">
          <Sidebar />

          <div className="collapse-button">
            <FontAwesomeIcon icon="angle-left" />
          </div>

          <div className="bread-crumb d-flex align-items-center">
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
          </div>
        </div>

        <div className="content-wrapper">
          <div className="content">
            <div className="row">
              <h1 className={`title${projectShow ? ' project-title' : ''}${channelShow ? ' channel-title' : ''}`}>
                {overview ? 'Teams' : (title[status] || 'Teams')}
              </h1>
            </div>

            {overview && (
              <div className="row overview">
                {teams.map((team) => (
                  <TeamView key={team.id} team={team} />
                ))}
              </div>
            )}

            {creation && (
              <div className="row sub-content"><CreateTeam /></div>
            )}

            {teamShow && selectedTeam && (
              <TeamMemberView
                isInviting={isInviting}
                inviteMember={inviteMember}
                removeMember={removeMember}
                user={user}
                team={selectedTeam}
              />
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
  isInviting: PropTypes.bool.isRequired,
  user: PropTypes.object,
  teams: PropTypes.array.isRequired,
  overview: PropTypes.bool,
  creation: PropTypes.bool,
  teamShow: PropTypes.bool,
  projectShow: PropTypes.bool,
  channelShow: PropTypes.bool,
  loadTeams: PropTypes.func.isRequired,
  inviteMember: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
};

TeamsPage.defaultProps = {
  user: null,
  overview: false,
  creation: false,
  teamShow: false,
  projectShow: false,
  channelShow: false,
};

const mapStateToProps = (state) => ({
  isInviting: state.team.isInviting,
  user: state.auth.user,
  teams: state.team.teams,
});

const mapDispatchToProps = (dispatch) => ({
  loadTeams: () => dispatch(loadTeamsAction()),
  inviteMember: (teamId, email) => dispatch(inviteMemberAction(teamId, email)),
  removeMember: (teamId, userId) => dispatch(removeMemberAction(teamId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
