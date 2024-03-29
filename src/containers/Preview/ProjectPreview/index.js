/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { changePlaylistTitleAction, deletePlaylistAction, loadProjectPlaylistsAction } from 'store/actions/playlist';
import { loadMyProjectsActionPreview, deleteProjectAction } from 'store/actions/project';
import SharePreviewPopup from 'components/SharePreviewPopup';
import ActivityCard from 'components/ActivityCard';
import DeletePopup from 'components/DeletePopup';
import './style.scss';
import { getTeamPermission } from 'store/actions/team';

function ProjectPreview(props) {
  const { match, history, changePlaylistTitle } = props;

  const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState(false);
  const editFieldRef = useRef();
  const organization = useSelector((state) => state.organization);
  const projectState = useSelector((state) => state.project);
  const playlistState = useSelector((state) => state.playlist);
  const ui = useSelector((state) => state.ui);
  const accordion = useRef([]);
  const { permission } = organization;
  const team = useSelector((state) => state.team);
  const { teamPermission } = team;
  const { showDeletePlaylistPopup } = ui;
  const [currentProject, setCurrentProject] = useState(null);
  // const [setActiveShared] = useState(true);
  const [collapsed, setCollapsed] = useState([true]);

  useEffect(() => {
    setCurrentProject(projectState.projectSelect);
    // setActiveShared(projectState.projectSelect.shared);
  }, [projectState.projectSelect]);
  useEffect(() => {
    if (Object.keys(teamPermission).length === 0 && currentProject?.team?.id && organization?.currentOrganization?.id) {
      dispatch(getTeamPermission(organization?.currentOrganization?.id, currentProject.team.id));
    }
  }, [teamPermission, organization?.currentOrganization, currentProject]);
  useEffect(() => {
    dispatch(loadProjectPlaylistsAction(match.params.projectId, true));
  }, []);

  // const handleShow = () => {
  //   setShow(true); //! state.show
  // };

  const deletePlaylist = (projectId, id) => {
    dispatch(deletePlaylistAction(projectId, id)); //! state.show
  };

  const deleteProject = async (projectId) => {
    await dispatch(deleteProjectAction(projectId)); //! state.show
    history.push('/');
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
    if (organization?.currentOrganization?.id) dispatch(loadMyProjectsActionPreview(match.params.projectId));
  }, [dispatch, match.params.projectId, organization?.currentOrganization?.id]);

  let playlists;

  if (currentProject) {
    playlists =
      playlistState.playlists &&
      playlistState.playlists.map((playlist, counter) => {
        let activities;
        if (playlist.activities && playlist.activities.length > 0) {
          activities = playlist.activities.map(
            (activity) =>
              (Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:view-activity') : permission?.Activity?.includes('activity:view')) && (
                <ActivityCard
                  activity={activity}
                  projectId={parseInt(match.params.projectId, 10)}
                  playlistId={playlist.id}
                  key={activity.id}
                  playlist={playlist}
                  teamPermission={teamPermission || {}}
                />
              ),
          );
        } else {
          activities = (
            <div className="col-md-12">
              <div className="alert alert-info" role="alert">
                No activity defined for this playlist.
              </div>
            </div>
          );
        }
        console.log(editTitle);
        return (
          (Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:view-playlist') : permission?.Playlist?.includes('playlist:view')) && (
            <div className="check-each" key={playlist.id}>
              <button
                type="button"
                ref={(el) => {
                  accordion.current[counter] = el;
                }}
                className={counter === 0 ? 'active accordion' : ' accordion'}
                onClick={() => {
                  if (!editTitle) {
                    accordion.current[counter].classList.toggle('active');
                    const tempCollapsed = [...collapsed];
                    tempCollapsed[counter] = !tempCollapsed[counter];
                    setCollapsed(tempCollapsed);
                  }
                }}
              >
                <FontAwesomeIcon icon={collapsed[counter] ? 'minus' : 'plus'} className="mr-2" />
                {editTitle && playlist ? (
                  <>
                    <input name="playlist-title" defaultValue={playlist.title} ref={editFieldRef} />
                    &nbsp;
                    <FontAwesomeIcon
                      icon="edit"
                      className="mr-4"
                      onClick={() => {
                        if (playlist.title !== editFieldRef.current.value && editFieldRef.current.value) {
                          changePlaylistTitle(projectState?.projectSelect?.id, playlist.id, editFieldRef.current.value);
                        }
                        setEditTitle(false);
                      }}
                    />
                  </>
                ) : (
                  playlist.title
                )}
              </button>

              <div className="panel">
                <ul>
                  <Slider {...settings}>{activities}</Slider>
                </ul>
              </div>
            </div>
          )
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
              <div className="project-details">
                <div className="scene-img">
                  <Link to={`/org/${organization.currentOrganization?.domain}/project/${currentProject.id}`}>
                    {!currentProject.thumb_url?.includes('/storage/') ? (
                      <img src={currentProject.thumb_url} alt="thumbnail" />
                    ) : (
                      <img src={global.config.resourceUrl + currentProject.thumb_url} alt="thumbnail" />
                    )}
                  </Link>
                </div>
                <div className="project-title-desc">
                  <div className="project-title">
                    <h2>{currentProject.name}</h2>
                  </div>
                  <div className="project description">
                    <p className="expandiv">{currentProject.description}</p>
                  </div>
                </div>
              </div>
              <div className="sce_cont">
                <ul className="bar_list flex-div check">
                  <li>
                    <div className="team-name">{currentProject?.team?.name ? `Team Name: ${currentProject?.team?.name}` : null}</div>
                    <div className="title_lg check">
                      <div className="configuration">
                        <div className="config-content">
                          <div
                            onClick={() => {
                              if (history?.location?.state?.from?.includes('preview')) {
                                history.push(`/org/${organization.currentOrganization.domain}`);
                              } else {
                                history.push(`/org/${organization.currentOrganization?.domain}/project/${currentProject?.id}`);
                              }
                            }}
                            className="go-back-button-preview"
                          >
                            {/* <FontAwesomeIcon icon="undo" className="mr-2" /> */}
                            Close preview mode
                          </div>
                        </div>
                        {/* {activeShared && ( */}
                        {permission?.Project?.includes('project:share') && currentProject?.shared && (
                          <div
                            className="shared-link link-share"
                            onClick={() => {
                              if (window.gapi && window.gapi.sharetoclassroom) {
                                window.gapi.sharetoclassroom.go('croom');
                              }
                              const protocol = `${window.location.href.split('/')[0]}//`;
                              const url = `${protocol}${window.location.host}/project/${match.params.projectId}/shared`;
                              return SharePreviewPopup(url, currentProject.name);
                            }}
                          >
                            <FontAwesomeIcon icon="link" className="mr-2" />
                            Get shared link
                          </div>
                        )}
                        {/* )} */}
                      </div>
                    </div>
                  </li>
                </ul>

                <ul className="rating flex-div" />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="playlist-div">
              <div className="playlist-title-div">
                <div className="title-md playlist-title-card">Playlists</div>
              </div>
              <div className="all-playlist check-custom">
                <div className="playlist-accordion" id="custom_accordion">
                  {playlists}
                </div>
              </div>
            </div>
          </div>
          {showDeletePlaylistPopup && (
            <DeletePopup
              ui={ui}
              selectedProject={currentProject}
              deletePlaylist={deletePlaylist}
              // hideDeletePopup={hideDeletePopup}
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
  changePlaylistTitle: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  changePlaylistTitle: (projectId, id, title) => dispatch(changePlaylistTitleAction(projectId, id, title)),
});

export default withRouter(connect(null, mapDispatchToProps)(ProjectPreview));
