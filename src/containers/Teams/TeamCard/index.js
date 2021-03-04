import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';
import { useSelector } from 'react-redux';

function TeamCard(props) {
  const {
    team: {
      id,
      name,
      description,
      users,
      projects,
    },
  } = props;

  let memCnt = `00${users.length}`;
  memCnt = memCnt.slice(memCnt.length - 2, memCnt.length);
  const organization = useSelector((state) => state.organization);
  let projCnt = `00${projects.length}`;
  projCnt = projCnt.slice(projCnt.length - 2, projCnt.length);

  return (
    <div className="team-card-content">
      <div className="team-title">
        <Link to={`/org/${organization.currentOrganization?.domain}/teams/${id}`} className="title m-0">{name}</Link>
        <h2 className="describe">{description}</h2>
      </div>

      <div className="team-member-content mid-border">
        <div className="sub-title">
          <span>Team Members</span>
          <span>{`(${memCnt})`}</span>
        </div>

        <div className="member-mark-container">
          {users.map((user, index) => (
            <div key={user.id} className={`member-name-mark${index > 0 ? ' over' : ''}`}>
              <span>{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sub-title">
        <span>Projects for the Team</span>
        <span>{`(${projCnt})`}</span>
      </div>
    </div>
  );
}

TeamCard.propTypes = {
  team: PropTypes.object.isRequired,
};

export default TeamCard;
