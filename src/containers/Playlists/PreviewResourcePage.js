import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { slideInRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';

import {
  showCreateResourceActivityAction,
  showSelectActivityAction,
  showBuildActivityAction,
} from 'store/actions/resource';
import H5PPreview from '../H5PPreview';

const bounceAnimation = keyframes`${slideInRight}`;

const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

class PreviewResourcePage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);

    const { showCreateResourceActivity } = this.props;
    // show activity content
    showCreateResourceActivity();
  }

  render() {
    const { hidePreviewResourceModal } = this.props;
    return (
      <div className="resource-modal">
        <div className="modal fade right" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <BouncyDiv className="modal-content">
              <div className="modal-title">
                <h1>
                  Preview Resource
                  <button
                    type="button"
                    className="close-btn"
                    data-dismiss="modal"
                    onClick={hidePreviewResourceModal}
                  >
                    x
                  </button>
                </h1>

                <hr />
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <H5PPreview {...this.props} />
                  </div>
                </div>
              </div>
            </BouncyDiv>
          </div>
        </div>
      </div>
    );
  }
}

PreviewResourcePage.propTypes = {
  resource: PropTypes.object.isRequired,
  showCreateResourceActivity: PropTypes.func.isRequired,
  hidePreviewResourceModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showCreateResourceActivity: () => dispatch(showCreateResourceActivityAction()),
  showSelectActivity: () => dispatch(showSelectActivityAction()),
  showBuildActivity: (editor, editorType, id) => dispatch(showBuildActivityAction(editor, editorType, id)),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreviewResourcePage),
);
