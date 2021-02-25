import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { loadGroupsAction } from 'store/actions/group';
// import Header from 'components/Header';
// import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
import CreateGroup from './CreateGroup';
import GroupView from './GroupCard';
import GroupMemberView from './GroupMemberView';
import GroupProjectView from './GroupProjectView';
import ChannelPanel from './Channel';

import './style.scss';

// TODO: need to remove after connect API
const breadCrumbData = {
  creation: 'group/create group',
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
    projectShow,
    channelShow,
    loadGroups,
  } = props;

  const [breadCrumb, setBreadCrumb] = useState([]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  const status = creation
    ? 'creation'
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
    groupShow: `${selectedGroup ? selectedGroup.name : 'Group'} Members`,
    projectShow: `${selectedGroup ? selectedGroup.name : 'Group'} Projects`,
    channelShow: 'Channels',
  };

  return (
    <>
      <div className="side-wrapper">
        <div className="collapse-button">
          <FontAwesomeIcon icon="angle-left" />
        </div>

        <div className="bread-crumb d-flex align-items-center">
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
                {groups.map((group) => (
                  <GroupView key={group.id} group={group} />
                ))}
              </div>
            )}

            {creation && (
              <div className="row sub-content"><CreateGroup /></div>
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
  groupShow: PropTypes.bool,
  projectShow: PropTypes.bool,
  channelShow: PropTypes.bool,
  loadGroups: PropTypes.func.isRequired,
};

GroupPage.defaultProps = {
  overview: false,
  creation: false,
  groupShow: false,
  projectShow: false,
  channelShow: false,
};

const mapStateToProps = (state) => ({
  groups: state.group.groups,
});

const mapDispatchToProps = (dispatch) => ({
  loadGroups: () => dispatch(loadGroupsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
