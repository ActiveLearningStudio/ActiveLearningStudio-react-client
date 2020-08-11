import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectPreviewModal from "./ProjectPreviewModal";
import "./ProjectCard.scss";
import { useSelector, useDispatch } from "react-redux";
import logo from "../images/logo.svg";
import GoogleModel from "./models/googleSign";
import { getprojectid } from "../actions/gapi";
import { GOOGLESHARE } from "../actions/gapi.js";
import { getProjectCourseFromLMS } from "../actions/project";
import SharePreviewPopup from "../helpers/SharePreviewPopup";
const ProjectCard = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const All_Lms = useSelector((state) => state.defaultsharestate);

  const [allLms, setAllLms] = useState([]);
  useEffect(() => {
    setAllLms(All_Lms);
  }, [All_Lms]);
  console.log(props);
  return (
    <div className="col-md-3 check">
      <GoogleModel
        projectId={props.project._id}
        show={show}
        onHide={() => setShow(false)}
      />

      <div className="program-tile">
        <div className="program-thumb">
          <Link to={"/project/" + props.project._id}>
            {props.project.thumb_url ? (
              <div
                className="project-thumb"
                style={{
                  backgroundImage:
                    !!props.project.thumb_url &&
                    props.project.thumb_url.includes("pexels.com")
                      ? "url(" + props.project.thumb_url + ")"
                      : "url(" +
                        global.config.laravelAPIUrl +
                        props.project.thumb_url +
                        ")",
                }}
              ></div>
            ) : null}
          </Link>
        </div>
        <div className="program-content">
          <div>
            <div className="row">
              <div className="col-md-10">
                <h3 className="program-title">
                  <Link to={"/project/" + props.project._id}>
                    {props.project.name}
                  </Link>
                </h3>
              </div>
              <div className="col-md-2">
                <div className="dropdown pull-right check">
                  <button
                    className="btn project-dropdown-btn project"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link
                      className="dropdown-item"
                      to={"/project/preview2/" + props.project._id}
                    >
                      <i className="fa fa-eye" aria-hidden="true"></i> Preview
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={"/project/create/" + props.project._id}
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                    </Link>
                    {/* <a
                    className="dropdown-item"
                    onClick={(e) => {
                      Swal.fire({
                        title: "STAY TUNED!",
                        text: "COMING SOON",
                        imageUrl: logo,
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: "Custom image",
                      });
                    }}
                  >
                    <i className="fa fa-share" aria-hidden="true"></i> Send To
                  </a> */}
                    <li class="dropdown-submenu send">
                      <a class="test" tabindex="-1">
                        <i className="fa fa-newspaper" aria-hidden="true"></i>{" "}
                        Publish
                      </a>
                      <ul class="dropdown-menu check">
                        <li
                          onClick={() => {
                            handleShow();
                            getprojectid(props.project._id);
                            dispatch(GOOGLESHARE(false));
                          }}
                        >
                          <a>Google Classroom</a>
                        </li>
                        {allLms.sharevendoes &&
                          allLms.sharevendoes.map((data) => {
                            return (
                              <li>
                                <a
                                  onClick={() => {
                                    dispatch(
                                      getProjectCourseFromLMS(
                                        data.lms_name.toLowerCase(),
                                        data._id,
                                        props.project._id,
                                        props.project.playlists,
                                        data.lms_url
                                      )
                                    );
                                  }}
                                >
                                  {data.description}
                                </a>
                              </li>
                            );
                          })}
                      </ul>
                    </li>
                    <li class="dropdown-submenu send">
                      <a
                        class="test"
                        tabindex="-1"
                        onClick={() => {
                          let protocol =
                            window.location.href.split("/")[0] + "//";
                          let url = `${
                            protocol + window.location.host
                          }/project/shared/${props.project._id.trim()}`;
                          SharePreviewPopup(url, props.project.name);
                        }}
                      >
                        <i className="fa fa-share" aria-hidden="true"></i> Share
                      </a>
                    </li>

                    {/*<a
									className="dropdown-item"
									href="#"
									onClick={(e) => {
										e.preventDefault();
										window.open(
											"/api/download/project/" +
												props.project._id
										);
									}}
								>
									<i
										className="fa fa-cloud-download"
										aria-hidden="true"
									></i>{" "}
									Executable
								</a> */}
                    <a
                      className="dropdown-item"
                      onClick={() =>
                        props.showDeletePopupAction(
                          props.project._id,
                          props.project.name,
                          "Project"
                        )
                      }
                    >
                      <i
                        className="fa fa-times-circle-o"
                        aria-hidden="true"
                      ></i>{" "}
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="lessons-duration">
              <div className="row">
                <div className="col-md-12">
                  <p>
                    {props.project.description &&
                    props.project.description.length > 130
                      ? props.project.description.substring(0, 130) + " ..."
                      : props.project.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="buttonbottom">
            <Link to={"/project/preview2/" + props.project._id}>
              <i className="fa fa-eye" aria-hidden="true"></i> Preview
            </Link>
            <Link to={"/project/" + props.project._id}>
              <i className="fa fa-cubes" aria-hidden="true"></i> Build
            </Link>

            <Link to={"/project/create/" + props.project._id}>
              <i className="fa fa-pencil" aria-hidden="true"></i> Edit
            </Link>
          </div>
        </div>
      </div>
      {props.showPreview ? (
        <ProjectPreviewModal key={props.project._id} project={props.project} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProjectCard;
