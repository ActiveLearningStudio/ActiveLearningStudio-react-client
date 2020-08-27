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
    playlist,
  } = props;

  return (
    <>
      {shared ? (
        <Link to={`/playlist/shared/preview/${playlist}/resource/${activity.id}`}>
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
              ? `/playlist/lti/preview/${playlist}/resource/${activity.id}`
              : `/playlist/preview/${playlist}/resource/${activity.id}`
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
  playlist: PropTypes.string.isRequired,
};

ActivityPreviewCardDropdown.defaultProps = {
  lti: false,
  shared: false,
};

export default ActivityPreviewCardDropdown;
