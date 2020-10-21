import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { zeroFill } from 'utils';

import './style.scss';
import { Link } from 'react-router-dom';

function TeamProjectView(props) {
  const { team: { projects } } = props;

  return (
    <div className="team-information">
      <div className="projects-wrapper">
        <div className="project-list">
          {projects.map((project) => (
            <div key={project.id} className="project-content-item">
              <img
                src={project.thumb_url.includes('pexels.com')
                  ? `url(${project.thumb_url})`
                  : `url(${global.config.resourceUrl}${project.thumb_url})`}
                alt={project.name}
              />

              <div className="project-title">
                <Link to={`/project/${project.id}`}>{project.name}</Link>
                <div><FontAwesomeIcon icon="ellipsis-v" /></div>
              </div>

              <div className="team-member-content mid-border">
                <div className="sub-title">
                  <span>Team Members</span>
                  <span>{`(${zeroFill(project.users.length)})`}</span>
                </div>

                <div className="member-mark-container">
                  {project.users.map((user, index) => (
                    <div key={user.id} className={`member-name-mark${index > 0 ? ' over' : ''}`}>
                      <span>{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

TeamProjectView.propTypes = {
  team: PropTypes.object.isRequired,
};

export default TeamProjectView;
