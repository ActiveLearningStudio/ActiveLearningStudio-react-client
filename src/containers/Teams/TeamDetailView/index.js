/* eslint-disable */
import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import { useHistory, Link } from 'react-router-dom';
import Buttons from 'utils/Buttons/buttons';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import InviteDialog from 'components/InviteDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectCard from 'containers/Projects/ProjectCard';
import NewProjectPage from 'containers/Projects/NewProjectPage';

import {
  changeUserRole,
  getTeamPermission,
  getWhiteBoardUrl,
  inviteMembersAction,
  loadTeamAction,
  removeMemberAction,
  removeProjectAction,
  setNewTeamData,
  updateTeamAction,
} from 'store/actions/team';
import { connect, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import GoogleModel from 'components/models/GoogleLoginModal';
import WhiteBoardModal from 'components/models/WhiteBoardModal';
import { Alert } from 'react-bootstrap';
import TeamMembers from './TeamMembers';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import EditSmSvg from 'iconLibrary/mainContainer/EditSmSvg';
import SearchInputMdSvg from 'iconLibrary/mainContainer/SearchInputMdSvg';
import TeamLgSvg from 'iconLibrary/mainContainer/TeamLgSvg';

const TeamDetail = ({
  location,
  team,
  project,
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
  whiteBoard,
  adminPanel,
}) => {
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [allPersonalProjects, setAllPersonalProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [editTeam, setEditTeam] = useState(null);
  const history = useHistory();
  const { roles } = useSelector((state) => state.team);
  const auth = useSelector((state) => state.auth);
  const [loadingWhiteBoard, setLoadingWhiteBoard] = useState(true);
  const [showWhiteBoard, setShowWhiteBoard] = useState(false);
  const [whiteBoardUrl, setWhiteBoardUrl] = useState([]);
  const dataRedux = useSelector((state) => state);
  const [minimumUserFlag, setMinimumUserFlag] = useState(false);
  const [selectedUsersNewTeam, setSelectUsersNewTeam] = useState(newTeam?.users?.length > 0 ? newTeam.users : []);
  const currentTeamUser = useMemo(() => (team?.users?.length > 0 ? team.users : []), [team?.users]);
  const [createProject, setCreateProject] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [toggleLeft, setToggleLeft] = useState(false);
  const hideShowSideBar = useSelector((state) => state.msTeams.toggle_sidebar);
  const isMsTeam = useSelector((state) => state.msTeams.is_msteam);

  const authUser = team?.users?.filter((u) => u.id === (user || {}).id);
  useEffect(() => {
    (async () => {
      await loadTeam(team?.id);
    })();
  }, [createProject]);
  useEffect(() => {
    if (team?.projects) {
      setAllPersonalProjects(team.projects);
      setLoading(false);
    }
  }, [team?.projects]);
  // Whiteboard
  useEffect(() => {
    if (dataRedux.team.whiteBoardUrl) {
      setWhiteBoardUrl(dataRedux.team.whiteBoardUrl);
      setLoadingWhiteBoard(false);
    }
  }, [dataRedux.team.whiteBoardUrl]);
  // use effect to redirect user to team page if newTeam is not found
  useEffect(() => {
    if (location?.pathname?.includes('/teams/team-detail') && !newTeam?.name && organization?.domain) {
      history.push(`/org/${organization?.domain}/teams`);
    } else if (!team?.id && !newTeam?.name && organization?.domain) {
      loadTeam(location?.pathname?.split('teams/')[1]);
    }
  }, [organization]);
  const handleShow = () => {
    setShowGoogleModal(true);
  };
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
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete this project?',
        // eslint-disable-next-line max-len
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
      }).then(async (result) => {
        if (result.isConfirmed) {
          removeProject(team?.id, projectId).catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to remove project.',
            });
          });
        }
      });
    },
    [removeProject, team?.id],
  );
  // User Role change handler for current team
  const roleChangeHandler = (roleId, userId) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to update permisission for this User?',
      // eslint-disable-next-line max-len
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await changeUserRoleAction(team?.id, { user_id: userId, role_id: roleId });
        await loadTeam(team?.id);
        await getTeamPermissionAction(organization?.id, team?.id);
      }
    });
  };
  // Invite handler for new team
  const handleInviteNewTeam = useCallback(
    (users, note) => {
      setSelectUsersNewTeam([...selectedUsersNewTeam, ...users.map((u) => ({ ...u, note }))]);
      setMinimumUserFlag(false);
      setShowInvite(false);
    },
    [selectedUsersNewTeam],
  );
  // Invite handler for current team
  const handleInvite = useCallback(
    (selectedUsers, emailNote) => {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to Invite this User?',
        // eslint-disable-next-line max-len
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
      }).then(async (result) => {
        if (result.isConfirmed) {
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
        }
      });
    },
    [inviteMembers, team?.id],
  );

  const saveTeam = () => {
    var error = null;
    if (editTeam.title.length > 100) error = "Cannot enter more than 100 character in team title.";
    if (editTeam.description.length > 1000) error = "Cannot enter more than 1000 character in team description.";
    if (editTeam.noovo_title?.length > 100) error = "Cannot enter more than 100 character in noovo team title.";

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
      });
      return;
    }

    updateTeam(
      team?.id,
      {
        organization_id: organization.activeOrganization?.id,
        name: editTeam.title,
        description: editTeam.description,
        noovo_group_title: editTeam.noovo_title,
      }
    ).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Successfully updated.',
      });
      setEditTeam(null);
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Update Team failed, kindly try again.',
      });
    });
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
  const assignWhiteBoardUrl = (orgId, objId, userId, objType) => {
    whiteBoard(orgId, objId, userId, objType);
  };

  const handleShowWhiteBoard = () => {
    setShowWhiteBoard(true); //! state.show
  };
  const handleCloseWhiteBoard = () => {
    setShowWhiteBoard(false);
  };
  const setProjectId = (projectId) => {
    setSelectedProjectId(projectId);
  };
  const primaryColor = getGlobalColor('--main-primary-color');
  const secondaryColor = getGlobalColor('--main-secondary-color');
  return (
    <div className="team-detail-page">
      <div className={`content ${hideShowSideBar == true ? 'expend-content-menu' : ''}`} style={{ marginLeft: isMsTeam ? '223px' : '136px' }}>
        <div className="inner-content">
          <div className="add-team-page">
            <div className={`${toggleLeft ? 'width90' : ''} left`}>
              <div className="team-organization-back-link">
                <div className="organization-name">{organization?.name}</div>
                <div className="team-back-to-option">
                  <Link to={`/org/${organization?.currentOrganization?.domain}/teams`} className="team-back-to-option-link">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-8" color={primaryColor} />
                    <span>Back To</span>
                  </Link>
                </div>
              </div>
              {!editTeam && (
                <div className="team-details-container">
                  <div className="row">
                    <div className="col">
                      <h1 className="title">
                        {team?.name || newTeam?.name}
                        {teamPermission?.Team?.includes('team:edit') && (
                          <EditSmSvg
                            primaryColor={primaryColor}
                            className="editimage-tag ml-4"
                            onClick={() => {
                              setEditTeam({
                                title: team.name,
                                description: team.description,
                                noovo_title: team.noovo_group_title,
                              });
                            }}
                          />
                        )}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p>{team?.description || newTeam?.description}</p>
                    </div>
                  </div>
                  {(team?.noovo_group_title || newTeam?.noovo_group_title) && (
                    <div className="row">
                      <div className="col">
                        <label>Noovo Group Title:</label>
                        <p>{team?.noovo_group_title || newTeam?.noovo_group_title}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {editTeam && (
                <div className="team-details-container">
                  <div className="row mt-2">
                    <div className="col-6">
                      <h1>Edit Team Details</h1>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-2">
                      <label>Title:</label>
                    </div>
                    <div className="col-4">
                      <input type="text" className="form-control" value={editTeam.title} onChange={(e) => setEditTeam({ ...editTeam, title: e.target.value })} />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-2">
                      <label>Description:</label>
                    </div>
                    <div className="col-4">
                      <textarea className="form-control" value={editTeam.description} onChange={(e) => setEditTeam({ ...editTeam, description: e.target.value })} />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-2">
                      <label>Noovo Group Title (Optional):</label>
                    </div>
                    <div className="col-4">
                      <input type="text" className="form-control" value={editTeam.noovo_title} onChange={(e) => setEditTeam({ ...editTeam, noovo_title: e.target.value })} />
                    </div>
                  </div>
                  <div className="row mt-2 mb-4">
                    <div className="col-6 text-right">
                      <button className="curriki-utility curriki-theme-secondary-button curriki-theme-hover d-inline mr-2" onClick={() => setEditTeam(null)}>Cancel</button>
                      <button className="curriki-utility curriki-theme-primary-button curriki-theme-hover d-inline" onClick={saveTeam}>Save</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-button-top">
                <div className="team-controller">
                  {team?.id && (
                    <div className="search-and-filters">
                      <div className="search-bar">
                        <input type="text" className="search-input" placeholder="Search project" onChange={searchProjects} />
                        <SearchInputMdSvg primaryColor={primaryColor} />
                      </div>
                    </div>
                  )}
                  {!adminPanel && (
                    <div className="team-project-btns whiteboard">
                      <Buttons
                        text="Open White Board"
                        secondary
                        width="168px"
                        height="32px"
                        className="mr-16 team_search_btn"
                        hover
                        onClick={() => {
                          assignWhiteBoardUrl(organization?.id, team?.id, auth.user?.id, 'team');
                          handleShowWhiteBoard();
                        }}
                      />
                      {(teamPermission?.Team?.includes('team:add-project') || newTeam?.name) && (
                        <Buttons
                          text="Add project"
                          secondary
                          width="128px"
                          height="32px"
                          className="mr-16 team_search_btn"
                          hover
                          onClick={() => {
                            if (team?.id) {
                              history.push(`/org/${organization?.domain}/teams/${team?.id}/add-projects`);
                            } else if (newTeam?.name) {
                              if (newTeam?.users) {
                                newTeamData({
                                  ...newTeam,
                                  users: [...newTeam?.users, ...selectedUsersNewTeam],
                                });
                              } else {
                                newTeamData({
                                  ...newTeam,
                                  users: [...selectedUsersNewTeam],
                                });
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
                      {teamPermission?.Team?.includes('team:add-project') && (
                        <Buttons
                          icon={faPlus}
                          iconColor={secondaryColor}
                          text="Create Project"
                          primary
                          height="32px"
                          hover
                          className="team_search_btn"
                          onClick={() => {
                            setCreateProject(true);
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="team-cards">
                <div className="row">
                  <div className="col-md-12">
                    <div className="check-home">
                      {loading && team?.id ? (
                        <Alert variant="primary" className="alert">
                          Loading...
                        </Alert>
                      ) : allPersonalProjects.length > 0 ? (
                        allPersonalProjects?.map((project) => (
                          <div className="playlist-resource" key={project.id}>
                            <ProjectCard
                              project={project}
                              showDeletePopup={showDeletePopup}
                              handleShow={handleShow}
                              setProjectId={setProjectId}
                              setCreateProject={setCreateProject}
                              teamPermission={teamPermission || {}}
                              adminPanel={adminPanel}
                            />
                          </div>
                        ))
                      ) : (
                        team?.id && (
                          <Alert variant="danger" mt="20px" className="alert">
                            {' '}
                            No project found.
                          </Alert>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${toggleLeft ? 'width10' : ''} right`}>
              <button type="button" className="toggle_btn" onClick={() => setToggleLeft(!toggleLeft)}>
                <FontAwesomeIcon icon="chevron-circle-right" className={`${toggleLeft ? 'image_rotate' : ''}`} />
              </button>
              <div className="right_head">
                <h1 className={`${toggleLeft ? 'none' : ''}`}>Team members </h1>
                {/* <img src={UserIcon} alt="" /> */}
                <TeamLgSvg primaryColor={primaryColor} />
              </div>
              {minimumUserFlag && <Alert variant="danger">Invite at least 1 or more member to your team</Alert>}
              <div className="right_select">
                <div className={`${toggleLeft ? 'none' : ''}`}>
                  {teamPermission?.Team?.includes('team:add-team-user') && team?.users && (
                    <InviteDialog users={team?.users} visible={showInvite} authUser={authUser} setShowInvite={setShowInvite} handleInvite={handleInvite} />
                  )}
                  {newTeam?.name && (
                    <InviteDialog users={selectedUsersNewTeam} visible={showInvite} authUser={user} setShowInvite={setShowInvite} handleInvite={handleInviteNewTeam} />
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
      <WhiteBoardModal url={whiteBoardUrl} show={showWhiteBoard} onHide={handleCloseWhiteBoard} loading={loadingWhiteBoard} />
      <GoogleModel projectId={selectedProjectId} show={showGoogleModal} onHide={() => setShowGoogleModal(false)} />
      {createProject && <NewProjectPage project={project} handleCloseProjectModal={setCreateProject} fromTeam />}
    </div>
  );
};

TeamDetail.propTypes = {
  location: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  adminPanel: PropTypes.bool,
  organization: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  newTeam: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  teamPermission: PropTypes.object.isRequired,
  newTeamData: PropTypes.func.isRequired,
  inviteMembers: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  changeUserRoleAction: PropTypes.func.isRequired,
  getTeamPermissionAction: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  loadTeam: PropTypes.func.isRequired,
  whiteBoard: PropTypes.func.isRequired,
};
TeamDetail.defaultProps = {
  adminPanel: false,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  newTeam: state.team.newTeam,
  team: state.team.selectedTeam,
  project: state.project,
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
  whiteBoard: (orgId, objId, userId, objType) => dispatch(getWhiteBoardUrl(orgId, objId, userId, objType)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail);
