import React from 'react';
import PropTypes from 'prop-types';

import ActivityPreviewCard from 'components/ActivityPreviewCard';

function ActivitiesList(props) {
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
          No activities defined for this playlist.
        </div>
      </div>
    );
  }

  return activities.map((activity) => (
    <ActivityPreviewCard
      key={activity.id}
      showLti={showLti}
      shared={shared}
      projectId={projectId}
      playlistId={playlistId}
      activity={activity}
    />
  ));
}

ActivitiesList.propTypes = {
  showLti: PropTypes.bool,
  shared: PropTypes.bool,
  projectId: PropTypes.number,
  playlistId: PropTypes.number.isRequired,
  activities: PropTypes.array,
};

ActivitiesList.defaultProps = {
  showLti: false,
  shared: false,
  projectId: null,
  activities: [],
};

export default ActivitiesList;
