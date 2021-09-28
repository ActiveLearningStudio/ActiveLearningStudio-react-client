import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link, useHistory } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FadeDiv } from 'utils';
import { loadMyProjectsAction } from 'store/actions/project';
import { loadTeamAction, addProjectsAction, getTeamPermission } from 'store/actions/team';
// import Sidebar from 'components/Sidebar';
// import Header from 'components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';
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
  const historyback = useHistory();
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const { activeOrganization } = organization;
  const { teamPermission } = useSelector((state) => state.team);
  useEffect(() => {
    if (activeOrganization) {
      loadProjects();
    }
    loadTeam(teamId);
  }, [loadProjects, loadTeam, teamId, activeOrganization]);
  // Fetch team permission if page reloads
  useEffect(() => {
    if (Object.keys(teamPermission).length === 0 && organization?.currentOrganization?.id && teamId) {
      dispatch(getTeamPermission(organization?.currentOrganization?.id, teamId));
    }
  }, [team]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [searchProject, setSearchProject] = useState('');

  const filteredProjects = projects.filter(
    (p) => (team.selectedTeam.projects || []).findIndex((proj) => p.id === proj.id) === -1,
  );

  const handleSubmit = useCallback((projectIds) => {
    addProjects(
      teamId,
      projectIds,
    )
      .then((result) => {
        history.push(`/studio/org/${organization.currentOrganization?.domain}/teams/${teamId}/projects`);
        Swal.fire({
          icon: 'success',
          title: result?.message,
        });
      });
  }, [addProjects, teamId, history]);

  return (
    <>
      <div className="side-wrapper-team">
        <div className="bread-crumb">
          <div className="main-flex-top">
            <div>
              <span>Team</span>
              <FontAwesomeIcon icon="angle-right" />
              <span>Add Project</span>
            </div>
          </div>
          <Link className="back-button-main-page" onClick={() => historyback.goBack()}>
            <FontAwesomeIcon icon="chevron-left" />
            Back
          </Link>
        </div>
      </div>
      <div className="teams-page">
        <br />
        <br />
        <FadeDiv className="assign-projects">
          <div className="assign-projects-content">
            {teamPermission?.Team?.includes('team:add-project')
              ? (
                <AssignProject
                  isSaving={team.isLoading}
                  projects={filteredProjects}
                  handleSubmit={handleSubmit}
                  selectedProjects={selectedProjects}
                  setSelectedProjects={setSelectedProjects}
                  search={searchProject}
                  setSearch={setSearchProject}
                />
              )
              : <Alert variant="danger"> You are not authorized to add projects.</Alert>}

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
