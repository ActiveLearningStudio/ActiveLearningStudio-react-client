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
  createGroupAction,
  updateGroupAction,
  inviteGroupMemberAction,
  inviteGroupMembersAction,
  resetSelectedGroupAction,
  showAssigningAction,
  showCreationAction,
  showInvitingAction,
  updateSelectedGroupAction,
} from 'store/actions/group';
import CreateGroupSidebar from './components/CreateGroupSidebar';
import Creation from './components/Creation';
import InviteGroup from './components/InviteGroup';
import AssignProject from './components/AssignProject';

import './style.scss';

function CreateGroup(props) {
  const {
    history,
    group,
    editMode,
    selectedGroup,
    isSearching,
    searchedUsers,
    projects,
    searchUsers,
    loadProjects,
    resetSelectedGroup,
    updateSelectedGroup,
    showCreate,
    showInvite,
    inviteUser,
    showAssign,
    createGroup,
    updateGroup,
    setInvitedMembers,
  } = props;

  const {
    showCreation,
    showInviting,
    showAssigning,
  } = group;

  const [selectedMembers, setSelectedMembers] = useState([]);
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [searchProject, setSearchProject] = useState('');

  useEffect(() => {
    loadProjects();
    resetSelectedGroup();
    showCreate();
    if (editMode) {
      updateSelectedGroup(selectedGroup);
      setSelectedMembers(selectedGroup?.users);
      setSelectedProjects(selectedGroup?.projects.map((project) => project.id));
    }
  }, [loadProjects, resetSelectedGroup, showCreate, editMode, selectedGroup, updateSelectedGroup]);

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
      disabled={group.isLoading}
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
    if (editMode) {
      updateGroup(selectedGroup?.id, {
        organization_id: organization.activeOrganization?.id,
        ...group.selectedGroup,
        users: selectedMembers || [],
        projects: projectIds,
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully updated.',
        });
        history.push(`/studio/org/${organization.currentOrganization?.domain}/groups`);
      }).catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Update Group failed, kindly try again.',
        });
      });
    } else {
      createGroup({
        organization_id: organization.activeOrganization?.id,
        ...group.selectedGroup,
        users: selectedMembers || [],
        projects: projectIds,
      })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully created.',
          });
          history.push(`/studio/org/${organization.currentOrganization?.domain}/groups`);
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Create Group failed, kindly try again.',
          });
        });
    }
  }, [createGroup, group.selectedGroup, history, selectedMembers, updateGroup]);

  return (
    <div className="create-group">
      {(permission?.Group?.includes('group:create') && !editMode) || (permission?.Group?.includes('group:edit') && editMode) ? (
        <>
          <div>
            {backButton}
            <CreateGroupSidebar group={group} editMode={editMode} />
          </div>

          <div className="create-group-content">
            {showCreation && (
              <Creation editMode={editMode} updateGroup={updateSelectedGroup} nextStep={showInvite} />
            )}

            {showInviting && (
              <InviteGroup
                group={group.selectedGroup}
                editMode={editMode}
                isSearching={isSearching}
                searchedUsers={searchedUsers}
                isInviting={group.isInviting}
                searchUsers={searchUsers}
                inviteUser={inviteUser}
                selectedMembers={selectedMembers}
                setSelectedMembers={setSelectedMembers}
                nextStep={showAssign}
              />
            )}

            {showAssigning && (
              <AssignProject
                isSaving={group.isLoading}
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
          groups.
        </Alert>
      )}
    </div>
  );
}

CreateGroup.propTypes = {
  history: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  selectedGroup: PropTypes.object.isRequired,
  isSearching: PropTypes.bool.isRequired,
  searchedUsers: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  searchUsers: PropTypes.func.isRequired,
  loadProjects: PropTypes.func.isRequired,
  resetSelectedGroup: PropTypes.func.isRequired,
  updateSelectedGroup: PropTypes.func.isRequired,
  showCreate: PropTypes.func.isRequired,
  showInvite: PropTypes.func.isRequired,
  inviteUser: PropTypes.func.isRequired,
  showAssign: PropTypes.func.isRequired,
  createGroup: PropTypes.func.isRequired,
  updateGroup: PropTypes.func.isRequired,
  setInvitedMembers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  isSearching: state.auth.isSearching,
  searchedUsers: state.auth.searchedUsers,
  projects: state.project.projects,
  setInvitedMembers: PropTypes.func.isRequired,
});

const mapDispatchToProps = (dispatch) => ({
  searchUsers: (search) => dispatch(searchUsersAction(search)),
  loadProjects: () => dispatch(loadMyProjectsAction()),
  resetSelectedGroup: () => dispatch(resetSelectedGroupAction()),
  updateSelectedGroup: (group) => dispatch(updateSelectedGroupAction(group)),
  showCreate: () => dispatch(showCreationAction()),
  showInvite: () => dispatch(showInvitingAction()),
  inviteUser: (user) => dispatch(inviteGroupMemberAction(user)),
  showAssign: () => dispatch(showAssigningAction()),
  createGroup: (data) => dispatch(createGroupAction(data)),
  updateGroup: (teamId, data) => dispatch(updateGroupAction(teamId, data)),
  setInvitedMembers: (users) => dispatch(inviteGroupMembersAction(users)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGroup));
