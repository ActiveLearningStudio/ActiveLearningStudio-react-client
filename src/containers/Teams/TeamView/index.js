import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MemberItem from './MemberItem';

import './style.scss';

function TeamMemberManagement(props) {
  const {
    teamInfo: {
      members,
      title,
      description,
    },
  } = props;

  const [selectedMember, setSelectedMember] = useState(null);

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
                  onChange={() => {
                  }}
                />
                <button type="button" className="invite-btn">Invite the team member</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="member-list">
                {members.map((member, index) => (
                  <MemberItem
                    key={`${member.firstName}${member.lastName}`}
                    selectMe={() => setSelectedMember(index)}
                    deselectMe={() => setSelectedMember(null)}
                    selected={selectedMember === index}
                    user={member}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-description">
        <h2 className="title">
          {`About the ${title}`}
        </h2>
        <h2 className="description">
          {description}
        </h2>
      </div>
    </div>
  );
}

TeamMemberManagement.propTypes = {
  teamInfo: PropTypes.object.isRequired,
};

export default TeamMemberManagement;
