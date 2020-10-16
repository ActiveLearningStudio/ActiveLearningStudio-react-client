import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import proImage from 'assets/images/program-thumb.png';

import './style.scss';

function TeamProjectView(props) {
  const { teamInfo: { members, projects } } = props;

  let memCnt = `00${members.length}`;
  memCnt = memCnt.slice(memCnt.length - 2, memCnt.length);

  const projectCard = (project) => (
    <div key={project.title} className="project-content-item">
      {/* TODO src must be url of project - "project.thumbUrl" */}
      <img src={proImage} alt={project.thumbUrl} />

      <div className="project-title">
        <span>{project.title}</span>
        <div><FontAwesomeIcon icon="ellipsis-v" /></div>
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
    </div>
  );

  return (
    <div className="team-information">
      <div className="projects-wrapper">
        <div className="project-list">
          {projects.map((proj) => projectCard(proj))}
        </div>
      </div>
    </div>
  );
}

TeamProjectView.propTypes = {
  teamInfo: PropTypes.object.isRequired,
};

export default TeamProjectView;
