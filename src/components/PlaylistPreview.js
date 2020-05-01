import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { loadPlaylistAction } from "../actions/playlist";

import { Link } from "react-router-dom";

export class PlaylistPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.loadPlaylistAction(this.props.playlistid);
  }

  render() {
    if(!this.props.playlist.selectedPlaylist)
      return (<div className="alert alert-info" role="alert">Loading...</div>);

    const playlist = this.props.playlist.selectedPlaylist;

    if(playlist.activities.length == 0){
      var activities = (<div className="alert alert-info" role="alert">No activities defined for this playlist.</div>);
    } else {
      var activities = playlist.activities.map(activity => (
        <div className="col-md-3 preview-box" key={activity._id}>
          <div className="icon-box mb-2 justify-content-center align-items-center ">
            <Link to={"/resource/preview/" + activity.mysqlid}>
                  {activity.library_name == 'H5P.InteractiveVideo' ? <img className="activity-image-thumb img-fluid img-radius-all" src="/images/interactive-video-overlay.png"   />:null }
									{activity.library_name == 'H5P.Flashcards' ? <img className="activity-image-thumb img-fluid img-radius-all" src="/images/flash-cards-overlay.png"   />:null }
									{activity.library_name == 'H5P.DragQuestion' ? <img className="activity-image-thumb img-fluid img-radius-all" src="/images/drag-and-drop-overlay.png"   />:null }
									{activity.library_name == 'H5P.Timeline' ? <img className="activity-image-thumb img-fluid img-radius-all" src="/images/timeline-overlay.png"   />:null }
									{activity.library_name == 'H5P.Accordion' ? <img className="activity-image-thumb img-fluid img-radius-all" src="/images/accordion-overlay.png"   />:null }
									{activity.library_name == 'H5P.CoursePresentation' ? <img className="activity-image-thumb img-fluid img-radius-all" src="/images/course-presentation-overlay.png"   />:null }
            </Link>
          </div>
          <p>
            <Link to={"/resource/preview/" + activity.mysqlid}>
              {activity.title}
            </Link>
          </p>
        </div>
      ));
    }
    
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header plist-title">
                {playlist.title}
              </div>
              <div className="row">
                {activities}
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadPlaylistAction: (playlistid) => dispatch(loadPlaylistAction(playlistid)),
});

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist
  };
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistPreview))