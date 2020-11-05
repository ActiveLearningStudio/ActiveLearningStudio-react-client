import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import { inviteMembersAction, removeMemberAction } from 'store/actions/team';
import { searchUsersAction } from 'store/actions/auth';
import InviteDialog from 'components/InviteDialog';
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
    },
    inviteMembers,
    removeMember,
  } = props;

  const [search, setSearch] = useState('');
  const handleChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const [showInvite, setShowInvite] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);

  const handleInvite = useCallback((selectedUsers, emailNote) => {
    inviteMembers(id, selectedUsers, emailNote)
      .then(() => {
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

  const filteredUsers = users.filter((u) => `${u.first_name} ${u.last_name}`.indexOf(search) > -1);

  const authUser = users.find((u) => u.id === user.id);

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

                <InviteDialog
                  users={users}
                  visible={showInvite}
                  authUser={authUser}
                  setShowInvite={setShowInvite}
                  handleInvite={handleInvite}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="member-list">
                {filteredUsers.map((u) => (
                  <div key={u.id}>
                    <TeamMember
                      teamId={id}
                      authUser={authUser}
                      removingUserId={removingUserId}
                      selected={selectedMember === u.id}
                      user={u}
                      selectMe={() => setSelectedMember(u.id)}
                      deselectMe={() => setSelectedMember(null)}
                      removeMember={removeMember}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-description">
        <h2 className="title">
          {`About the ${name}`}
        </h2>
        <h2 className="description">
          {description}
        </h2>
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
  removeMember: (teamId, userId) => dispatch(removeMemberAction(teamId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberView);
