import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { loadPlaylistAction } from "../actions/playlist";

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
        <div className="item" key={activity._id}>
          <div className="icon-box mb-2 justify-content-center align-items-center ">
            <a href="http://learn.curriki.org/activities/265">
            <img className="activity-image-thumb img-fluid img-radius-all" src="http://learn.curriki.org/storage/lesson_thumbnails/VDiZoNsO7hHW6iBrU2lF2pYP55KFNmJD84AJpgq0.png" width="50" height="50" alt="Introduction to Avengers: The Story of Globalization" />
          </a>
          </div>
          <p>
            <a href="http://learn.curriki.org/activities/265">
              {activity.type+'_'+activity.mysqlid}
            </a>
          </p>
        </div>
      ));
    }
    console.log(this.props.playlist.selectedPlaylist);
    return (
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              {playlist.title}
            </div>
            <div className="card-body">
              {activities}
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