import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FadeDiv } from 'utils';
import { hideBuildActivity } from 'store/actions/resource';
import EditResourceSidebar from './EditResourceSidebar';
import H5PEditor from './Editors/H5PEditor';

const ResourceActivityBuild = (props) => {
  const { resource: { /* newResource, */ editResource }, goBackToActivity } = props;

  return (
    <div className="row">
      <div className="col-md-3">
        <EditResourceSidebar {...props} />
      </div>

      <div className="col-md-9">
        <div className="resource-activity">
          <div
            className="back-button"
            style={{ marginLeft: 15 }}
            onClick={goBackToActivity}
          >
            <FontAwesomeIcon icon="chevron-left" />
            Back
          </div>

          <FadeDiv>
            {/*
            {newResource.activity.type === 'h5p' && (
              <H5PEditor {...props} />
            )}
            */}

            {editResource.params.data !== '' ? (
              <H5PEditor
                {...props}
                h5pParams={JSON.stringify(editResource.params)}
                h5pLib={editResource.editor}
              />
            ) : (
              <h3>Loading...</h3>
            )}
          </FadeDiv>
        </div>
      </div>
    </div>
  );
};

ResourceActivityBuild.propTypes = {
  resource: PropTypes.object.isRequired,
  goBackToActivity: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  goBackToActivity: () => dispatch(hideBuildActivity()),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceActivityBuild),
);
