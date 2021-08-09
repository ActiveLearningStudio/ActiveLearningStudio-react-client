import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';

const ActivityPreviewCardDropdown = (props) => {
  const {
    showLti,
    shared,
    activity,
    projectId,
    playlistId,
  } = props;

  return (
    <Dropdown.Item
      as={Link}
      style={{ borderBottom: '1px solid #eee', padding: '10px' }}
      to={
        shared
          ? `/studio/project/${projectId}/playlist/${playlistId}/activity/${activity.id}/preview/shared`
          : (
            showLti
              ? `/studio/playlist/${playlistId}/activity/${activity.id}/preview/lti`
              : `/studio/project/${projectId}/playlist/${playlistId}/activity/${activity.id}/preview`
          )
      }
    >
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon="play-circle" />
        <div className="ml-2 title" style={{ whiteSpace: 'normal' }}>{activity.title}</div>
      </div>
    </Dropdown.Item>
  );
};

ActivityPreviewCardDropdown.propTypes = {
  showLti: PropTypes.bool,
  shared: PropTypes.bool,
  activity: PropTypes.object.isRequired,
  projectId: PropTypes.number,
  playlistId: PropTypes.number.isRequired,
};

ActivityPreviewCardDropdown.defaultProps = {
  showLti: false,
  shared: false,
  projectId: null,
};

export default ActivityPreviewCardDropdown;
