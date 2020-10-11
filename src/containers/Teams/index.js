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

const teamsData = [
  {
    id: 11,
    title: 'Maths Team',
    description: 'Lorem ipsum dolor sit amet, ectetur adipiscing elit...',
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
    id: 12,
    title: 'AI Team',
    description: 'Lorem ipsum dolor sit amet, ectetur adipiscing elit...',
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
    description: 'Lorem ipsum dolor sit amet, ectetur adipiscing elit...',
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

function TeamsPage(props) {
  const {
    overview,
    creation,
    teamShow,
    projectShow,
    channelShow,
  } = props;

  const [selectedTeam, setSelectedTeam] = useState(null);

  const path = window.location.pathname;
  useEffect(() => {
    if (path.includes('teams/')) {
      setSelectedTeam(parseInt(path.split('teams/')[1], 10));
    } else {
      setSelectedTeam('');
    }
  }, [path]);

  if (path.includes('teams/') && !selectedTeam) {
    return <></>;
  }

  return (
    <>
      <Header {...props} />

      <div className="teams-page main-content-wrapper">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>

        <div className="content-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <h1 className="title">
                  {creation
                    ? 'Create Team'
                    : teamShow
                      ? `${teamsData.find((team) => team.id === selectedTeam).title} Members`
                      : projectShow
                        ? (
                          <>
                            <FontAwesomeIcon icon="layer-group" className="mr-2" />
                            {`${teamsData.find((team) => team.id === selectedTeam).title} Projects`}
                          </>
                        )
                        : channelShow
                          ? (
                            <>
                              <FontAwesomeIcon icon="layer-group" className="mr-2" />
                              Channels
                            </>
                          )
                          : 'Teams'}
                </h1>
              </div>
            </div>

            {overview && (
              <div className="overview">
                {teamsData.map((team) => <TeamViewCard teamInfo={team} />)}
              </div>
            )}

            {creation
              ? (
                <div className="row sub-content"><CreateTeam /></div>
              )
              : teamShow
                ? (
                  <TeamMemberManagement teamInfo={teamsData.find((team) => team.id === selectedTeam)} />
                )
                : projectShow
                  ? (
                    <TeamProjectView teamInfo={teamsData.find((team) => team.id === selectedTeam)} />
                  )
                  : channelShow && (
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
