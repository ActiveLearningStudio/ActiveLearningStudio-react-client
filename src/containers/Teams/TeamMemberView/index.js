import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { getTeamPermission, inviteMembersAction, removeMemberAction } from 'store/actions/team';
import { searchUsersAction } from 'store/actions/auth';
import InviteDialog from 'components/InviteDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import TeamMember from './TeamMember';

import './style.scss';

function TeamMemberView(props) {
  const {
    removingUserId,
    user,
    team: {
      id,
      users,
      name,
      description,
      invited_emails: invitedEmails,
    },
    inviteMembers,
    removeMember,
  } = props;
  const organization = useSelector((state) => state.organization);
  const team = useSelector((state) => state.team);
  const dispatch = useDispatch();

  const { teamPermission } = team;
  const { permission } = organization;
  const [search, setSearch] = useState('');
  const handleChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const [showInvite, setShowInvite] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);
  // Fetch team permission if page reloads
  useEffect(() => {
    if (Object.keys(teamPermission).length === 0 && organization?.currentOrganization?.id && id) {
      dispatch(getTeamPermission(organization?.currentOrganization?.id, id));
    }
  }, [team]);

  const handleInvite = useCallback((selectedUsers, emailNote) => {
    inviteMembers(id, selectedUsers, emailNote)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully invited.',
        });
        setShowInvite(false);
        setSearch('');
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to invite user.',
        });
      });
  }, [inviteMembers, id]);

  const filteredUsers = [
    ...users.filter((u) => `${u.first_name} ${u.last_name}`.toLowerCase().indexOf(search.toLowerCase()) > -1),
    ...invitedEmails.filter((u) => u.invited_email.toLowerCase().indexOf(search.toLowerCase()) > -1),
  ];

  const authUser = users.find((u) => u.id === (user || {}).id);

  return (
    <div className="row member-manage">
      <div className="team-information">
        <div className="member-management-wrapper">
          <div className="row">
            <div className="col-md-12">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Filter by name"
                  value={search}
                  onChange={handleChangeSearch}
                />
                {teamPermission?.Team?.includes('team:add-team-user') && user && (
                  <InviteDialog
                    users={users}
                    visible={showInvite}
                    authUser={authUser}
                    setShowInvite={setShowInvite}
                    handleInvite={handleInvite}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="member-list">
                {user && (
                  filteredUsers.map((u) => (
                    <div key={u.id}>
                      <TeamMember
                        permission={permission}
                        teamId={id}
                        authUser={authUser}
                        removingUserId={removingUserId}
                        selected={selectedMember === u.id}
                        user={u}
                        selectMe={() => setSelectedMember(u.id)}
                        deselectMe={() => setSelectedMember(null)}
                        removeMember={removeMember}
                        teamPermission={teamPermission || {}}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="team-description">
          <h2 className="title">
            {`About the ${name}`}
          </h2>
          <h2 className="description">
            {description}
          </h2>
        </div>
        <Link to={`/studio/org/${organization.currentOrganization?.domain}/teams/${id}/projects`}>
          <div className="btn-left-page">
            <FontAwesomeIcon icon="project-diagram" className="mr-2" />
            Projects
          </div>
        </Link>
      </div>
    </div>
  );
}

TeamMemberView.propTypes = {
  removingUserId: PropTypes.number,
  user: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  inviteMembers: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
};

TeamMemberView.defaultProps = {
  removingUserId: null,
};

const mapStateToProps = (state) => ({
  isInviting: state.team.isInviting,
  removingUserId: state.team.removingUserId,
  user: state.auth.user,
  searchedUsers: state.auth.searchedUsers,
});

const mapDispatchToProps = (dispatch) => ({
  searchUsers: (search) => dispatch(searchUsersAction(search)),
  inviteMembers: (teamId, selectedUsers, emailNote) => dispatch(inviteMembersAction(teamId, selectedUsers, emailNote)),
  removeMember: (teamId, userId, email) => dispatch(removeMemberAction(teamId, userId, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberView);
