import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FadeDiv } from 'utils';
import { inviteTeamMembersAction } from 'store/actions/team';
import InviteDialog from 'components/InviteDialog';
import MemberItem from './MemberItem';

import './style.scss';

function InviteTeam(props) {
  const {
    // team,
    isInviting,
    nextStep,
    user: authUser,
    selectedMembers,
    setSelectedMembers,
    // setInvitedMembers,
  } = props;

  // const [search, setSearch] = useState('');
  // const [selectedMembers, setSelectedMembers] = useState([]);
  // const [filteredMembers, setFilteredMembers] = useState([]);
  const [showInvite, setShowInvite] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  // const onChange = useCallback((e) => {
  //   setSearch(e.target.value);
  // }, []);

  // useEffect(() => {
  //   setFilteredMembers(selectedMembers.filter((mem) => (
  //     mem.name.toLowerCase().includes(search.toLowerCase())
  //     || mem.email.toLowerCase().includes(search.toLowerCase())
  //   )));
  // }, [search, selectedMember]);

  // const invitedUsers = selectedMembers || [];

  const handleInvite = useCallback((users, note) => {
    setSelectedMembers([...selectedMembers, ...users.map((u) => ({ ...u, note }))]);
    setShowInvite(false);
  }, [selectedMembers]);

  return (
    <div className="team-information">
      <FadeDiv>
        <div className="title-box">
          <h2 className="title">Invite Team Members</h2>
          <div className="title-cross" />
        </div>
        Invite at least 1 or more member to your team
        <div className="invite-member-wrapper">
          <div className="search-box">
            {/*
            <input
              type="text"
              placeholder="Filter by name"
              value={search}
              onChange={onChange}
            />
            */}

            <InviteDialog
              handleInvite={handleInvite}
              visible={showInvite}
              setShowInvite={setShowInvite}
              authUser={{ ...authUser, role: 'owner' }}
              users={selectedMembers}
            />
          </div>

          <div className="member-list">
            {/*
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
            */}

            <div className="member-list-content">
              {selectedMembers.map((user) => (
                <MemberItem
                  key={user.id}
                  invited
                  isInviting={isInviting}
                  selected={false}
                  user={user}
                  selectMember={setSelectedMembers}
                  // inviteUser={handleInvite}
                />
              ))}
            </div>
          </div>
          <div style={{ color: 'red' }}>
            {errorMsg}
          </div>
          <button
            type="button"
            className="create-team-continue-btn"
            onClick={() => {
              // setInvitedMembers(selectedMembers.map(
              //   // eslint-disable-next-line no-restricted-globals
              //   ({ id, ...mem }) => ({ id: isNaN(id) ? 0 : id, ...mem }),
              // ));
              if (selectedMembers.length > 0) {
                nextStep();
              } else {
                setErrorMsg('Invite at least 1 member');
              }
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
  // team: PropTypes.object.isRequired,
  isInviting: PropTypes.bool.isRequired,
  nextStep: PropTypes.func.isRequired,
  selectedMembers: PropTypes.func.isRequired,
  setSelectedMembers: PropTypes.func.isRequired,
  // setInvitedMembers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  setInvitedMembers: (users) => dispatch(inviteTeamMembersAction(users)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteTeam);
