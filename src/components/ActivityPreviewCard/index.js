import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DropdownActivity from 'components/ResourceCard/dropdown';

import './style.scss';
import { useSelector } from 'react-redux';

const ActivityPreviewCard = (props) => {
  const {
    showLti,
    shared,
    activity,
    projectId,
    playlistId,
    playlist,
  } = props;
  const organization = useSelector((state) => state.organization);
  return (
    <div className="preview-activity-dropdown">
      <Link
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
        <li className="check">
          {activity.thumb_url && (
            <div
              className="bg-thumbnail"
              style={{
                backgroundImage: activity.thumb_url.includes('pexels.com')
                  ? `url(${activity.thumb_url})`
                  : `url(${global.config.resourceUrl}${activity.thumb_url})`,
              }}
            />
          )}
          <div>
            <div className="title">{activity.title}</div>
          </div>
        </li>
      </Link>
      {!showLti
        && (
        <DropdownActivity
          resource={activity}
          playlist={playlist}
        />
        )}
    </div>
  );
};

ActivityPreviewCard.propTypes = {
  showLti: PropTypes.bool,
  shared: PropTypes.bool,
  activity: PropTypes.object.isRequired,
  projectId: PropTypes.number,
  playlistId: PropTypes.number.isRequired,
  playlist: PropTypes.object.isRequired,
};

ActivityPreviewCard.defaultProps = {
  showLti: false,
  shared: false,
  projectId: null,
};

export default ActivityPreviewCard;
