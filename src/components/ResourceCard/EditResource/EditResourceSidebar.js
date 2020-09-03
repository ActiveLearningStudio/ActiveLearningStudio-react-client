import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import {
  showSelectActivityAction,
  showDescribeActivityAction,
  showBuildActivityAction,
  showCreateResourceActivityAction,
} from 'store/actions/resource';

const EditResourceSidebar = ({ resource }) => {
  const {
    isDescribeFilled,
    isResourceDescribeActivity,
    isResourceActivityBuild,
  } = resource;

  return (
    <>
      <div className="create-resource-sidebar">

        <div
          className={classnames('activity-sidebar-btn', {
            filled: isDescribeFilled,
            selected: isResourceDescribeActivity,
          })}
        >
          <div className="btn-box">
            <div className="number-box">
              <span className="number">1</span>
            </div>
            <span className="bottom-vertical-line" />
          </div>
          <span className="name">Describe Activity</span>
        </div>

        <div
          className={classnames('activity-sidebar-btn last', {
            selected: isResourceActivityBuild,
          })}
        >
          <div className="btn-box">
            <div className="number-box">
              <span className="number">2</span>
            </div>
          </div>
          <span className="name">Build Activity</span>
        </div>
      </div>
    </>
  );
};

EditResourceSidebar.propTypes = {
  resource: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showCreateResourceActivity: () => dispatch(showCreateResourceActivityAction()),
  showSelectActivity: (activityType) => dispatch(showSelectActivityAction(activityType)),
  showDescribeActivity: (activity) => dispatch(showDescribeActivityAction(activity)),
  showBuildActivity: (editor, editorType, id) => dispatch(showBuildActivityAction(editor, editorType, id)),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditResourceSidebar),
);
