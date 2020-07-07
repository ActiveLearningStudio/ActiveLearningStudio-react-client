import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ActivityCard from '../ActivityCard';

import './style.scss';

const ProjectPreview = (props) => {
  const { project, match } = props;

  let currentProject = {
    name: '',
    description: '',
    thumb_url: '',
    playlists: [],
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
    setTimeout(() => {
      const acc = document
        .getElementById('custom_accordian')
        .getElementsByClassName('accordion');

      let i;

      for (i = 0; i < acc.length; i += 1) {
        acc[i].addEventListener('click', function () {
          // eslint-disable-next-line react/no-this-in-sfc
          this.classList.toggle('active');
        });
      }
    }, 2000);
  }, []);

  project.projects.forEach((proj) => {
    if (proj._id === match.params.projectId) {
      currentProject = proj;
    }
  });

  let playlists;

  if (currentProject !== null) {
    playlists = currentProject.playlists.map((playlist, counter) => {
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
          <button type="button" className={counter === 0 ? 'active accordion' : ' accordion'}>
            <FontAwesomeIcon icon="plus" />
            {playlist.title}
            {/* <Link to="">
              See All <FontAwesomeIcon icon="chevron-right" />
            </Link> */}
          </button>

          <div className="panel ">
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
      <div className="container">
        <div className="scne_div flex-wrap">
          <div className="sce_imgdiv">
            <Link to={`/project/${currentProject._id}`}>
              <img
                alt="thumbnail"
                src={global.config.laravelAPIUrl + currentProject.thumb_url}
              />
            </Link>
          </div>
          <div className="sce_cont">
            {/*
            <div className="collapsetogle">
              <img src="/assets.images/plusblk.png" alt="plusblk" title="" />
            </div>
            */}
            <ul className="bar_list flexdiv">
              <li>
                <div className="title_lg check">
                  <div>{currentProject.name}</div>
                  {/*
                  <div className="w3-border">
                    <div className="w3-grey" style={{ width: "35%" }}>
                      30%
                    </div>
                  </div>
                  */}
                  <Link to="/" className="go-back-button-preview">
                    <FontAwesomeIcon icon="undo" />
                    {' '}
                    Exit Preview Mode
                  </Link>
                </div>
              </li>
              <li>
                {/* <div className="usrcmt"><img src="/assets.images/heart.png" alt="heart" title=""></img>20</div> */}
              </li>
              <li>
                {/* <div className="usrcmt"><FontAwesomeIcon icon="user" /> 02</div> */}
              </li>
              <li>
                {/*
                <div className="bar flexdiv">
                  <div className="progress_bar">30%</div>
                  <div className="progress_div"></div>
                </div>
                */}
              </li>
            </ul>
            <ul className="rating flexdiv">
              {/*
              <li><FontAwesomeIcon icon="star" /></li>
              <li><FontAwesomeIcon icon="star" /></li>
              <li><FontAwesomeIcon icon="star" /></li>
              <li><FontAwesomeIcon icon="star" /></li>
              <li><FontAwesomeIcon icon="star" /></li>
              */}
            </ul>
            <p className="expandiv">{currentProject.description}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="playlist-div">
          <div className="play-title-div">
            <div className="title_md">Playlists</div>
          </div>
          <div className="all-playlist check-custom">
            <div className="playlist-accordion">
              {playlists}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectPreview.propTypes = {
  match: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

export default ProjectPreview;
