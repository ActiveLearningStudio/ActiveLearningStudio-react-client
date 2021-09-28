import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';

import { searchUsersAction } from 'store/actions/auth';
import { loadMyProjectsAction } from 'store/actions/project';
import {
  createTeamAction,
  updateTeamAction,
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
    editMode,
    selectedTeam,
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
    updateTeam,
    setInvitedMembers,
    reduxform,
  } = props;

  const {
    showCreation,
    showInviting,
    showAssigning,
  } = team;

  const [selectedMembers, setSelectedMembers] = useState([]);

  const [selectedProjects, setSelectedProjects] = useState([]);
  const [searchProject, setSearchProject] = useState('');
  const organization = useSelector((state) => state.organization);
  const { activeOrganization } = organization;
  const { permission } = organization;
  useEffect(() => {
  }, [team.selectedTeam]);
  useEffect(() => {
    if (activeOrganization) {
      loadProjects();
    }
    resetSelectedTeam();
    showCreate();
    if (editMode) {
      updateSelectedTeam({ name: selectedTeam.name, description: selectedTeam.description });
      // setSelectedMembers(selectedTeam?.users);
      // setSelectedProjects(selectedTeam?.projects.map((project) => project.id));
    }
  }, [loadProjects, resetSelectedTeam, showCreate, editMode, selectedTeam, updateSelectedTeam, activeOrganization]);

  const submitBack = () => {
    if (showInviting) {
      showCreate();
    } else if (showAssigning) {
      showInvite();
    } else {
      history.goBack();
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

  const handleSubmit = useCallback((projectIds = 0) => {
    if (editMode) {
      updateTeam(selectedTeam?.id, {
        organization_id: organization.activeOrganization?.id,
        name: reduxform.CreateTeamForm.values.name,
        description: reduxform.CreateTeamForm.values.description,
        // users: selectedMembers || [],
        // projects: projectIds,
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully updated.',
        });
        history.push(`/studio/org/${organization.currentOrganization?.domain}/teams/${selectedTeam?.id}`);
      })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Update Team failed, kindly try again.',
          });
        });
    } else {
      setInvitedMembers(selectedMembers.map(
        // eslint-disable-next-line no-restricted-globals
        ({ id, ...mem }) => ({ id: isNaN(id) ? 0 : id, ...mem }),
      ));
      createTeam({
        organization_id: organization.activeOrganization?.id,
        ...team.selectedTeam,
        users: selectedMembers || [],
        projects: projectIds,
      })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully created.',
          });
          history.push(`/studio/org/${organization.currentOrganization?.domain}/teams`);
        });
        // .catch(() => {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: 'Create Team failed, kindly try again.',
        //   });
        // });
    }
  // eslint-disable-next-line max-len
  }, [editMode, selectedTeam, team.selectedTeam, updateTeam, organization.activeOrganization?.id, organization.currentOrganization?.domain, history, setInvitedMembers, selectedMembers, createTeam]);

  return (
    <div className="create-team">
      {(permission?.Team?.includes('team:create') && !editMode) || (permission?.Team?.includes('team:edit') && editMode) ? (
        <>
          <div>
            {!editMode && backButton}
            <CreateTeamSidebar team={team} editMode={editMode} />
          </div>
          <div className="create-team-content">
            {showCreation && (
              <Creation editMode={editMode} selectedTeam={selectedTeam} updateTeam={updateSelectedTeam} nextStep={showInvite} handleSubmitInEditMode={handleSubmit} />
            )}

            {
              showInviting && !editMode && (
                <InviteTeam
                  team={team.selectedTeam}
                  editMode={editMode}
                  isSearching={isSearching}
                  searchedUsers={searchedUsers}
                  isInviting={team.isInviting}
                  searchUsers={searchUsers}
                  inviteUser={inviteUser}
                  selectedMembers={selectedMembers}
                  setSelectedMembers={setSelectedMembers}
                  nextStep={showAssign}
                />
              )
            }

            {showAssigning && !editMode && (
              <AssignProject
                isSaving={team.isLoading}
                editMode={editMode}
                projects={projects}
                selectedProjects={selectedProjects}
                handleSubmit={handleSubmit}
                search={searchProject}
                setSearch={setSearchProject}
                setSelectedProjects={setSelectedProjects}
              />
            )}
          </div>
        </>
      ) : (
        <Alert variant="danger">
          {' '}
          You are not authorized to
          {`${editMode ? ' Edit ' : ' Create '} `}
          teams.
        </Alert>
      )}
    </div>
  );
}

CreateTeam.propTypes = {
  history: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  selectedTeam: PropTypes.object.isRequired,
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
  updateTeam: PropTypes.func.isRequired,
  setInvitedMembers: PropTypes.func.isRequired,
  reduxform: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  team: state.team,
  isSearching: state.auth.isSearching,
  searchedUsers: state.auth.searchedUsers,
  projects: state.project.projects,
  setInvitedMembers: PropTypes.func.isRequired,
  reduxform: state.form,
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
  updateTeam: (teamId, data) => dispatch(updateTeamAction(teamId, data)),
  setInvitedMembers: (users) => dispatch(inviteTeamMembersAction(users)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTeam));
