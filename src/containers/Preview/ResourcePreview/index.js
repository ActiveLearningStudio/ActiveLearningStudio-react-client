import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { loadResourceAction } from 'store/actions/resource';
import H5PPreview from 'containers/H5PPreview';

function ResourcePreview(props) {
  const { resource, activityId, loadResource } = props;

  useEffect(() => {
    loadResource(activityId);
  }, [loadResource, activityId]);

  let next = '';
  if (resource.nextResourceId) {
    next = (
      <Link to={`/activity/${resource.nextResourceId}/preview`} className="next-prev-link">
        <FontAwesomeIcon icon="chevron-circle-right" />
      </Link>
    );
  }

  let previous = '';
  if (resource.previousResourceId) {
    previous = (
      <Link to={`/activity/${resource.previousResourceId}/preview`} className="next-prev-link">
        <FontAwesomeIcon icon="chevron-circle-left" />
      </Link>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="row">
          <div className="col-md-12">
            {previous}
            {next}
          </div>
        </div>

        <div className="col-md-12">
          <H5PPreview {...props} />
        </div>
      </div>
    </div>
  );
}

ResourcePreview.propTypes = {
  resource: PropTypes.object.isRequired,
  activityId: PropTypes.number.isRequired,
  loadResource: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadResource: (activityId) => dispatch(loadResourceAction(activityId)),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourcePreview),
);
