import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import Switch from 'react-switch';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  loadMyProjectsActionPreview,
  toggleProjectShareAction,
  toggleProjectShareRemovedAction,
} from 'store/actions/project';
import SharePreviewPopup from 'components/SharePreviewPopup';
import ActivityCard from 'components/ActivityCard';

import './style.scss';

function ProjectPreview(props) {
  const { match } = props;

  const dispatch = useDispatch();
  const projectState = useSelector((state) => state.project);
  const accordion = useRef([]);

  const [currentProject, setCurrentProject] = useState(null);
  const [activeShared, setActiveShared] = useState(true);

  useEffect(() => {
    setCurrentProject(projectState.projectSelect);
    setActiveShared(projectState.projectSelect.shared);
  }, [projectState.projectSelect]);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 1,
  };

  // useEffect(() => {
  //   try {
  //     let acc = document
  //       .getElementById('custom_accordion')
  //       .getElementsByClassName('accordion');
  //     for (let i = 0; i < acc.length; i += 1) {
  //       acc[i].addEventListener('click', function () {
  //         this.classList.toggle('active');
  //       });
  //     }
  //   } catch (e) {}
  // });

  useEffect(() => {
    dispatch(loadMyProjectsActionPreview(match.params.projectId));
  }, [dispatch, match.params.projectId]);

  let playlists;

  if (currentProject) {
    playlists = currentProject.playlists
      && currentProject.playlists.map((playlist, counter) => {
        let activities;
        if (playlist.activities && playlist.activities.length > 0) {
          activities = playlist.activities.map((activity) => (
            <ActivityCard
              activity={activity}
              playlist_id={playlist.id}
              key={activity.id}
            />
          ));
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
          <div className="check-each" key={playlist.id}>
            <button
              type="button"
              ref={(el) => {
                accordion.current[counter] = el;
              }}
              className={counter === 0 ? 'active accordion' : ' accordion'}
              onClick={() => {
                accordion.current[counter].classList.toggle('active');
              }}
            >
              <FontAwesomeIcon icon="plus" className="mr-2" />
              {playlist.title}
            </button>

            <div className="panel">
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
            <div className="scene flex-wrap">
              <div className="scene-img">
                <div id="content" />
                <Link to={`/project/${currentProject.id}`}>
                  {!!currentProject.thumb_url && currentProject.thumb_url.includes('pexels.com') ? (
                    <img src={currentProject.thumb_url} alt="thumbnail" />
                  ) : (
                    <img src={global.config.resourceUrl + currentProject.thumb_url} alt="thumbnail" />
                  )}
                </Link>
              </div>
              <div className="sce_cont">
                <ul className="bar_list flex-div">
                  <li>
                    <div className="title_lg check">
                      <div>{currentProject.name}</div>

                      <div className="configuration">
                        <Link to="/" className="go-back-button-preview">
                          <FontAwesomeIcon icon="undo" className="mr-2" />
                          Exit Preview Mode
                        </Link>

                        <div className="share-button">
                          Share Project
                          <Switch
                            onColor="#5952c6"
                            onChange={() => {
                              if (activeShared) {
                                Swal.fire({
                                  icon: 'warning',
                                  title: `You are about to stop sharing <strong>"${currentProject.name}"</strong>`,
                                  html: `Please remember that anyone you have shared this project
                                    with will no longer have access its contents. Do you want to continue?`,
                                  showCloseButton: true,
                                  showCancelButton: true,
                                  focusConfirm: false,
                                  confirmButtonText: 'Stop Sharing!',
                                  confirmButtonAriaLabel: 'Stop Sharing!',
                                  cancelButtonText: 'Cancel',
                                  cancelButtonAriaLabel: 'Cancel',
                                }).then((resp) => {
                                  if (resp.isConfirmed) {
                                    dispatch(toggleProjectShareRemovedAction(
                                      currentProject.id,
                                      currentProject.name,
                                    ));
                                  }
                                });
                              } else {
                                dispatch(toggleProjectShareAction(currentProject.id, currentProject.name));
                              }
                            }}
                            checked={activeShared || false}
                            className="react-switch"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                          />
                        </div>

                        {activeShared && (
                          <div
                            className="shared-link"
                            onClick={() => {
                              if (window.gapi && window.gapi.sharetoclassroom) {
                                window.gapi.sharetoclassroom.go('croom');
                              }
                              const protocol = `${window.location.href.split('/')[0]}//`;
                              const url = `${protocol}${window.location.host}/project/shared/${
                                match.params.projectId.trim()
                              }`;
                              return SharePreviewPopup(url, currentProject.name);
                            }}
                          >
                            <FontAwesomeIcon icon="external-link-alt" className="mr-2" />
                            View Shared Link
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                  <li />
                  <li />
                  <li />
                </ul>

                <ul className="rating flex-div" />

                <p className="expandiv">{currentProject.description}</p>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="playlist-div">
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
        </>
      )}
    </div>
  );
}

ProjectPreview.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ProjectPreview;
