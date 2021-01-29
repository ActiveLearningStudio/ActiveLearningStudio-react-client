import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Alert,
  Image,
  Card,
  ListGroup,
  Dropdown,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import {
  browseAction,
  closePreviewAction,
  setPreviewActivityAction,
} from 'store/actions/canvas';
import PreviewActivity from 'containers/LMS/Canvas/DeepLinking/PreviewActivity';
import gifloader from 'assets/images/dotsloader.gif';
import './style.scss';

const Browse = (props) => {
  const {
    match,
    previewActivity,
    browse,
    browseResults,
    closePreview,
    setPreviewActivity,
  } = props;
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    browse({
      lms_url: match.params.lmsUrl,
      lti_client_id: match.params.ltiClientId,
    });
  }, [match]);

  const viewPlaylists = (project) => {
    closePreview();
    setSelectedPlaylist(null);
    setSelectedProject(project.id);
  };

  const viewPlaylist = (playlist) => {
    closePreview();
    setSelectedPlaylist(playlist);
  };

  const addToLMS = (id) => {
    const activityId = parseInt(id, 10);
    const activity = selectedPlaylist.activities.find((act) => act.id === activityId);

    if (!activity) return;

    const finalUrl = `${decodeURIComponent(match.params.redirectUrl)}&title=${
      encodeURIComponent(activity.title)}&entity=activity&id=${activity.id}`;
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

  const launchPreview = (id) => {
    const activityId = parseInt(id, 10);
    const activity = selectedPlaylist.activities.find((act) => act.id === activityId);

    if (activity) {
      closePreview();
      setPreviewActivity(activity);
    }
  };

  return (
    <div className="row">
      <div className="col">
        {browseResults === null && (
          <div className="row">
            <div className="col text-center">
              <img style={{ width: '50px' }} src={gifloader} alt="" />
            </div>
          </div>
        )}
        {browseResults !== null && browseResults.length === 0 && (
          <Alert variant="warning">
            No projects found.
          </Alert>
        )}
        {browseResults !== null && browseResults.length > 0 && (
          <>
            {browseResults.map((project) => (
              <div className="row results">
                <div className="col-2">
                  <Image src={project.thumb_url.includes('pexels.com') ? project.thumb_url : `${global.config.resourceUrl}${project.thumb_url}`} thumbnail />
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <h3>
                        {project.name.length > 0 && project.name}
                        {project.name.length === 0 && 'Activity name not available'}
                      </h3>
                    </div>
                    <div className="col-3">
                      <button type="button" className="pagination-buttons" onClick={() => viewPlaylists(project)}>View Playlists</button>
                    </div>
                  </div>
                  {selectedProject === project.id && selectedPlaylist === null && (
                    <>
                      <div className="row">
                        <div className="col">
                          <h2>
                            <label>Playlists:</label>
                          </h2>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          {project.playlists.length === 0 && (
                            <Alert variant="warning">
                              No playlists in this project
                            </Alert>
                          )}
                          {project.playlists.length > 0 && (
                            <Card className="mt-2">
                              <ListGroup variant="flush">
                                {project.playlists.map((playlist) => (
                                  <ListGroup.Item className="plist" onClick={() => viewPlaylist(playlist)}>
                                    <div className="row">
                                      <div className="col">
                                        {playlist.title}
                                      </div>
                                      <div className="col text-right">
                                        <FontAwesomeIcon className="pull-right" icon="chevron-right" />
                                      </div>
                                    </div>
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </Card>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {selectedPlaylist && project.playlists.find((playlist) => playlist.id === selectedPlaylist.id) && (
                    <>
                      <div className="row">
                        <div className="col">
                          <h2>
                            <span onClick={() => viewPlaylists(project)}>Playlists &gt; </span>
                            {selectedPlaylist.title}
                          </h2>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          {selectedPlaylist.activities.length === 0 && (
                            <Alert variant="warning">
                              No activities in this playlist
                            </Alert>
                          )}
                          {selectedPlaylist.activities.length > 0 && selectedPlaylist.activities.map((activity) => (
                            <>
                              <div className="row mt-2">
                                <div className="col">
                                  <Image src={activity.thumb_url.includes('pexels.com') ? activity.thumb_url : `${global.config.resourceUrl}${activity.thumb_url}`} thumbnail />
                                </div>
                                <div className="col">
                                  <h3>{activity.title}</h3>
                                </div>
                                <div className="col text-right">
                                  <Dropdown>
                                    <Dropdown.Toggle className="actions-button">
                                      <FontAwesomeIcon icon="ellipsis-v" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Dropdown.Item to="#" eventKey={activity.id} onSelect={launchPreview}>
                                        <FontAwesomeIcon icon="eye" className="action-icon" />
                                        Preview
                                      </Dropdown.Item>
                                      <Dropdown.Item to="#" eventKey={activity.id} onSelect={addToLMS}>
                                        <FontAwesomeIcon icon="plus" className="action-icon" />
                                        Add to Course
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </div>
                              {(previewActivity && previewActivity.id === activity.id) && (
                                <div className="row">
                                  <div className="col">
                                    <PreviewActivity />
                                  </div>
                                </div>
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

Browse.propTypes = {
  match: PropTypes.object.isRequired,
  browseResults: PropTypes.object.isRequired,
  previewActivity: PropTypes.object.isRequired,
  browse: PropTypes.func.isRequired,
  setPreviewActivity: PropTypes.func.isRequired,
  closePreview: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  browseResults: state.canvas.browseResults,
  previewActivity: state.canvas.previewActivity,
});

const mapDispatchToProps = (dispatch) => ({
  browse: (params) => dispatch(browseAction(params)),
  setPreviewActivity: (activity) => dispatch(setPreviewActivityAction(activity)),
  closePreview: () => dispatch(closePreviewAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Browse));
