/* eslint-disable import/order */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { loadSubOrganizationTeamsAction, loadTeamsAction } from 'store/actions/team';
import { clearOrganizationState, getOrganization, getRoles } from 'store/actions/organization';
import { loadLmsAction } from 'store/actions/project';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import TeamView from './TeamCard';
import ChannelPanel from './Channel';
import './style.scss';
import CreateTeamPopup from './CreateTeamPopup';
import SearchInputMdSvg from 'iconLibrary/mainContainer/SearchInputMdSvg';

function TeamsPage(props) {
  // eslint-disable-next-line object-curly-newline
  const { location, teams, overview, channelShow, loadTeams, loadSubOrgTeams } = props;
  const organization = useSelector((state) => state.organization);
  const { selectedForClone } = useSelector((state) => state.team);
  const { activeOrganization, currentOrganization, permission } = organization;
  const [alertCheck, setAlertCheck] = useState(false);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const hideShowSideBar = useSelector((state) => state.msTeams.toggle_sidebar);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (activeOrganization && currentOrganization) {
        if (activeOrganization?.id !== currentOrganization?.id) {
          dispatch(loadLmsAction());
          await loadSubOrgTeams();
          setAlertCheck(true);
        } else if (activeOrganization?.id === currentOrganization?.id && permission?.Team && !searchQuery) {
          dispatch(loadLmsAction());
          await loadTeams();
          setAlertCheck(true);
        }
      }
    })();
  }, [loadTeams, dispatch, loadSubOrgTeams, activeOrganization, currentOrganization, permission?.Team, setAlertCheck, searchQuery]);

  const teamId = parseInt(location.pathname.split('teams/')[1], 10);
  const selectedTeam = teams.find((team) => team.id === teamId);
  const { notification } = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification?.today[0]?.data.message.indexOf(selectedForClone) !== -1 && activeOrganization?.id) {
      dispatch(loadTeamsAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification?.today]);

  const searchQueryHandler = useCallback(() => {
    if (searchQuery) {
      loadTeams(searchQuery);
    }
  }, [loadTeams, searchQuery]);
  const primaryColor = getGlobalColor('--main-primary-color');
  const secondaryColor = getGlobalColor('--main-secondary-color');
  return (
    <>
      <div className="teams-page">
        <div className={`content ${hideShowSideBar == true ? 'expend-content-menu' : ''}`}>
          <div className="inner-content">
            {overview && <div className="organization-name">{activeOrganization?.name}</div>}
            <div>
              {overview && <h1 className="title-team">Teams</h1>}
              <div className="flex-button-top">
                {permission?.Team?.includes('team:create') && overview && (
                  <div className="team-controller">
                    <div className="search-and-filters">
                      <div className="search-bar">
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Search team"
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            // searchQueryHandler();
                          }}
                          onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                              searchQueryHandler();
                            }
                          }}
                        />
                        <SearchInputMdSvg primaryColor={primaryColor} onClick={searchQueryHandler} style={{ cursor: 'pointer' }} />
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setShowCreateTeamModal(true);
                      }}
                    >
                      <div className="btn-top-page">
                        <FontAwesomeIcon icon="plus" className="mr-2" color={secondaryColor} />
                        Add Team
                      </div>
                    </div>
                  </div>
                )}
                {activeOrganization?.name !== currentOrganization?.name && overview && (
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
              </div>
            </div>
            <>
              {overview && (
                <div className="team-row overview">
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
                          No team available.
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
              {channelShow && selectedTeam && <ChannelPanel />}
            </>
          </div>
        </div>
      </div>
      {showCreateTeamModal && <CreateTeamPopup setShowCreateTeamModal={setShowCreateTeamModal} />}
    </>
  );
}

TeamsPage.propTypes = {
  location: PropTypes.object.isRequired,
  teams: PropTypes.array.isRequired,
  overview: PropTypes.bool,
  channelShow: PropTypes.bool,
  loadTeams: PropTypes.func.isRequired,
  loadSubOrgTeams: PropTypes.func.isRequired,
};

TeamsPage.defaultProps = {
  overview: false,
  channelShow: false,
};

const mapStateToProps = (state) => ({
  teams: state.team.teams,
  newTeam: state.team.newTeam,
});

const mapDispatchToProps = (dispatch) => ({
  loadTeams: (query) => dispatch(loadTeamsAction(query)),
  loadSubOrgTeams: () => dispatch(loadSubOrganizationTeamsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
