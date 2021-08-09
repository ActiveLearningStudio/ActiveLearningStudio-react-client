import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';

import { getUserActivitiesAction } from 'store/actions/dashboard';

import './styles.scss';

function ActivityList(props) {
  const { shared, activities, getUserActivities } = props;
  const organization = useSelector((state) => state.organization);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getUserActivities(shared, query);
  }, []);

  const handleSearchClick = () => {
    getUserActivities(shared, query);
  };

  return (
    <div className="dashboard-project-list">
      {shared ? (
        <Alert variant="info">
          A list of your
          <strong>shared</strong>
          {' '}
          shared activities.
        </Alert>
      ) : (
        <Alert variant="info">A list of all your activities</Alert>
      )}

      <div className="row">
        <div className="col-4">
          <div className="search-box container">
            <div className="row">
              <div className="col header p-2">
                <div className="row">
                  <div className="col">
                    <h2>Search My Activities</h2>
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
          {activities.length > 0 && activities.map((activity) => (
            <div className="row m-4 pb-4 project-row">
              <div className="col-2 img-col">
                {activity.thumb_url ? (
                  <img src={activity.thumb_url.includes('pexels.com') ? activity.thumb_url : global.config.resourceUrl + activity.thumb_url} alt="" />
                ) : (
                  <img src="https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280" alt="" />
                )}
              </div>

              <div className="col">
                <h2>
                  <a
                    href={`/studio/org/${organization.currentOrganization?.domain}/project/${activity.project_id}/playlist/${activity.playlist_id}/activity/${activity.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {activity.h5p_content.title}
                  </a>
                </h2>
                <p>{activity.description}</p>
              </div>

              <div className="col-2 text-right">
                <a href={`/studio/org/${organization.currentOrganization?.domain}/project/${activity.project_id}`} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon className="project-go-icon" icon="arrow-right" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ActivityList.propTypes = {
  shared: PropTypes.bool,
  activities: PropTypes.array.isRequired,
  getUserActivities: PropTypes.func.isRequired,
};

ActivityList.defaultProps = {
  shared: false,
};

const mapStateToProps = (state) => ({
  activities: (state.dashboard) ? state.dashboard.activities : [],
});

const mapDispatchToProps = (dispatch) => ({
  getUserActivities: (shared, query) => dispatch(getUserActivitiesAction(shared, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
