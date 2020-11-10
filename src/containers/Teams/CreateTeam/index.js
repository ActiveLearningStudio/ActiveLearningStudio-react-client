import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import { searchUsersAction } from 'store/actions/auth';
import { loadMyProjectsAction } from 'store/actions/project';
import {
  resetSelectedTeamAction,
  updateSelectedTeamAction,
  showCreationAction,
  showInvitingAction,
  inviteTeamMemberAction,
  showAssigningAction,
  createTeamAction,
} from 'store/actions/team';
import CreateTeamSidebar from './components/CreateTeamSidebar';
import Creation from './components/Creation';
import InviteTeam from './components/InviteTeam';
import AssignProject from './components/AssignProject';

import './style.scss';

function CreateTeam(props) {
  const {
    history,
    team,
    isSearching,
    searchedUsers,
    projects,
    searchUsers,
    loadProjects,
    resetSelectedTeam,
    updateSelectedTeam,
    showCreate,
    showInvite,
    inviteUser,
    showAssign,
    createTeam,
  } = props;

  const {
    showCreation,
    showInviting,
    showAssigning,
  } = team;

  useEffect(() => {
    loadProjects();
    resetSelectedTeam();
    showCreate();
  }, [loadProjects, resetSelectedTeam, showCreate]);

  const handleSubmit = useCallback((projectIds) => {
    createTeam({
      ...team.selectedTeam,
      users: team.selectedTeam.users || [],
      projects: projectIds,
    })
      .then(() => {
        history.push('/teams');
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Create Team failed, kindly try again.',
        });
      });
  }, [createTeam, team.selectedTeam, history]);

  return (
    <div className="create-team">
      <div>
        <CreateTeamSidebar team={team} />
      </div>

      <div className="create-team-content">
        {showCreation && (
          <Creation updateTeam={updateSelectedTeam} nextStep={showInvite} />
        )}

        {showInviting && (
          <InviteTeam
            team={team.selectedTeam}
            isSearching={isSearching}
            searchedUsers={searchedUsers}
            isInviting={team.isInviting}
            searchUsers={searchUsers}
            inviteUser={inviteUser}
            nextStep={showAssign}
          />
        )}

        {showAssigning && (
          <AssignProject
            isSaving={team.isLoading}
            projects={projects}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

CreateTeam.propTypes = {
  history: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  isSearching: PropTypes.bool.isRequired,
  searchedUsers: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  searchUsers: PropTypes.func.isRequired,
  loadProjects: PropTypes.func.isRequired,
  resetSelectedTeam: PropTypes.func.isRequired,
  updateSelectedTeam: PropTypes.func.isRequired,
  showCreate: PropTypes.func.isRequired,
  showInvite: PropTypes.func.isRequired,
  inviteUser: PropTypes.func.isRequired,
  showAssign: PropTypes.func.isRequired,
  createTeam: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  team: state.team,
  isSearching: state.auth.isSearching,
  searchedUsers: state.auth.searchedUsers,
  projects: state.project.projects,
});

const mapDispatchToProps = (dispatch) => ({
  searchUsers: (search) => dispatch(searchUsersAction(search)),
  loadProjects: () => dispatch(loadMyProjectsAction()),
  resetSelectedTeam: () => dispatch(resetSelectedTeamAction()),
  updateSelectedTeam: (team) => dispatch(updateSelectedTeamAction(team)),
  showCreate: () => dispatch(showCreationAction()),
  showInvite: () => dispatch(showInvitingAction()),
  inviteUser: (user) => dispatch(inviteTeamMemberAction(user)),
  showAssign: () => dispatch(showAssigningAction()),
  createTeam: (data) => dispatch(createTeamAction(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTeam));
