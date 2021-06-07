import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FadeDiv } from 'utils';

import './style.scss';

function AssignProject(props) {
  const {
    isSaving,
    projects,
    handleSubmit,
    selectedProjects,
    setSelectedProjects,
    search,
    setSearch,
  } = props;

  const onChange = useCallback((e) => {
    setSearch(e.target.value);
  }, [setSearch]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const selectProject = useCallback((projectId) => {
    const newProjects = [...selectedProjects];
    const projectIndex = newProjects.indexOf(projectId);
    if (projectIndex === -1) {
      setSelectedProjects([...newProjects, projectId]);
    } else {
      newProjects.splice(projectIndex, 1);
      setSelectedProjects(newProjects);
    }
  }, [selectedProjects]);

  const onFinish = useCallback(() => {
    handleSubmit(selectedProjects);
  }, [selectedProjects, handleSubmit]);
  useEffect(() => {
    if (projects) {
      setFilteredProjects(projects.filter((project) => project.name.toLowerCase().includes(search.toLowerCase())));
    }
  }, [projects, search]);

  const finishButton = (
    <button
      type="button"
      className="create-group-submit-btn"
      disabled={isSaving}
      onClick={onFinish}
    >
      Finish

      {isSaving && (
        <FontAwesomeIcon icon="spinner" />
      )}
    </button>
  );

  return (
    <div className="group-information">
      <FadeDiv>
        <div className="title-box">
          <h2 className="title">Add/Assign Project</h2>
          <div className="title-cross" />
          {finishButton}
        </div>

        <div className="assign-project-wrapper">
          <div className="search-box">
            <input
              type="text"
              placeholder="Filter by name"
              value={search}
              onChange={onChange}
            />
          </div>

          <div className="assign-projects">
            {filteredProjects.length > 0 ? filteredProjects.map((project) => (
              <div
                key={project.id}
                className="assign-project-item"
                onClick={() => selectProject(project.id)}
              >
                <div
                  className="project-img"
                  style={{
                    backgroundImage: project.thumb_url.includes('pexels.com')
                      ? `url(${project.thumb_url})`
                      : `url(${global.config.resourceUrl}${project.thumb_url})`,
                  }}
                />

                <div className="assign-project-radio">
                  {selectedProjects.indexOf(project.id) > -1 && (
                    <span className="checkmark" />
                  )}
                </div>

                <div className="assign-project-title">
                  {project.name}
                </div>
              </div>
            )) : <div> No Project Found. </div> }
          </div>

          {finishButton}
        </div>
      </FadeDiv>
    </div>
  );
}

AssignProject.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
  selectedProjects: PropTypes.array,
  search: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  setSelectedProjects: PropTypes.func.isRequired,
};

AssignProject.defaultProps = {
  selectedProjects: [],
  search: '',
};

export default AssignProject;
