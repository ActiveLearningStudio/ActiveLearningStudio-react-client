import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import { inviteMembersAction, removeMemberAction } from 'store/actions/group';
import { searchUsersAction } from 'store/actions/auth';
import InviteDialogGroup from 'components/InviteDialogGroup';
import GroupMember from './GroupMember';

import './style.scss';

function GroupMemberView(props) {
  const {
    removingUserId,
    user,
    group: {
      id,
      users,
      name,
      description,
      invited_emails: invitedEmails,
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
      <div className="group-information">
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
                {user && (
                  <InviteDialogGroup
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
                      <GroupMember
                        groupId={id}
                        authUser={authUser}
                        removingUserId={removingUserId}
                        selected={selectedMember === u.id}
                        user={u}
                        selectMe={() => setSelectedMember(u.id)}
                        deselectMe={() => setSelectedMember(null)}
                        removeMember={removeMember}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="group-description">
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

GroupMemberView.propTypes = {
  removingUserId: PropTypes.number,
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  inviteMembers: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
};

GroupMemberView.defaultProps = {
  removingUserId: null,
};

const mapStateToProps = (state) => ({
  isInviting: state.group.isInviting,
  removingUserId: state.group.removingUserId,
  user: state.auth.user,
  searchedUsers: state.auth.searchedUsers,
});

const mapDispatchToProps = (dispatch) => ({
  searchUsers: (search) => dispatch(searchUsersAction(search)),
  inviteMembers: (groupId, selectedUsers, emailNote) => dispatch(inviteMembersAction(groupId, selectedUsers, emailNote)),
  removeMember: (groupId, userId) => dispatch(removeMemberAction(groupId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMemberView);
