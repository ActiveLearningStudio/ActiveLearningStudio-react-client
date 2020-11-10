import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { deleteFavObj } from 'store/actions/project';
import { cloneProject } from 'store/actions/search';
import ProjectPreviewShared from 'containers/Preview/ProjectPreview/ProjectPreviewShared';
import MyVerticallyCenteredModal from 'components/models/activitySample';

const SampleProjectCard = (props) => {
  const {
    projects,
    type,
    setShowSampleSort,
  } = props;

  const dispatch = useDispatch();
  const [selectId, setSelectId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);

  useEffect(() => {
    if (selectId) {
      setShowSampleSort(false);
    }
  }, [selectId, setShowSampleSort]);

  return (
    <>
      {!selectId ? (
        projects.map((project) => (
          <div className="playlist-resource">
            <div className="col-md-3 check">
              <div className="program-tile">
                <div
                  className="program-thumb"
                  onClick={() => {
                    setSelectId(project.id);
                    setShowSampleSort(false);
                  }}
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
                          <Link
                            onClick={() => {
                              setSelectId(project.id);
                              setShowSampleSort(false);
                            }}
                          >
                            {project.name}
                          </Link>
                        </h3>
                      </div>

                      <div className="col-md-2">
                        <Dropdown className="project-dropdown check d-flex justify-content-center align-items-center">
                          <Dropdown.Toggle className="project-dropdown-btn project d-flex justify-content-center align-items-center">
                            <FontAwesomeIcon icon="ellipsis-v" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              as={Link}
                              onClick={() => setSelectId(project.id)}
                            >
                              <FontAwesomeIcon icon="eye" className="mr-2" />
                              Preview
                            </Dropdown.Item>

                            <Dropdown.Item
                              to="#"
                              onClick={() => {
                                Swal.showLoading();
                                cloneProject(project.id);
                              }}
                            >
                              <FontAwesomeIcon icon="clone" className="mr-2" />
                              Duplicate
                            </Dropdown.Item>

                            {type && (
                              <Dropdown.Item
                                to="#"
                                onClick={() => dispatch(deleteFavObj(project.id))}
                              >
                                <FontAwesomeIcon icon="times-circle" className="mr-2" />
                                Remove
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>

                    </div>

                    <div className="lessons-duration">
                      <div className="row">
                        <div className="col-md-12">
                          <p>
                            {project.description && project.description.length > 130
                              ? `${project.description.substring(0, 130)} ...`
                              : project.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="project-sample-share">
          <div
            className="btn-back"
            onClick={() => {
              setShowSampleSort(true);
              setSelectId(null);
            }}
          >
            Back
          </div>

          <ProjectPreviewShared
            sampleId={selectId}
            setModalShow={setModalShow}
            setCurrentActivity={setCurrentActivity}
          />
        </div>
      )}

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        activity={currentActivity}
      />
    </>
  );
};

SampleProjectCard.propTypes = {
  projects: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  setShowSampleSort: PropTypes.func.isRequired,
};

export default SampleProjectCard;
