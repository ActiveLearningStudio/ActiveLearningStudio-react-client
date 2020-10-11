import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.scss';

function TeamViewCard(props) {
  const { teamInfo } = props;
  const {
    title,
    description,
    members,
    projects,
  } = teamInfo;

  let memCnt = `00${members.length}`;
  memCnt = memCnt.slice(memCnt.length - 2, memCnt.length);

  let projCnt = `00${projects.length}`;
  projCnt = projCnt.slice(projCnt.length - 2, projCnt.length);

  return (
    <div className="team-card-content">
      <div>
        <h2 className="title">{title}</h2>
        <h2 className="describe">{description}</h2>
      </div>

      <div className="team-member-content mid-border">
        <div className="sub-title">
          <span>Team Members</span>
          <span>{`(${memCnt})`}</span>
        </div>

        <div className="member-mark-container">
          {members.map(({ firstName, lastName }, index) => (
            <div className={`member-name-mark${index > 0 ? ' over' : ''}`}>
              <span>{`${firstName[0]}${lastName[0]}`}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sub-title">
        <span>Projects to the Team</span>
        <span>{`(${projCnt})`}</span>
      </div>
    </div>
  );
}

TeamViewCard.propTypes = {
  teamInfo: PropTypes.object.isRequired,
};

TeamViewCard.defaultProps = {
};

const mapDispatchToProps = () => ({});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TeamViewCard);
