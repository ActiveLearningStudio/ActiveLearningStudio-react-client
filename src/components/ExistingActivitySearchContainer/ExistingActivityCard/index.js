/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { existingActivitySearchGetAction } from 'store/actions/search';
import './style.scss';

const ExistingActivityCard = (props) => {
  const { activity, activityType, getActivityData, className } = props;
  const thumbnail = activity.thumb_url?.includes('/storage/') ? `${global.config.resourceUrl}${activity.thumb_url}` : activity.thumb_url;

  const handleAddClick = () => {
    getActivityData(activity.id, activityType);
  };

  return (
    <div className={`row existing-activity-card ${className}`}>
      <div className="col-3">
        <Image src={thumbnail} fluid rounded />
      </div>
      <div className="col-7">
        <h3>
          {activity.location && (<a href={`/activity/${activity.id}/preview`} target="_blank" rel="noreferrer">{activity.title}</a>)}
          {!activity.location && (<a href={`/activity/${activity.id}/preview?type=ind-search`} target="_blank" rel="noreferrer">{activity.title}</a>)}
        </h3>
        <p>{activity.description}</p>
        <ul>
          <li>{`Type: ${activity.activity_type}`}</li>
          {activity.location && <li>{`Location: ${activity.location}`}</li>}
          <li>{`Created: ${new Date(activity.created_at).toDateString()}`}</li>
          <li>{`By: ${activity.user.first_name} ${activity.user.first_name}`}</li>
        </ul>
      </div>
      <div className="col-2">
        <button className="btn btn-primary" onClick={handleAddClick}>
          <FontAwesomeIcon className="mr-2" icon="plus" />
          Add
        </button>
      </div>
    </div>
  );
};

ExistingActivityCard.propTypes = {};

ExistingActivityCard.defaultProps = {};

const mapDispatchToProps = (dispatch) => ({
  getActivityData: (activityId, activityType) => dispatch(existingActivitySearchGetAction(activityId, activityType)),  
});

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExistingActivityCard));
