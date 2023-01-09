import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Project from 'containers/LMS/Canvas/DeepLinking/Project';
import { getTeamsAction } from 'store/actions/canvas';
import gifloader from 'assets/images/dotsloader.gif';
import './style.scss';

const Teams = (props) => {
  const { match, teams, getTeams } = props;
  const params = new URL(window.location.href).searchParams;
  const email = params.get('user_email');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [filterTeamId, setFilterTeamId] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    getTeams({
      lti_client_id: match.params.ltiClientId,
      user_email: email,
    });
  }, [match]);

  return (
    <>
      {teams === null && (
        <div className="row">
          <div className="col text-center">
            <img style={{ width: '50px' }} src={gifloader} alt="" />
          </div>
        </div>
      )}
      {teams?.length === 0 && (
        <div className="row">
          <div className="col">
            <Alert variant="warning">No teams found.</Alert>
          </div>
        </div>
      )}
      {teams?.length > 0 && (
        <div className="row team-selector">
          <div className="col">
            <div className="form-group">
              <label>Filter by Team:</label>
              <select
                className="form-control"
                name="team"
                onChange={(e) => {
                  setFilterTeamId(e.target.value);
                }}
                defaultValue={filterTeamId}
              >
                <option value="all" key="all">
                  All teams
                </option>
                {teams.map((team) => (
                  <option value={team.id} key={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
      {teams?.length > 0 && teams.filter((team) => (filterTeamId === 'all' || filterTeamId === team.id.toString())).map((team) => (
        <div key={team.id} className={selectedTeam?.id === team.id ? 'team selected-team' : 'team'}>
          <div className="row team-container">
            <div className="col">
              <h1>{team.name}</h1>
              <p>{team.description}</p>
            </div>
            <div className="col text-right">
              <button className="btn btn-primary" type="button" onClick={() => setSelectedTeam(team)}>View Projects</button>
            </div>
          </div>
          {selectedTeam?.id === team.id && (
            <div className="projects-container">
              {selectedTeam?.projects?.length === 0 && <Alert variant="warning">No projects found.</Alert>}
              {selectedTeam?.projects?.length > 0 && selectedTeam.projects.map((project) => <Project project={project} key={project.id} />)}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

Teams.defaultProps = {
  teams: null,
};

Teams.propTypes = {
  match: PropTypes.object.isRequired,
  teams: PropTypes.array,
  getTeams: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  teams: state.canvas.teams,
});

const mapDispatchToProps = (dispatch) => ({
  getTeams: (params) => dispatch(getTeamsAction(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Teams));
