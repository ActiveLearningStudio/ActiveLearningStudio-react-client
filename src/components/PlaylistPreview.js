import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { loadPlaylistAction } from "../actions/playlist";
import ActivityPreviewCard from "./ActivityPreviewCard";



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
      var activities = (<div className="col-md-12"><div className="alert alert-info" role="alert">No activities defined for this playlist.</div></div>);
    } else {
      var activities = playlist.activities.map(activity => (
        <div className="col-md-3">
          <ActivityPreviewCard activity={activity} key={activity._id}/>
        </div>
      ));
    }
    
    return (
      <div className="container">
        <div className="playlist-preview-wrapper">
          <div class="preview-header">{playlist.title}</div>
            <div className="row">
              {activities}
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