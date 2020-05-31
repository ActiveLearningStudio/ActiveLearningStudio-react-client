import React from "react";
import { Link } from "react-router-dom";
import ActivityPreviewCard from "./ActivityPreviewCard";
// import "./ProjectPreviewModal.scss";
import "./ProductDetails.css"
// import {
//     Accordion,
//     AccordionItem,
//     AccordionItemHeading,
//     AccordionItemButton,
//     AccordionItemPanel,
// } from 'react-accessible-accordion';


const ProjectPreview = (props) => {
	var currentProject = {
		'name':'',
		'description':'',
		'thumb_url':'',
		'playlists':[]
	};
	
	props.project.projects.forEach((project, i) => {
		if( project._id === props.match.params.projectid ){
			currentProject = project;
		}
	});
    
    var playlists;
    
	if(currentProject != null ){
        playlists = currentProject.playlists.map(playlist => {
            var activities;
			if(playlist.activities.length > 0){
				activities = playlist.activities.map(activity => {
					return (
						<ActivityPreviewCard activity={activity} key={activity._id}/>
					)
				});
			} else {
				activities = (
					<div className="col-md-12">
						<div className="alert alert-info" role="alert">
							No activities defined for this playlist.
						</div>
					</div>
				);
			}

            return (
				    <div className="accordion_in" key={playlist._id}>
                        <div className="plhead">
                                {playlist.title}
                        <Link to="" className="seeall">See All <img src="/images/seeall.png" alt="seeall" title=""></img>
                        </Link>
                        </div>
                        <div className="acc_content">
                            <ul className="playlist_js">
                                {activities}
                            </ul>
                        </div>
                    </div>
			);
		})
	} else {
		playlists = (
			<div className="col-md-12">
				<div className="alert alert-info" role="alert">
  					No playlists defined for this project.
				</div>
			</div>
		);
	}

    return (
        <div>
            <div className="container">
                <div className="scne_div flex-wrap">
                    <div className="sce_imgdiv">
                        <Link to={"/project/"+currentProject._id}>
                            <img alt="thumbnail" src={global.config.laravelAPIUrl + currentProject.thumb_url}></img>
                        </Link>
                    </div>
                    <div className="sce_cont">
                        <div className="collapsetogle"><img src="/images/plusblk.png" alt="plusblk" title=""></img></div>
                        <ul className="bar_list flexdiv">
                            <li> 
                                <div className="title_lg">{currentProject.name}</div>	
                            </li>
                            <li>
                                <div className="usrcmt"><img src="/images/heart.png" alt="heart" title=""></img>20</div>
                            </li>
                            <li>
                                <div className="usrcmt"><i className="fas fa-user"></i> 02</div>
                            </li>
                            
                            <li>
                                <div className="bar flexdiv">
                                    <div className="progress_bar"> 30%</div>
                                    <div className="progress_div"></div>
                                </div>
                            </li>
                        </ul>
                        <ul className="rating flexdiv">
                            <li><i className="fas fa-star"></i> </li>
                            <li><i className="fas fa-star"></i> </li>
                            <li><i className="fas fa-star"></i> </li>
                            <li><i className="fas fa-star"></i> </li>
                            <li><i className="fas fa-star"></i> </li>
                        </ul>
                        <p className="expandiv">
                            {currentProject.description}
                        </p>
                    </div>
                </div>
            </div>
            <div className="container">
            <div className="play_listdiv">
                <div className="plytitle_div">
                    <div className="title_md">Playlists</div>
                </div>
                <div className="all_plylist">
                    <Link href="#" className="alltxt">All Playlist
                        <img src="/images/arrow.png" alt="arrow" title=""></img>
                    </Link>
                    <div className="playlistaccordion">
                        {playlists}
                    </div>
                </div>
             </div>
        </div>
        </div>
    );
}

export default ProjectPreview;