import React, {
  useCallback, useMemo, useState, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import EditTeamImage from 'assets/images/svg/editTeam.svg';
import EditDetailImage from 'assets/images/svg/detailEdit.svg';
import searchimg from 'assets/images/svg/search-icon-admin-panel.svg';
import './style.scss';
import { useHistory } from 'react-router-dom';
import Buttons from 'utils/Buttons/buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import UserIcon from 'assets/images/svg/user.svg';
import InviteDialog from 'components/InviteDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectCard from 'containers/Projects/ProjectCard';
import {
  changeUserRole, getTeamPermission, inviteMembersAction, loadTeamAction, removeMemberAction, removeProjectAction, setNewTeamData, updateTeamAction,
} from 'store/actions/team';
import { connect, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Alert } from 'react-bootstrap';
import TeamMembers from './TeamMembers';

const TeamDetail = ({
  location,
  team,
  organization,
  user,
  inviteMembers,
  newTeam,
  teamPermission,
  newTeamData,
  removeProject,
  changeUserRoleAction,
  loadTeam,
  getTeamPermissionAction,
  updateTeam,
  removeMember,
}) => {
  const [show, setShow] = useState(false);
  const [allPersonalProjects, setAllPersonalProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTeam, setEditTeam] = useState({ editName: false, editDescription: false, editNoovoTitle: false });
  const teamNameRef = useRef();
  const teamDescriptionRef = useRef();
  const teamNoovoTitleRef = useRef();
  const history = useHistory();
  const { roles } = useSelector((state) => state.team);
  const [minimumUserFlag, setMinimumUserFlag] = useState(false);
  const [selectedUsersNewTeam, setSelectUsersNewTeam] = useState(newTeam?.users?.length > 0 ? newTeam.users : []);
  const currentTeamUser = useMemo(() => (team?.users?.length > 0 ? team.users : []), [team?.users]);
  const [createProject, setCreateProject] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [toggleLeft, setToggleLeft] = useState(false);
  console.log(show, createProject);
  const authUser = team?.users?.filter((u) => u.id === (user || {}).id);
  useEffect(() => {
    if (team?.projects) {
      setAllPersonalProjects(team.projects);
      setLoading(false);
    }
  }, [team?.projects]);
  // use effect to redirect user to team page if newTeam is not found
  useEffect(() => {
    if (location.pathname.includes('/teams/team-detail') && !newTeam?.name && organization?.domain) {
      history.push(`/org/${organization?.domain}/teams`);
    } else if (!team?.id && !newTeam?.name && organization?.domain) {
      loadTeam(location.pathname.split('teams/')[1]);
    }
  }, [organization]);
  const handleShow = () => {
    setShow(true);
  };
  const setProjectId = () => { };
  // Team member delete handler function
  const deleteTeamMemberHandler = (userToDelete) => {
    if (team?.id) {
      const remainingAdmin = team?.users?.filter((singleRole) => singleRole?.role?.id === 1);
      if (remainingAdmin?.length <= 1 && userToDelete?.role.id === 1) {
        Swal.fire({
          icon: 'warning',
          text: 'There should be at least one admin',
        });
      } else {
        removeMember(team?.id, userToDelete?.id, userToDelete?.email)
          .then(() => {
            if (userToDelete?.id === user.id) {
              history.push(`/org/${organization.domain}/teams`);
            }
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to remove user.',
            });
          });
      }
    } else if (newTeam?.name) {
      setSelectUsersNewTeam((prevState) => prevState.filter((u) => u.id !== userToDelete.id));
    }
  };
  // Deleting current team project handler
  const showDeletePopup = useCallback(
    (projectId) => {
      removeProject(team?.id, projectId).catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove project.',
        });
      });
    },
    [removeProject, team?.id],
  );
  // User Role change handler for current team
  const roleChangeHandler = async (roleId, userId) => {
    await changeUserRoleAction(team?.id, { user_id: userId, role_id: roleId });
    await loadTeam(team?.id);
    await getTeamPermissionAction(organization?.id, team?.id);
  };
  // Invite handler for new team
  const handleInviteNewTeam = useCallback((users, note) => {
    setSelectUsersNewTeam([...selectedUsersNewTeam, ...users.map((u) => ({ ...u, note }))]);
    setMinimumUserFlag(false);
    setShowInvite(false);
  }, [selectedUsersNewTeam]);
  // Invite handler for current team
  const handleInvite = useCallback((selectedUsers, emailNote) => {
    inviteMembers(team?.id, selectedUsers, emailNote)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully invited.',
        });
        setShowInvite(false);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to invite user.',
        });
      });
  }, [inviteMembers, team?.id]);
  const onBlur = (e) => {
    if (e.target.name === 'team-name') {
      teamNameRef.current.blur();
      setEditTeam({ ...editTeam, editName: false });
      if (e.target.value.length <= 100) {
        if (team?.id && team?.name !== e.target.value) {
          updateTeam(team?.id, {
            organization_id: organization.activeOrganization?.id,
            name: e.target.value,
            description: team?.description,
            noovo_group_title: team?.noovo_group_title,
          }).then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Successfully updated.',
            });
          })
            .catch(() => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Update Team failed, kindly try again.',
              });
            });
        } else if (Object.keys(newTeam).length && newTeam?.name !== e.target.value) {
          newTeamData({ ...newTeam, name: e.target.value });
        }
      } else if (e.target.value.length > 100) {
        Swal.fire({
          icon: 'warning',
          title: 'Exceeding length',
          text: 'Cannot enter more than 100 character in team title.',
        });
      }
    } else if (e.target.name === 'team-description') {
      teamDescriptionRef.current.blur();
      setEditTeam({ ...editTeam, editDescription: false });
      if (e.target.value.length <= 1000) {
        if (team?.id && team?.description !== e.target.value) {
          updateTeam(team?.id, {
            organization_id: organization.activeOrganization?.id,
            name: team?.name,
            description: e.target.value,
            noovo_group_title: team?.noovo_group_title,
          }).then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Successfully updated.',
            });
          })
            .catch(() => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Update Team failed, kindly try again.',
              });
            });
        } else if (Object.keys(newTeam).length && newTeam?.description !== e.target.value) {
          newTeamData({ ...newTeam, description: e.target.value });
        }
      } else if (e.target.value.length > 1000) {
        Swal.fire({
          icon: 'warning',
          title: 'Exceeding length',
          text: 'Cannot enter more than 1000 character in team description.',
        });
      }
    } else if (e.target.name === 'noovo-group-title') {
      teamNoovoTitleRef.current.blur();
      setEditTeam({ ...editTeam, editNoovoTitle: false });
      if (team?.id && team?.description !== e.target.value) {
        updateTeam(team?.id, {
          organization_id: organization.activeOrganization?.id,
          name: team?.name,
          description: team?.description,
          noovo_group_title: e.target.value,
        }).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully updated.',
          });
        })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Update Team failed, kindly try again.',
            });
          });
      } else if (Object.keys(newTeam).length && newTeam?.noovo_group_title !== e.target.value) {
        newTeamData({ ...newTeam, noovo_group_title: e.target.value });
      }
    }
  };
  const onEnterPress = (e) => {
    if (e.charCode === 13) {
      teamNameRef?.current?.blur();
      teamDescriptionRef?.current?.blur();
      teamNoovoTitleRef?.current?.blur();
    }
  };
  const searchProjects = ({ target }) => {
    const { value } = target;
    if (value.length > 0) {
      const filteredProjects = allPersonalProjects.filter((project) => project.name.toLowerCase().includes(value.toLowerCase()));
      setAllPersonalProjects(filteredProjects);
      setLoading(false);
    } else if (team?.id) {
      setAllPersonalProjects(team?.projects);
      setLoading(false);
    }
  };
  return (
    <div className="team-detail-page">
      <div className="content">
        <div className="inner-content">
          <div className="add-team-page">
            <div className={`${toggleLeft ? 'width90' : ''} left`}>
              <div className="organization-name">{organization?.name}</div>
              <div className="title-image">
                <div>
                  {!editTeam.editName && <h1 className="title">{team?.name || newTeam?.name}</h1>}
                  {editTeam.editName && (
                    <textarea
                      className="title"
                      name="team-name"
                      ref={teamNameRef}
                      defaultValue={team?.name || newTeam?.name}
                      onBlur={onBlur}
                      onKeyPress={onEnterPress}
                    />
                  )}
                </div>
                <div>
                  {!editTeam.editName && teamPermission?.activeRole === 'admin' && (
                    <img
                      className="editimage-tag"
                      src={EditTeamImage}
                      alt="EditTeamImage"
                      onClick={() => {
                        setEditTeam({ ...editTeam, editName: true });
                        teamNameRef?.current?.focus();
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="add-team-detail">
                <div className="team-detail">
                  <p>
                    {!editTeam.editDescription && (team?.description || newTeam?.description)}
                  </p>
                  {editTeam.editDescription && (
                    <textarea
                      className="description"
                      name="team-description"
                      ref={teamDescriptionRef}
                      defaultValue={team?.description || newTeam?.description}
                      onBlur={onBlur}
                      onKeyPress={onEnterPress}
                    />
                  )}
                </div>
                <div className="team-edit-detail">
                  {!editTeam.editDescription && teamPermission?.activeRole === 'admin' && (
                    <img
                      className="editimage-tag"
                      src={EditDetailImage}
                      alt="EditDetailImage"
                      onClick={() => {
                        setEditTeam({ ...editTeam, editDescription: true });
                        teamDescriptionRef?.current?.focus();
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="noovo-group-title">
                <label>Noovo Group Title:</label>
                {'  '}
                {!editTeam?.editNoovoTitle ? (
                  <p>{team?.noovo_group_title || newTeam?.noovo_group_title}</p>
                ) : null}
                {editTeam?.editNoovoTitle && (
                  <textarea
                    className="noovo-title"
                    name="noovo-group-title"
                    ref={teamNoovoTitleRef}
                    defaultValue={team?.noovo_group_title || newTeam?.noovo_group_title}
                    onBlur={onBlur}
                    onKeyPress={onEnterPress}
                  />
                )}
                {!editTeam.editNoovoTitle && teamPermission?.activeRole === 'admin' && (
                  <img
                    className="editimage-tag"
                    src={EditDetailImage}
                    alt="EditDetailImage"
                    onClick={() => {
                      setEditTeam({ ...editTeam, editNoovoTitle: true });
                      teamNoovoTitleRef?.current?.focus();
                    }}
                  />
                )}
              </div>
              <div className="flex-button-top">
                <div className="team-controller">
                  {team?.id && (
                    <div className="search-and-filters">
                      <div className="search-bar">
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Search project"
                          onChange={searchProjects}
                        />
                        <img src={searchimg} alt="search" />
                      </div>
                    </div>
                  )}
                  <div className="team-project-btns">
                    <Buttons
                      text="Open White Board"
                      secondary
                      width="168px"
                      height="32px"
                      className="mr-16"
                      hover
                    />
                    {(teamPermission?.Team?.includes('team:add-project') || newTeam?.name) && (
                      <Buttons
                        icon={faPlus}
                        text="Add project"
                        primary
                        width="128px"
                        height="32px"
                        hover
                        onClick={() => {
                          if (team?.id) {
                            history.push(`/org/${organization?.domain}/teams/${team?.id}/add-projects`);
                          } else if (newTeam?.name) {
                            if (newTeam?.users) {
                              newTeamData({ ...newTeam, users: [...newTeam?.users, ...selectedUsersNewTeam] });
                            } else {
                              newTeamData({ ...newTeam, users: [...selectedUsersNewTeam] });
                            }
                            if (selectedUsersNewTeam.length > 0) {
                              setMinimumUserFlag(false);
                              history.push(`/org/${organization?.domain}/teams/add-projects`);
                            } else {
                              setMinimumUserFlag(true);
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="team-cards">
                <div className="row">
                  <div className="col-md-12">
                    <div className="check-home">
                      {(loading && team?.id)
                        ? <Alert variant="primary" className="alert">Loading...</Alert> : allPersonalProjects.length > 0 ? allPersonalProjects?.map((project) => (
                          <div className="playlist-resource" key={project.id}>
                            <ProjectCard
                              project={project}
                              showDeletePopup={showDeletePopup}
                              handleShow={handleShow}
                              setProjectId={setProjectId}
                              setCreateProject={setCreateProject}
                              teamPermission={teamPermission || {}}
                            />
                          </div>
                        )) : team?.id && <Alert variant="danger" className="alert"> No project found.</Alert>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${toggleLeft ? 'width10' : ''} right`}>
              <button
                type="button"
                className="toggle_btn"
                onClick={() => setToggleLeft(!toggleLeft)}
              >
                <FontAwesomeIcon icon="chevron-circle-right" className={`${toggleLeft ? 'image_rotate' : ''}`} />
              </button>
              <div className="right_head">
                <h1 className={`${toggleLeft ? 'none' : ''}`}>Team members </h1>
                <img src={UserIcon} alt="" />
              </div>
              {minimumUserFlag && <Alert variant="danger">Invite at least 1 or more member to your team</Alert>}
              <div className="right_select">
                <div className={`${toggleLeft ? 'none' : ''}`}>
                  {teamPermission?.Team?.includes('team:add-team-user') && team?.users && (
                    <InviteDialog
                      users={team?.users}
                      visible={showInvite}
                      authUser={authUser}
                      setShowInvite={setShowInvite}
                      handleInvite={handleInvite}
                    />
                  )}
                  {(newTeam?.name) && (
                    <InviteDialog
                      users={selectedUsersNewTeam}
                      visible={showInvite}
                      authUser={user}
                      setShowInvite={setShowInvite}
                      handleInvite={handleInviteNewTeam}
                    />
                  )}
                </div>
              </div>
              {currentTeamUser?.length > 0 && (
                <TeamMembers
                  arrayToRender={currentTeamUser}
                  roles={roles}
                  toggleLeft={toggleLeft}
                  roleChangeHandler={roleChangeHandler}
                  teamPermission={teamPermission || {}}
                  deleteTeamMemberHandler={deleteTeamMemberHandler}
                />
              )}
              {selectedUsersNewTeam.length > 0 && (
                <TeamMembers
                  arrayToRender={selectedUsersNewTeam}
                  setSelectUsersNewTeam={setSelectUsersNewTeam}
                  roles={roles}
                  toggleLeft={toggleLeft}
                  deleteTeamMemberHandler={deleteTeamMemberHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TeamDetail.propTypes = {
  location: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  organization: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  newTeam: PropTypes.object.isRequired,
  teamPermission: PropTypes.object.isRequired,
  newTeamData: PropTypes.func.isRequired,
  inviteMembers: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  changeUserRoleAction: PropTypes.func.isRequired,
  getTeamPermissionAction: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  loadTeam: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  newTeam: state.team.newTeam,
  team: state.team.selectedTeam,
  teamPermission: state.team.teamPermission,
  organization: state.organization.activeOrganization,
});
const mapDispatchToProps = (dispatch) => ({
  inviteMembers: (teamId, selectedUsers, emailNote) => dispatch(inviteMembersAction(teamId, selectedUsers, emailNote)),
  newTeamData: (newTeam) => dispatch(setNewTeamData(newTeam)),
  removeProject: (teamId, projectId) => dispatch(removeProjectAction(teamId, projectId)),
  changeUserRoleAction: (teamId, userDetail) => dispatch(changeUserRole(teamId, userDetail)),
  loadTeam: (teamId) => dispatch(loadTeamAction(teamId)),
  getTeamPermissionAction: (orgId, teamId) => dispatch(getTeamPermission(orgId, teamId)),
  removeMember: (teamId, userId, email) => dispatch(removeMemberAction(teamId, userId, email)),
  updateTeam: (teamId, data) => dispatch(updateTeamAction(teamId, data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail);