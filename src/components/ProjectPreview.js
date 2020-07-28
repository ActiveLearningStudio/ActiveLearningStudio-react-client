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
import SharePreviewPopup from "../helpers/SharePreviewPopup";
import Swal from "sweetalert2";
export default function ProjectPreview(props) {
  const dispatch = useDispatch();
  const projectfind = useSelector((state) => state);
  const accordian = useRef([]);

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

  // useEffect(() => {
  //   try {
  //     var acc = document
  //       .getElementById("custom_accordian")
  //       .getElementsByClassName("accordion");

  //     var i;

  //     for (i = 0; i < acc.length; i++) {
  //       acc[i].addEventListener("click", function () {
  //         this.classList.toggle("active");
  //       });
  //     }
  //   } catch (e) {}
  // });

  useEffect(() => {
    dispatch(loadMyProjectsActionPreview(props.match.params.projectid));
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
              ref={(el) => (accordian.current[counter] = el)}
              className={counter === 0 ? "active accordion" : " accordion"}
              onClick={() => {
                accordian.current[counter].classList.toggle("active");
              }}
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
    <div>
      {currentProject && (
        <>
          <div className="container">
            <div className="scne_div flex-wrap">
              <div className="sce_imgdiv">
                <div id="content"></div>
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
                                  title: `You are about to stop sharing <strong>"${currentProject.name}"</strong>`,
                                  html: `Please remember that anyone you have shared this project with will no longer have access its contents.
                                  Do you want to continue?`,
                                  showCloseButton: true,
                                  showCancelButton: true,
                                  focusConfirm: false,
                                  confirmButtonText: "Stop Sharing!",
                                  confirmButtonAriaLabel: "Stop Sharing!",
                                  cancelButtonText: "Cancel",
                                  cancelButtonAriaLabel: "Cancel",
                                }).then(function (resp) {
                                  if (resp.isConfirmed) {
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
                              window.gapi.sharetoclassroom.go("croom");

                              let protocol =
                                window.location.href.split("/")[0] + "//";
                              let url = `${
                                protocol + window.location.host
                              }/project/shared/${props.match.params.projectid.trim()}`;
                              return SharePreviewPopup(
                                url,
                                currentProject.name
                              );
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
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <ul className="rating flexdiv"></ul>
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
