import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _debounce from 'lodash/debounce';
import _sortBy from 'lodash/sortBy';

import { inviteMembersAction, removeMemberAction } from 'store/actions/group';
import { searchUsersAction } from 'store/actions/auth';

import './style.scss';

const INPUT_MODE = 0;
const ADD_NOTE_MODE = 1;
const INVITE_MODE = 2;

function InviteDialogGroup(props) {
  const {
    isInviting,
    users,
    handleInvite,
    searchedUsers,
    searchUsers,
    visible,
    setShowInvite,
    authUser,
    isSearching,
  } = props;

  const [email, setEmail] = useState('');
  const [emailNote, setEmailNote] = useState('');
  const [showInvitableUsers, setShowInvitableUsers] = useState(false);

  const [mode, setMode] = useState(INPUT_MODE);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const inputRef = useRef(null);
  const inviteRef = useRef(null);
  const autoPanRef = useRef(null);

  let userSelected = false;

  const searchInvitableMembers = _debounce((value) => {
    searchUsers(value);
  }, 1000);

  const toggleInvitableUsers = useCallback((val = null) => {
    if (userSelected === true) {
      userSelected = false;
    } else if (val !== null) {
      setShowInvitableUsers(val);
    } else {
      setShowInvitableUsers(!showInvitableUsers);
    }
  }, [showInvitableUsers]);

  const onChange = useCallback((e) => {
    setEmail(e.target.value);
    searchInvitableMembers(e.target.value);
    toggleInvitableUsers(true);
  }, [searchInvitableMembers, toggleInvitableUsers]);

  const invitedUsers = users || [];
  const usersNotInvited = _sortBy(searchedUsers.filter(
    (usr) => [...invitedUsers, ...selectedUsers].findIndex((u) => usr.id === u.id) === -1 && usr.id !== authUser.id,
  ), ['name']);

  const deselectUser = (u) => {
    setSelectedUsers(selectedUsers.filter((usr) => usr.id !== u.id));
  };

  const selectUser = (u) => {
    if (selectedUsers.findIndex((selUser) => selUser.id === u.id) === -1) {
      setEmail('');
      setShowInvitableUsers(false);
      setSelectedUsers(_sortBy([...selectedUsers, u], ['name', 'email']));
    }
  };

  const initDialog = () => {
    setSelectedUsers([]);
    setEmail('');
    setMode(INPUT_MODE);
  };

  useEffect(() => {
    initDialog();
  }, [visible]);

  return (
    <div className="invite-wrapper" ref={inviteRef}>
      {authUser && authUser.role === 'owner' && (
        <button
          type="button"
          className="invite-btn"
          onClick={() => setShowInvite(!visible)}
        >
          Invite a Group Member
        </button>
      )}

      {visible && (
        <div onFocus={() => toggleInvitableUsers(false)} className="invite-dialog">
          <div className="popup-header">
            <h2 className="font-weight-bold">
              {mode === INPUT_MODE && 'Invite a Group Member'}
              {mode === INVITE_MODE && 'Invite a Group Member with Custom Message'}
              {mode === ADD_NOTE_MODE && `Invite ${selectedUsers[0].name || selectedUsers[0].email}...`}
            </h2>

            <span className="close-circle" onClick={() => setShowInvite(false)} />
          </div>

          <div>
            <h2>
              {mode === INPUT_MODE && 'Group Members'}
              {mode === ADD_NOTE_MODE && 'Message'}
            </h2>

            {mode === INPUT_MODE && (
              <div className="email-input">
                <div className="input-box" onClick={() => inputRef.current.focus()}>
                  {selectedUsers && selectedUsers.map((u) => (
                    <span key={u.id} className="user-chip">
                      {u.name || u.email}
                      <span className="close-circle" onClick={() => deselectUser(u)} />
                    </span>
                  ))}

                  <div className="input-container">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="User name or Email"
                      value={email}
                      // maxLength={15}
                      // size={email.length}
                      onChange={onChange}
                      onKeyPress={({ key }) => {
                        if (validator.isEmail(email) && key === 'Enter') {
                          selectUser({
                            id: selectedUsers.length * -1,
                            name: '',
                            first_name: '',
                            last_name: '',
                            email,
                          });
                        }
                      }}
                    />
                    <span
                      className="close-circle"
                      onClick={() => {
                        setEmail('');
                        searchInvitableMembers('');
                      }}
                    >
                      {isSearching && (
                        <FontAwesomeIcon icon="spinner" />
                      )}
                    </span>
                  </div>
                </div>

                {(showInvitableUsers && usersNotInvited.length > 0) && (
                  <div className="non-invitee-members" ref={autoPanRef}>
                    {email && usersNotInvited.map((u) => (
                      <div
                        key={u.id}
                        className="invite-member-item"
                        data-list="true"
                        onClick={() => {
                          selectUser(u);
                          userSelected = true;
                        }}
                      >
                        <div className="invite-member-name-mark">
                          <span>{`${u.first_name[0] || ''}${u.last_name[0] || ''}` }</span>
                        </div>

                        <div className="invite-member-info">
                          <h2 className="invite-member-name">{`${u.name} (${u.email})`}</h2>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <h2 style={{ fontSize: '13px', marginBottom: mode === INVITE_MODE ? '2em' : '1em' }}>
              {mode === INPUT_MODE && (
                <>
                  <span className="font-weight-bold">Tip: </span>
                  You can invite as many users you want, using multiple email address or user name
                </>
              )}

              {mode === INVITE_MODE && `You can add a note to personalize your invitation to "${selectedUsers[0].name || selectedUsers[0].email}", ...` }
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
                </button>
                <button
                  type="button"
                  disabled={selectedUsers.length === 0 || isInviting}
                  onClick={() => handleInvite(selectedUsers, emailNote)}
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
                    className="add-note-box"
                    placeholder="e.g. leo"
                    onChange={(e) => setEmailNote(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  disabled={selectedUsers.length === 0 || isInviting}
                  onClick={() => handleInvite(selectedUsers, emailNote)}
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
  );
}

InviteDialogGroup.propTypes = {
  authUser: PropTypes.object.isRequired,
  isSearching: PropTypes.bool.isRequired,
  searchedUsers: PropTypes.array.isRequired,
  isInviting: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  users: PropTypes.array,
  searchUsers: PropTypes.func.isRequired,
  handleInvite: PropTypes.func.isRequired,
  setShowInvite: PropTypes.func.isRequired,
};

InviteDialogGroup.defaultProps = {
  users: [],
};

const mapStateToProps = (state) => ({
  isSearching: state.auth.isSearching,
  searchedUsers: state.auth.searchedUsers,
  isInviting: state.group.isInviting,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  searchUsers: (search) => dispatch(searchUsersAction(search)),
  inviteMembers: (groupId, selectedUsers, emailNote) => dispatch(inviteMembersAction(groupId, selectedUsers, emailNote)),
  removeMember: (groupId, userId) => dispatch(removeMemberAction(groupId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteDialogGroup);
