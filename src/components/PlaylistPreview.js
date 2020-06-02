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
            resourceid: 0
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
      
        return (
            <div className="flex-container wrap">
                <div className="activity-bg left-vdo">
                    <div className="act-top-hader">
                        <div className="heading-wrapper">
                            <div className="main-heading"><span>You are Watching:</span>Science of Golf: Why Balls Have Dimples
                            </div>
                            <div className="sub-heading"><span>From the playlist:</span>{playlist.title}
                            </div>
                        </div>
                    </div>
                    <div className="right-control vd-controls">
                        <Link to="#" className="slide-control prev">
                            <img src="/images/slide-arrow.png" alt="slide-arrow"></img>
                            <div className="hover-control-caption">
                                <img src="/images/thumb01.jpg" alt="thumb01"></img>
                                <span>Physics and Golf Balls</span>
                            </div>
                        </Link>
                        <Link to="#" className="slide-control next">
                            <img src="/images/slide-arrow.png" alt="slide-arrow"></img>
                            <div className="hover-control-caption">
                                <img src="/images/thumb01.jpg" alt="thumb01"></img>
                                <span>{playlist.title}</span>
                            </div>
                        </Link>
                    </div>
                    <div className="main-item-wrapper">
                        <div className="item-container">
                            {/* <img src="/images/video-thumbnail.jpg" alt="video-thumbnail" className=""></img> */}
                            <H5PPreview {...this.state} resourceid={resourceid} />
                            <div className="item-caption-bottom">
                                {/* <p>item Caption Here.</p> */}
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
                    <ul className="panel-list">
                        { activities }
                    </ul>
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