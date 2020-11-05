import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FadeDiv } from 'utils';
import { inviteTeamMembersAction } from 'store/actions/team';
import InviteDialog from 'components/InviteDialog';
import MemberItem from './MemberItem';

import './style.scss';

function InviteTeam(props) {
  const {
    team,
    isInviting,
    nextStep,
    user: authUser,
    setInvitedMembers,
  } = props;

  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState([]);
  const [filteredMember, setFilteredMember] = useState([]);
  const [showInvite, setShowInvite] = useState(false);

  const onChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  useEffect(() => {
    setFilteredMember(selectedMember.filter((mem) => mem.name.includes(search) || mem.email.includes(search)));
  }, [search, selectedMember]);

  const invitedUsers = team.users || [];

  const handleInvite = useCallback((user, note) => {
    setSelectedMember([...selectedMember, ...user.map((u) => ({ ...u, note }))]);
    setShowInvite(false);
  }, [selectedMember]);

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

            <InviteDialog
              handleInvite={handleInvite}
              visible={showInvite}
              setShowInvite={setShowInvite}
              authUser={{ ...authUser, role: 'owner' }}
              users={selectedMember}
            />
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
              {filteredMember.map((user) => (
                <MemberItem
                  key={user.id}
                  invited
                  isInviting={isInviting}
                  selected={selectedMember === user.id}
                  user={user}
                  selectMember={setSelectedMember}
                  // inviteUser={handleInvite}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className="create-team-continue-btn"
            onClick={() => {
              setInvitedMembers(selectedMember.map(
                // eslint-disable-next-line no-restricted-globals
                ({ id, ...mem }) => ({ id: isNaN(id) ? 0 : id, ...mem }),
              ));
              nextStep();
            }}
          >
            Continue
          </button>
        </div>
      </FadeDiv>
    </div>
  );
}

InviteTeam.propTypes = {
  user: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  isInviting: PropTypes.bool.isRequired,
  nextStep: PropTypes.func.isRequired,
  setInvitedMembers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  setInvitedMembers: (users) => dispatch(inviteTeamMembersAction(users)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteTeam);
