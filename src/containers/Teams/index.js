import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';
import {
  getTeamPermission,
  loadSubOrganizationTeamsAction,
  loadTeamsAction,
  getWhiteBoardUrl,
  updateSelectedTeamAction,
} from 'store/actions/team';
// import Header from 'components/Header';
// import Sidebar from 'components/Sidebar';
// import filterImg from 'assets/images/svg/filter.svg';
import searchimg from 'assets/images/svg/search-icon-admin-panel.svg';
import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
import Buttons from 'utils/Buttons/buttons';
import WhiteBoardModal from 'components/models/WhiteBoardModal';
import {
  clearOrganizationState,
  getOrganization,
  getRoles,
} from 'store/actions/organization';
import { loadLmsAction } from 'store/actions/project';
import TeamView from './TeamCard';
// import TeamMemberView from './TeamMemberView';
import TeamAddProjects from './TeamAddProjects';
import ChannelPanel from './Channel';

import './style.scss';
import CreateTeamPopup from './CreateTeamPopup';
import TeamDetail from './TeamDetailView';

function TeamsPage(props) {
  const {
    location, teams, overview, teamShow, projectShow, channelShow, loadTeams, loadSubOrgTeams, updateSelectedTeam, creationTeam, newTeam,
  } = props;
  const organization = useSelector((state) => state.organization);
  const { teamPermission, selectedForClone } = useSelector((state) => state.team);
  const { activeOrganization, currentOrganization, permission } = organization;
  const [alertCheck, setAlertCheck] = useState(false);
  // const [breadCrumb, setBreadCrumb] = useState([]);
  const [whiteBoardUrl, setWhiteBoardUrl] = useState([]);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [creationMode, setCreationMode] = useState(false);
  const dataRedux = useSelector((state) => state);
  // const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (activeOrganization && currentOrganization) {
        if (activeOrganization?.id !== currentOrganization?.id) {
          dispatch(loadLmsAction());
          await loadSubOrgTeams();
          setAlertCheck(true);
        } else if (
          activeOrganization?.id === currentOrganization?.id
          && permission?.Team
          && !searchQuery
        ) {
          dispatch(loadLmsAction());
          await loadTeams();
          setAlertCheck(true);
        }
      }
    })();
  }, [
    loadTeams,
    loadSubOrgTeams,
    activeOrganization,
    currentOrganization,
    permission?.Team,
    setAlertCheck,
    searchQuery,
  ]);

  const teamId = parseInt(location.pathname.split('teams/')[1], 10);
  const selectedTeam = teams.find((team) => team.id === teamId);
  const { notification } = useSelector((state) => state.notification);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (selectedTeam?.id) {
      updateSelectedTeam(selectedTeam);
    }
  }, [selectedTeam]);
  useEffect(() => {
    if (
      notification?.today[0]?.data.message.indexOf(selectedForClone) !== -1
      && activeOrganization?.id
    ) {
      dispatch(loadTeamsAction());
    }
  }, [notification?.today]);

  useEffect(() => {
    if (
      Object.keys(teamPermission).length === 0
      && organization?.currentOrganization?.id
      && selectedTeam?.id
    ) {
      dispatch(getTeamPermission(organization?.currentOrganization?.id, selectedTeam?.id));
    }
  }, [dispatch, organization?.currentOrganization?.id, selectedTeam, teamPermission]);
  useEffect(() => {
    if (dataRedux.team.whiteBoardUrl) {
      setWhiteBoardUrl(dataRedux.team.whiteBoardUrl);
      setLoading(false);
    }
  }, [dataRedux.team.whiteBoardUrl]);
  const searchQueryHandler = useCallback(() => {
    if (searchQuery) {
      loadTeams(searchQuery);
    }
  }, [loadTeams, searchQuery]);

  const assignWhiteBoardUrl = (orgId, objId, userId, objType) => {
    dispatch(getWhiteBoardUrl(orgId, objId, userId, objType));
  };

  const handleShow = () => {
    setShow(true); //! state.show
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {/* <div className="side-wrapper-team">
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
      </div> */}
      <div className="teams-page">
        <div className="content">
          <div className="inner-content">
            {overview && !creationMode && <div className="organization-name">{currentOrganization?.name}</div>}
            <div>
              {overview && !creationMode
                && (
                  <h1
                    className="title-team"
                  >
                    Teams
                  </h1>
                )}
              <div className="flex-button-top">
                {/* {teamPermission?.Team?.includes('team:add-project')
                  && projectShow && (
                    <Link
                      to={`/org/${organization.currentOrganization?.domain}/teams/${selectedTeam.id}/add-projects`}
                    >
                      <div className="btn-top-page">
                        <FontAwesomeIcon icon="plus" className="mr-2" />
                        Add projects
                      </div>
                    </Link>
                  )}
                {(teamPermission?.Team?.includes('team:add-team-user')
                  || teamPermission?.Team?.includes('team:remove-team-user'))
                  && projectShow && (
                    <Link
                      to={`/org/${organization.currentOrganization?.domain}/teams/${selectedTeam.id}`}
                    >
                      <div className="btn-top-page">Add/Remove Members</div>
                    </Link>
                  )} */}
                {permission?.Team?.includes('team:create') && !creationMode && overview && (
                  <div className="team-controller">
                    <div className="search-and-filters">
                      <div className="search-bar">
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Search team"
                          value={searchQuery}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              searchQueryHandler();
                            }
                          }}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <img
                          src={searchimg}
                          alt="search"
                          onClick={searchQueryHandler}
                        />
                      </div>
                      {/* <div className="filter">
                        <img src={filterImg} alt="filter" />
                        Filter
                      </div> */}
                    </div>
                    <Buttons
                      type="button"
                      secondary
                      text="Create White Board"
                      width="163px"
                      height="35px"
                      // margin="15px 0 0 10px"
                      hover
                      onClick={() => {
                        assignWhiteBoardUrl(
                          organization.currentOrganization?.id,
                          1,
                          auth.user?.id,
                          'team',
                        );
                        handleShow();
                      }}
                    />
                    {/* <Link
                      to={`/org/${organization?.currentOrganization?.domain}/teams/create-team-design`}
                    >
                      <div className="btn-top-page">
                        <FontAwesomeIcon icon="plus" />
                        Add Team
                      </div>
                    </Link> */}
                    <div
                      onClick={() => {
                        setShowCreateTeamModal(true);
                      }}
                    >
                      <div className="btn-top-page">
                        <FontAwesomeIcon icon="plus" className="mr-2" />
                        Create a Team
                      </div>
                    </div>
                  </div>
                )}
                {activeOrganization?.name !== currentOrganization?.name
                  && overview && !creationMode && (
                    <Link
                      to={`/org/${organization?.currentOrganization?.domain}/teams`}
                      onClick={() => {
                        if (permission?.Organization?.includes('organization:view')) {
                          dispatch(getOrganization(currentOrganization?.id));
                          dispatch(clearOrganizationState());
                          dispatch(getRoles());
                        }
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
              {overview && !creationMode && (
                <div className="team-row overview">
                  {permission?.Team?.includes('team:view') ? (
                    <>
                      {teams.length > 0 ? (
                        teams.map((team) => (
                          <TeamView key={team.id} team={team} />
                        ))
                      ) : !alertCheck ? (
                        <Alert className="alert-space" variant="primary">
                          Loading...
                        </Alert>
                      ) : (
                        <Alert className="alert-space" variant="warning">
                          No team available.
                          {' '}
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
              {/* {(creation || editMode) && (
                <div className="row sub-content">
                  <CreateTeam editMode={editMode} selectedTeam={selectedTeam} />
                </div>
              )} */}
              {teamShow && selectedTeam && activeOrganization && (
                <TeamDetail team={selectedTeam} organization={activeOrganization} />
              )}
              {creationMode && !showCreateTeamModal && activeOrganization && (
                <TeamDetail team={selectedTeam} organization={activeOrganization} setCreationMode={setCreationMode} />
              )}
              {projectShow && selectedTeam && activeOrganization && (
                <TeamAddProjects team={selectedTeam} organization={activeOrganization} />
              )}
              {creationTeam && newTeam?.name && activeOrganization && (
                <TeamAddProjects team={newTeam} organization={activeOrganization} setCreationMode={setCreationMode} />
              )}
              {channelShow && selectedTeam && <ChannelPanel />}
            </>
          </div>
        </div>
      </div>
      {showCreateTeamModal && (
        <CreateTeamPopup setShowCreateTeamModal={setShowCreateTeamModal} setCreationMode={setCreationMode} />
      )}
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
  teamShow: PropTypes.bool,
  projectShow: PropTypes.bool,
  channelShow: PropTypes.bool,
  creationTeam: PropTypes.bool,
  loadTeams: PropTypes.func.isRequired,
  loadSubOrgTeams: PropTypes.func.isRequired,
  updateSelectedTeam: PropTypes.func.isRequired,
  newTeam: PropTypes.object,

};

TeamsPage.defaultProps = {
  overview: false,
  teamShow: false,
  projectShow: false,
  channelShow: false,
  creationTeam: false,
  newTeam: {},
};

const mapStateToProps = (state) => ({
  teams: state.team.teams,
  newTeam: state.team.newTeam,
});

const mapDispatchToProps = (dispatch) => ({
  loadTeams: (query) => dispatch(loadTeamsAction(query)),
  loadSubOrgTeams: () => dispatch(loadSubOrganizationTeamsAction()),
  updateSelectedTeam: (team) => dispatch(updateSelectedTeamAction(team)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
