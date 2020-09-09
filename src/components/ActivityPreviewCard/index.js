import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const ActivityPreviewCard = (props) => {
  const {
    showLti,
    shared,
    activity,
    projectId,
    playlistId,
  } = props;

  return (
    <Link
      to={
        shared
          ? `/project/${projectId}/playlist/${playlistId}/activity/${activity.id}/preview/shared`
          : (
            showLti
              ? `/playlist/${playlistId}/activity/${activity.id}/preview/lti`
              : `/project/${projectId}/playlist/${playlistId}/activity/${activity.id}/preview`
          )
      }
    >
      <li className="check">
        {activity.thumb_url && (
          <div
            className="bg-thumbnail"
            style={{
              backgroundImage: activity.thumb_url.includes('pexels.com')
                ? `url(${activity.thumb_url})`
                : `url(${global.config.resourceUrl}${activity.thumb_url})`,
            }}
          />
        )}
        <div>
          <div className="title">{activity.title}</div>
        </div>
      </li>
    </Link>
  );
};

ActivityPreviewCard.propTypes = {
  showLti: PropTypes.bool,
  shared: PropTypes.bool,
  activity: PropTypes.object.isRequired,
  projectId: PropTypes.number,
  playlistId: PropTypes.number.isRequired,
};

ActivityPreviewCard.defaultProps = {
  showLti: false,
  shared: false,
  projectId: null,
};

export default ActivityPreviewCard;
