import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
import CreateTeam from './CreateTeam';
import TeamViewCard from './TeamCard';
import TeamMemberManagement from './TeamView';
import TeamProjectView from './TeamProjectView';
import ChannelPanel from './Channel';

import './style.scss';

const ADMIN = 'Admin';
const USER = 'User';

// TODO: need to remove after connect API
const teamsData = [
  {
    id: 11,
    title: 'Maths Team',
    // eslint-disable-next-line max-len
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula scelerisque lacus quis sagittis. Aenean et nulla ac mauris fringilla placerat ac eu turpis.',
    members: [
      {
        firstName: 'Abby',
        lastName: 'Rose',
        role: ADMIN,
        invited: true,
        projects: [],
      },
      {
        firstName: 'Leo',
        lastName: 'Chunha',
        role: USER,
        invited: true,
        projects: [
          'Globalization, Robots And You',
          'Training Like a Super Hero1s',
          'Voices of History1',
          'Training Like a Super Hero2',
          'Voices of History2',
        ],
      },
      {
        firstName: 'Jitendra',
        lastName: 'Gurjar',
        role: USER,
        invited: false,
        projects: [
          'Globalization, Robots And You',
          'Training Like a Super Hero',
          'Voices of History',
        ],
      },
    ],
    projects: [
      {
        thumbUrl: '',
        title: 'Globalization, Robots And You',
        members: [
          {
            firstName: 'Leo',
            lastName: 'Chunha',
          },
        ],
      },
      {
        thumbUrl: '',
        title: 'Training Like a Super Hero',
        members: [
          {
            firstName: 'Jitendra',
            lastName: 'Gurjar',
          },
          {
            firstName: 'Leo',
            lastName: 'Chunha',
          },
        ],
      },
      {
        thumbUrl: '',
        title: 'Voices of History',
        members: [
          {
            firstName: 'Jitendra',
            lastName: 'Gurjar',
          },
          {
            firstName: 'Leo',
            lastName: 'Chunha',
          },
        ],
      },
    ],
  },
  {
    id: 12,
    title: 'AI Team',
    // eslint-disable-next-line max-len
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula scelerisque lacus quis sagittis. Aenean et nulla ac mauris fringilla placerat ac eu turpis.',
    members: [
      {
        firstName: 'Abby',
        lastName: 'Rose',
        role: ADMIN,
        invited: true,
        projects: [],
      },
      {
        firstName: 'Leo',
        lastName: 'Chunha',
        role: USER,
        invited: true,
        projects: [
          'Globalization, Robots And You',
          'Training Like a Super Hero',
          'Voices of History',
        ],
      },
      {
        firstName: 'Jitendra',
        lastName: 'Gurjar',
        role: USER,
        invited: false,
        projects: [
          'Globalization, Robots And You',
          'Training Like a Super Hero',
          'Voices of History',
        ],
      },
    ],
    projects: [
      {
        thumbUrl: '',
        title: 'Globalization, Robots And You',
        members: [
          {
            firstName: 'Leo',
            lastName: 'Chunha',
          },
        ],
      },
      {
        thumbUrl: '',
        title: 'Training Like a Super Hero',
        members: [
          {
            firstName: 'Jitendra',
            lastName: 'Gurjar',
          },
          {
            firstName: 'Leo',
            lastName: 'Chunha',
          },
        ],
      },
      {
        thumbUrl: '',
        title: 'Voices of History',
        members: [
          {
            firstName: 'Jitendra',
            lastName: 'Gurjar',
          },
          {
            firstName: 'Leo',
            lastName: 'Chunha',
          },
        ],
      },
    ],
  },
  {
    id: 15,
    title: 'Mechanics Team',
    // eslint-disable-next-line max-len
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula scelerisque lacus quis sagittis. Aenean et nulla ac mauris fringilla placerat ac eu turpis.',
    members: [
      {
        firstName: 'Abby',
        lastName: 'Rose',
        role: ADMIN,
        invited: true,
        projects: [],
      },
      {
        firstName: 'Leo',
        lastName: 'Chunha',
        role: USER,
        invited: true,
        projects: [
          'Globalization, Robots And You',
          'Training Like a Super Hero',
          'Voices of History',
        ],
      },
      {
        firstName: 'Jitendra',
        lastName: 'Gurjar',
        role: USER,
        invited: false,
        projects: [
          'Globalization, Robots And You',
          'Training Like a Super Hero',
          'Voices of History',
        ],
      },
    ],
    projects: [
      {
        thumbUrl: '',
        title: 'Globalization, Robots And You',
        members: [
          {
            firstName: 'Leo',
            lastName: 'Chunha',
          },
        ],
      },
      {
        thumbUrl: '',
        title: 'Training Like a Super Hero',
        members: [
          {
            firstName: 'Jitendra',
            lastName: 'Gurjar',
          },
          {
            firstName: 'Leo',
            lastName: 'Chunha',
          },
        ],
      },
      {
        thumbUrl: '',
        title: 'Voices of History',
        members: [
          {
            firstName: 'Jitendra',
            lastName: 'Gurjar',
          },
          {
            firstName: 'Leo',
            lastName: 'Chunha',
          },
        ],
      },
    ],
  },
];

// TODO: need to remove after connect API
const breadCrumbData = {
  creation: 'teams/create team',
  projectShow: 'projects',
  channelShow: 'projects',
  teamShow: 'teams',
};

function TeamsPage(props) {
  const {
    overview,
    creation,
    teamShow,
    projectShow,
    channelShow,
  } = props;

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [breadCrumb, setBreadCrumb] = useState([]);

  const status = creation
    ? 'creation'
    : teamShow
      ? 'teamShow'
      : projectShow
        ? 'projectShow'
        : overview
          ? 'teamShow'
          : 'channelShow';

  useEffect(() => {
    const path = window.location.pathname;
    let crumb = breadCrumbData[status];

    if (path.includes('teams/')) {
      const selectedItem = parseInt(window.location.pathname.split('teams/')[1], 10);
      setSelectedTeam(selectedItem);
      if (teamShow) {
        crumb += (`/${teamsData.find((team) => team.id === selectedItem).title} Members`);
      }
    } else {
      setSelectedTeam('');
    }

    setBreadCrumb(crumb.split('/'));
  }, [status, teamShow]);

  if (window.location.pathname.includes('teams/') && !selectedTeam && !creation) {
    return <></>;
  }

  const selectedTeamData = teamsData.find((team) => team.id === selectedTeam);
  const title = {
    creation: 'Create Team',
    teamShow: `${(selectedTeamData && selectedTeamData.title) ? selectedTeamData.title : 'Team'} Members`,
    projectShow: `${(selectedTeamData && selectedTeamData.title) ? selectedTeamData.title : 'Team'} Projects`,
    channelShow: 'Channels',
  };

  return (
    <>
      <Header {...props} />

      <div className="teams-page main-content-wrapper">
        <div className="sidebar-wrapper">
          <Sidebar />

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

        <div className="content-wrapper">
          <div className="content">
            <div className="row">
              <h1 className={`title${projectShow ? ' project-title' : ''}${channelShow ? ' channel-title' : ''}`}>
                {title[status] || 'Teams'}
              </h1>
            </div>

            {overview && (
              <div className="row overview">
                {teamsData.map((team) => (
                  <TeamViewCard key={team.id} teamInfo={team} />
                ))}
              </div>
            )}

            {creation && (
              <div className="row sub-content"><CreateTeam /></div>
            )}

            {teamShow && (
              <TeamMemberManagement teamInfo={selectedTeamData} />
            )}

            {projectShow && (
              <TeamProjectView teamInfo={selectedTeamData} />
            )}

            {channelShow && (
              <ChannelPanel />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

TeamsPage.propTypes = {
  overview: PropTypes.bool,
  creation: PropTypes.bool,
  teamShow: PropTypes.bool,
  projectShow: PropTypes.bool,
  channelShow: PropTypes.bool,
};

TeamsPage.defaultProps = {
  overview: false,
  creation: false,
  teamShow: false,
  projectShow: false,
  channelShow: false,
};

const mapDispatchToProps = () => ({});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
