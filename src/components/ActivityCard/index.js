import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const ActivityCard = (props) => {
  const { activity, playlistId } = props;

  return (
    <li>
      <Link
        to={`/playlist/preview/${playlistId}/resource/${activity._id}`}
      >
        <div
          className="playimg"
          style={{
            backgroundImage: `url(${global.config.laravelAPIUrl}${activity.thumb_url})`,
          }}
        />
        <div className="plydet">{activity.title}</div>
      </Link>
    </li>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object.isRequired,
  playlistId: PropTypes.string,
};

ActivityCard.defaultProps = {
  playlistId: '',
};

export default ActivityCard;
