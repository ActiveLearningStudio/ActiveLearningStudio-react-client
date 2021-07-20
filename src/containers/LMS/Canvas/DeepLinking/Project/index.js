import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  Card,
  ListGroup,
  Dropdown,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import {
  showSearchProjectAction,
  showSearchPlaylistAction,
  setPreviewActivityAction,
} from 'store/actions/canvas';
import './style.scss';

const Project = (props) => {
  const {
    match,
    project,
    selectedProject,
    selectedPlaylist,
    showProject,
    showPlaylist,
    setPreviewActivity,
  } = props;

  const showActivityPreview = (id) => {
    const activityId = parseInt(id, 10);
    const activity = selectedPlaylist.activities.find(
      (act) => act.id === activityId,
    );

    if (activity) {
      setPreviewActivity(activity);
    }
  };

  const addToLMS = (id) => {
    const activityId = parseInt(id, 10);
    const activity = selectedPlaylist.activities.find(
      (act) => act.id === activityId,
    );

    if (!activity) return;

    const finalUrl = `${decodeURIComponent(
      match.params.redirectUrl,
    )}&title=${encodeURIComponent(activity.title)}&entity=activity&id=${
      activity.id
    }`;
    Swal.fire({
      html: `You have selected <strong>Activity: ${activity.title}</strong><br>Do you want to continue ?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.value) {
        window.location.href = finalUrl;
      }
    });
  };

  return (
    <div className="row mt-2 mb-2 lti-deeplink-project-container">
      <div className="col">
        <div key={project.id} className="row result">
          <div className="col-2">
            <Image
              src={
                project.thumb_url.includes('pexels.com')
                  ? project.thumb_url
                  : `${global.config.resourceUrl}${project.thumb_url}`
              }
              thumbnail
            />
          </div>
          <div className="col">
            <div className="row project-details-row">
              <div className="col">
                <h3>
                  {project.title.length > 0 && project.title}
                  {project.title.length === 0 && 'Project title not available'}
                </h3>
                <p>
                  {project.description.length > 0 && project.description}
                  {project.description.length === 0 && 'Project description not available'}
                </p>
                {project.user && (
                  <p className="text-right">
                    <label>Author:</label>
                    {` ${project.user.last_name}, ${project.user.first_name} (${project.user.email})`}
                  </p>
                )}
              </div>
            </div>
            <div className="row playlists-row">
              <div className="col">
                {selectedProject?.id === project.id && (
                  <div className="row">
                    <div className="col">
                      {selectedProject.playlists.length === 0 && (
                        <Alert variant="warning">
                          This project has no playlists
                        </Alert>
                      )}
                      {selectedProject.playlists.length > 0 && (
                        <Card className="mt-2">
                          <ListGroup variant="flush">
                            {selectedProject.playlists.map((playlist) => (
                              <ListGroup.Item
                                key={playlist.id}
                                className="plist"
                                onClick={() => showPlaylist(playlist)}
                              >
                                <div className="row">
                                  <div className="col">
                                    <h4>
                                      {playlist.title}
                                    </h4>
                                  </div>
                                  <div className="col text-right">
                                    <FontAwesomeIcon
                                      className="pull-right"
                                      icon="chevron-right"
                                    />
                                  </div>
                                </div>
                                {selectedPlaylist?.id === playlist.id && playlist.activities.length === 0 && (
                                  <Alert variant="warning">
                                    This playlist has no activities.
                                  </Alert>
                                  )}
                                {selectedPlaylist?.id === playlist.id && playlist.activities.length > 0 && playlist.activities.map((activity) => (
                                  <div className="row mt-2" key={activity.id}>
                                    <div className="col">
                                      <Image
                                        src={
                                          activity.thumb_url.includes(
                                            'pexels.com',
                                          )
                                            ? activity.thumb_url
                                            : `${global.config.resourceUrl}${activity.thumb_url}`
                                        }
                                        thumbnail
                                      />
                                    </div>
                                    <div className="col">
                                      <h5>{activity.title}</h5>
                                    </div>
                                    <div className="col text-right">
                                      <Dropdown>
                                        <Dropdown.Toggle className="actions-button">
                                          <FontAwesomeIcon icon="ellipsis-v" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <Dropdown.Item
                                            to="#"
                                            eventKey={activity.id}
                                            onSelect={showActivityPreview}
                                          >
                                            <FontAwesomeIcon
                                              icon="eye"
                                              className="action-icon"
                                            />
                                            Preview
                                          </Dropdown.Item>
                                          <Dropdown.Item
                                            to="#"
                                            eventKey={activity.id}
                                            onSelect={addToLMS}
                                          >
                                            <FontAwesomeIcon
                                              icon="plus"
                                              className="action-icon"
                                            />
                                            Add to Course
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                  </div>
                                ))}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Card>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {selectedProject?.id !== project.id && (
            <div className="col-2 text-right actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => showProject(project)}
              >
                View Playlists
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Project.defaultProps = {
  project: null,
  selectedProject: null,
  selectedPlaylist: null,
};

Project.propTypes = {
  match: PropTypes.object.isRequired,
  project: PropTypes.object,
  selectedProject: PropTypes.object,
  selectedPlaylist: PropTypes.object,
  showProject: PropTypes.func.isRequired,
  showPlaylist: PropTypes.func.isRequired,
  setPreviewActivity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedProject: state.canvas.searchSelectedProject,
  selectedPlaylist: state.canvas.searchSelectedPlaylist,
});

const mapDispatchToProps = (dispatch) => ({
  showProject: (project) => dispatch(showSearchProjectAction(project)),
  showPlaylist: (playlist) => dispatch(showSearchPlaylistAction(playlist)),
  setPreviewActivity: (activity) => dispatch(setPreviewActivityAction(activity)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Project),
);
