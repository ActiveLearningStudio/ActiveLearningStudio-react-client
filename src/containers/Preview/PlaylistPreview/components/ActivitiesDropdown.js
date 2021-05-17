import React from 'react';
import PropTypes from 'prop-types';

import ActivityPreviewCardDropdown from 'components/ActivityPreviewCard/ActivityPreviewCardDropdown';

function ActivitiesDropdown(props) {
  const {
    showLti,
    shared,
    projectId,
    playlistId,
    activities,
  } = props;

  if (activities.length === 0) {
    return (
      <div className="col-md-12">
        <div className="alert alert-info" role="alert">
          No activity defined for this playlist.
        </div>
      </div>
    );
  }

  return activities.map((activity) => (
    <ActivityPreviewCardDropdown
      key={activity.id}
      showLti={showLti}
      shared={shared}
      projectId={projectId}
      playlistId={playlistId}
      activity={activity}
    />
  ));
}

ActivitiesDropdown.propTypes = {
  showLti: PropTypes.bool,
  shared: PropTypes.bool,
  projectId: PropTypes.number,
  playlistId: PropTypes.number.isRequired,
  activities: PropTypes.array,
};

ActivitiesDropdown.defaultProps = {
  showLti: false,
  shared: false,
  projectId: null,
  activities: [],
};

export default ActivitiesDropdown;
