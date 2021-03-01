import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';
import { useSelector } from 'react-redux';

const ActivityPreviewCardDropdown = (props) => {
  const {
    showLti,
    shared,
    activity,
    projectId,
    playlistId,
  } = props;
  const organization = useSelector((state) => state.organization);
  return (
    <Dropdown.Item
      as={Link}
      to={
        shared
          ? `/project/${projectId}/playlist/${playlistId}/activity/${activity.id}/preview/shared`
          : (
            showLti
              ? `/playlist/${playlistId}/activity/${activity.id}/preview/lti`
              : `/org/${organization.activeOrganization?.domain}/project/${projectId}/playlist/${playlistId}/activity/${activity.id}/preview`
          )
      }
    >
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon="play-circle" />
        <div className="ml-2 title">{activity.title}</div>
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
