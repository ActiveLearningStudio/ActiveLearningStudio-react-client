import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SampleProjectCard = (props) => {
  const {
    projects,
  } = props;

  return (
    projects.map(project=>{  
     return <div className="col-md-3 check">
      <div className="program-tile">
        <div className="program-thumb">
          <Link to={`/project/${project.id}/shared`}>
            {project.thumb_url && (
              <div
                className="project-thumb"
                style={{
                  backgroundImage: project.thumb_url.includes('pexels.com')
                    ? `url(${project.thumb_url})`
                    : `url(${global.config.resourceUrl}${project.thumb_url})`,
                }}
              />
            )}
          </Link>
        </div>

        <div className="program-content">
          <div>
            <div className="row">
              <div className="col-md-10">
                <h3 className="program-title">
                  <Link to={`/project/${project.id}/shared`}>{project.name}</Link>
                </h3>
              </div>
            </div>

            <div className="lessons-duration">
              <div className="row">
                <div className="col-md-12">
                  <p>
                    {project.description && project.description.length > 130
                    ? `${project.description.substring(0, 130)} ...` : project.description}
                 </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    })
  );
};

SampleProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
};

export default SampleProjectCard;
