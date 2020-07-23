import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ActivityCard from "./ActivityCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { loadMyProjectsActionPreviewShared } from "../actions/project";
import "./ProductDetails.css";
import Unauthorized from "./unauthorized";
export default function ProjectPreviewShared(props) {
  const dispatch = useDispatch();
  const projectfind = useSelector((state) => state);

  const [currentProject, setSet_Proj] = useState(null);

  useEffect(() => {
    if (
      projectfind.project &&
      Object.keys(projectfind.project.projectSelect).length > 0
    ) {
      setSet_Proj(projectfind.project.projectSelect);
    }
  }, [projectfind.project]);

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
    try {
      var acc = document
        .getElementById("custom_accordian")
        .getElementsByClassName("accordion");

      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          this.classList.toggle("active");
        });
      }
    } catch (e) {}
  });

  useEffect(() => {
    dispatch(loadMyProjectsActionPreviewShared(props.match.params.projectid));
  }, []);

  var playlists;

  if (!!currentProject) {
    playlists =
      currentProject.playlists &&
      currentProject.playlists.map((playlist, counter) => {
        var activities;
        if (playlist.activities.length > 0) {
          activities = playlist.activities.map((activity) => {
            return (
              <ActivityCard
                activity={activity}
                playlist_id={playlist._id}
                key={activity._id}
                lti="true"
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
            <button
              className={counter === 0 ? "active accordion" : " accordion"}
            >
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
    <div className="full-width-share">
      {currentProject && currentProject.status == "error" ? (
        <Unauthorized text="Project is not Public" />
      ) : (
        <>
          {currentProject && (
            <div>
              <div className="container">
                <div className="scne_div flex-wrap">
                  <div className="sce_imgdiv">
                    <Link to={"/project/" + currentProject._id}>
                      <img
                        alt="thumbnail"
                        src={
                          global.config.laravelAPIUrl + currentProject.thumb_url
                        }
                      ></img>
                    </Link>
                  </div>
                  <div className="sce_cont">
                    {/* <div className="collapsetogle"><img src="/images/plusblk.png" alt="plusblk" title=""></img></div> */}
                    <ul className="bar_list flexdiv">
                      <li>
                        <div className="title_lg check">
                          <div> {currentProject.name}</div>
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
          )}
        </>
      )}
    </div>
  );
}
