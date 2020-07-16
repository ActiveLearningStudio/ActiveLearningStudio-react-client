import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { loadMyProjectsActionPreviewShared } from 'store/actions/project';
import ActivityCard from '../ActivityCard';
import Unauthorized from '../Unauthorized';

import './style.scss';

function ProjectPreviewShared(props) {
  const { match, loadMyProjectsPreviewShared } = props;

  const projectFind = useSelector((state) => state);

  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    if (projectFind.project && Object.keys(projectFind.project.projectSelect).length > 0) {
      setCurrentProject(projectFind.project.projectSelect);
    }
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
      console.log(e);
    }
  });

  useEffect(() => {
    loadMyProjectsPreviewShared(match.params.projectId);
  }, [match.params.projectId, loadMyProjectsPreviewShared]);

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
            lti="true"
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
      {currentProject && currentProject.status === 'error' ? (
        <Unauthorized text="Project is not Public" />
      ) : (
        <>
          {currentProject && (
            <div>
              <div className="container">
                <div className="scne_div flex-wrap">
                  <div className="sce_imgdiv">
                    <Link to={`/project/${currentProject._id}`}>
                      <img
                        alt="thumbnail"
                        src={global.config.laravelAPIUrl + currentProject.thumbUrl}
                      />
                    </Link>
                  </div>
                  <div className="sce_cont">
                    {/* <div className="collapse-toggle"><img src="/images/plusblk.png" alt="plusblk" /></div> */}
                    <ul className="bar_list flexdiv">
                      <li>
                        <div className="title_lg check">
                          <div>
                            {' '}
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
                <div className="play_listdiv">
                  <div className="plytitle_div">
                    <div className="title_md">Playlists</div>
                  </div>
                  <div className="all_plylist check-custom">
                    <div className="playlist-accordion" id="custom_accordion">
                      {playlists}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

ProjectPreviewShared.propTypes = {
  match: PropTypes.object.isRequired,
  loadMyProjectsPreviewShared: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadMyProjectsPreviewShared: (projectId) => dispatch(loadMyProjectsActionPreviewShared(projectId)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(ProjectPreviewShared),
);
