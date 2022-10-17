/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';

import { loadMyProjectsPreviewSharedAction, searchPreviewProjectAction } from 'store/actions/project';
import ActivityCard from 'components/ActivityCard';
import Unauthorized from 'components/Unauthorized';
import HeaderLogo from 'assets/images/GCLogo.png';
import './project-share-preview.scss';

function ProjectPreviewShared(props) {
  const { match, sampleId, loadMyProjectsPreviewShared, setModalShow, setCurrentActivity, searchPreviewProject, mainPageProjectView } = props;

  const project = useSelector((state) => state.project);
  const { activeOrganization } = useSelector((state) => state.organization);
  const accordion = useRef([]);
  const [activeAccordion, setActiveAccordion] = useState();

  const [currentProject, setCurrentProject] = useState(null);
  useEffect(() => {
    if (window.location.pathname.includes('/shared')) {
      loadMyProjectsPreviewShared(sampleId || match.params.projectId);
    } else if (window.location.pathname.includes('/preview') && activeOrganization?.id) {
      searchPreviewProject(sampleId || match.params.projectId);
    } else if (mainPageProjectView) {
      searchPreviewProject(sampleId || match.params.projectId);
    }
  }, [activeOrganization?.id, loadMyProjectsPreviewShared, match.params.projectId, sampleId, searchPreviewProject]);
  useEffect(() => {
    if (project && (project?.isSharedProject || project?.searchPreviewProject)) {
      setCurrentProject(project?.projectSelect);
    } else if (project && (!project?.isSharedProject || !project?.searchPreviewProject)) {
      setCurrentProject(null);
    }
  }, [project, project?.projectSelect, sampleId]);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
    infinite: false,
  };

  useEffect(() => {
    localStorage.setItem('lti_activity', true);
  }, []);

  const [windowDimenion, setWindowDimenion] = useState(window.innerWidth);

  const detectSize = () => {
    setWindowDimenion(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    console.log('Logo:', windowDimenion);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimenion]);

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
              shared
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
          <div className="playlist-info" key={playlist.id}>
            <button
              type="button"
              ref={(el) => {
                accordion.current[counter] = el;
              }}
              className={counter === 0 ? 'active activity-slider-button' : 'activity-slider-button'}
              onClick={() => {
                accordion.current[counter].classList.toggle('active');
                accordion.current.forEach((el) => {
                  if (el !== accordion.current[counter]) {
                    el.classList.remove('active');
                  }
                });
                if (playlist.id === activeAccordion) {
                  setActiveAccordion();
                } else {
                  setActiveAccordion(playlist.id);
                }
              }}
            >
              <FontAwesomeIcon icon={activeAccordion === playlist.id ? 'chevron-up' : 'chevron-down'} style={{ fontSize: '12px' }} />
              {playlist.title}
              <FontAwesomeIcon className="mobile" icon={activeAccordion === playlist.id ? 'chevron-up' : 'chevron-down'} />
            </button>

            <div className="panel preview-activity-style">
              <ul>{windowDimenion > 768 ? <Slider {...settings}>{activities}</Slider> : activities}</ul>
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
    <div className="white-backgroud">
      <div className="project-share-preview-nav">
        <img src={HeaderLogo} />
      </div>
      <div className="project-share-preview">
        {currentProject && currentProject.status === 'error' ? (
          <Unauthorized text="Project is not Public" />
        ) : (
          <>
            {currentProject ? (
              <div>
                <div className="project-meta-data">
                  <div
                    className="project-thumbnail"
                    style={{
                      backgroundImage: currentProject.thumb_url?.includes('pexels.com')
                        ? `url(${currentProject.thumb_url})`
                        : `url(${global.config.resourceUrl}${currentProject.thumb_url})`,
                    }}
                  ></div>
                  <div className="project-description">
                    <h1>{currentProject.name}</h1>
                    <p>{currentProject.description}</p>
                  </div>
                </div>
                <div className="all-shared-playlist">
                  <h2>Playlists</h2>

                  <div className="accoridion-playlist">{playlists}</div>
                </div>
              </div>
            ) : project.isSharedProject === false ? (
              <Alert variant="danger" style={{ marginTop: '40px', fontSize: '1.5em' }}>
                Project is not shareable.
              </Alert>
            ) : (
              <Alert variant="primary" style={{ marginTop: '20px' }}>
                Loading ...
              </Alert>
            )}
          </>
        )}
      </div>
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
  loadMyProjectsPreviewShared: (projectId) => dispatch(loadMyProjectsPreviewSharedAction(projectId)),
  searchPreviewProject: (projectId) => dispatch(searchPreviewProjectAction(projectId)),
});

export default withRouter(connect(null, mapDispatchToProps)(ProjectPreviewShared));
