import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';

import { getUserProjectsAction } from 'store/actions/dashboard';
import './styles.scss';

function ProjectList(props) {
  const { shared, projects, getUserProjects } = props;

  useEffect(() => {
    getUserProjects(shared);
  }, []);

  return (
    <div className="dashboard-project-list">
      { shared ? 
          <Alert variant='info'>A list of your <strong>shared</strong> shared projects.</Alert>
        :
          <Alert variant='info'>A list of all your projects</Alert>
      }
      {projects.length > 0 && projects.map(project => (
          <div className="row m-4 pb-4 project-row">
            <div className="col-2 img-col">
              {project.thumb_url ? (
                <img src={project.thumb_url.includes('pexels.com') ? project.thumb_url : global.config.resourceUrl + project.thumb_url }/>
              ) : (
                <img src='https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280'/>
              )}
            </div>
            <div className="col">
              <h2>
                <a href={`/project/${project.id}`} target="_blank" >
                  {project.name}
                </a>
              </h2>
              <p>{project.description}</p>
            </div>
            <div className="col-2 text-right">
              <a href={`/project/${project.id}`} target="_blank" >
                <FontAwesomeIcon className="project-go-icon" icon="arrow-right"/>
              </a>
            </div>
          </div>
        ))}
    </div>
  );
}

ProjectList.propTypes = {
    shared: PropTypes.bool,
};

ProjectList.defaultProps = {
  shared: false,
};

const mapStateToProps = (state) => ({
  projects: (state.dashboard) ? state.dashboard.projects : []
});

const mapDispatchToProps = (dispatch) => ({
  getUserProjects: (shared) => dispatch(getUserProjectsAction(shared)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);