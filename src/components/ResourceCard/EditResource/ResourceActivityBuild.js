import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FadeDiv } from 'utils';
import { hideBuildActivityAction } from 'store/actions/resource';
import H5PEditor from './Editors/H5PEditor';

const ResourceActivityBuild = (props) => {
  const {
    resource: { editResource },
    selectType,
    type,
    setActiveView,
  } = props;
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="resource-activity">
          <div
            className="back-button"
            style={{ marginLeft: 15 }}
            onClick={() => {
              setActiveView('describe');
              type.splice(type.indexOf('build', 1));
              selectType(type);
            }}
          >
            <FontAwesomeIcon icon="chevron-left" className="mr-2" />
            Back
          </div>

          <FadeDiv>
            {/*
            {newResource.activity.type === 'h5p' && (
              <H5PEditor {...props} />
            )}
            */}

            {editResource.params && editResource.params.data !== '' ? (
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
  selectType: PropTypes.func.isRequired,
  type: PropTypes.array.isRequired,
  setActiveView: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  goBackToActivity: () => dispatch(hideBuildActivityAction()),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceActivityBuild),
);
