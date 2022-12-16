/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';

import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import teamicon from 'assets/images/sidebar/users-team.svg';
import administrate from 'assets/images/sidebar/administrate.png';
import foldericon from 'assets/images/svg/projectFolder.svg';
// import { allSidebarProjects } from 'store/actions/project';
import interactiveVideo from 'assets/images/svg/Interactivevideos.svg';
import { allSidebarProjects } from 'store/actions/project';
import instanceadmin from 'assets/images/Instanceadmin.svg';
import { clearSearch } from 'store/actions/search';
import './style.scss';
import { clearFormData } from 'store/actions/playlist';

import { clearTeamPermissions } from 'store/actions/team';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import MyActivitySvg from 'iconLibrary/sideBar/MyActivitySvg';
import MyProjectSvg from 'iconLibrary/sideBar/MyProjectSvg';
import MyInteractiveVideoSvg from 'iconLibrary/sideBar/MyInteractiveVideoSvg';
import ExploreLibrarySvg from 'iconLibrary/sideBar/ExploreLibrarySvg';
import TeamSvg from 'iconLibrary/sideBar/TeamSvg';
import AdminSvg from 'iconLibrary/sideBar/AdminSvg';
import InstanceAdminSvg from 'iconLibrary/sideBar/InstanceAdminSvg';
import RecordSvg from 'iconLibrary/sideBar/RecordSvg';

const PROJECTS = 'projects';
const CHANNEL = 'channel';

function Sidebar(props) {
  const { location } = props;
  const active = useMemo(() => location.pathname, [location]);
  const dispatch = useDispatch();

  const allState = useSelector((state) => state);
  useEffect(() => {
    document.body.classList.add('collapsed');
  }, []);

  const organization = useSelector((state) => state.organization);
  const { permission, currentOrganization } = organization;

  useEffect(() => {
    if (location.pathname.includes('teams/')) {
      const teamId = parseInt(location.pathname.split('teams/')[1], 10);
      if (teamId) {
        // setSelectedTeam(teamId);

        if (location.pathname.includes(PROJECTS)) {
          // setSelectedCategory(PROJECTS);
        } else if (location.pathname.includes(CHANNEL)) {
          // setSelectedCategory(CHANNEL);
        } else {
          // setSelectedCategory(TEAM);
        }
      }
    }
  }, [location.pathname]);

  // useEffect(() => {
  //   if (!allState.sidebar.isLoaded && organization.activeOrganization) {
  //     dispatch(allSidebarProjects());
  //   }
  // }, [allState.sidebar.isLoaded, organization.activeOrganization, dispatch]);
  const clearStatesOnSidebarClick = () => {
    dispatch(clearFormData());
    dispatch(clearSearch());
    dispatch({
      type: 'SET_ACTIVE_VIDEO_SCREEN',
      payload: '',
    });
    dispatch({
      type: 'SET_ACTIVE_ACTIVITY_SCREEN',
      payload: '',
    });
  };

  // const [primaryColor, setPrimaryColor] = useState(
  //   getGlobalColor("--main-primary-color")
  // );
  const primaryColor = getGlobalColor('--main-primary-color');

  return (
    <aside className="sidebar-all">
      {permission?.['Independent Activity']?.includes('independent-activity:view-author') && (
        <>
          <Link
            to={`/org/${allState.organization.currentOrganization?.domain}/activities`}
            onClick={() => {
              clearStatesOnSidebarClick();
              dispatch(clearTeamPermissions());
            }}
          >
            <div className={active === `/org/${allState.organization.currentOrganization?.domain}/activities` ? 'row-sidebar activeLink' : 'row-sidebar'}>
              <MyActivitySvg primaryColor={primaryColor} />
              <div className="sidebar-headings">My Activities</div>
            </div>
          </Link>
        </>
      )}
      {permission?.Project?.includes('project:view') && (
        <>
          <Link
            to={`/org/${allState.organization.currentOrganization?.domain}`}
            onClick={() => {
              clearStatesOnSidebarClick();
              dispatch(clearTeamPermissions());
            }}
          >
            <div className={active === `/org/${allState.organization.currentOrganization?.domain}` ? 'row-sidebar activeLink' : 'row-sidebar'}>
              <MyProjectSvg primaryColor={primaryColor} />
              <div className="sidebar-headings">My Projects</div>
            </div>
          </Link>
        </>
      )}
      {/* Interactive videos */}
      {permission?.Video?.includes('video:view') && (
        <>
          <Link
            to={`/org/${allState.organization.currentOrganization?.domain}/video`}
            onClick={() => {
              clearStatesOnSidebarClick();
              dispatch(clearTeamPermissions());
            }}
          >
            <div className={active === `/org/${allState.organization.currentOrganization?.domain}/video` ? 'row-sidebar activeLink' : 'row-sidebar'}>
              <MyInteractiveVideoSvg primaryColor={primaryColor} />
              <div className="sidebar-headings">My Interactive Videos</div>
            </div>
          </Link>
        </>
      )}
      {permission?.['Record a Video']?.includes('record-video:view') && (
        <Link
          to={`/org/${allState.organization.currentOrganization?.domain}/record-video`}
          onClick={() => {
            clearStatesOnSidebarClick();
            dispatch(clearTeamPermissions());
          }}
        >
          <div className={active === `/org/${allState.organization.currentOrganization?.domain}/record-video` ? 'row-sidebar activeLink' : 'row-sidebar'}>
            <RecordSvg primaryColor={primaryColor} />
            <div className="sidebar-headings">
              Record a<br />
              video
            </div>
          </div>
        </Link>
      )}
      {permission?.['Independent Activity']?.includes('independent-activity:view-author') && (
        <>
          <Link to={`/org/${allState.organization.currentOrganization?.domain}/search`} onClick={() => {}}>
            <div className={active === `/org/${allState.organization.currentOrganization?.domain}/search` ? 'row-sidebar activeLink' : 'row-sidebar'}>
              <ExploreLibrarySvg primaryColor={primaryColor} />
              <div className="sidebar-headings">Explore Library</div>
            </div>
          </Link>
        </>
      )}

      {permission?.Team?.includes('team:view') && (
        <>
          <Link
            to={`/org/${allState.organization.currentOrganization?.domain}/teams`}
            onClick={() => clearStatesOnSidebarClick()}
            className={active.includes(`/org/${allState.organization.currentOrganization?.domain}/teams`) ? 'activeLink' : ''}
          >
            <div className={active.includes(`/org/${allState.organization.currentOrganization?.domain}/teams`) ? 'row-sidebar activeLink' : 'row-sidebar'}>
              <TeamSvg primaryColor={primaryColor} />
              <div className="sidebar-headings">Teams</div>
            </div>
          </Link>
        </>
      )}
      {permission?.Organization?.length && (
        <>
          <Link
            to={`/org/${allState.organization.currentOrganization?.domain}/admin`}
            onClick={() => {
              clearStatesOnSidebarClick();
              dispatch(clearTeamPermissions());
            }}
          >
            <div className={active === `/org/${allState.organization.currentOrganization?.domain}/admin` ? ' row-sidebar activeLink' : 'row-sidebar'}>
              <AdminSvg primaryColor={primaryColor} />
              <div className="sidebar-headings">Admin Panel</div>
            </div>
          </Link>
        </>
      )}

      {!currentOrganization?.parent && permission.activeRole?.includes('admin') && (
        <>
          <Link
            to={`/org/${allState.organization.currentOrganization?.domain}/instance-admin`}
            onClick={() => {
              clearStatesOnSidebarClick();
              dispatch(clearTeamPermissions());
            }}
          >
            <div className={active === `/org/${allState.organization.currentOrganization?.domain}/instance-admin` ? 'row-sidebar activeLink' : 'row-sidebar'}>
              <InstanceAdminSvg primaryColor={primaryColor} />
              <div className="sidebar-headings">Instance Admin</div>
            </div>
          </Link>
        </>
      )}
    </aside>
  );
}

Sidebar.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);
