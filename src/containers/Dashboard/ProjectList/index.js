import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';

import { getUserProjectsAction } from 'store/actions/dashboard';

import './styles.scss';

function ProjectList(props) {
  const { shared, projects, getUserProjects } = props;
  const [query, setQuery] = useState('');
  const organization = useSelector((state) => state.organization);
  useEffect(() => {
    getUserProjects(shared, query);
  }, [query]);

  return (
    <div className="dashboard-project-list">
      {shared ? (
        <Alert variant="info">
          A list of your
          <strong>shared</strong>
          {' '}
          shared projects.
        </Alert>
      ) : (
        <Alert variant="info">A list of all your projects</Alert>
      )}

      <div className="row">
        <div className="col-4">
          <div className="search-box container">
            <div className="row">
              <div className="col header p-2">
                <div className="row">
                  <div className="col">
                    <h2>Search My Projects</h2>
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
                <button type="button" className="btn src-btn mt-4">Search</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-8">
          {projects.length > 0 && projects.map((project) => (
            <div className="row m-4 pb-4 project-row">
              <div className="col-2 img-col">
                {project.thumb_url ? (
                  <img src={project.thumb_url.includes('pexels.com') ? project.thumb_url : global.config.resourceUrl + project.thumb_url} alt="" />
                ) : (
                  <img src="https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280" alt="" />
                )}
              </div>

              <div className="col">
                <h2>
                  <a href={`/studio/org/${organization.currentOrganization?.domain}/project/${project.id}`} target="_blank" rel="noreferrer">
                    {project.name}
                  </a>
                </h2>
                <p>{project.description}</p>
              </div>

              <div className="col-2 text-right">
                <a href={`/studio/org/${organization.currentOrganization?.domain}/project/${project.id}`} target="_blank" rel="noreferrer">
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

ProjectList.propTypes = {
  shared: PropTypes.bool,
  projects: PropTypes.array.isRequired,
  getUserProjects: PropTypes.func.isRequired,
};

ProjectList.defaultProps = {
  shared: false,
};

const mapStateToProps = (state) => ({
  projects: (state.dashboard) ? state.dashboard.projects : [],
});

const mapDispatchToProps = (dispatch) => ({
  getUserProjects: (shared, query) => dispatch(getUserProjectsAction(shared, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
