import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import TeamMember from './TeamMember';

import './style.scss';

function TeamMemberView(props) {
  const {
    user,
    team: {
      users,
      name,
      description,
    },
  } = props;

  const [search, setSearch] = useState('');

  const handleChangeSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

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

                <button type="button" className="invite-btn">
                  Invite the team member
                </button>
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
  user: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
};

export default TeamMemberView;
