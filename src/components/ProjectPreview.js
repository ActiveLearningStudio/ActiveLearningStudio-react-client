import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ActivityCard from "./ActivityCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loadMyProjectsActionPreview,
  toggleProjectshare,
  toggleProjectshareremoved,
} from "../actions/project";
import Switch from "react-switch";
import "./ProductDetails.css";

export default function ProjectPreview(props) {
  const dispatch = useDispatch();
  const projectfind = useSelector((state) => state);

  const [currentProject, setSet_Proj] = useState(null);
  const [activeShared, setActiveShared] = useState(true);
  useEffect(() => {
    setSet_Proj(projectfind.project && projectfind.project.projectSelect);
  }, [projectfind.project]);
  useEffect(() => {
    setActiveShared(
      projectfind.project && projectfind.project.projectSelect.shared
    );
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
    dispatch(loadMyProjectsActionPreview(props.match.params.projectid));
  }, []);
  // props.project.projects.forEach((project, i) => {
  //   if (project._id === props.match.params.projectid) {
  //     currentProject = project;
  //   }
  // });
  //alert("");
  // currentProject = props.project.projects;
  // console.log(props);
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
      {currentProject && (
        <>
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
                {/* <div className="collapsetogle"><img src="/images/plusblk.png" alt="plusblk" title=""></img></div> */}
                <ul className="bar_list flexdiv">
                  <li>
                    <div className="title_lg check">
                      <div> {currentProject.name}</div>
                      {/* <div className="w3-border">
                    <div className="w3-grey" style={{ width: "35%" }}>
                      30%
                    </div>
                  </div> */}
                      <div className="configuration">
                        <Link to="/" className="gobackbuttonpreview">
                          <i className="fa fa-undo" aria-hidden="true"></i> Exit
                          Preview Mode
                        </Link>
                        <div className="sharebutton">
                          Share Project
                          <Switch
                            onColor="#5952c6"
                            onChange={() => {
                              if (activeShared) {
                                Swal.fire({
                                  icon: "warning",
                                  title: `You are about to stop sharing "${currentProject.name}"`,
                                  html: `Please remember that anyone you have shared this project with will no longer have access its contents.
                                  Do you want to continue?`,
                                  showCloseButton: true,
                                  showCancelButton: true,
                                  focusConfirm: false,
                                  confirmButtonText:
                                    'Stop Sharing!',
                                  confirmButtonAriaLabel: 'Stop Sharing!',
                                  cancelButtonText:
                                    'Cancel',
                                  cancelButtonAriaLabel: 'Cancel'
                                }).then(function(resp) {
                                  if(resp.isConfirmed){
                                    toggleProjectshareremoved(
                                      currentProject._id,
                                      currentProject.name
                                    );
                                    setActiveShared(!activeShared);
                                  }
                                });
                              } else {
                                toggleProjectshare(
                                  currentProject._id,
                                  currentProject.name
                                );
                                setActiveShared(!activeShared);
                              }

                              
                            }}
                            checked={activeShared}
                            className="react-switch"
                            id="material-switch"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                          />
                        </div>
                        {activeShared && (
                          <div
                            className="sharedlink"
                            onClick={() => {
                              let protocol = window.location.href.split("/")[0] + "//" 
                              
                              Swal.fire({
                                html: `Your can now share project <strong>"${currentProject.name}"</strong><br>
                                      Anyone with the link below can access your project:<br>
                                      <br><a target="_blank" href="/project/shared/${props.match.params.projectid.trim()}
                                      ">${protocol+window.location.host}/project/shared/${props.match.params.projectid.trim()}</a>`,
                              //   html: ` 
                              //  <a target="_blank" href="/project/shared/${props.match.params.projectid.trim()}
                              // ">${
                              //   window.location.host
                              // }/project/shared/${props.match.params.projectid.trim()}</a>`,
                              });
                            }}
                          >
                            <i
                              class="fa fa-external-link"
                              aria-hidden="true"
                            ></i>
                            View Shared Link
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    {/* <div className="usrcmt"><img src="/images/heart.png" alt="heart" title=""></img>20</div> */}
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
        </>
      )}
    </div>
  );
}
