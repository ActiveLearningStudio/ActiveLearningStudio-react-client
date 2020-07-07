import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';

const ActivityPreviewCardDropdown = (props) => {
  const { activity, playlist } = props;

  return (
    <Link
      to={`/playlist/preview/${playlist}/resource/${activity._id}`}
    >
      <li className="drpdown">
        <div>
          <FontAwesomeIcon icon="play-circle" />
          <div className="title">{activity.title}</div>
        </div>
      </li>
    </Link>
  );
};

ActivityPreviewCardDropdown.propTypes = {
  activity: PropTypes.object.isRequired,
  playlist: PropTypes.string.isRequired,
};

export default ActivityPreviewCardDropdown;
