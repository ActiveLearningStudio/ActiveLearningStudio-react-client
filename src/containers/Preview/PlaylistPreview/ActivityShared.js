import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loadPlaylistAction } from 'store/actions/playlist';

import './style.scss';

const H5PPreview = React.lazy(() => import('../../H5PPreview'));

class ActivityShared extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resourceId: props.resourceId,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { resourceId } = this.state;

    return (
      <>
        <section className="main-page-content preview">
          <div className="flex-container ">
            <div className="activity-bg left-vdo">
              <div className="main-item-wrapper">
                <div className="item-container">
                  {/* <img src="/images/video-thumbnail.jpg" alt="video-thumbnail" /> */}
                  <Suspense fallback={<div>Loading</div>}>
                    <H5PPreview
                      {...this.state}
                      resourceId={resourceId}
                      showActivitypreview
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

ActivityShared.propTypes = {
  resourceId: PropTypes.string.isRequired,
  loadPlaylist: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadPlaylist: (playlistId) => dispatch(loadPlaylistAction(playlistId)),
});

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActivityShared),
);
