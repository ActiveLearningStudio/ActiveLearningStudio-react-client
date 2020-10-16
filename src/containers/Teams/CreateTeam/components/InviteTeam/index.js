import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _debounce from 'lodash/debounce';
import _sortBy from 'lodash/sortBy';
import Swal from 'sweetalert2';

import { FadeDiv } from 'utils';
import MemberItem from './MemberItem';

import './style.scss';

function InviteTeam(props) {
  const {
    team,
    isSearching,
    searchedUsers,
    isInviting,
    searchUsers,
    inviteUser,
    nextStep,
  } = props;

  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  const searchMembers = _debounce((value) => {
    searchUsers(value);
  }, 1000);

  const onChange = useCallback((e) => {
    setSearch(e.target.value);
    searchMembers(e.target.value);
  }, [searchMembers]);

  const invitedUsers = team.users || [];
  const usersNotInvited = _sortBy(searchedUsers.filter(
    (user) => invitedUsers.findIndex((u) => u.id === user.id) === -1,
  ), ['name']);

  const handleInvite = useCallback((user) => {
    inviteUser(user)
      .then(() => {
        setSelectedMember(null);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to invite user.',
        });
      });
  }, [inviteUser]);

  return (
    <div className="team-information">
      <FadeDiv>
        <div className="title-box">
          <h2 className="title">Invite Team Members</h2>
          <div className="title-cross" />
        </div>

        <div className="invite-member-wrapper">
          <div className="search-box">
            <input
              type="text"
              placeholder="Filter by name"
              value={search}
              onChange={onChange}
            />

            {isSearching && (
              <FontAwesomeIcon icon="spinner" />
            )}
          </div>

          <div className="member-list">
            <div className="member-list-content">
              {invitedUsers.map((user) => (
                <MemberItem
                  key={user.id}
                  invited
                  isInviting={isInviting}
                  user={user}
                />
              ))}
            </div>

            <div className="member-list-content">
              {usersNotInvited.map((user) => (
                <MemberItem
                  key={user.id}
                  invited={false}
                  isInviting={isInviting}
                  selected={selectedMember === user.id}
                  user={user}
                  selectMember={setSelectedMember}
                  inviteUser={handleInvite}
                />
              ))}
            </div>
          </div>

          <button type="button" className="create-team-continue-btn" onClick={nextStep}>
            Continue
          </button>
        </div>
      </FadeDiv>
    </div>
  );
}

InviteTeam.propTypes = {
  team: PropTypes.object.isRequired,
  isSearching: PropTypes.bool.isRequired,
  searchedUsers: PropTypes.array.isRequired,
  isInviting: PropTypes.bool.isRequired,
  searchUsers: PropTypes.func.isRequired,
  inviteUser: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default InviteTeam;
