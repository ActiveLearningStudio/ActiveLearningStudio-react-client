import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Card } from 'react-bootstrap';
import Slider from 'react-slick';

import { getUserPlaylistsAction } from 'store/actions/dashboard';

import './styles.scss';

function PlaylistList(props) {
  const { shared, playlists, getUserPlaylists } = props;
  const organization = useSelector((state) => state.organization);
  const [query, setQuery] = useState('');

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getUserPlaylists(shared, query);
  }, []);

  const handleSearchClick = () => {
    getUserPlaylists(shared, query);
  };

  return (
    <div className="dashboard-project-list">
      {shared ? (
        <Alert variant="info">
          A list of your
          <strong>shared</strong>
          {' '}
          shared playlists.
        </Alert>
      ) : (
        <Alert variant="info">A list of all your playlists</Alert>
      )}

      <div className="row">
        <div className="col-4">
          <div className="search-box container">
            <div className="row">
              <div className="col header p-2">
                <div className="row">
                  <div className="col">
                    <h2>Search My Playlists</h2>
                  </div>
                  <div className="col text-right">
                    <FontAwesomeIcon icon="search" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col p-4">
                <input type="text" placeholder="Search" onChange={(e) => setQuery(e.currentTarget.value)} />
                <button type="button" className="btn src-btn mt-4" onClick={handleSearchClick}>Search</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-8">
          {playlists.length > 0 && playlists.map((playlist) => (
            <div className="row playlist m-2 p-2">
              <div className="col">
                <div className="row">
                  <div className="col">
                    <h3 className="playlist-title">{playlist.title}</h3>
                  </div>
                  <div className="col-1 text-right">
                    <a href={`/studio/org/${organization.currentOrganization?.domain}/project/${playlist.project_id}`} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon className="project-go-icon" icon="arrow-right" />
                    </a>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    {playlist.activities.length === 0 && (
                      <Alert variant="info">This playlist is empty.</Alert>
                    )}

                    {playlist.activities.length > 0 && (
                      <Slider {...sliderSettings}>
                        {playlist.activities.map((activity) => (
                          <li className="activity p-2">
                            <Card className="activity-card">
                              {activity.thumb_url ? (
                                <img
                                  className="card-img-top"
                                  src={activity.thumb_url.includes('pexels.com') ? activity.thumb_url : global.config.resourceUrl + activity.thumb_url}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className="card-img-top"
                                  src="https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280"
                                  alt=""
                                />
                              )}

                              <Card.Body>
                                <Card.Title className="activity-card-title">{activity.h5p_content.title}</Card.Title>
                              </Card.Body>
                            </Card>
                          </li>
                        ))}
                      </Slider>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

PlaylistList.propTypes = {
  shared: PropTypes.bool,
  playlists: PropTypes.array.isRequired,
  getUserPlaylists: PropTypes.func.isRequired,
};

PlaylistList.defaultProps = {
  shared: false,
};

const mapStateToProps = (state) => ({
  playlists: (state.dashboard) ? state.dashboard.playlists : [],
});

const mapDispatchToProps = (dispatch) => ({
  getUserPlaylists: (shared, query) => dispatch(getUserPlaylistsAction(shared, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);
