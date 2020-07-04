import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ActivityCard from "./ActivityCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./ProjectPreviewModal.scss";
import "./ProductDetails.css";
// import {
//     Accordion,
//     AccordionItem,
//     AccordionItemHeading,
//     AccordionItemButton,
//     AccordionItemPanel,
// } from 'react-accessible-accordion';

const ProjectPreview = (props) => {
  var currentProject = {
    name: "",
    description: "",
    thumb_url: "",
    playlists: [],
  };
  var settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 1,
  };
  var first = true;
  useEffect(() => {
    setTimeout(() => {
      var acc = document
        .getElementById("custom_accordian")
        .getElementsByClassName("accordion");

      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          this.classList.toggle("active");
        });
      }
    }, 2000);
  }, []);
  props.project.projects.forEach((project, i) => {
    if (project._id === props.match.params.projectid) {
      currentProject = project;
    }
  });

  var playlists;

  if (currentProject != null) {
    playlists = currentProject.playlists.map((playlist, counter) => {
      var activities;
      if (playlist.activities.length > 0) {
        activities = playlist.activities.map((activity) => {
          return (
            <ActivityCard
              activity={activity}
              playlist_id={playlist._id}
              key={activity._id}
            />
          );
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
        <div className="check-each" key={playlist._id}>
          <button className={counter === 0 ? "active accordion" : " accordion"}>
            <i className="fa fa-plus" />
            {playlist.title}
            {/* <Link to="">
              See All <i class="fa fa-chevron-right" />{" "}
            </Link> */}
          </button>

          <div className="panel ">
            <ul>
              <Slider {...settings}>{activities}</Slider>
            </ul>
          </div>
          {/* <div className="plhead">
            {playlist.title}
        
          </div>
          <div className="acc_content">
            <ul>
              <Slider {...settings}>{activities}</Slider>
            </ul>
          </div> */}
        </div>
      );
    });
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
            <Link to={"/project/" + currentProject._id}>
              <img
                alt="thumbnail"
                src={global.config.laravelAPIUrl + currentProject.thumb_url}
              ></img>
            </Link>
          </div>
          <div className="sce_cont">
            {/* <div className="collapsetogle"><img src="/assets.images/plusblk.png" alt="plusblk" title=""></img></div> */}
            <ul className="bar_list flexdiv">
              <li>
                <div className="title_lg check">
                  <div> {currentProject.name}</div>
                  {/* <div className="w3-border">
                    <div className="w3-grey" style={{ width: "35%" }}>
                      30%
                    </div>
                  </div> */}
                  <Link to="/" className="gobackbuttonpreview">
                    <i className="fa fa-undo" aria-hidden="true"></i> Exit
                    Preview Mode
                  </Link>
                </div>
              </li>
              <li>
                {/* <div className="usrcmt"><img src="/assets.images/heart.png" alt="heart" title=""></img>20</div> */}
              </li>
              <li>
                {/* <div className="usrcmt"><i className="fas fa-user"></i> 02</div> */}
              </li>

              <li>
                {/* <div className="bar flexdiv">
                                    <div className="progress_bar"> 30%</div>
                                    <div className="progress_div"></div>
                                </div> */}
              </li>
            </ul>
            <ul className="rating flexdiv">
              {/* <li><i className="fas fa-star"></i> </li>
                            <li><i className="fas fa-star"></i> </li>
                            <li><i className="fas fa-star"></i> </li>
                            <li><i className="fas fa-star"></i> </li>
                            <li><i className="fas fa-star"></i> </li> */}
            </ul>
            <p className="expandiv">{currentProject.description}</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="play_listdiv">
          <div className="plytitle_div">
            <div className="title_md">Playlists</div>
          </div>
          <div className="all_plylist check-custom">
            <div className="playlistaccordion" id="custom_accordian">
              {playlists}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
