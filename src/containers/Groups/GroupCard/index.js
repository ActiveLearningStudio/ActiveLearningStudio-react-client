import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';
import { useSelector } from 'react-redux';

function GroupCard(props) {
  const {
    group: {
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
    <div className="group-card-content">
      <div className="group-title">
        <Link to={`/org/${organization.currentOrganization?.domain}/groups/${id}`} className="title m-0">{name}</Link>
        <h2 className="describe">{description}</h2>
      </div>

      <div className="group-member-content mid-border">
        <div className="sub-title">
          <span>Group Members</span>
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
        <span>Projects for the Group</span>
        <span>{`(${projCnt})`}</span>
      </div>
    </div>
  );
}

GroupCard.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupCard;
