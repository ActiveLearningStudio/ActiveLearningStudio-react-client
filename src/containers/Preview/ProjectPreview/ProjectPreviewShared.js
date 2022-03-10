/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap";

import {
  loadMyProjectsPreviewSharedAction,
  searchPreviewProjectAction,
} from "store/actions/project";
import ActivityCard from "components/ActivityCard";
import Unauthorized from "components/Unauthorized";

import "./style.scss";

function ProjectPreviewShared(props) {
  const {
    match,
    sampleId,
    loadMyProjectsPreviewShared,
    setModalShow,
    setCurrentActivity,
    searchPreviewProject,
    mainPageProjectView,
  } = props;

  const project = useSelector((state) => state.project);
  const { activeOrganization } = useSelector((state) => state.organization);
  const accordion = useRef([]);

  const [currentProject, setCurrentProject] = useState(null);
  useEffect(() => {
    if (window.location.pathname.includes("/shared")) {
      loadMyProjectsPreviewShared(sampleId || match.params.projectId);
    } else if (
      window.location.pathname.includes("/preview") &&
      activeOrganization?.id
    ) {
      searchPreviewProject(sampleId || match.params.projectId);
    } else if (mainPageProjectView) {
      searchPreviewProject(sampleId || match.params.projectId);
    }
  }, [
    activeOrganization?.id,
    loadMyProjectsPreviewShared,
    match.params.projectId,
    sampleId,
    searchPreviewProject,
  ]);
  useEffect(() => {
    if (
      project &&
      (project?.isSharedProject || project?.searchPreviewProject)
    ) {
      setCurrentProject(project?.projectSelect);
    } else if (
      project &&
      (!project?.isSharedProject || !project?.searchPreviewProject)
    ) {
      setCurrentProject(null);
    }
  }, [project, project?.projectSelect, sampleId]);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 4,
    variableWidth: true,
  };

  useEffect(() => {
    localStorage.setItem("lti_activity", true);
  }, []);

  let playlists;

  if (currentProject) {
    playlists =
      currentProject.playlists &&
      currentProject.playlists.map((playlist, counter) => {
        let activities;
        if (playlist.activities.length > 0) {
          activities = playlist.activities.map((activity) => (
            <ActivityCard
              activity={activity}
              projectId={parseInt(match.params.projectId, 10)}
              playlistId={playlist.id}
              key={activity.id}
              sampleID={sampleId}
              setModalShow={setModalShow}
              setCurrentActivity={setCurrentActivity}
              lti
            />
          ));
        } else {
          activities = (
            <div className="col-md-12">
              <div className="alert alert-info" role="alert">
                No activity defined for this playlist.
              </div>
            </div>
          );
        }

        return (
          <div className="check-each" key={playlist.id}>
            <button
              type="button"
              ref={(el) => {
                accordion.current[counter] = el;
              }}
              className={counter === 0 ? "active accordion" : " accordion"}
              onClick={() => {
                accordion.current[counter].classList.toggle("active");
              }}
            >
              <FontAwesomeIcon icon="plus" />
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
      {currentProject && currentProject.status === "error" ? (
        <Unauthorized text="Project is not Public" />
      ) : (
        <>
          {currentProject ? (
            <div>
              <div className="container">
                <div className="scene flex-wrap shared-preview-custom">
                  <div className="scene-img">
                    {!!currentProject.thumb_url &&
                    currentProject.thumb_url.includes("pexels.com") ? (
                      <img src={currentProject.thumb_url} alt="thumbnail" />
                    ) : (
                      <img
                        src={
                          global.config.resourceUrl + currentProject.thumb_url
                        }
                        alt="thumbnail"
                      />
                    )}
                  </div>
                  <div className="sce_cont shared-preview-custom-cont">
                    {/* <div className="collapse-toggle"><img src="/images/plusblk.png" alt="plusblk" /></div> */}
                    <ul className="bar_list flex-div">
                      <li>
                        <div className="title_lg check">
                          <div className="fav-project-title-heading">
                            {currentProject.name}
                          </div>
                        </div>
                      </li>
                    </ul>

                    <p className="expandiv">{currentProject.description}</p>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="playlist-div shared-preview-custom-playlist">
                  <div className="playlist-title-div">
                    <div className="title-md">Playlists</div>
                  </div>
                  <div className="all-playlist check-custom">
                    <div className="playlist-accordion" id="custom_accordion">
                      {playlists}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : project.isSharedProject === false ? (
            <Alert
              variant="danger"
              style={{ margin: "40px", fontSize: "1.5em" }}
            >
              Project is not sharable.
            </Alert>
          ) : (
            <Alert variant="primary" style={{ margin: "20px" }}>
              Loading ...
            </Alert>
          )}
        </>
      )}
    </div>
  );
}

ProjectPreviewShared.propTypes = {
  match: PropTypes.object.isRequired,
  sampleId: PropTypes.number,
  setCurrentActivity: PropTypes.func.isRequired,
  setModalShow: PropTypes.func.isRequired,
  loadMyProjectsPreviewShared: PropTypes.func.isRequired,
  searchPreviewProject: PropTypes.func.isRequired,
  mainPageProjectView: PropTypes.bool,
};

ProjectPreviewShared.defaultProps = {
  sampleId: null,
  mainPageProjectView: false,
};

const mapDispatchToProps = (dispatch) => ({
  loadMyProjectsPreviewShared: (projectId) =>
    dispatch(loadMyProjectsPreviewSharedAction(projectId)),
  searchPreviewProject: (projectId) =>
    dispatch(searchPreviewProjectAction(projectId)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(ProjectPreviewShared)
);
