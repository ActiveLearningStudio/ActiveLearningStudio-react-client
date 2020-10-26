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

import { inviteMemberAction, removeMemberAction } from 'store/actions/team';
import TeamMember from './TeamMember';

import './style.scss';

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
    inviteMember,
    removeMember,
  } = props;

  const [search, setSearch] = useState('');
  const handleChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const [email, setEmail] = useState('');
  const [showInvite, setShowInvite] = useState(false);

  const inviteRef = createRef();

  const onClickOutsideHandler = (event) => {
    if (inviteRef.current && !inviteRef.current.contains(event.target)) {
      setShowInvite(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutsideHandler);
  });

  const handleInvite = useCallback(() => {
    inviteMember(id, email)
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
  }, [id, email, inviteMember]);

  const [selectedMember, setSelectedMember] = useState(null);

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
                    <div className="invite-dialog">
                      <h2 className="font-weight-bold">Invite Team Member</h2>
                      <div>
                        <h2>Enter Email</h2>

                        <div className="email-input">
                          <input
                            type="text"
                            placeholder="e.g. abby@curriki.org"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <button
                          type="button"
                          disabled={!email || !validator.isEmail(email) || isInviting}
                          onClick={handleInvite}
                        >
                          Invite

                          {isInviting && (
                            <FontAwesomeIcon icon="spinner" />
                          )}
                        </button>
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
                  <TeamMember
                    key={u.id}
                    teamId={id}
                    authUser={authUser}
                    removingUserId={removingUserId}
                    selected={selectedMember === u.id}
                    user={u}
                    selectMe={() => setSelectedMember(u.id)}
                    deselectMe={() => setSelectedMember(null)}
                    removeMember={removeMember}
                  />
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
  inviteMember: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
};

TeamMemberView.defaultProps = {
  removingUserId: null,
};

const mapStateToProps = (state) => ({
  isInviting: state.team.isInviting,
  removingUserId: state.team.removingUserId,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  inviteMember: (teamId, email) => dispatch(inviteMemberAction(teamId, email)),
  removeMember: (teamId, userId) => dispatch(removeMemberAction(teamId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberView);
