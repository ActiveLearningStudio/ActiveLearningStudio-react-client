/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const ActivityPreviewCard = (props) => {
  const {
    activity,
    playlistId,
  } = props;

  return (
    <Link to={`/playlist/shared/preview/${playlistId}/activity/${activity.id}`}>
      <li className="check">
        {activity.thumb_url && (
        <div
          className="bg-thumbnail"
          style={{
            backgroundImage: activity.thumb_url.includes('pexels.com')
              ? `url(${activity.thumb_url})`
              : `url(${global.config}${activity.thumb_url})`,
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
  activity: PropTypes.object.isRequired,
  playlistId: PropTypes.string.isRequired,

};

export default ActivityPreviewCard;
