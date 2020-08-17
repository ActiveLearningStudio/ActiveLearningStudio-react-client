import React, { Suspense } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { loadPlaylistAction } from "../actions/playlist";
import "./PlayListPreview.css";
const H5PPreview = React.lazy(() => import("../containers/H5PPreview"));

export class ActivityShared extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resourceid: this.props.resourceid,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <section className="main-page-content preview ltisharedactivity">
          <div className="flex-container ">
            <div className="activity-bg left-vdo">
              <div className="main-item-wrapper">
                <div className="item-container">
                  {/* <img src="/images/video-thumbnail.jpg" alt="video-thumbnail" className=""></img> */}
                  <Suspense fallback={<div>Loading</div>}>
                    <H5PPreview
                      {...this.state}
                      resourceid={this.state.resourceid}
                      showActivitypreview={true}
                      ltiactivity={!!this.props.ltiactivity}
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadPlaylistAction: (playlistid) => dispatch(loadPlaylistAction(playlistid)),
});

const mapStateToProps = (state) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActivityShared)
);
