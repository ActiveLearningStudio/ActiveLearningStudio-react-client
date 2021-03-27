import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { searchUsersAction } from 'store/actions/auth';
import { loadMyProjectsAction } from 'store/actions/project';
import {
  createTeamAction,
  inviteTeamMemberAction,
  inviteTeamMembersAction,
  resetSelectedTeamAction,
  showAssigningAction,
  showCreationAction,
  showInvitingAction,
  updateSelectedTeamAction,
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
    setInvitedMembers,
  } = props;

  const {
    showCreation,
    showInviting,
    showAssigning,
  } = team;

  const [selectedMembers, setSelectedMembers] = useState([]);

  const [selectedProjects, setSelectedProjects] = useState([]);
  const [searchProject, setSearchProject] = useState('');

  useEffect(() => {
    loadProjects();
    resetSelectedTeam();
    showCreate();
  }, [loadProjects, resetSelectedTeam, showCreate]);

  const submitBack = () => {
    if (showInviting) {
      showCreate();
    } else if (showAssigning) {
      showInvite();
    }
  };

  const backButton = (
    <button
      type="button"
      className="back-button"
      disabled={team.isLoading}
      onClick={submitBack}
    >
      <FontAwesomeIcon icon="chevron-left" className="mr-2" />
      Back
    </button>
  );

  const handleSubmit = useCallback((projectIds) => {
    setInvitedMembers(selectedMembers.map(
      // eslint-disable-next-line no-restricted-globals
      ({ id, ...mem }) => ({ id: isNaN(id) ? 0 : id, ...mem }),
    ));

    createTeam({
      ...team.selectedTeam,
      users: selectedMembers || [],
      projects: projectIds,
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully created.',
        });
        history.push('/teams');
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Create Team failed, kindly try again.',
        });
      });
  }, [createTeam, team.selectedTeam, history, selectedMembers]);

  return (
    <div className="create-team">
      <div>
        {backButton}
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
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
            nextStep={showAssign}
          />
        )}

        {showAssigning && (
          <AssignProject
            isSaving={team.isLoading}
            projects={projects}
            selectedProjects={selectedProjects}
            handleSubmit={handleSubmit}
            search={searchProject}
            setSearch={setSearchProject}
            setSelectedProjects={setSelectedProjects}
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
  setInvitedMembers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  team: state.team,
  isSearching: state.auth.isSearching,
  searchedUsers: state.auth.searchedUsers,
  projects: state.project.projects,
  setInvitedMembers: PropTypes.func.isRequired,
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
  setInvitedMembers: (users) => dispatch(inviteTeamMembersAction(users)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTeam));
