import React, {
  createRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import _debounce from 'lodash/debounce';
import _sortBy from 'lodash/sortBy';

import { inviteMembersAction, removeMemberAction } from 'store/actions/team';
import { searchUsersAction } from 'store/actions/auth';
import TeamMember from './TeamMember';

import './style.scss';

const INPUT_MODE = 0;
const ADD_NOTE_MODE = 1;
const INVITE_MODE = 2;

function TeamMemberView(props) {
  const {
    isInviting,
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
    searchedUsers,
    searchUsers,
  } = props;

  const [search, setSearch] = useState('');
  const handleChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const [email, setEmail] = useState('');
  const [emailNote, setEmailNote] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [showInvitableUsers, setShowInvitableUsers] = useState(false);

  const [mode, setMode] = useState(INPUT_MODE);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  let userSelected = false;

  const searchInvitableMembers = _debounce((value) => {
    searchUsers(value);
  }, 1000);

  const onChange = useCallback((e) => {
    setEmail(e.target.value);
    searchInvitableMembers(e.target.value);
  }, [searchInvitableMembers]);

  const invitedUsers = users || [];
  const usersNotInvited = _sortBy(searchedUsers.filter(
    (usr) => [...invitedUsers, ...selectedUsers].findIndex((u) => usr.id === u.id) === -1,
  ), ['name']);

  const deselectUser = (u) => {
    setSelectedUsers(selectedUsers.filter((usr) => usr.id !== u.id));
  };

  const selectUser = (u) => {
    if (selectedUsers.findIndex((selUser) => selUser.id === u.id) === -1) {
      setSelectedUsers(_sortBy([...selectedUsers, u], ['name', 'email']));
      if (!u.name) setEmail('');
    }
  };

  const inviteRef = createRef();

  const onClickOutsideHandler = (event) => {
    if (inviteRef.current && !inviteRef.current.contains(event.target)) {
      setShowInvite(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutsideHandler);
  });

  const toggleInvitableUsers = (val = null) => {
    if (userSelected === true) return;
    if (val !== null) {
      setShowInvitableUsers(val);
    } else {
      setShowInvitableUsers(!showInvitableUsers);
    }
  };

  const handleInvite = useCallback(() => {
    inviteMembers(id, selectedUsers, emailNote)
      .then(() => {
        setShowInvite(false);
        setSearch('');
        setMode(INPUT_MODE);
        setSelectedUsers([]);
      })
      .catch(() => {
        setMode(INPUT_MODE);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to invite user.',
        });
      });
  }, [inviteMembers, id, selectedUsers, emailNote]);

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

                <div className="invite-wrapper" ref={inviteRef}>
                  {authUser && authUser.role === 'owner' && (
                    <button
                      type="button"
                      className="invite-btn"
                      onClick={() => setShowInvite(!showInvite)}
                    >
                      Invite the team member
                    </button>
                  )}

                  {showInvite && (
                    <div className="invite-dialog" onClick={() => toggleInvitableUsers(false)}>
                      <h2 className="font-weight-bold">
                        {mode === INPUT_MODE && 'Invite Team Member'}
                        {mode === INVITE_MODE && 'Invite Team Member with Custom Message'}
                        {mode === ADD_NOTE_MODE && `Invite ${selectedUsers[0].name || selectedUsers[0].email}...`}
                      </h2>

                      <div>
                        <h2>
                          {mode === INPUT_MODE && 'Team Members'}
                          {mode === ADD_NOTE_MODE && 'Message'}
                        </h2>
                        {mode === INPUT_MODE && (
                          <>
                            <div className="email-input">
                              <div className="input-box">
                                {selectedUsers && selectedUsers.map((u) => (
                                  <span key={u.id} className="user-chip">
                                    {u.name || u.email}
                                    <span onClick={() => deselectUser(u)} className="close-circle" />
                                  </span>
                                ))}

                                <div className="input-container">
                                  <input
                                    type="text"
                                    placeholder="User name or Email"
                                    value={email}
                                    onClick={() => setTimeout(() => toggleInvitableUsers(true), 100)}
                                    onChange={onChange}
                                    onKeyPress={({ key }) => {
                                      if (validator.isEmail(email) && key === 'Enter') {
                                        selectUser({
                                          id: email, name: '', first_name: '', last_name: '', email,
                                        });
                                      }
                                    }}
                                  />

                                  <span className="close-circle" onClick={() => { setEmail(''); searchInvitableMembers(''); }} />
                                </div>
                              </div>

                              {showInvitableUsers && usersNotInvited.length > 0 && (
                                <div className="non-invitee-members">
                                  {usersNotInvited.map((u) => (
                                    <div
                                      key={u.id}
                                      onClick={() => { selectUser(u); userSelected = true; }}
                                      className="member-item"
                                    >
                                      <div className="member-name-mark">
                                        <span>{`${'*' && u.first_name[0]}${'*' && u.last_name[0]}`}</span>
                                      </div>

                                      <div className="member-info">
                                        <h2 className="member-name">{`${u.name}`}</h2>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </>
                        )}

                        <h2 style={{ fontSize: '13px', marginBottom: mode === INVITE_MODE ? '2em' : '1em' }}>
                          {mode === INPUT_MODE && (
                            <>
                              <span className="font-weight-bold">Tip: </span>
                              You can invite as many users you want, using multiple email address or user name
                            </>
                          )}
                          {mode === INVITE_MODE && `You can add a note to personalize your invitation to "${selectedUsers[0].name}", ...`}
                        </h2>

                        {mode === INPUT_MODE && (
                          <button
                            type="button"
                            disabled={selectedUsers.length === 0 || isInviting}
                            onClick={() => setMode(INVITE_MODE)}
                          >
                            Invite
                          </button>
                        )}

                        {mode === INVITE_MODE && (
                          <>
                            <button
                              type="button"
                              disabled={selectedUsers.length === 0 || isInviting}
                              onClick={() => setMode(ADD_NOTE_MODE)}
                              className="add-note"
                            >
                              Add Note

                              {isInviting && (
                                <FontAwesomeIcon icon="spinner" />
                              )}
                            </button>
                            <button
                              type="button"
                              disabled={selectedUsers.length === 0 || isInviting}
                              onClick={handleInvite}
                            >
                              Send Invite

                              {isInviting && (
                                <FontAwesomeIcon icon="spinner" />
                              )}
                            </button>
                          </>
                        )}
                        {mode === ADD_NOTE_MODE && (
                          <>
                            <div className="email-input">
                              <textarea
                                onChange={(e) => setEmailNote(e.target.value)}
                                className="add-note-box"
                                placeholder="e.g. leo"
                              />
                            </div>
                            <button
                              type="button"
                              disabled={selectedUsers.length === 0 || isInviting}
                              onClick={handleInvite}
                            >
                              Send
                              {isInviting && (
                                <FontAwesomeIcon icon="spinner" />
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
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
  isInviting: PropTypes.bool.isRequired,
  removingUserId: PropTypes.number,
  user: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  inviteMembers: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  searchedUsers: PropTypes.array.isRequired,
  searchUsers: PropTypes.func.isRequired,
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
