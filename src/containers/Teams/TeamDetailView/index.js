import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import EditTeamImage from 'assets/images/svg/editTeam.svg';
import EditDetailImage from 'assets/images/svg/detailEdit.svg';
import searchimg from 'assets/images/svg/search-icon-admin-panel.svg';
import './style.scss';
import { useHistory } from 'react-router-dom';
import Buttons from 'utils/Buttons/buttons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import UserIcon from 'assets/images/svg/user.svg';
// import Deleticon from 'assets/images/svg/trash.svg';
// import MyTeamCard from 'utils/MyTeamCard/myteamcard';
import InviteDialog from 'components/InviteDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectCard from 'containers/Projects/ProjectCard';
import {
  changeUserRole, getTeamPermission, inviteMembersAction, loadTeamAction, removeMemberAction, removeProjectAction, setNewTeamData,
} from 'store/actions/team';
import { connect, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import TeamMembers from './TeamMembers';

// import BackgroundTeamCardImage from 'assets/images/cardlistimg.png';

const TeamDetail = ({
  team, organization, user, inviteMembers, newTeam, setCreationMode, newTeamData, removeProject, changeUserRoleAction, loadTeam, getTeamPermissionAction, removeMember,
}) => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const { roles } = useSelector((state) => state.team);
  const [selectedUsersNewTeam, setSelectUsersNewTeam] = useState(newTeam?.users?.length > 0 ? newTeam.users : []);
  const currentTeamUser = useMemo(() => (team?.users?.length > 0 ? team.users : []), [team?.users]);
  const [createProject, setCreateProject] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [editMode, seteditMode] = useState(false);
  const [toggleLeft, setToggleLeft] = useState(false);
  console.log(team, show, createProject, editMode);
  const authUser = team?.users.find((u) => u.id === (user || {}).id);
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
  return (
    <div className="add-team-page">
      <div className={`${toggleLeft ? 'width90' : ''} left`}>
        <div className="organization-name">{organization?.name}</div>
        <div className="title-image">
          <div>
            <h1 className="title">{team?.name || newTeam?.name}</h1>
          </div>
          <div>
            <img
              className="editimage-tag"
              src={EditTeamImage}
              alt="EditTeamImage"
            />
          </div>
        </div>
        <div className="add-team-detail">
          <div className="team-detail">
            <p>
              {team?.description || newTeam?.description}
              {' '}
            </p>
          </div>
          <div className="team-edit-detail">
            <img
              className="editimage-tag"
              src={EditDetailImage}
              alt="EditDetailImage"
            />
          </div>
        </div>
        <div className="flex-button-top">
          <div className="team-controller">
            <div className="search-and-filters">
              <div className="search-bar">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search project"
                />
                <img src={searchimg} alt="search" />
              </div>
            </div>
            <div className="team-project-btns">
              <Buttons
                text="Open White Board"
                secondary
                width="168px"
                height="32px"
                className="mr-16"
                hover
              />
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
                    setCreationMode(false);
                    history.push(`/org/${organization?.domain}/teams/add-projects`);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="team-cards">
          <div className="row">
            <div className="col-md-12">
              <div className="check-home">
                {team?.projects?.map((project) => (
                  <div className="playlist-resource" key={project.id}>
                    <ProjectCard
                      project={project}
                      showDeletePopup={showDeletePopup}
                      handleShow={handleShow}
                      setProjectId={setProjectId}
                      setCreateProject={setCreateProject}
                      seteditMode={seteditMode}
                    />
                  </div>
                ))}
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
        <div className="right_select">
          <div className={`${toggleLeft ? 'none' : ''}`}>
            {team?.users && (
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
  );
};

TeamDetail.propTypes = {
  team: PropTypes.object.isRequired,
  organization: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  newTeam: PropTypes.object,
  newTeamData: PropTypes.func.isRequired,
  inviteMembers: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  changeUserRoleAction: PropTypes.func.isRequired,
  getTeamPermissionAction: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  loadTeam: PropTypes.func.isRequired,
  setCreationMode: PropTypes.func,
};
TeamDetail.defaultProps = {
  setCreationMode: () => { },
  newTeam: {},
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  newTeam: state.team.newTeam,
});
const mapDispatchToProps = (dispatch) => ({
  inviteMembers: (teamId, selectedUsers, emailNote) => dispatch(inviteMembersAction(teamId, selectedUsers, emailNote)),
  newTeamData: (newTeam) => dispatch(setNewTeamData(newTeam)),
  removeProject: (teamId, projectId) => dispatch(removeProjectAction(teamId, projectId)),
  changeUserRoleAction: (teamId, userDetail) => dispatch(changeUserRole(teamId, userDetail)),
  loadTeam: (teamId) => dispatch(loadTeamAction(teamId)),
  getTeamPermissionAction: (orgId, teamId) => dispatch(getTeamPermission(orgId, teamId)),
  removeMember: (teamId, userId, email) => dispatch(removeMemberAction(teamId, userId, email)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail);
