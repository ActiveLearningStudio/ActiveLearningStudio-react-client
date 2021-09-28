import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import GoogleModel from 'components/models/GoogleLoginModal';
// import { zeroFill } from 'utils';
import {
  getTeamPermission,
  loadTeamsAction,
  removeMemberFromProjectAction,
  removeProjectAction,
} from 'store/actions/team';

import './style.scss';
import SharePreviewPopup from 'components/SharePreviewPopup';
import { getProjectCourseFromLMS, loadLmsAction, toggleProjectShareAction } from 'store/actions/project';
import { lmsPlaylist } from 'store/actions/playlist';
import { getProjectId, googleShare } from 'store/actions/gapi';

function TeamProjectView(props) {
  const {
    team: { users, projects, id },
    user,
    removeProject,
    removeMember,
  } = props;
  const organization = useSelector((state) => state.organization);
  const { teamPermission, selectedForClone } = useSelector((state) => state.team);
  const { notification } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  // const { permission } = organization;
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [show, setShow] = useState(false);
  const authUser = users.find((u) => u.id === (user || {}).id);
  const AllLms = useSelector((state) => state.share);
  const [allLms, setAllLms] = useState([]);
  const handleShow = () => {
    setShow(!show); //! state.show
  };
  useEffect(() => {
    dispatch(loadLmsAction());
  }, []);

  useEffect(() => {
    setAllLms(AllLms);
  }, [AllLms, AllLms.shareVendors]);
  // Fetch team permission if page reloads
  useEffect(() => {
    if (Object.keys(teamPermission).length === 0 && organization?.currentOrganization?.id && id) {
      dispatch(getTeamPermission(organization?.currentOrganization?.id, id));
    }
  }, [teamPermission]);
  useEffect(() => {
    if (notification?.today[0]?.data.message.indexOf(selectedForClone) !== -1) {
      dispatch(loadTeamsAction());
    }
  }, [notification?.today]);
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
    <div className="team-information">
      {/* {permission?.Team?.includes('team:add-projects') && (
        <Link to={`/org/${organization.currentOrganization?.domain}/teams/${id}/add-projects`}>
          <div className="btn-top-page">
            <FontAwesomeIcon icon="plus" className="mr-2" />
            Add projects
          </div>
        </Link>
      )} */}

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
                    {teamPermission?.Team?.includes('team:view-project') && (
                      <Dropdown.Item as={Link} to={`/studio/org/${organization.currentOrganization?.domain}/project/${project.id}/preview`}>
                        <FontAwesomeIcon icon="eye" className="mr-2" />
                        Preview
                      </Dropdown.Item>
                    )}
                    {teamPermission?.Team?.includes('team:view-project') && (
                      <Dropdown.Item as={Link} to={`/studio/org/${organization.currentOrganization?.domain}/project/${project.id}`}>
                        <FontAwesomeIcon icon="globe" className="mr-2" />
                        Build
                      </Dropdown.Item>
                    )}
                    {teamPermission?.Team?.includes('team:publish-project') && (
                      <li className="dropdown-submenu send">
                        <a tabIndex="-1">
                          <FontAwesomeIcon icon="newspaper" className="mr-2" />
                          Publish
                        </a>
                        <ul className="dropdown-menu check">
                          <li
                            onClick={() => {
                              handleShow();
                              getProjectId(project.id);
                              setSelectedProjectId(project.id);
                              dispatch(googleShare(false));
                            }}
                          >
                            <a>Google Classroom</a>
                          </li>

                          {allLms?.shareVendors && allLms.shareVendors.map((data) => (
                            data.lms_name !== 'safarimontage' && (
                            <li>
                              <a
                                onClick={async () => {
                                  const allPlaylist = await dispatch(lmsPlaylist(project.id));
                                  if (allPlaylist) {
                                    dispatch(
                                      getProjectCourseFromLMS(
                                        data.lms_name.toLowerCase(),
                                        data.id,
                                        project.id,
                                        allPlaylist.playlists,
                                        data.lms_url,
                                      ),
                                    );
                                  }
                                }}
                              >
                                {data.site_name}
                              </a>
                            </li>
                          )))}
                        </ul>
                      </li>
                    )}
                    {teamPermission?.Team?.includes('team:share-project') && (
                      <Dropdown.Item
                        to="#"
                        onClick={async () => {
                          const protocol = `${window.location.href.split('/')[0]}//`;
                          const url = `${protocol + window.location.host}/project/${project.id}/shared`;
                          if (!project.shared) {
                            Swal.showLoading();
                            await dispatch(toggleProjectShareAction(project.id, project.name));
                            Swal.close();
                            SharePreviewPopup(url, project.name);
                          } else {
                            SharePreviewPopup(url, project.name);
                          }
                        }}
                      >
                        <FontAwesomeIcon icon="share" className="mr-2" />
                        Share
                      </Dropdown.Item>
                    )}
                    {teamPermission?.Team?.includes('team:edit-project') && (
                      <Dropdown.Item as={Link} to={`/studio/org/${organization.currentOrganization?.domain}/project/${project.id}/edit`}>
                        <FontAwesomeIcon icon="pen" className="mr-2" />
                        Edit
                      </Dropdown.Item>
                    )}
                    {/* {(permission?.Team?.includes('team:add-project-user') || teamPermission?.Team?.includes('team:add-project-user'))
                     && (
                     <Dropdown.Item as={Link} to={`/studio/org/${organization.currentOrganization?.domain}/teams/${id}/projects/${project.id}/add-member`}>
                       <FontAwesomeIcon icon="crosshairs" className="mr-2" />
                       Add member
                     </Dropdown.Item>
                     )} */}
                    {(teamPermission?.Team?.includes('team:remove-project')
                    || teamPermission?.Team?.includes('team:remove-member-project'))
                      && (
                        <Dropdown.Item onClick={() => removeProjectSubmit(project.id)}>
                          <FontAwesomeIcon icon="times-circle" className="mr-2" />
                          Remove project
                        </Dropdown.Item>
                      )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {false && (
                <>
                  <div className="team-member-content mid-border">
                    <div className="sub-title">
                      <span>Team Members</span>
                      <span>{`(${project.users.length})`}</span>
                    </div>

                    <div className="member-mark-container">
                      {false && project.users.map((u, index) => (
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
                              {teamPermission?.Team?.includes('team:remove-project-user')
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
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <GoogleModel
        projectId={selectedProjectId}
        show={show} // {props.show}
        onHide={handleShow}
      />
    </div>
  );
}

TeamProjectView.propTypes = {
  team: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  removeProject: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  removeProject: (teamId, projectId) => dispatch(removeProjectAction(teamId, projectId)),
  removeMember: (teamId, projectId, userId) => dispatch(removeMemberFromProjectAction(teamId, projectId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamProjectView);
