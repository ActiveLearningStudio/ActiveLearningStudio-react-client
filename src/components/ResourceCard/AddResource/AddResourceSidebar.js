import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

const AddResourceSidebar = ({
  resource: {
    isActivityTypeFilled,
    isResourceActivityType,
    isSelectActivityFilled,
    isResourceSelectActivity,
    isDescribeFilled,
    isResourceDescribeActivity,
    isResourceActivityBuild,
  },
}) => (
  <>
    <div className="create-resource-sidebar">
      <div
        className={classnames('activity-sidebar-btn first', {
          filled: isActivityTypeFilled,
          selected: isResourceActivityType,
        })}
      >
        <div className="btn-box">
          <div className="number-box">
            <span className="number">1</span>
          </div>
          <span className="bottom-vertical-line" />
        </div>
        <span className="name">Pick Activity Type</span>
      </div>

      <div
        className={classnames('activity-sidebar-btn', {
          filled: isSelectActivityFilled,
          selected: isResourceSelectActivity,
        })}
      >
        <div className="btn-box">
          <span className="top-vertical-line" />
          <div className="number-box">
            <span className="number">2</span>
          </div>
          <span className="bottom-vertical-line" />
        </div>
        <span className="name">Select Activity</span>
      </div>

      <div
        className={classnames('activity-sidebar-btn', {
          filled: isDescribeFilled,
          selected: isResourceDescribeActivity,
        })}
      >
        <div className="btn-box">
          <span className="top-vertical-line" />
          <div className="number-box">
            <span className="number">3</span>
          </div>
          <span className="bottom-vertical-line" />
        </div>
        <span className="name">Describe Activity</span>
      </div>

      <div className={classnames('activity-sidebar-btn last', { selected: isResourceActivityBuild })}>
        <div className="btn-box">
          <span className="top-vertical-line" />
          <div className="number-box">
            <span className="number">4</span>
          </div>
        </div>
        <span className="name">Build Activity</span>
      </div>
    </div>
  </>
);

AddResourceSidebar.propTypes = {
  resource: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(connect(mapStateToProps)(AddResourceSidebar));
