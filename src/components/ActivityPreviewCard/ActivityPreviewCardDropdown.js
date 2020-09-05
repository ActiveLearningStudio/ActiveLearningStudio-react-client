import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';

const ActivityPreviewCardDropdown = (props) => {
  const {
    lti,
    shared,
    activity,
    projectId,
    playlistId,
  } = props;

  return (
    <>
      {shared ? (
        <Dropdown.Item
          as={Link}
          to={`/project/${projectId}/playlist/${playlistId}/activity/${activity.id}/preview/shared`}
        >
          <div>
            <FontAwesomeIcon icon="play-circle" />
            <div className="title">{activity.title}</div>
          </div>
        </Dropdown.Item>
      ) : (
        <Dropdown.Item
          as={Link}
          to={
            lti
              ? `/project/${projectId}/playlist/${playlistId}/activity/${activity.id}/preview/lti`
              : `/project/${projectId}/playlist/${playlistId}/activity/${activity.id}/preview`
          }
        >
          <div>
            <FontAwesomeIcon icon="play-circle" />
            <div className="title">{activity.title}</div>
          </div>
        </Dropdown.Item>
      )}
    </>
  );
};

ActivityPreviewCardDropdown.propTypes = {
  lti: PropTypes.bool,
  shared: PropTypes.bool,
  activity: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
  playlistId: PropTypes.number.isRequired,
};

ActivityPreviewCardDropdown.defaultProps = {
  lti: false,
  shared: false,
};

export default ActivityPreviewCardDropdown;
