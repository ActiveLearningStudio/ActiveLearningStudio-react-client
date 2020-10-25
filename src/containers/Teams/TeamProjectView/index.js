import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { zeroFill } from 'utils';

import './style.scss';

function TeamProjectView(props) {
  const { team: { users, projects, id }, user } = props;

  const authUser = users.find((u) => u.id === user.id);
  const role = authUser ? authUser.role : '';

  return (
    <div className="team-information">
      {role === 'owner' && (
        <Link to={`/teams/${id}/assign`}>
          <div className="btn-top-page">
            <FontAwesomeIcon icon="plus" className="mr-2" />
            Add project
          </div>
        </Link>
      )}

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

                <Dropdown className="project-dropdown check d-flex justify-content-center align-items-center">
                  <Dropdown.Toggle className="project-dropdown-btn project d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon="ellipsis-v" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/project/${project.id}/preview`}>
                      <FontAwesomeIcon icon="eye" className="mr-2" />
                      Preview
                    </Dropdown.Item>

                    <Dropdown.Item as={Link} to={`/project/${project.id}`}>
                      <FontAwesomeIcon icon="globe" className="mr-2" />
                      Build
                    </Dropdown.Item>

                    <Dropdown.Item as={Link} to={`/project/${project.id}/edit`}>
                      <FontAwesomeIcon icon="pen" className="mr-2" />
                      Edit
                    </Dropdown.Item>

                    {role === 'owner' && (
                      <>
                        <Dropdown.Item as={Link} to="/">
                          <FontAwesomeIcon icon="times-circle" className="mr-2" />
                          Remove project
                        </Dropdown.Item>

                        <Dropdown.Item as={Link} to="">
                          <FontAwesomeIcon icon="crosshairs" className="mr-2" />
                          Assign member
                        </Dropdown.Item>
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="team-member-content mid-border">
                <div className="sub-title">
                  <span>Team Members</span>
                  <span>{`(${zeroFill(project.users.length)})`}</span>
                </div>

                <div className="member-mark-container">
                  {project.users.map((u, index) => (
                    <div key={u.id} className={`member-name-mark${index > 0 ? ' over' : ''}`}>
                      <span>{`${u.first_name.charAt(0)}${u.last_name.charAt(0)}`}</span>
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
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(TeamProjectView);
