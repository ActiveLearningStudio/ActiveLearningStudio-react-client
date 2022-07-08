/* eslint-disable */
import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import PropTypes from "prop-types";

import EditTeamImage from "assets/images/svg/editTeam.svg";
import EditDetailImage from "assets/images/svg/detailEdit.svg";
import searchimg from "assets/images/svg/search-icon-admin-panel.svg";
import "./style.scss";

import { useHistory, Link } from "react-router-dom";
import Buttons from "utils/Buttons/buttons";
import {
  faArrowLeft,
  faArrowRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import UserIcon from "assets/images/svg/user.svg";
import InviteDialog from "components/InviteDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectCard from "containers/Projects/ProjectCard";
import NewProjectPage from "containers/Projects/NewProjectPage";

import {
  changeUserRole,
  getTeamPermission,
  getWhiteBoardUrl,
  inviteMembersAction,
  loadTeamAction,
  loadTeamsAction,
  removeMemberAction,
  removeProjectAction,
  setNewTeamData,
  updateTeamAction,
} from "store/actions/team";
import { connect, useSelector } from "react-redux";
import Swal from "sweetalert2";
import GoogleModel from "components/models/GoogleLoginModal";
import WhiteBoardModal from "components/models/WhiteBoardModal";
import { Alert } from "react-bootstrap";
import TeamMembers from "./TeamMembers";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

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
  const [editTeam, setEditTeam] = useState({
    editName: false,
    editDescription: false,
    editNoovoTitle: false,
  });
  const teamNameRef = useRef();
  const teamDescriptionRef = useRef();
  const teamNoovoTitleRef = useRef();
  const history = useHistory();
  const { roles } = useSelector((state) => state.team);
  const auth = useSelector((state) => state.auth);
  const [loadingWhiteBoard, setLoadingWhiteBoard] = useState(true);
  const [showWhiteBoard, setShowWhiteBoard] = useState(false);
  const [whiteBoardUrl, setWhiteBoardUrl] = useState([]);
  const dataRedux = useSelector((state) => state);
  const [minimumUserFlag, setMinimumUserFlag] = useState(false);
  const [selectedUsersNewTeam, setSelectUsersNewTeam] = useState(
    newTeam?.users?.length > 0 ? newTeam.users : []
  );
  const currentTeamUser = useMemo(
    () => (team?.users?.length > 0 ? team.users : []),
    [team?.users]
  );
  const [createProject, setCreateProject] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [toggleLeft, setToggleLeft] = useState(false);

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
    if (
      location?.pathname?.includes("/teams/team-detail") &&
      !newTeam?.name &&
      organization?.domain
    ) {
      history.push(`/org/${organization?.domain}/teams`);
    } else if (!team?.id && !newTeam?.name && organization?.domain) {
      loadTeam(location?.pathname?.split("teams/")[1]);
    }
  }, [organization]);
  const handleShow = () => {
    setShowGoogleModal(true);
  };
  // Team member delete handler function
  const deleteTeamMemberHandler = (userToDelete) => {
    if (team?.id) {
      const remainingAdmin = team?.users?.filter(
        (singleRole) => singleRole?.role?.id === 1
      );
      if (remainingAdmin?.length <= 1 && userToDelete?.role.id === 1) {
        Swal.fire({
          icon: "warning",
          text: "There should be at least one admin",
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
              icon: "error",
              title: "Error",
              text: "Failed to remove user.",
            });
          });
      }
    } else if (newTeam?.name) {
      setSelectUsersNewTeam((prevState) =>
        prevState.filter((u) => u.id !== userToDelete.id)
      );
    }
  };
  // Deleting current team project handler
  const showDeletePopup = useCallback(
    (projectId) => {
      removeProject(team?.id, projectId).catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to remove project.",
        });
      });
    },
    [removeProject, team?.id]
  );
  // User Role change handler for current team
  const roleChangeHandler = async (roleId, userId) => {
    await changeUserRoleAction(team?.id, { user_id: userId, role_id: roleId });
    await loadTeam(team?.id);
    await getTeamPermissionAction(organization?.id, team?.id);
  };
  // Invite handler for new team
  const handleInviteNewTeam = useCallback(
    (users, note) => {
      setSelectUsersNewTeam([
        ...selectedUsersNewTeam,
        ...users.map((u) => ({ ...u, note })),
      ]);
      setMinimumUserFlag(false);
      setShowInvite(false);
    },
    [selectedUsersNewTeam]
  );
  // Invite handler for current team
  const handleInvite = useCallback(
    (selectedUsers, emailNote) => {
      inviteMembers(team?.id, selectedUsers, emailNote)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Successfully invited.",
          });
          setShowInvite(false);
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to invite user.",
          });
        });
    },
    [inviteMembers, team?.id]
  );
  const onBlur = (e) => {
    if (e.target.name === "team-name") {
      teamNameRef.current.blur();
      setEditTeam({ ...editTeam, editName: false });
      if (e.target.value.length <= 100) {
        if (team?.id && team?.name !== e.target.value) {
          updateTeam(team?.id, {
            organization_id: organization.activeOrganization?.id,
            name: e.target.value,
            description: team?.description,
            noovo_group_title: team?.noovo_group_title,
          })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Successfully updated.",
              });
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Update Team failed, kindly try again.",
              });
            });
        } else if (
          Object.keys(newTeam).length &&
          newTeam?.name !== e.target.value
        ) {
          newTeamData({ ...newTeam, name: e.target.value });
        }
      } else if (e.target.value.length > 100) {
        Swal.fire({
          icon: "warning",
          title: "Exceeding length",
          text: "Cannot enter more than 100 character in team title.",
        });
      }
    } else if (e.target.name === "team-description") {
      teamDescriptionRef.current.blur();
      setEditTeam({ ...editTeam, editDescription: false });
      if (e.target.value.length <= 1000) {
        if (team?.id && team?.description !== e.target.value) {
          updateTeam(team?.id, {
            organization_id: organization.activeOrganization?.id,
            name: team?.name,
            description: e.target.value,
            noovo_group_title: team?.noovo_group_title,
          })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Successfully updated.",
              });
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Update Team failed, kindly try again.",
              });
            });
        } else if (
          Object.keys(newTeam).length &&
          newTeam?.description !== e.target.value
        ) {
          newTeamData({ ...newTeam, description: e.target.value });
        }
      } else if (e.target.value.length > 1000) {
        Swal.fire({
          icon: "warning",
          title: "Exceeding length",
          text: "Cannot enter more than 1000 character in team description.",
        });
      }
    } else if (e.target.name === "noovo-group-title") {
      teamNoovoTitleRef.current.blur();
      setEditTeam({ ...editTeam, editNoovoTitle: false });
      if (team?.id && team?.description !== e.target.value) {
        updateTeam(team?.id, {
          organization_id: organization.activeOrganization?.id,
          name: team?.name,
          description: team?.description,
          noovo_group_title: e.target.value,
        })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Successfully updated.",
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Update Team failed, kindly try again.",
            });
          });
      } else if (
        Object.keys(newTeam).length &&
        newTeam?.noovo_group_title !== e.target.value
      ) {
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
      const filteredProjects = allPersonalProjects.filter((project) =>
        project.name.toLowerCase().includes(value.toLowerCase())
      );
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
  const primaryColor = getGlobalColor("--main-primary-color");
  const secondaryColor = getGlobalColor("--main-secondary-color");
  return (
    <div className="team-detail-page">
      <div className="content">
        <div className="inner-content">
          <div className="add-team-page">
            <div className={`${toggleLeft ? "width90" : ""} left`}>
              <div className="team-organization-back-link">
                <div className="organization-name">{organization?.name}</div>
                <div className="team-back-to-option">
                  <Link
                    to={`/org/${organization?.currentOrganization?.domain}/teams`}
                    className="team-back-to-option-link"
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="mr-8"
                      color={primaryColor}
                    />
                    <span>Back To</span>
                  </Link>
                </div>
              </div>
              <div className="title-image">
                <div>
                  {!editTeam.editName && (
                    <h1 className="title">{team?.name || newTeam?.name}</h1>
                  )}
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
                  {!editTeam.editName &&
                    teamPermission?.Team?.includes("team:edit") && (
                      // <img
                      //   className="editimage-tag"
                      //   src={EditTeamImage}
                      //   alt="EditTeamImage"
                      //   onClick={() => {
                      //     setEditTeam({ ...editTeam, editName: true });
                      //     teamNameRef?.current?.focus();
                      //   }}
                      // />
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="editimage-tag"
                        onClick={() => {
                          setEditTeam({ ...editTeam, editName: true });
                          teamNameRef?.current?.focus();
                        }}
                      >
                        <path
                          d="M6.36745 2.26508H2.19277C1.87642 2.26508 1.57304 2.39074 1.34935 2.61443C1.12567 2.83812 1 3.1415 1 3.45784V11.8072C1 12.1235 1.12567 12.4269 1.34935 12.6506C1.57304 12.8743 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8743 11.3855 12.6506C11.6092 12.4269 11.7349 12.1235 11.7349 11.8072V7.63252"
                          stroke={primaryColor}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.8394 1.37054C11.0767 1.13329 11.3985 1 11.734 1C12.0695 1 12.3913 1.13329 12.6286 1.37054C12.8658 1.6078 12.9991 1.92959 12.9991 2.26512C12.9991 2.60065 12.8658 2.92244 12.6286 3.15969L6.96292 8.82533L4.57739 9.42172L5.17378 7.03618L10.8394 1.37054Z"
                          stroke={primaryColor}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                </div>
              </div>
              <div className="add-team-detail">
                <div className="team-detail">
                  <p>
                    {!editTeam.editDescription &&
                      (team?.description || newTeam?.description)}
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
                  {!editTeam.editDescription &&
                    teamPermission?.Team?.includes("team:edit") && (
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
                {"  "}
                {!editTeam?.editNoovoTitle ? (
                  <p>{team?.noovo_group_title || newTeam?.noovo_group_title}</p>
                ) : null}
                {editTeam?.editNoovoTitle && (
                  <textarea
                    className="noovo-title"
                    name="noovo-group-title"
                    ref={teamNoovoTitleRef}
                    defaultValue={
                      team?.noovo_group_title || newTeam?.noovo_group_title
                    }
                    onBlur={onBlur}
                    onKeyPress={onEnterPress}
                  />
                )}
                {!editTeam.editNoovoTitle &&
                  teamPermission?.Team?.includes("team:edit") && (
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
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58175 3 3.00003 6.58172 3.00003 11C3.00003 15.4183 6.58175 19 11 19Z"
                            stroke={primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 20.9984L16.65 16.6484"
                            stroke={primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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
                        className="mr-16"
                        hover
                        onClick={() => {
                          assignWhiteBoardUrl(
                            organization?.id,
                            1,
                            auth.user?.id,
                            "team"
                          );
                          handleShowWhiteBoard();
                        }}
                      />
                      {(teamPermission?.Team?.includes("team:add-project") ||
                        newTeam?.name) && (
                        <Buttons
                          text="Add project"
                          secondary
                          width="128px"
                          height="32px"
                          className="mr-16"
                          hover
                          onClick={() => {
                            if (team?.id) {
                              history.push(
                                `/org/${organization?.domain}/teams/${team?.id}/add-projects`
                              );
                            } else if (newTeam?.name) {
                              if (newTeam?.users) {
                                newTeamData({
                                  ...newTeam,
                                  users: [
                                    ...newTeam?.users,
                                    ...selectedUsersNewTeam,
                                  ],
                                });
                              } else {
                                newTeamData({
                                  ...newTeam,
                                  users: [...selectedUsersNewTeam],
                                });
                              }
                              if (selectedUsersNewTeam.length > 0) {
                                setMinimumUserFlag(false);
                                history.push(
                                  `/org/${organization?.domain}/teams/add-projects`
                                );
                              } else {
                                setMinimumUserFlag(true);
                              }
                            }
                          }}
                        />
                      )}
                      {teamPermission?.Team?.includes("team:add-project") && (
                        <Buttons
                          icon={faPlus}
                          iconColor={secondaryColor}
                          text="Create Project"
                          primary
                          width="148px"
                          height="32px"
                          hover
                          // className="mr-16"
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
                            {" "}
                            No project found.
                          </Alert>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${toggleLeft ? "width10" : ""} right`}>
              <button
                type="button"
                className="toggle_btn"
                onClick={() => setToggleLeft(!toggleLeft)}
              >
                <FontAwesomeIcon
                  icon="chevron-circle-right"
                  className={`${toggleLeft ? "image_rotate" : ""}`}
                />
              </button>
              <div className="right_head">
                <h1 className={`${toggleLeft ? "none" : ""}`}>Team members </h1>
                {/* <img src={UserIcon} alt="" /> */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.25309 15.0622C10.8933 15.0622 13.0336 12.9219 13.0336 10.2817C13.0336 7.64146 10.8933 5.50116 8.25309 5.50116C5.6129 5.50116 3.4726 7.64146 3.4726 10.2817C3.4726 12.9219 5.6129 15.0622 8.25309 15.0622Z"
                    fill="white"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M14.4503 5.67916C15.1078 5.49391 15.7974 5.45171 16.4726 5.5554C17.1478 5.65909 17.793 5.90627 18.3646 6.28029C18.9363 6.65431 19.4211 7.14649 19.7865 7.72367C20.1518 8.30085 20.3893 8.94963 20.4829 9.62631C20.5764 10.303 20.5239 10.9919 20.3288 11.6465C20.1336 12.3012 19.8005 12.9065 19.3519 13.4215C18.9031 13.9366 18.3492 14.3495 17.7274 14.6326C17.1057 14.9155 16.4306 15.062 15.7474 15.0621"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.63338 18.5C2.38 17.4379 3.37117 16.5712 4.52324 15.9727C5.6753 15.3744 6.95442 15.062 8.25261 15.062C9.5508 15.062 10.8299 15.3742 11.982 15.9725C13.1342 16.5707 14.1254 17.4375 14.8721 18.4994"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.7475 15.062C17.0458 15.061 18.3252 15.3729 19.4774 15.9713C20.6297 16.5697 21.6207 17.4368 22.3666 18.4994"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {minimumUserFlag && (
                <Alert variant="danger">
                  Invite at least 1 or more member to your team
                </Alert>
              )}
              <div className="right_select">
                <div className={`${toggleLeft ? "none" : ""}`}>
                  {teamPermission?.Team?.includes("team:add-team-user") &&
                    team?.users && (
                      <InviteDialog
                        users={team?.users}
                        visible={showInvite}
                        authUser={authUser}
                        setShowInvite={setShowInvite}
                        handleInvite={handleInvite}
                      />
                    )}
                  {newTeam?.name && (
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
      <WhiteBoardModal
        url={whiteBoardUrl}
        show={showWhiteBoard}
        onHide={handleCloseWhiteBoard}
        loading={loadingWhiteBoard}
      />
      <GoogleModel
        projectId={selectedProjectId}
        show={showGoogleModal}
        onHide={() => setShowGoogleModal(false)}
      />
      {createProject && (
        <NewProjectPage
          project={project}
          handleCloseProjectModal={setCreateProject}
          fromTeam
        />
      )}
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
  inviteMembers: (teamId, selectedUsers, emailNote) =>
    dispatch(inviteMembersAction(teamId, selectedUsers, emailNote)),
  newTeamData: (newTeam) => dispatch(setNewTeamData(newTeam)),
  removeProject: (teamId, projectId) =>
    dispatch(removeProjectAction(teamId, projectId)),
  changeUserRoleAction: (teamId, userDetail) =>
    dispatch(changeUserRole(teamId, userDetail)),
  loadTeam: (teamId) => dispatch(loadTeamAction(teamId)),
  getTeamPermissionAction: (orgId, teamId) =>
    dispatch(getTeamPermission(orgId, teamId)),
  removeMember: (teamId, userId, email) =>
    dispatch(removeMemberAction(teamId, userId, email)),
  updateTeam: (teamId, data) => dispatch(updateTeamAction(teamId, data)),
  whiteBoard: (orgId, objId, userId, objType) =>
    dispatch(getWhiteBoardUrl(orgId, objId, userId, objType)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail);
