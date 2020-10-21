import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

import TeamMember from './TeamMember';

import './style.scss';

function TeamMemberView(props) {
  const {
    isInviting,
    user,
    team: {
      id,
      users,
      name,
      description,
    },
    inviteMember,
    // removeMember,
  } = props;

  const [search, setSearch] = useState('');
  const handleChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const [email, setEmail] = useState('');
  const [showInvite, setShowInvite] = useState(false);

  const handleBlur = useCallback(() => {
    setShowInvite(false);
  }, []);

  const handleInvite = useCallback(() => {
    inviteMember(id, email)
      .then(() => {
        setShowInvite(false);
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

                <div className="invite-wrapper">
                  <button
                    type="button"
                    className="invite-btn"
                    onClick={() => setShowInvite(!showInvite)}
                  >
                    Invite the team member
                  </button>

                  {showInvite && (
                    <div className="invite-dialog" onBlur={handleBlur}>
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
                    authUser={user}
                    selected={selectedMember === u.id}
                    user={u}
                    selectMe={() => setSelectedMember(u.id)}
                    deselectMe={() => setSelectedMember(null)}
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
  user: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  inviteMember: PropTypes.func.isRequired,
  // removeMember: PropTypes.func.isRequired,
};

export default TeamMemberView;
