import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function ActivityMeter(props) {
  const { activeState } = props;

  return (
    <div className="Activity-meter">
      <div className={activeState.includes('type') ? 'active activity-progress' : 'activity-progress'}>
        <div className="round-counter">
          <div className="counter">
            1
          </div>
        </div>
        <h3>Pick Activity Type</h3>
        <FontAwesomeIcon icon="chevron-right" />
      </div>
      <div className={activeState.includes('select') ? 'active activity-progress' : 'activity-progress'}>
        <div className="round-counter">
          <div className="counter">
            2
          </div>
        </div>
        <h3>Select Activity</h3>
        <FontAwesomeIcon icon="chevron-right" />
      </div>
      <div className={activeState.includes('describe') ? 'active activity-progress' : 'activity-progress'}>
        <div className="round-counter">
          <div className="counter">
            3
          </div>
        </div>
        <h3>Describe Activity</h3>
        <FontAwesomeIcon icon="chevron-right" />
      </div>
      <div className={activeState.includes('build') ? 'active activity-progress' : 'activity-progress'}>
        <div className="round-counter">
          <div className="counter">
            4
          </div>
        </div>
        <h3>Build Activity</h3>
      </div>
    </div>
  );
}

ActivityMeter.propTypes = {
  activeState: PropTypes.array.isRequired,
};

export default ActivityMeter;
