import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';

import { loadGroupsAction, loadSubOrganizationGroupsAction } from 'store/actions/group';
// import Header from 'components/Header';
// import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
import { Link, useHistory } from 'react-router-dom';
// import Swal from 'sweetalert2';
import CreateGroup from './CreateGroup';
import GroupView from './GroupCard';
import GroupMemberView from './GroupMemberView';
import GroupProjectView from './GroupProjectView';
import ChannelPanel from './Channel';

import './style.scss';

// TODO: need to remove after connect API
const breadCrumbData = {
  creation: 'group/create group',
  editMode: 'edit group',
  projectShow: 'projects',
  channelShow: 'projects',
  groupShow: 'groups',
};

function GroupPage(props) {
  const {
    location,
    groups,
    overview,
    creation,
    groupShow,
    editMode,
    projectShow,
    channelShow,
    loadGroups,
    loadSubOrgGroups,
  } = props;
  const organization = useSelector((state) => state.organization);
  const { activeOrganization, currentOrganization, permission } = organization;
  const [alertCheck, setAlertCheck] = useState(false);
  const [breadCrumb, setBreadCrumb] = useState([]);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      // if (activeOrganization && overview && !creation && !editMode && permission?.Group?.includes('group:view')) {
      //   Swal.showLoading();
      //   await loadGroups();
      //   Swal.close();
      // } else {
      //   await loadGroups();
      // }
      if ((activeOrganization?.id === currentOrganization?.id) && permission?.Group) {
        await loadGroups();
        setAlertCheck(true);
      } else if ((activeOrganization?.id !== currentOrganization?.id) && permission?.Group) {
        await loadSubOrgGroups();
        setAlertCheck(true);
      }
    }
    )();
  }, [loadGroups, loadSubOrgGroups, activeOrganization, currentOrganization, permission?.Group]);

  const status = creation
    ? 'creation'
    : editMode
      ? 'editMode'
      : groupShow
        ? 'groupShow'
        : projectShow
          ? 'projectShow'
          : overview
            ? 'groupShow'
            : 'channelShow';

  const groupId = parseInt(location.pathname.split('groups/')[1], 10);
  const selectedGroup = groups.find((group) => group.id === groupId);

  useEffect(() => {
    let crumb = breadCrumbData[status];

    if (groupShow && selectedGroup) {
      crumb += (`/${selectedGroup.name} Members`);
    }

    setBreadCrumb(crumb.split('/'));
  }, [selectedGroup, status, groupShow, groups]);

  if (location.pathname.includes('groups/') && !selectedGroup && !creation) {
    return <></>;
  }

  const title = {
    creation: 'Create Group',
    editMode: 'Edit Group',
    groupShow: `${selectedGroup ? selectedGroup.name : 'Group'} Members`,
    projectShow: `${selectedGroup ? selectedGroup.name : 'Group'} Projects`,
    channelShow: 'Channels',
  };
  const goBack = () => {
    history.goBack();
  };
  return (
    <>
      <div className="side-wrapper-group">
        <div className="bread-crumb">
          <div className="main-flex-top">
            {breadCrumb.map((node, index, these) => (
              <div key={node}>
                <span className={index + 1 < these.length ? 'parent' : 'child'}>
                  {node}
                </span>
                {index + 1 < these.length && (
                  <FontAwesomeIcon icon="angle-right" />
                )}
              </div>
            ))}
          </div>
          <Link className="back-button-main-page" onClick={goBack}>
            <FontAwesomeIcon icon="chevron-left" />
            Back
          </Link>
        </div>
      </div>
      <div className="groups-page">

        <div className="content-wrapper">
          <div className="content">
            <div className="row">
              <h1 className={`title${projectShow ? ' project-title' : ''}${channelShow ? ' channel-title' : ''}`}>
                {overview ? 'Groups' : (title[status] || 'Groups')}
              </h1>

              {projectShow && (
                <></>
              )}
            </div>
            {overview && (
              <div className="row overview">
                {permission?.Group?.includes('group:create')
                && (
                  <>
                    <Link to={`/org/${organization?.currentOrganization?.domain}/groups/create-group`}>
                      <div className="btn-top-page">
                        <FontAwesomeIcon icon="plus" className="mr-2" />
                        Create a Group
                      </div>
                    </Link>
                  </>
                )}
                {permission?.Group?.includes('group:view') ? (
                  <>
                    {groups.length > 0 ? groups.map((group) => (
                      <GroupView key={group.id} group={group} />
                    )) : !alertCheck
                      ? <Alert className="alert-space" variant="primary">Loading...</Alert>
                      : <Alert className="alert-space" variant="warning">No group available. </Alert>}
                  </>
                ) : <Alert className="alert-space" variant="danger">You are not authorized to view groups.</Alert> }
              </div>
            )}

            {(creation || editMode) && (
              <div className="row sub-content"><CreateGroup editMode={editMode} selectedGroup={selectedGroup} /></div>
            )}

            {groupShow && selectedGroup && (
              <GroupMemberView group={selectedGroup} />
            )}

            {projectShow && selectedGroup && (
              <GroupProjectView group={selectedGroup} />
            )}

            {channelShow && selectedGroup && (
              <ChannelPanel />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

GroupPage.propTypes = {
  location: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
  overview: PropTypes.bool,
  creation: PropTypes.bool,
  editMode: PropTypes.bool,
  groupShow: PropTypes.bool,
  projectShow: PropTypes.bool,
  channelShow: PropTypes.bool,
  loadGroups: PropTypes.func.isRequired,
  loadSubOrgGroups: PropTypes.func.isRequired,
};

GroupPage.defaultProps = {
  overview: false,
  creation: false,
  editMode: false,
  groupShow: false,
  projectShow: false,
  channelShow: false,
};

const mapStateToProps = (state) => ({
  groups: state.group.groups,
});

const mapDispatchToProps = (dispatch) => ({
  loadGroups: () => dispatch(loadGroupsAction()),
  loadSubOrgGroups: () => dispatch(loadSubOrganizationGroupsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
