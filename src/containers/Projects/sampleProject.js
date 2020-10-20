/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProjectPreviewShared from 'containers/Preview/ProjectPreview/ProjectPreviewShared'
import MyVerticallyCenteredModal from 'components/models/activitySample';

const SampleProjectCard = (props) => {
  const {
    projects,
  } = props;

  const [selectId,setSelectId] = useState(null)
  const [modalShow, setModalShow] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);

  return (
    <>{!selectId?
      projects.map(project=>{  
      return <div className="col-md-3 check">
        <div className="program-tile">
          <div 
            className="program-thumb"
            onClick={()=>setSelectId(project.id)}  
          >
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
    :
    <div className="project-sample-share">
      <div className="btn-back" onClick={()=>setSelectId(null)} >Back</div>
      <ProjectPreviewShared
        sampleId={selectId}
        setModalShow={setModalShow}
        setCurrentActivity={setCurrentActivity}
      />
    </div> 
    }
     <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        activity={currentActivity}
     />
    </>
  );
};

SampleProjectCard.propTypes = {
  projects: PropTypes.object.isRequired,
};

export default SampleProjectCard;
