import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ActivityCard from "./ActivityCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetails.css";

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
          </button>

          <div className="panel ">
            <ul>
              <Slider {...settings}>{activities}</Slider>
            </ul>
          </div>
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
            <ul className="bar_list flexdiv">
              <li>
                <div className="title_lg check">
                  <div> {currentProject.name}</div>
                  <Link to="/" className="gobackbuttonpreview">
                    <i className="fa fa-undo" aria-hidden="true"></i> 
                    Exit Preview Mode
                  </Link>
                </div>
              </li>
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
