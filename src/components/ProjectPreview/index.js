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
import SharePreviewPopup from 'helpers/SharePreviewPopup';
import ActivityCard from '../ActivityCard';

import './style.scss';

function ProjectPreview(props) {
  const { match } = props;

  const dispatch = useDispatch();
  const projectState = useSelector((state) => state.project);
  const accordion = useRef([]);

  const [currentProject, setCurrentProject] = useState(null);
  const [activeShared, setActiveShared] = useState(true);

  useEffect(() => {
    setCurrentProject(projectState && projectState.projectSelect);
  }, [projectState]);

  useEffect(() => {
    setActiveShared(
      projectState && projectState.projectSelect.shared,
    );
  }, [projectState]);

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
        if (playlist.activities.length > 0) {
          activities = playlist.activities.map((activity) => (
            <ActivityCard
              activity={activity}
              playlist_id={playlist._id}
              key={activity._id}
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
          <div className="check-each" key={playlist._id}>
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
              <FontAwesomeIcon icon="plus" />
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
            <div className="scne_div flex-wrap">
              <div className="sce_imgdiv">
                <div id="content" />
                <Link to={`/project/${currentProject._id}`}>
                  <img
                    alt="thumbnail"
                    src={global.config.laravelAPIUrl + currentProject.thumbUrl}
                  />
                </Link>
              </div>
              <div className="sce_cont">
                <ul className="bar_list flexdiv">
                  <li>
                    <div className="title_lg check">
                      <div>
                        {' '}
                        {currentProject.name}
                      </div>
                      <div className="configuration">
                        <Link to="/" className="go-back-button-preview">
                          <FontAwesomeIcon icon="undo" aria-hidden="true" />
                          {' '}
                          Exit
                          Preview Mode
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
                                    toggleProjectShareRemovedAction(
                                      currentProject._id,
                                      currentProject.name,
                                    );
                                    setActiveShared(!activeShared);
                                  }
                                });
                              } else {
                                toggleProjectShareAction(
                                  currentProject._id,
                                  currentProject.name,
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
                            className="shared-link"
                            onClick={() => {
                              window.gapi.sharetoclassroom.go('croom');
                              const protocol = `${window.location.href.split('/')[0]}//`;
                              const url = `${protocol}${window.location.host}/project/shared/${
                                match.params.projectId.trim()
                              }`;
                              return SharePreviewPopup(url, currentProject.name);
                            }}
                          >
                            <FontAwesomeIcon icon="external-link" aria-hidden="true" />
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

                <ul className="rating flexdiv" />

                <p className="expandiv">{currentProject.description}</p>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="playlist-div">
              <div className="playlist-title-div">
                <div className="title_md">Playlists</div>
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
