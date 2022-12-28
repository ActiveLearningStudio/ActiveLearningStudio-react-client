/* eslint-disable */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Image, Card, ListGroup, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { setPreviewActivityAction } from 'store/actions/canvas';
import './style.scss';
import * as microsoftTeams from '@microsoft/teams-js';

const ActivitiesList = (props) => {
  const { match, activity, setPreviewActivity } = props;
  console.log('matching item activity:', match);

  const showActivityPreview = (id) => {
    const activityId = parseInt(id, 10);

    if (activityId && activity.id == activityId) {
      setPreviewActivity(activity);
    }
  };
  const addToLMS = (id) => {
    const activityId = parseInt(id, 10);
    if (!activityId) return;

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

  const addToMsTeams = async (id) => {
    await microsoftTeams.app.initialize();

    const activityId = parseInt(id, 10);
    if (!activityId) return;

    microsoftTeams.pages.config.setValidityState(true);
    microsoftTeams.pages.config.registerOnSaveHandler((saveEvent) => {
      const finalUrl = `${decodeURIComponent(match.params.redirectUrl)}&title=${encodeURIComponent(activity.title)}&entity=activity&id=${activity.id}`;
      console.log('redirectUrl: ', finalUrl);
      const configPromise = microsoftTeams.pages.config.setConfig({
          websiteUrl: config.domainUrl,
          contentUrl: `${config.domainUrl}msteam/launch/activity/${activity.id}`,
          entityId: activity.id,
          suggestedDisplayName: activity.title,
      });
      console.log('link ', `${config.domainUrl}msteam/launch/activity/${activity.id}`);
      configPromise.then((result) => { 
        saveEvent.notifySuccess();
       })
      // eslint-disable-next-line no-shadow
      .catch((error) => { saveEvent.notifyFailure('failure message'); });
  });
  };

  return (
    <>
      <div className=" mt-2 mb-2 lti-deeplink-activity-container">
        <div className="col result">
          <div key={activity.id} className="row activity">
            <div className="col activity-about">
              <div
                className="activity-img"
                style={{
                  backgroundImage: !activity.thumb_url.includes('/storage/') ? `url(${activity.thumb_url})` : `url(${global.config.resourceUrl}${activity.thumb_url})`,
                }}
              ></div>

              <div className="row activity-details-row">
                <div className="col activity-detail">
                  <h5 className="activity-detail-title">
                    {activity.title.length > 0 && activity.title}
                    {activity.title.length === 0 && 'Activity title not available'}
                  </h5>
                  <p className="activity-detail-paragraph">
                    {activity.description !== null && activity?.description?.slice(0, 120)}
                    {activity.description === null && 'Project description not available'}
                  </p>
                  {activity.user && (
                    <p className="activity-detail-by-author">
                      <label>Organization: </label>
                      &nbsp;{activity.organization_name}
                      <br />
                      <label>Type:</label>
                      {activity.type && ` ${activity.type}`}
                      {!activity.type && ' N/A'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="dropdown-icon">
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
        </div>
      </div>
    </>
  );
};

ActivitiesList.defaultProps = {
  activity: null,
};

ActivitiesList.propTypes = {
  match: PropTypes.object.isRequired,
  activity: PropTypes.object,
  setPreviewActivity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedProject: state.canvas.searchSelectedProject,
  selectedPlaylist: state.canvas.searchSelectedPlaylist,
});

const mapDispatchToProps = (dispatch) => ({
  setPreviewActivity: (activity) => dispatch(setPreviewActivityAction(activity)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActivitiesList));
