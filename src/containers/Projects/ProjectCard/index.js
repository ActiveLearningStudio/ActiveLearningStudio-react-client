/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import "./projectcardstyle.scss";
import Swal from "sweetalert2";
import { toggleProjectShareAction } from "store/actions/project";
import SharePreviewPopup from "components/SharePreviewPopup";
import ProjectCardDropdown from "./ProjectCardDropdown";
import ProjectPreviewModal from "../ProjectPreviewModal";
import ActivityCardDropDown from "utils/ActivityCardDropDown/activitycarddropdown";
import { faPlus, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import loader from "assets/images/loader.svg";

const ProjectCard = (props) => {
  const {
    showPreview,
    project,
    showDeletePopup,
    handleShow,
    setProjectId,
    activeFilter,
    setCreateProject,
    seteditMode,
  } = props;
  const ImgLoader = () => <img src={loader} />;
  const organization = useSelector((state) => state.organization);
  const dispatch = useDispatch();
  const [showing, setShowing] = useState(true);
  const [showingold, setShowingold] = useState(false);
  return (
    <>
      {/* New Update Start */}
      {showing && (
        <div className="main-myproject-card">
          <div>
            {project.thumb_url && (
              <>
                <div
                  className="myproject-card-top"
                  style={{
                    backgroundImage: project.thumb_url.includes("pexels.com")
                      ? `url(${project.thumb_url})`
                      : `url(${global.config.resourceUrl}${project.thumb_url})`,
                  }}
                >
                  <div className="myproject-card-dropdown">
                    {/* <ActivityCardDropDown iconColor="white" /> */}
                    <ProjectCardDropdown
                      project={project}
                      showDeletePopup={showDeletePopup}
                      handleShow={handleShow}
                      setProjectId={setProjectId}
                      // text="More"
                      iconColor="#ffffff"
                      setCreateProject={setCreateProject}
                      seteditMode={seteditMode}
                    />
                  </div>
                  <Link
                    to={`/org/${organization?.currentOrganization?.domain}/project/${project.id}/preview`}
                  >
                    <div className="myproject-card-title">
                      <h2>
                        {" "}
                        {project.name && project.name.length > 50
                          ? `${project.name.substring(0, 50)}...`
                          : project.name}
                      </h2>
                    </div>
                  </Link>
                </div>
              </>
            )}
            {/* </Link> */}
          </div>
          {/* <div
            className="myproject-card-top"
            // style={{ backgroundImage: `url(${backgroundImg})` }}
          >
            <div className="myproject-card-dropdown">
              <ActivityCardDropDown iconColor="white" />
            </div>
            <div className="myproject-card-title">
              <h2>{title}</h2>
            </div>
          </div> */}
          <div className="myproject-card-detail">
            <p>
              {project.description && project.description.length > 130
                ? `${project.description.substring(0, 130)} ...`
                : project.description}
            </p>
          </div>
          {project.shared && (
            <div className="myproject-card-status">
              <p>
                <span></span> Published
              </p>
            </div>
          )}
          {/* <div className="myproject-card-status">
            <p>
              <span></span> Published
            </p>
          </div> */}
          <div className="myproject-card-add-share">
            <button
              style={{
                width: "86px",
                height: "32px",
                marginRight: "24px",
                textAlign: "left",
              }}
            >
              <Link
                to={`/org/${organization?.currentOrganization?.domain}/project/${project.id}`}
                style={{ textDecoration: "none", color: "#084892" }}
              >
                <FontAwesomeIcon icon="plus" className="mr-2" />
                Add
              </Link>
              {/* <Link
                to="/org/currikistudio/project/create/one/playlist"
                style={{ textDecoration: "none", color: "#084892" }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ marginRight: "16px" }}
                  color="#084892"
                />
                Add
              </Link> */}
            </button>
            {organization?.permission?.Project?.includes("project:share") && (
              <button
                style={{ width: "108px", height: "32px", textAlign: "right" }}
              >
                <Link
                  to="#"
                  style={{ textDecoration: "none", color: "#084892" }}
                  onClick={async () => {
                    const protocol = `${window.location.href.split("/")[0]}//`;
                    const url = `${protocol + window.location.host}/project/${
                      project.id
                    }/shared`;
                    if (!project.shared) {
                      toast.info("Sharing project...", {
                        className: "project-loading",
                        closeOnClick: false,
                        closeButton: false,
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 10000,
                        icon: ImgLoader,
                      });
                      await dispatch(
                        toggleProjectShareAction(project.id, project.name)
                      );
                      toast.dismiss();
                      SharePreviewPopup(url, project.name);
                    } else {
                      SharePreviewPopup(url, project.name);
                    }
                  }}
                >
                  <FontAwesomeIcon icon="share" className="mr-2" />
                  Share
                </Link>
                {/* <FontAwesomeIcon
                  icon={faShareSquare}
                  style={{ marginRight: "16px" }}
                  color="#084892"
                />
                Share */}
              </button>
            )}
          </div>
        </div>
      )}
      {/* New Update END */}
      {showingold && (
        <div className="col-md-3 check" id={activeFilter}>
          <div className="program-tile">
            <div className="program-thumb">
              <Link
                to={`/org/${organization?.currentOrganization?.domain}/project/${project.id}/preview`}
              >
                {project.thumb_url && (
                  <div
                    className="project-thumb"
                    style={{
                      backgroundImage: project.thumb_url.includes("pexels.com")
                        ? `url(${project.thumb_url})`
                        : `url(${global.config.resourceUrl}${project.thumb_url})`,
                    }}
                  />
                )}
              </Link>
            </div>

            <div className="program-content">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="program-title">
                      <Link
                        to={`/org/${organization?.currentOrganization?.domain}/project/${project.id}/preview`}
                      >
                        {project.name && project.name.length > 50
                          ? `${project.name.substring(0, 50)}...`
                          : project.name}
                      </Link>
                    </h3>

                    {/* {(project.shared && activeFilter === 'list-grid') && (
                  <Badge pill variant="success">
                    Shared
                  </Badge>
                )} */}
                  </div>
                </div>

                <div className="lessons-duration">
                  <div className="row">
                    <div className="col-md-12">
                      <p>
                        {project.description && project.description.length > 130
                          ? `${project.description.substring(0, 130)} ...`
                          : project.description}
                      </p>
                      {project.shared && (
                        <div className="row">
                          <div className="col-md-12">
                            <Badge pill variant="success">
                              Shared
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="button-bottom">
                <Link
                  to={`/org/${organization?.currentOrganization?.domain}/project/${project.id}`}
                >
                  <FontAwesomeIcon icon="plus" className="mr-2" />
                  Add
                </Link>
                {organization?.permission?.Project?.includes(
                  "project:share"
                ) && (
                  <Link
                    to="#"
                    onClick={async () => {
                      const protocol = `${
                        window.location.href.split("/")[0]
                      }//`;
                      const url = `${protocol + window.location.host}/project/${
                        project.id
                      }/shared`;
                      if (!project.shared) {
                        Swal.showLoading();
                        await dispatch(
                          toggleProjectShareAction(project.id, project.name)
                        );
                        Swal.close();
                        SharePreviewPopup(url, project.name);
                      } else {
                        SharePreviewPopup(url, project.name);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon="share" className="mr-2" />
                    Share
                  </Link>
                )}
                <Link style={{ padding: "0px" }}>
                  <ProjectCardDropdown
                    project={project}
                    showDeletePopup={showDeletePopup}
                    handleShow={handleShow}
                    setProjectId={setProjectId}
                    text="More"
                  />
                </Link>
              </div>
            </div>
          </div>

          {showPreview && (
            <ProjectPreviewModal key={project.id} project={project} />
          )}
        </div>
      )}
    </>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  showPreview: PropTypes.bool,
  showDeletePopup: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
};

ProjectCard.defaultProps = {
  showPreview: false,
};

export default ProjectCard;
