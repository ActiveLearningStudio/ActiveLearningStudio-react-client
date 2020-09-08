import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  PieChart,
  Pie,
  Cell,
  Label,
} from 'recharts';

import { getUserMetricsAction, getUserMembershipAction } from 'store/actions/metrics';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

import './styles.scss';

function DashboardPage(props) {
  const {
    userId,
    firstName,
    metrics,
    getUserMetrics,
    getUserMembership,
  } = props;
  console.log(metrics);
  const storageData = [
    {
      name: 'Used',
      value: metrics.used_storage,
      color: '#66ddaa',
    },
    {
      name: 'Free',
      value: (1+metrics.total_storage - metrics.used_storage),
      color: '#607a9b',
    },
  ];

  const bandwidthData = [
    {
      name: 'Used',
      value: metrics.used_bandwidth,
      color: '#66ddaa',
    },
    {
      name: 'Free',
      value: (1 + metrics.total_bandwidth - metrics.used_bandwidth),
      color: '#607a9b',
    },
  ];

  const usedStoragePercentage = `${Math.round((metrics.used_storage * 100) / metrics.total_storage)}%`;

  const usedBandwidthPercentage = `${Math.round((metrics.used_bandwidth * 100) / metrics.total_bandwidth)}%`;

  console.log(metrics);
  console.log(storageData);
  console.log(bandwidthData);
  console.log(usedStoragePercentage);
  console.log(usedBandwidthPercentage);

  useEffect(() => {
    if (!userId) {
      return;
    }

    getUserMetrics(userId);
    getUserMembership(userId);
  }, [userId /*, getUserMetrics, getUserMembership*/]);

  return (
    <>
      <Header {...props} />

      <div className="dashboard-page main-content-wrapper">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
        <div className="content-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <h1 className="title">Dashboard</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-8 dashboard-panel m-3">
                <div className="row dashboard-panel-header-row">
                  <div className="col">
                    <h1 className="title">
                      {`Hello, ${firstName}`}
                    </h1>
                  </div>
                </div>
                <div className="row m-3">
                  <div className="col">
                    Welcome to the Curriki Studio Dashboard. Here you will find metrics and general information about your account.
                  </div>
                </div>
                <div className="row m-3">
                  <div className="col">
                    <div className="row">
                      <div className="col">
                        <PieChart width={200} height={200}>
                          <Pie data={storageData} dataKey="name" innerRadius={50} outerRadius={75}>
                            {storageData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                            <Label value={usedStoragePercentage} position="center" />
                          </Pie>
                        </PieChart>
                      </div>
                      <div className="col">
                        <h1 className="title">Storage</h1>
                        <p>
                          <label>Total:</label>
                          {` ${metrics.total_storage} kb`}
                          <br />
                          <label>Used:</label>
                          {` ${metrics.used_storage} kb`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col">
                        <PieChart width={200} height={200}>
                          <Pie data={bandwidthData} dataKey="name" innerRadius={50} outerRadius={75}>
                            {bandwidthData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                            <Label value={usedBandwidthPercentage} position="center" />
                          </Pie>
                        </PieChart>
                      </div>
                      <div className="col">
                        <h1 className="title">Views</h1>
                        <p>
                          <label>Total:</label>
                          {` ${metrics.total_bandwidth} kb`}
                          <br />
                          <label>Used:</label>
                          {` ${metrics.used_bandwidth}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label>Current Plan:</label>
                    {' '}
                    {metrics.membership_type}
                  </div>
                  <div className="col text-right">
                    <a className="btn btn-primary submit mr-5">Upgrade Now</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col dashboard-panel m-3 text-center offer-panel">
                    <div className="row">
                      <div className="col">
                        <h1 className="title">Need more storage, views or publishing options?</h1>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        We offer you unlimited storage space for all your needs. You can always upgrade to get more space.
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col">
                        <a className="btn btn-primary submit">Upgrade to Basic Account</a>
                      </div>
                    </div>
                    <div className="row mt-1 mb-3">
                      <div className="col">
                        It&apos;s FREE. Courtesy of Linode.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row metrics-counters">
              <div className="col dashboard-panel m-3">
                <div className="row dashboard-panel-header-row">
                  <div className="col">
                    <h1 className="title">Projects</h1>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col ">
                    <span className="">{metrics.project_count}</span>
                    <label>COUNT</label>
                  </div>
                  <div className="col">
                    <span>{metrics.project_views}</span>
                    <label>VIEWS</label>
                  </div>
                  <div className="col">
                    <span>{metrics.project_shares}</span>
                    <label>SHARED</label>
                  </div>
                </div>
              </div>
              <div className="col dashboard-panel m-3">
                <div className="row dashboard-panel-header-row">
                  <div className="col">
                    <h1 className="title">Playlists</h1>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col ">
                    <span className="">{metrics.playlist_count}</span>
                    <label>COUNT</label>
                  </div>
                  <div className="col">
                    <span>{metrics.playlist_views}</span>
                    <label>VIEWS</label>
                  </div>
                  <div className="col">
                    <span>{metrics.playlist_shares}</span>
                    <label>SHARED</label>
                  </div>
                </div>
              </div>
              <div className="col dashboard-panel m-3">
                <div className="row dashboard-panel-header-row">
                  <div className="col">
                    <h1 className="title">Activities</h1>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col ">
                    <span className="">{metrics.activity_count}</span>
                    <label>COUNT</label>
                  </div>
                  <div className="col">
                    <span>{metrics.activity_views}</span>
                    <label>VIEWS</label>
                  </div>
                  <div className="col">
                    <span>{metrics.activity_shares}</span>
                    <label>SHARED</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col dashboard-panel m-3">
                <div className="row dashboard-panel-header-row">
                  <div className="col">
                    <h1 className="title">My Traffic</h1>
                  </div>
                </div>
              </div>
              <div className="col dashboard-panel m-3">
                <div className="row dashboard-panel-header-row">
                  <div className="col">
                    <h1 className="title">Teams</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

DashboardPage.propTypes = {
  firstName: PropTypes.string,
  userId: PropTypes.number,
  metrics: PropTypes.object,
  getUserMetrics: PropTypes.func.isRequired,
  getUserMembership: PropTypes.func.isRequired,
};

DashboardPage.defaultProps = {
  firstName: '',
  userId: null,
  metrics: {},
};

const mapDispatchToProps = (dispatch) => ({
  getUserMetrics: (userId) => dispatch(getUserMetricsAction(userId)),
  getUserMembership: (userId) => dispatch(getUserMembershipAction(userId)),
});

const mapStateToProps = (state) => ({
  firstName: (state.auth.user) ? state.auth.user.first_name : '',
  userId: (state.auth.user) ? state.auth.user.id : null,
  metrics: (state.metrics) ? state.metrics : {},
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
