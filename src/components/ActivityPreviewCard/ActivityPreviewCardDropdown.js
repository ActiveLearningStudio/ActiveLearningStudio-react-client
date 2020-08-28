import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';

const ActivityPreviewCardDropdown = (props) => {
  const {
    lti,
    shared,
    activity,
    playlistId,
  } = props;

  return (
    <>
      {shared ? (
        <Link to={`/playlist/shared/preview/${playlistId}/resource/${activity.id}`}>
          <li className="drpdown">
            <div>
              <FontAwesomeIcon icon="play-circle" />
              <div className="title">{activity.title}</div>
            </div>
          </li>
        </Link>
      ) : (
        <Link
          to={
            lti
              ? `/playlist/lti/preview/${playlistId}/resource/${activity.id}`
              : `/playlist/preview/${playlistId}/resource/${activity.id}`
          }
        >
          <li className="drpdown">
            <div>
              <FontAwesomeIcon icon="play-circle" />
              <div className="title">{activity.title}</div>
            </div>
          </li>
        </Link>
      )}
    </>
  );
};

ActivityPreviewCardDropdown.propTypes = {
  lti: PropTypes.bool,
  shared: PropTypes.bool,
  activity: PropTypes.object.isRequired,
  playlistId: PropTypes.string.isRequired,
};

ActivityPreviewCardDropdown.defaultProps = {
  lti: false,
  shared: false,
};

export default ActivityPreviewCardDropdown;
