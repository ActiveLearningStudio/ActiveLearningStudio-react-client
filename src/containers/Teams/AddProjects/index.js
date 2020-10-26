import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { FadeDiv } from 'utils';
import { loadMyProjectsAction } from 'store/actions/project';
import { loadTeamAction, addProjectsAction } from 'store/actions/team';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import AssignProject from '../CreateTeam/components/AssignProject';

import './style.scss';

function AddProjectsPage(props) {
  const {
    history,
    match: { params: { teamId } },
    team,
    projects,
    loadProjects,
    loadTeam,
    addProjects,
  } = props;

  useEffect(() => {
    loadProjects();
    loadTeam(teamId);
  }, [loadProjects, loadTeam, teamId]);

  const filteredProjects = projects.filter(
    (p) => (team.selectedTeam.projects || []).findIndex((proj) => p.id === proj.id) === -1,
  );

  const handleSubmit = useCallback((projectIds) => {
    addProjects(
      teamId,
      projectIds,
    )
      .then(() => {
        history.push(`/teams/${teamId}/projects`);
      })
      .catch(() => {});
  }, [addProjects, teamId, history]);

  return (
    <>
      <Header {...props} />

      <div className="teams-page main-content-wrapper">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>

        <FadeDiv className="assign-projects">
          <div className="assign-projects-content">
            <AssignProject
              isSaving={team.isLoading}
              projects={filteredProjects}
              handleSubmit={handleSubmit}
            />
          </div>
        </FadeDiv>
      </div>
    </>
  );
}

AddProjectsPage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  loadProjects: PropTypes.func.isRequired,
  loadTeam: PropTypes.func.isRequired,
  addProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  team: state.team,
  projects: state.project.projects,
});

const mapDispatchToProps = (dispatch) => ({
  loadProjects: () => dispatch(loadMyProjectsAction()),
  loadTeam: (teamId) => dispatch(loadTeamAction(teamId)),
  addProjects: (teamId, ids) => dispatch(addProjectsAction(teamId, ids)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProjectsPage));
