import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { loadResourceAction } from 'store/actions/resource';
import H5PPreview from 'containers/H5PPreview';

function ResourcePreview(props) {
  const { resource, resourceId, loadResource } = props;

  useEffect(() => {
    loadResource(resourceId);
  }, [loadResource, resourceId]);

  let next = '';
  if (resource.nextResourceId) {
    next = (
      <Link to={`/resource/preview/${resource.nextResourceId}`} className="next-prev-link">
        <FontAwesomeIcon icon="chevron-circle-right" />
      </Link>
    );
  }

  let previous = '';
  if (resource.previousResourceId) {
    previous = (
      <Link to={`/resource/preview/${resource.previousResourceId}`} className="next-prev-link">
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
  resourceId: PropTypes.number.isRequired,
  loadResource: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadResource: (resourceId) => dispatch(loadResourceAction(resourceId)),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourcePreview),
);
