import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const ActivityCard = (props) => {
  const { activity, playlistId, lti } = props;

  return (
    <li>
      <Link
        to={
          lti
            ? `/playlist/shared/preview/${playlistId}/resource/${activity.id}`
            : `/playlist/preview/${playlistId}/resource/${activity.id}`
        }
      >
        <div
          className="playimg"
          // style={{
          //   backgroundImage: !!activity.metadata
          //     ? "url(" + global.config.laravelAPIUrl + activity.metadata.thumbUrl + ")"
          //     : "url(" + global.config.laravelAPIUrl + activity.thumbUrl + ")",
          // }}
          style={{
            backgroundImage:
              !!activity.thumbUrl && activity.thumbUrl.includes('pexels.com')
                ? `url(${activity.thumbUrl})`
                : `url(${global.config.laravelAPIUrl}${activity.thumbUrl})`,
          }}
        />
        <div className="plydet">
          {activity.metadata ? activity.metadata.title : activity.title}
        </div>
      </Link>
    </li>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object.isRequired,
  playlistId: PropTypes.string,
  lti: PropTypes.bool,
};

ActivityCard.defaultProps = {
  playlistId: '',
  lti: false,
};

export default ActivityCard;
