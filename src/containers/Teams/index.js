/*eslint-disable*/
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap";
import {
  loadSubOrganizationTeamsAction,
  loadTeamsAction,
} from "store/actions/team";
// import Header from 'components/Header';
// import Sidebar from 'components/Sidebar';
// import filterImg from 'assets/images/svg/filter.svg';
import searchimg from "assets/images/svg/search-icon-admin-panel.svg";
import { Link } from "react-router-dom";
// import Swal from 'sweetalert2';
import {
  clearOrganizationState,
  getOrganization,
  getRoles,
} from "store/actions/organization";
import { loadLmsAction } from "store/actions/project";
import TeamView from "./TeamCard";
import ChannelPanel from "./Channel";
import "./style.scss";
import CreateTeamPopup from "./CreateTeamPopup";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

function TeamsPage(props) {
  const { location, teams, overview, channelShow, loadTeams, loadSubOrgTeams } =
    props;
  const organization = useSelector((state) => state.organization);
  const { selectedForClone } = useSelector((state) => state.team);
  const { activeOrganization, currentOrganization, permission } = organization;
  const [alertCheck, setAlertCheck] = useState(false);
  // const [breadCrumb, setBreadCrumb] = useState([]);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
          activeOrganization?.id === currentOrganization?.id &&
          permission?.Team &&
          !searchQuery
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

  const teamId = parseInt(location.pathname.split("teams/")[1], 10);
  const selectedTeam = teams.find((team) => team.id === teamId);
  const { notification } = useSelector((state) => state.notification);

  useEffect(() => {
    if (
      notification?.today[0]?.data.message.indexOf(selectedForClone) !== -1 &&
      activeOrganization?.id
    ) {
      dispatch(loadTeamsAction());
    }
  }, [notification?.today]);

  const searchQueryHandler = useCallback(() => {
    if (searchQuery) {
      loadTeams(searchQuery);
    }
  }, [loadTeams, searchQuery]);
  const primaryColor = getGlobalColor("--main-primary-color");
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
            {overview && (
              <div className="organization-name">
                {activeOrganization?.name}
              </div>
            )}
            <div>
              {overview && <h1 className="title-team">Teams</h1>}
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
                {permission?.Team?.includes("team:create") && overview && (
                  <div className="team-controller">
                    <div className="search-and-filters">
                      <div className="search-bar">
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Search team"
                          value={searchQuery}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              searchQueryHandler();
                            }
                          }}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {/* <img
                          src={searchimg}
                          alt="search"
                          onClick={searchQueryHandler}
                        /> */}
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={searchQueryHandler}
                        >
                          <path
                            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58175 3 3.00003 6.58172 3.00003 11C3.00003 15.4183 6.58175 19 11 19Z"
                            stroke={primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 20.9984L16.65 16.6484"
                            stroke={primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      {/* <div className="filter">
                        <img src={filterImg} alt="filter" />
                        Filter
                      </div> */}
                    </div>
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
                        Add Team
                      </div>
                    </div>
                  </div>
                )}
                {activeOrganization?.name !== currentOrganization?.name &&
                  overview && (
                    <Link
                      to={`/org/${organization?.currentOrganization?.domain}/teams`}
                      onClick={() => {
                        if (
                          permission?.Organization?.includes(
                            "organization:view"
                          )
                        ) {
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
                  {permission?.Team?.includes("team:view") ? (
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
                          No team available.{" "}
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
      {showCreateTeamModal && (
        <CreateTeamPopup setShowCreateTeamModal={setShowCreateTeamModal} />
      )}
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
