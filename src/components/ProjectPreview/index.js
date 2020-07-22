/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { connect, useSelector } from 'react-redux';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert';
// import { confirmAlert } from 'react-confirm-alert';
// import { EmailShareButton, FacebookShareButton, TwitterShareButton } from "react-share";
// import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";

import SharePreviewPopup from 'helpers/SharePreviewPopup';
import {
  loadMyProjectsActionPreview,
  toggleProjectShareAction,
  toggleProjectShareRemovedAction,
} from 'store/actions/project';
import ActivityCard from '../ActivityCard';

import './style.scss';

// const showPreviewURL = (url, projectName) => {
//   confirmAlert({
//     customUI: ({ onClose }) => {
//       return (
//         <div className="share-project-preview-url">
//           <h1>Your can now share project <strong>"{projectName}"</strong><br/>
//             Anyone with the link below can access your project:<br/>
//             <br/><a target="_blank" href={url}>{url}</a><br/></h1>
//           <hr/>
//           <div className="margin-bottom-20">
//             <span>
//               <FacebookShareButton url={url} className="share">
//                 <FacebookIcon size={32} round={true}/>
//               </FacebookShareButton>
//             </span>
//             <span className="margin-left-20 inline-block">Share this project on Facebook</span>
//           </div>
//           <div className="margin-bottom-20">
//             <span>
//               <TwitterShareButton
//                 url={url}
//                 title="test"
//                 className="Demo__some-network__share-button"
//               >
//                 <TwitterIcon size={32} round />
//               </TwitterShareButton>
//             </span>
//             <span className="margin-left-20 inline-block">Share this project on Twitter</span>
//           </div>
//           <div className="margin-bottom-20">
//             <span>
//               <EmailShareButton
//                 url={url}
//                 title="test"
//                 className="Demo__some-network__share-button"
//               >
//                 <EmailIcon size={32} round />
//               </EmailShareButton>
//             </span>
//             <span className="margin-left-20 inline-block">Share this project through email</span>
//           </div>
//           <div className="margin-bottom-20">
//             <span>
//               <div id="croom">
//                 <div class="g-sharetoclassroom" data-size="32" data-url={url}>Loading Classroom...</div>
//                 <span className="margin-left-20 inline-block">Share this project on Google Classroom</span>
//               </div>
//             </span>
//           </div>
//           <div className="close-btn">
//             <button onClick={onClose}>Ok</button>
//           </div>
//           <div className="google-script">
//             {setTimeout(function () {
//               window.gapi.sharetoclassroom.go("croom");
//             }, 1)}
//           </div>
//         </div>
//       );
//     }
//   });
// };

function ProjectPreview(props) {
  const {
    match,
    // project,
    loadMyProjectsPreview,
    toggleProjectShare,
    toggleProjectShareRemoved,
  } = props;

  const projectFind = useSelector((state) => state);

  const [currentProject, setCurrentProject] = useState(null);
  const [activeShared, setActiveShared] = useState(true);

  useEffect(() => {
    setCurrentProject(projectFind.project && projectFind.project.projectSelect);
  }, [projectFind.project]);

  useEffect(() => {
    setActiveShared(projectFind.project && projectFind.project.projectSelect.shared);
  }, [projectFind.project]);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 1,
  };

  useEffect(() => {
    try {
      const acc = document
        .getElementById('custom_accordion')
        .getElementsByClassName('accordion');

      let i;

      for (i = 0; i < acc.length; i += 1) {
        acc[i].addEventListener('click', function () {
          // eslint-disable-next-line react/no-this-in-sfc
          this.classList.toggle('active');
        });
      }
    } catch (e) {
      // console.log(e);
    }
  });

  useEffect(() => {
    loadMyProjectsPreview(match.params.projectId);
  }, [match.params.projectId, loadMyProjectsPreview]);

  // project.projects.forEach((project, i) => {
  //   if (project._id === match.params.projectId) {
  //     currentProject = project;
  //   }
  // });

  // currentProject = project.projects;

  let playlists;

  if (currentProject) {
    playlists = currentProject.playlists && currentProject.playlists.map((playlist, counter) => {
      let activities;
      if (playlist.activities.length > 0) {
        activities = playlist.activities.map((activity) => (
          <ActivityCard
            activity={activity}
            playlistId={playlist._id}
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
            className={counter === 0 ? 'active accordion' : ' accordion'}
          >
            <FontAwesomeIcon icon="plus" />
            {playlist.title}
            {/* <Link to="">See All <FontAwesomeIcon icon="chevron-right" /></Link> */}
          </button>

          <div className="panel">
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
                <div id="content" />
                <Link to={`/project/${currentProject._id}`}>
                  <img
                    alt="thumbnail"
                    src={global.config.laravelAPIUrl + currentProject.thumb_url}
                  />
                </Link>
              </div>

              <div className="sce_cont">
                {/* <div className="collapsetogle"><img src="/images/plusblk.png" alt="plusblk" /></div> */}
                <ul className="bar_list flexdiv">
                  <li>
                    <div className="title_lg check">
                      <div>
                        {currentProject.name}
                      </div>
                      {/* <div className="w3-border">
                        <div className="w3-grey" style={{ width: "35%" }}>
                          30%
                        </div>
                      </div> */}
                      <div className="configuration">
                        <Link to="/" className="go-back-button-preview">
                          <FontAwesomeIcon icon="undo" />
                          {' '}
                          Exit Preview Mode
                        </Link>

                        <div className="share-button">
                          Share Project
                          <Switch
                            onColor="#5952c6"
                            onChange={() => {
                              if (activeShared) {
                                Swal({
                                  icon: 'warning',
                                  title: `You are about to stop sharing <strong>"${currentProject.name}"</strong>`,
                                  html: 'Please remember that anyone you have shared this project with will no longer have access its contents. Do you want to continue?',
                                  showCloseButton: true,
                                  showCancelButton: true,
                                  focusConfirm: false,
                                  confirmButtonText: 'Stop Sharing!',
                                  confirmButtonAriaLabel: 'Stop Sharing!',
                                  cancelButtonText: 'Cancel',
                                  cancelButtonAriaLabel: 'Cancel',
                                }).then((resp) => {
                                  if (resp.isConfirmed) {
                                    toggleProjectShareRemoved(currentProject._id, currentProject.name);
                                    setActiveShared(!activeShared);
                                  }
                                });
                              } else {
                                toggleProjectShare(currentProject._id, currentProject.name);
                                setActiveShared(!activeShared);
                              }
                            }}
                            checked={activeShared}
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
                              window.gapi.sharetoclassroom.go('croom');

                              const protocol = `${window.location.href.split('/')[0]}//`;
                              const url = `${protocol + window.location.host}/project/shared/${match.params.projectId.trim()}`;
                              return SharePreviewPopup(url, currentProject.name);
                            }}
                          >
                            <FontAwesomeIcon icon="external-link" />
                            View Shared Link
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    {/* <div className="usrcmt"><img src="/images/heart.png" alt="heart" />20</div> */}
                  </li>
                  <li>
                    {/* <div className="usrcmt"><FontAwesomeIcon icon="user"></i> 02</div> */}
                  </li>
                  <li>
                    {/* <div className="bar flexdiv">
                      <div className="progress_bar"> 30%</div>
                      <div className="progress_div"></div>
                    </div> */}
                  </li>
                </ul>

                <ul className="rating flexdiv">
                  {/* <li><FontAwesomeIcon icon="star"></i> </li>
                  <li><FontAwesomeIcon icon="star"></i> </li>
                  <li><FontAwesomeIcon icon="star"></i> </li>
                  <li><FontAwesomeIcon icon="star"></i> </li>
                  <li><FontAwesomeIcon icon="star"></i> </li> */}
                </ul>

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
  project: PropTypes.object.isRequired,
  loadMyProjectsPreview: PropTypes.func.isRequired,
  toggleProjectShare: PropTypes.func.isRequired,
  toggleProjectShareRemoved: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadMyProjectsPreview: (projectId) => dispatch(loadMyProjectsActionPreview(projectId)),
  toggleProjectShare: (projectId) => dispatch(toggleProjectShareAction(projectId)),
  toggleProjectShareRemoved: (projectId) => dispatch(toggleProjectShareRemovedAction(projectId)),
});

export default connect(null, mapDispatchToProps)(ProjectPreview);
