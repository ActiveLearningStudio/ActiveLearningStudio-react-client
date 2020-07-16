import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const ActivityCard = (props) => {
  const { lti, activity, playlistId } = props;

  return (
    <li>
      <Link
        to={
          lti
            ? `/playlist/shared/preview/${playlistId}/resource/${activity._id}`
            : `/playlist/preview/${playlistId}/resource/${activity._id}`
        }
      >
        <div
          className="playimg"
          style={{
            backgroundImage: `url(${global.config.laravelAPIUrl}${activity.thumbUrl})`,
          }}
        />

        <div className="plydet">{activity.title}</div>
      </Link>
    </li>
  );
};

ActivityCard.propTypes = {
  lti: PropTypes.bool,
  activity: PropTypes.object.isRequired,
  playlistId: PropTypes.string,
};

ActivityCard.defaultProps = {
  lti: false,
  playlistId: '',
};

export default ActivityCard;
