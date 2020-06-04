import React from "react";
import {
    connect
} from "react-redux";
import {
    withRouter
} from 'react-router-dom';
import {
    Link
} from "react-router-dom";
import {
    loadPlaylistAction
} from "../actions/playlist";
import ActivityPreviewCard from "./ActivityPreviewCard";
import H5PPreview from "../containers/H5PPreview";
import "./PlayListPreview.css"

export class PlaylistPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceid: this.props.resourceid
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.loadPlaylistAction(this.props.playlistid);
    }

    handleSelect = (resourceid) => {
        this.setState({ resourceid: resourceid });
    }

    render() {
        if (!this.props.playlist.selectedPlaylist)
            return (<div className="alert alert-info" role="alert">Loading...</div>);

        const { resourceid } = this.state;
        const playlist = this.props.playlist.selectedPlaylist;
        var activities;
        
        if (playlist.activities.length == 0) {
            activities = <div className="col-md-12"><div className="alert alert-info"
                role="alert">No activities defined for this playlist.</div></div>
        } else {
            activities = playlist.activities.map(activity => (
                <ActivityPreviewCard activity={activity} key={activity._id} handleSelect= {this.handleSelect} />
            ));
            
            if(resourceid == 0)
                this.state.resourceid = playlist.activities[0]._id;
      }
      
      const currentActivity = playlist.activities.filter(f => f._id == resourceid)[0];

      const previousResource = playlist.activities.indexOf(currentActivity) >= 1 ? playlist.activities[playlist.activities.indexOf(currentActivity) - 1] : null;
      const nextResource = playlist.activities.indexOf(currentActivity) != playlist.activities.length -1 ? playlist.activities[playlist.activities.indexOf(currentActivity) + 1] : null;
      
      let previousLink = null;
      if (previousResource) {
        previousLink = (<a to="#" className="slide-control prev" onClick={()=>this.handleSelect(previousResource._id)}>
            <img src="/images/slide-arrow.png" alt="slide-arrow"></img>
            <div className="hover-control-caption">
              <img src={global.config.laravelAPIUrl + previousResource.thumb_url} alt="thumb01"></img>
            <span>{previousResource.title}</span>
            </div>
          </a>);
      } else {
        previousLink = (
          <a to="#" className="slide-control prev disabled-link">
            <img src="/images/slide-arrow.png" alt="slide-arrow"></img>
            <div className="hover-control-caption">
              <img alt="thumb01"></img>
               <span></span>
            </div>
          </a>
        )
      }

      let nextLink = null;
      if (nextResource) {
        nextLink = (<a className="slide-control next" onClick={()=>this.handleSelect(nextResource._id)}>
                    <img src="/images/slide-arrow.png" alt="slide-arrow"></img>
                    <div className="hover-control-caption pointer-cursor">
                        <img src={global.config.laravelAPIUrl + nextResource.thumb_url} alt="thumb01"></img>
                        <span>{nextResource.title}</span>
                    </div>
            </a>);
      }else {
        nextLink = (
          <a to="#" className="slide-control next disabled-link">
            <img src="/images/slide-arrow.png" alt="slide-arrow"></img>
            <div className="hover-control-caption pointer-cursor">
              <img alt="thumb01"></img>
               <span></span>
            </div>
          </a>
        )
      }

      return (
        <section className="main-page-content">
          <div class="container">
            <ul class="breadcrum">
                <li><a href="#">My Projects</a></li>
                <li>{playlist.title}</li>
            </ul>
          </div>
            <div className="flex-container wrap">
                <div className="activity-bg left-vdo">
                    <div className="act-top-hader">
                        <div className="heading-wrapper">
                            <div className="main-heading"><span>You are Watching:</span>{playlist.activities && playlist.activities.length ? playlist.activities.filter(a=>a._id == resourceid)[0].title: ''}
                            </div>
                            <div className="sub-heading"><span>From the playlist:</span>{playlist ? playlist.title : ''}
                            </div>
                        </div>
                    </div>
              <div className="right-control vd-controls">
                  {previousLink}
                  { nextLink }
              </div>
              <div className="main-item-wrapper">
                        <div className="item-container">
                            {/* <img src="/images/video-thumbnail.jpg" alt="video-thumbnail" className=""></img> */}
                            <H5PPreview {...this.state} resourceid={resourceid} />
                            <div className="item-caption-bottom">
                                <p>{playlist.activities && playlist.activities.length ? playlist.activities.filter(a=>a._id == resourceid)[0].title: ''}</p> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-sidegolf-info">
                    <div className="back-header">
                        <Link to="#" className="link"><img src="/images/right-arrow.png" className="back-arrow"></img>Back to {this.props.playlist.selectedPlaylist.title}</Link>
                    </div>
                    <div className="sidebar-heading">
                        {playlist.title}
              </div>
              <div className="scrollDiv">
                    <ul className="panel-list">
                        { activities }
                </ul>
                </div>
                </div>
          </div>
          </section>
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