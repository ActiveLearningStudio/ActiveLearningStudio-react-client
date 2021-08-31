import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

// import { zeroFill } from 'utils';
import { removeMemberFromProjectAction, removeProjectAction } from 'store/actions/group';

import './style.scss';

function GroupProjectView(props) {
  const {
    group: { users, projects, id },
    user,
    removeProject,
    removeMember,
  } = props;

  const authUser = users.find((u) => u.id === (user || {}).id);
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;

  const removeProjectSubmit = useCallback((projectId) => {
    removeProject(id, projectId)
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove project.',
        });
      });
  }, [id, removeProject]);

  const removeMemberSubmit = useCallback((projectId, userId) => {
    removeMember(id, projectId, userId)
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove member.',
        });
      });
  }, [id, removeMember]);

  return (
    <div className="group-information">
      {permission?.Group?.includes('group:add-projects') && (
        <Link to={`/studio/org/${organization.currentOrganization?.domain}/groups/${id}/add-projects`}>
          <div className="btn-top-page">
            <FontAwesomeIcon icon="plus" className="mr-2" />
            Add projects
          </div>
        </Link>
      )}

      <div className="projects-wrapper">
        <div className="project-list">
          {projects.map((project) => (
            <div key={project.id} className="project-content-item">
              <div
                className="project-img"
                style={{
                  backgroundImage: project.thumb_url.includes('pexels.com')
                    ? `url(${project.thumb_url})`
                    : `url(${global.config.resourceUrl}${project.thumb_url})`,
                }}
              />

              <div className="project-title">
                <Link to={`/studio/org/${organization.currentOrganization?.domain}/project/${project.id}`}>{project.name}</Link>

                <Dropdown className="project-dropdown check d-flex justify-content-center align-items-center">
                  <Dropdown.Toggle className="project-dropdown-btn project d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon="ellipsis-v" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/studio/org/${organization.currentOrganization?.domain}/project/${project.id}/preview`}>
                      <FontAwesomeIcon icon="eye" className="mr-2" />
                      Preview
                    </Dropdown.Item>

                    <Dropdown.Item as={Link} to={`/studio/org/${organization.currentOrganization?.domain}/project/${project.id}`}>
                      <FontAwesomeIcon icon="globe" className="mr-2" />
                      Build
                    </Dropdown.Item>

                    <Dropdown.Item as={Link} to={`/studio/org/${organization.currentOrganization?.domain}/project/${project.id}/edit`}>
                      <FontAwesomeIcon icon="pen" className="mr-2" />
                      Edit
                    </Dropdown.Item>
                    {permission?.Group?.includes('group:add-project-user')
                    && (
                      <Dropdown.Item as={Link} to={`/studio/org/${organization.currentOrganization?.domain}/groups/${id}/projects/${project.id}/add-member`}>
                        <FontAwesomeIcon icon="crosshairs" className="mr-2" />
                        Add member
                      </Dropdown.Item>
                    )}
                    {permission?.Group?.includes('group:remove-projects')
                    && (
                      <Dropdown.Item onClick={() => removeProjectSubmit(project.id)}>
                        <FontAwesomeIcon icon="times-circle" className="mr-2" />
                        Remove project
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="group-member-content mid-border">
                <div className="sub-title">
                  <span>Group Members</span>
                  <span>{`(${project.users.length})`}</span>
                </div>

                <div className="member-mark-container">
                  {project.users.map((u, index) => (
                    <Dropdown key={u.id} className="member-dropdown">
                      <Dropdown.Toggle className="member-dropdown-btn">
                        <div className={`member-name-mark${index > 0 ? ' over' : ''}`}>
                          <span>{`${u.first_name.charAt(0)}${u.last_name.charAt(0)}`}</span>
                        </div>
                      </Dropdown.Toggle>

                      {authUser && authUser.id !== u.id && (
                        <Dropdown.Menu>
                          <div className="drop-title">
                            <div className="member-name-mark">
                              <span>{`${u.first_name.charAt(0)}${u.last_name.charAt(0)}`}</span>
                            </div>
                            <div>
                              <span className="username">{`${u.first_name} ${u.last_name}`}</span>
                              <span>{u.email}</span>
                            </div>
                          </div>

                          <div className="dropdown-divider" />
                          {permission?.Group?.includes('group:remove-project-user')
                          && (
                            <Dropdown.Item onClick={() => removeMemberSubmit(project.id, u.id)}>
                              <FontAwesomeIcon icon="times" className="mr-2" />
                              Remove from project
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      )}
                    </Dropdown>
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

GroupProjectView.propTypes = {
  group: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  removeProject: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  removeProject: (groupId, projectId) => dispatch(removeProjectAction(groupId, projectId)),
  removeMember: (groupId, projectId, userId) => dispatch(removeMemberFromProjectAction(groupId, projectId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupProjectView);
