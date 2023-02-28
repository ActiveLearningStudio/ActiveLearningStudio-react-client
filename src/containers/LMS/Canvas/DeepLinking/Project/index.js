/* eslint-disable */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Image, Card, ListGroup, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { showSearchProjectAction, showSearchPlaylistAction, setPreviewActivityAction } from 'store/actions/canvas';
import './style.scss';
import * as microsoftTeams from '@microsoft/teams-js';

const Project = (props) => {
  const { match, project, selectedProject, selectedPlaylist, showProject, showPlaylist, setPreviewActivity } = props;
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  console.log('matching item:', match);

  const showActivityPreview = (id) => {
    const activityId = parseInt(id, 10);
    const activity = selectedPlaylist.activities.find((act) => act.id === activityId);

    if (activity) {
      setPreviewActivity(activity);
    }
  };
  const addToLMS = (id) => {
    const activityId = parseInt(id, 10);
    const activity = selectedPlaylist.activities.find((act) => act.id === activityId);

    if (!activity) return;

    const finalUrl = `${decodeURIComponent(match.params.redirectUrl)}&title=${encodeURIComponent(activity.title)}&entity=activity&id=${activity.id}`;
    Swal.fire({
      icon: 'warning',
      html: `You have selected <strong>Activity: ${activity.title}</strong><br>Do you want to continue ?`,
      showCancelButton: true,
      confirmButtonColor: '#084892',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it',
    }).then((result) => {
      if (result.value) {
        window.location.href = finalUrl;
      }
    });
  };

  //Ms teams deeplinking item add to assignment
  const addToMsTeams = async (id) => {
    if (!match.params.lmsUrl.includes('microsoft'))
      return;

    const activityId = parseInt(id, 10);
    const activity = selectedPlaylist.activities.find((act) => act.id === activityId);
    setSelectedActivityId(activityId);

    await microsoftTeams.app.initialize();

    microsoftTeams.pages.config.setValidityState(true);
    microsoftTeams.pages.config.registerOnSaveHandler((saveEvent) => {
      const configPromise = microsoftTeams.pages.config.setConfig({
          // websiteUrl: config.domainUrl,
          // contentUrl: `${config.domainUrl}msteam/launch/activity/${activity.id}`,
          websiteUrl: 'https://53d0-116-0-54-66.ngrok.io/',
          contentUrl: `https://53d0-116-0-54-66.ngrok.io/msteam/launch/activity/${activity.id}`,
          entityId: activity.id,
          suggestedDisplayName: activity.title,
      });
      configPromise.then((result) => { 
        saveEvent.notifySuccess();
       })
      // eslint-disable-next-line no-shadow
      .catch((error) => { saveEvent.notifyFailure('failure message'); });
  });
  };

  return (
    <>
      <div className=" mt-2 mb-2 lti-deeplink-project-container">
        <div className="col result">
          <div key={project.id} className="row project ">
            <div className="col project-about">
              <div
                className="project-img"
                style={{
                  backgroundImage: !project.thumb_url.includes('/storage/') ? `url(${project.thumb_url})` : `url(${global.config.resourceUrl}${project.thumb_url})`,
                }}
              ></div>

              <div className="row project-details-row">
                <div className="col project-detail">
                  <h5 className="project-detail-title">
                    {project.title.length > 0 && project.title}
                    {project.title.length === 0 && 'Project title not available'}
                  </h5>
                  <p className="project-detail-paragraph">
                    {project.description.length > 0 && project?.description?.slice(0, 120)}
                    {project.description.length === 0 && 'Project description not available'}
                  </p>
                  {project.user && (
                    <p className="project-detail-by-author">
                      <label>By:</label>
                      {` ${project.user.last_name}, ${project.user.first_name} (${project.user.email})`}
                      <br />
                      <label>Organization:</label>
                      {project.organization?.name && ` ${project.organization.name}`}
                      {!project.organization?.name && ' N/A'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* {selectedProject?.id !== project.id && ( */}
            <div className={selectedProject?.id === project.id ? "text-right actions selected-proj" : " text-right actions"}>
              <button className="btn btn-primary" type="button" onClick={() => showProject(project)}>
                View Playlists
              </button>
            </div>
          </div>
        </div>
        <div className="row playlists-row">
          <div className="col">
            {selectedProject?.id === project.id && (
              <div className="row">
                <div className="col playlists-container">
                  {selectedProject.playlists.length === 0 && <Alert variant="warning">This project has no playlists</Alert>}
                  {selectedProject.playlists.length > 0 && (
                    <Card>
                      <ListGroup variant="flush">
                        {selectedProject.playlists.map((playlist) => (
                          <ListGroup.Item key={playlist.id} className="plist" onClick={() => showPlaylist(playlist)}>
                            <div className={selectedPlaylist?.id === playlist.id && playlist.activities.length > 0 ? 'row active-2' : 'row active'}>
                              <div className="col">
                                <h5>{playlist.title}</h5>
                              </div>
                              <div className="col text-right">
                                <FontAwesomeIcon
                                  className="pull-right"
                                  icon={selectedPlaylist?.id === playlist.id && playlist.activities.length > 0 ? 'chevron-down' : 'chevron-right'}
                                />
                              </div>
                            </div>
                            {selectedPlaylist?.id === playlist.id && playlist.activities.length === 0 && <Alert variant="warning">This playlist has no activities.</Alert>}

                            {selectedPlaylist?.id === playlist.id && playlist.activities.length > 0 && (
                              <div className="playlist-activities">
                                {playlist.activities.map((activity) => (
                                  <div className={ activity.id === selectedActivityId ? "activities selected": "  activities"} key={activity.id} onClick={() => { addToMsTeams(activity.id); }}>
                                    <div
                                      className="project-img"
                                      style={{
                                        backgroundImage: !activity.thumb_url.includes('/storage/')
                                          ? `url(${activity.thumb_url})`
                                          : `url(${global.config.resourceUrl}${activity.thumb_url})`,
                                      }}
                                    ></div>
                                    <div className=" title">
                                      <p>{activity.title}</p>
                                    </div>
                                    <div className=" dropdown-icon ">
                                      <Dropdown>
                                        <Dropdown.Toggle className="actions-button">
                                          <FontAwesomeIcon icon="ellipsis-v" style={{ color: 'rgb(8, 72, 146)' }} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <Dropdown.Item to="#" eventKey={activity.id} onSelect={showActivityPreview}>
                                            <FontAwesomeIcon icon="eye" className="action-icon" />
                                            Preview
                                          </Dropdown.Item>
                                          <Dropdown.Item to="#" eventKey={activity.id} onSelect={match.params.lmsUrl.includes('microsoft') ? addToMsTeams : addToLMS}>
                                            <FontAwesomeIcon icon="plus" className="action-icon" />
                                            Add to Course
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
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
    </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project));
