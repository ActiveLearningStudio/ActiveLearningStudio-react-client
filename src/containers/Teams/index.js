/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';
import { getTeamPermission, loadSubOrganizationTeamsAction, loadTeamsAction, getWhiteBoardUrl } from 'store/actions/team';
// import Header from 'components/Header';
// import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
import { Link, useHistory } from 'react-router-dom';
// import Swal from 'sweetalert2';
import CreateTeam from './CreateTeam';
import TeamView from './TeamCard';
import TeamMemberView from './TeamMemberView';
import TeamProjectView from './TeamProjectView';
import ChannelPanel from './Channel';

import './style.scss';
import { clearOrganizationState, getOrganization, getRoles } from 'store/actions/organization';
import { loadLmsAction } from 'store/actions/project';
import Buttons from "utils/Buttons/buttons";
import WhiteBoardModal from 'components/models/WhiteBoardModal';

// TODO: need to remove after connect API
const breadCrumbData = {
  creation: 'teams/create team',
  editMode: 'edit team',
  projectShow: 'projects',
  channelShow: 'projects',
  teamShow: 'teams',
};

function TeamsPage(props) {
  const { location, teams, overview, creation, teamShow, editMode, projectShow, channelShow, loadTeams, loadSubOrgTeams } = props;
  const organization = useSelector((state) => state.organization);
  const { teamPermission, selectedForClone } = useSelector((state) => state.team);
  const { activeOrganization, currentOrganization, permission } = organization;
  const [alertCheck, setAlertCheck] = useState(false);
  const [breadCrumb, setBreadCrumb] = useState([]);
  const [whiteBoardUrl, setWhiteBoardUrl] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const dataRedux = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(loadLmsAction());
      if (activeOrganization && currentOrganization) {
        if (activeOrganization?.id !== currentOrganization?.id) {
          await loadSubOrgTeams();
          setAlertCheck(true);
        } else if (activeOrganization?.id === currentOrganization?.id && permission?.Team) {
          await loadTeams();
          setAlertCheck(true);
        }
      }
    })();
  }, [loadTeams, loadSubOrgTeams, activeOrganization, currentOrganization, permission?.Team, setAlertCheck]);

  const status = creation ? 'creation' : editMode ? 'editMode' : teamShow ? 'teamShow' : projectShow ? 'projectShow' : overview ? 'teamShow' : 'channelShow';

  const teamId = parseInt(location.pathname.split('teams/')[1], 10);
  const selectedTeam = teams.find((team) => team.id === teamId);
  const { notification } = useSelector((state) => state.notification);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (notification?.today[0]?.data.message.indexOf(selectedForClone) !== -1) {
      dispatch(loadTeamsAction());
    }
  }, [notification?.today]);
  useEffect(() => {
    let crumb = breadCrumbData[status];
    if (teamShow && selectedTeam) {
      crumb += `/${selectedTeam.name} Members`;
    }

    setBreadCrumb(crumb.split('/'));
  }, [selectedTeam, status, teamShow, teams]);
  useEffect(() => {
    if (Object.keys(teamPermission).length === 0 && organization?.currentOrganization?.id && selectedTeam?.id) {
      dispatch(getTeamPermission(organization?.currentOrganization?.id, selectedTeam?.id));
    }
  }, [selectedTeam, teamPermission]);
  if (location.pathname.includes('teams/') && !selectedTeam && !creation) {
    return <></>;
  }

  const title = {
    creation: 'Create Team',
    editMode: 'Edit Team',
    teamShow: `${selectedTeam ? selectedTeam.name : 'Team'} Members`,
    projectShow: `${selectedTeam ? selectedTeam.name : 'Team'} Projects`,
    channelShow: 'Channels',
  };
  const goBack = () => {
    history.goBack();
  };

  const assignWhiteBoardUrl = (orgId, objId, userId, objType) =>{
    dispatch(getWhiteBoardUrl(orgId, objId, userId, objType));
  }

  useEffect(() => {
    if (dataRedux.team.whiteBoardUrl) {
      setWhiteBoardUrl(dataRedux.team.whiteBoardUrl);
      setLoading(false);
    }
  }, [dataRedux.team.whiteBoardUrl]);

  const handleShow = () => {
    setShow(true); //! state.show
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <div className="side-wrapper-team">
        <div className="bread-crumb">
          <div className="main-flex-top">
            {breadCrumb.map((node, index, these) => (
              <div key={node}>
                <span className={index + 1 < these.length ? '' : 'child'}>{node}</span>
                {index + 1 < these.length && <FontAwesomeIcon icon="angle-right" />}
              </div>
            ))}
          </div>
          {!overview && (
            <Link to="#" className="back-button-main-page" onClick={goBack}>
              <FontAwesomeIcon icon="chevron-left" />
              Back
            </Link>
          )}
        </div>
      </div>
      <div className="teams-page">
        <div className="content-wrapper">
          <div className="content">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h1 className={`title${projectShow ? ' project-title' : ''}${channelShow ? ' channel-title' : ''}`}>
                {overview ? `${activeOrganization?.name} Teams` : title[status] || 'Teams'}
              </h1>
              <div className="flex-button-top">
                  {projectShow && (
                  <Buttons
                    secondary={true}
                    text="Open White Board"
                    width="163px"
                    height="35px"
                    margin="15px 0 0 10px"
                    hover={true}
                    onClick={ () => { 
                      assignWhiteBoardUrl(organization.currentOrganization?.id, selectedTeam.id, auth.user?.id, 'team')
                      handleShow()
                    }}
                  />)}
                {teamPermission?.Team?.includes('team:add-project') && projectShow && (
                  <Link to={`/org/${organization.currentOrganization?.domain}/teams/${selectedTeam.id}/add-projects`}>
                    <div className="btn-top-page">
                      <FontAwesomeIcon icon="plus" className="mr-2" />
                      Add projects
                    </div>
                  </Link>
                )}
                {(teamPermission?.Team?.includes('team:add-team-user') || teamPermission?.Team?.includes('team:remove-team-user')) && projectShow && (
                  <Link to={`/org/${organization.currentOrganization?.domain}/teams/${selectedTeam.id}`}>
                    <div className="btn-top-page">Add/Remove Members</div>
                  </Link>
                )}
                {permission?.Team?.includes('team:create') && overview && (
                  <>
                    <Link to={`/org/${organization?.currentOrganization?.domain}/teams/create-team`}>
                      <div className="btn-top-page">
                        <FontAwesomeIcon icon="plus" className="mr-2" />
                        Create a Team
                      </div>
                    </Link>
                  </>
                )}
                {activeOrganization?.name !== currentOrganization?.name && overview && (
                  <Link to={`/org/${organization?.currentOrganization?.domain}/teams`} onClick={() => {
                    if (permission?.Organization?.includes('organization:view')) dispatch(getOrganization(currentOrganization?.id));
                    dispatch(clearOrganizationState());
                    dispatch(getRoles());
                  }}
                  >
                    <div className="btn-top-page">
                      <FontAwesomeIcon icon="arrow-left" className="mr-2" />
                      Show parent org teams
                    </div>
                  </Link>
                )}
                {projectShow && <></>}
              </div>
            </div>
            <>
              {overview && (
                <div className="row overview">
                  {permission?.Team?.includes('team:view') ? (
                    <>
                      {teams.length > 0 ? (
                        teams.map((team) => <TeamView key={team.id} team={team} />)
                      ) : !alertCheck ? (
                        <Alert className="alert-space" variant="primary">
                          Loading...
                        </Alert>
                      ) : (
                        <Alert className="alert-space" variant="warning">
                          No team available.{' '}
                        </Alert>
                      )}
                    </>
                  ) : (
                    <Alert className="alert-space" variant="danger">
                      You are not authorized to view teams.
                    </Alert>
                  )}
                </div>
              )}
              {(creation || editMode) && (
                <div className="row sub-content">
                  <CreateTeam editMode={editMode} selectedTeam={selectedTeam} />
                </div>
              )}
              {teamShow && selectedTeam && <TeamMemberView team={selectedTeam} />}
              {projectShow && selectedTeam && <TeamProjectView team={selectedTeam} />}
              {channelShow && selectedTeam && <ChannelPanel />}
            </>
          </div>
        </div>
      </div>
      <Footer />
      <WhiteBoardModal
        url={whiteBoardUrl}
        show={show} // {props.show}
        onHide={handleClose}
        loading={loading}
      />
    </>
  );
}

TeamsPage.propTypes = {
  location: PropTypes.object.isRequired,
  teams: PropTypes.array.isRequired,
  overview: PropTypes.bool,
  creation: PropTypes.bool,
  editMode: PropTypes.bool,
  teamShow: PropTypes.bool,
  projectShow: PropTypes.bool,
  channelShow: PropTypes.bool,
  loadTeams: PropTypes.func.isRequired,
  loadSubOrgTeams: PropTypes.func.isRequired,
};

TeamsPage.defaultProps = {
  overview: false,
  creation: false,
  editMode: false,
  teamShow: false,
  projectShow: false,
  channelShow: false,
};

const mapStateToProps = (state) => ({
  teams: state.team.teams,
});

const mapDispatchToProps = (dispatch) => ({
  loadTeams: () => dispatch(loadTeamsAction()),
  loadSubOrgTeams: () => dispatch(loadSubOrganizationTeamsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
