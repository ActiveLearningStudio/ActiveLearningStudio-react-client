import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';

function TeamProjectView(props) {
  const { teamInfo } = props;
  const { members, projects } = teamInfo;

  let memCnt = `00${members.length}`;
  memCnt = memCnt.slice(memCnt.length - 2, memCnt.length);

  const projectCard = (project) => (
    <div key={project.title} className="project-content-item">
      <img src={project.thumbUrl} alt={project.thumbUrl} />

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
    <div className="row">
      <div className="col-md-12">
        <div className="team-information">
          <div className="projects-wrapper">
            <div className="row">
              <div className="col-md-12">
                <div className="project-list">
                  {projects.map((proj) => projectCard(proj))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TeamProjectView.propTypes = {
  teamInfo: PropTypes.object.isRequired,
};

TeamProjectView.defaultProps = {};

const mapDispatchToProps = () => ({});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TeamProjectView);
