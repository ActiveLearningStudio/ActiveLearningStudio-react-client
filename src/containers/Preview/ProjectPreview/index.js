import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import Switch from 'react-switch';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { deletePlaylistAction, loadProjectPlaylistsAction } from 'store/actions/playlist';
import {
  loadMyProjectsActionPreview,
  toggleProjectShareAction,
  toggleProjectShareRemovedAction,
  deleteProjectAction,
} from 'store/actions/project';
import SharePreviewPopup from 'components/SharePreviewPopup';
import ActivityCard from 'components/ActivityCard';
import DropdownProject from 'containers/Projects/ProjectCard/ProjectCardDropdown';
import PlaylistCardDropdown from 'containers/Playlists/PlaylistCard/PlaylistCardDropdown';
import GoogleModel from 'components/models/GoogleLoginModal';
import DeletePopup from 'components/DeletePopup';
import { hideDeletePopupAction, showDeletePopupAction } from 'store/actions/ui';

import './style.scss';

function ProjectPreview(props) {
  const { match, history } = props;

  const dispatch = useDispatch();

  const projectState = useSelector((state) => state.project);
  const playlistState = useSelector((state) => state.playlist);
  const ui = useSelector((state) => state.ui);

  const accordion = useRef([]);

  const { showDeletePlaylistPopup } = ui;
  const [currentProject, setCurrentProject] = useState(null);
  const [activeShared, setActiveShared] = useState(true);
  const [collapsed, setCollapsed] = useState([true]);
  const [show, setShow] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(0);

  useEffect(() => {
    setCurrentProject(projectState.projectSelect);
    setActiveShared(projectState.projectSelect.shared);
  }, [projectState.projectSelect]);

  useEffect(() => {
    if (playlistState.playlists.length === 0) {
      dispatch(loadProjectPlaylistsAction(match.params.projectId));
    }
  }, []);

  const handleShow = () => {
    setShow(true); //! state.show
  };

  const deletePlaylist = (projectId, id) => {
    dispatch(deletePlaylistAction(projectId, id)); //! state.show
  };

  const deleteProject = async (projectId) => {
    await dispatch(deleteProjectAction(projectId)); //! state.show
    history.push('/');
  };

  const hideDeletePopup = () => {
    dispatch(hideDeletePopupAction()); //! state.show
  };

  const showDeletePopup = (id, title, deleteType) => {
    dispatch(showDeletePopupAction(id, title, deleteType)); //! state.show
  };

  const setProjectId = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleClose = () => {
    setShow(false);
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 1,
  };

  useEffect(() => {
    dispatch(loadMyProjectsActionPreview(match.params.projectId));
  }, [dispatch, match.params.projectId]);

  let playlists;

  if (currentProject) {
    playlists = playlistState.playlists && playlistState.playlists.map((playlist, counter) => {
      let activities;
      if (playlist.activities && playlist.activities.length > 0) {
        activities = playlist.activities.map((activity) => (
          <ActivityCard
            activity={activity}
            projectId={parseInt(match.params.projectId, 10)}
            playlistId={playlist.id}
            key={activity.id}
            playlist={playlist}
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
              const tempCollapsed = [...collapsed];
              tempCollapsed[counter] = !tempCollapsed[counter];
              setCollapsed(tempCollapsed);
            }}
          >
            <FontAwesomeIcon icon={collapsed[counter] ? 'minus' : 'plus'} className="mr-2" />
            {playlist.title}
          </button>

          <div className="panel">
            <ul>
              <Slider {...settings}>{activities}</Slider>
            </ul>
          </div>
          <PlaylistCardDropdown
            playlist={playlist}
            projectId={playlist.project_id}
            selectedProject={playlist.project}
          />
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
                <ul className="bar_list flex-div check">
                  <li>
                    <div className="title_lg check">
                      <div>{currentProject.name}</div>

                      <div className="configuration">
                        <DropdownProject
                          project={currentProject}
                          handleShow={handleShow}
                          setProjectId={setProjectId}
                          showDeletePopup={showDeletePopup}
                        />
                        <Link to="#" onClick={history.goBack} className="go-back-button-preview">
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
                              const url = `${protocol}${window.location.host}/project/${match.params.projectId}/shared`;
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
          <GoogleModel
            projectId={selectedProjectId}
            show={show} // {props.show}
            onHide={handleClose}
          />
          {showDeletePlaylistPopup && (
            <DeletePopup
              ui={ui}
              selectedProject={currentProject}
              deletePlaylist={deletePlaylist}
              hideDeletePopup={hideDeletePopup}
              deleteProject={deleteProject}
              // deleteType="project"
              // showDeletePopup={showDeletePopup}
            />
          )}
        </>
      )}
    </div>
  );
}

ProjectPreview.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(ProjectPreview);
