import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import { FadeDiv } from 'utils';
import { loadMyProjectsAction } from 'store/actions/project';
import { loadGroupAction, addProjectsAction } from 'store/actions/group';
// import Sidebar from 'components/Sidebar';
// import Header from 'components/Header';
import { Alert } from 'react-bootstrap';
import AssignProject from '../CreateGroup/components/AssignProject';

import './style.scss';

function AddProjectsPage(props) {
  const {
    history,
    match: { params: { groupId } },
    group,
    projects,
    loadProjects,
    loadGroup,
    addProjects,
  } = props;

  useEffect(() => {
    loadProjects();
    loadGroup(groupId);
  }, [loadProjects, loadGroup, groupId]);
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [searchProject, setSearchProject] = useState('');

  const filteredProjects = projects.filter(
    (p) => (group.selectedGroup.projects || []).findIndex((proj) => p.id === proj.id) === -1,
  );

  const handleSubmit = useCallback((projectIds) => {
    addProjects(
      groupId,
      projectIds,
    )
      .then(() => {
        history.push(`/studio/org/${organization.currentOrganization?.domain}/groups/${groupId}/projects`);
      })
      .catch(() => {});
  }, [addProjects, groupId, history]);

  return (
    <>
      <div className="groups-page">
        <FadeDiv className="assign-projects">
          <div className="assign-projects-content">
            {permission?.Group?.includes('group:add-projects')
              ? (
                <AssignProject
                  isSaving={group.isLoading}
                  projects={filteredProjects}
                  handleSubmit={handleSubmit}
                  selectedProjects={selectedProjects}
                  setSelectedProjects={setSelectedProjects}
                  search={searchProject}
                  setSearch={setSearchProject}
                />
              )
              : <Alert variant="danger">You are not authorized to add projects.</Alert>}
          </div>
        </FadeDiv>
      </div>
    </>
  );
}

AddProjectsPage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  loadProjects: PropTypes.func.isRequired,
  loadGroup: PropTypes.func.isRequired,
  addProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  projects: state.project.projects,
});

const mapDispatchToProps = (dispatch) => ({
  loadProjects: () => dispatch(loadMyProjectsAction()),
  loadGroup: (groupId) => dispatch(loadGroupAction(groupId)),
  addProjects: (groupId, ids) => dispatch(addProjectsAction(groupId, ids)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProjectsPage));
