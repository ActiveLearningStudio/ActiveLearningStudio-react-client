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
    playlist,
    teamPermission,
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
    <ActivityPreviewCard
      key={activity.id}
      showLti={showLti}
      shared={shared}
      projectId={projectId}
      playlistId={playlistId}
      activity={activity}
      playlist={playlist}
      teamPermission={teamPermission || {}}
    />
  ));
}

ActivitiesList.propTypes = {
  showLti: PropTypes.bool,
  shared: PropTypes.bool,
  projectId: PropTypes.number,
  playlistId: PropTypes.number.isRequired,
  activities: PropTypes.array,
  playlist: PropTypes.object.isRequired,
  teamPermission: PropTypes.object.isRequired,
};

ActivitiesList.defaultProps = {
  showLti: false,
  shared: false,
  projectId: null,
  activities: [],
};

export default ActivitiesList;
