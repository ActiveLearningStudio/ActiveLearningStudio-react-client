import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
  PieChart,
  Pie,
  Cell,
  Label,
} from 'recharts';
import { Alert } from 'react-bootstrap';

import metricsService from 'services/metrics.service';
import { getUserMetricsAction, getUserMembershipAction } from 'store/actions/metrics';
// import Header from 'components/Header';
// import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
import SlideModal from 'containers/Dashboard/SlideModal';

import './styles.scss';

function DashboardPage(props) {
  const {
    userId,
    firstName,
    metrics,
    getUserMetrics,
    getUserMembership,
  } = props;
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;
  const [showModal, setShowModal] = useState(false);
  const [modalSection, setModalSection] = useState(null);

  const storageData = [
    {
      name: 'Used',
      value: metrics.used_storage,
      color: '#66ddaa',
    },
    {
      name: 'Free',
      value: metrics.total_storage - metrics.used_storage,
      color: '#607a9b',
    },
  ];

  const bandwidthData = [
    {
      name: 'Used',
      value: (metrics.total_bandwidth === 0) ? 0 : metrics.used_bandwidth,
      color: '#66ddaa',
    },
    {
      name: 'Free',
      value: (metrics.total_bandwidth === 0) ? 1 : (metrics.total_bandwidth - metrics.used_bandwidth),
      color: '#607a9b',
    },
  ];

  const usedStoragePercentage = `${Math.round((metrics.used_storage * 100) / metrics.total_storage)}%`;
  const usedBandwidthPercentage = (metrics.total_bandwidth === 0) ? '0%' : `${Math.round((metrics.used_bandwidth * 100) / metrics.total_bandwidth)}%`;

  useEffect(() => {
    if (!userId) return;

    getUserMetrics(userId);
    getUserMembership(userId);
  }, [getUserMembership, getUserMetrics, userId]);

  const handleUpgradeClick = () => {
    Swal.fire({
      icon: 'info',
      title: 'WHAT DO I GET WITH MY FREE ACCOUNT?',
      confirmButtonText: 'Sign Up',
      html: '<ul>'
        + '<li>Free access to CurrikiStudio, designed for the individual user building experiences for their classes</li>'
        + '<li>1GB of Hosting and Services</li>'
        + '<li>Build a portfolio of more than 10 Projects and 100 Playlists</li>'
        + '<li>No loss of work – transfer any or all projects from your demo account</li>'
        + '<li>Publish your projects to Certified LMS Providers, Google Classroom, CMS platforms and websites via CurrikiGo</li>'
        + '<li>Share and access Projects and Playlists with the Curriki Community via CurrikiLibrary</li>'
        + '<ul>',
      preConfirm: () => metricsService.redeemOffer('linodeFREE')
        .catch((error) => { Swal.showValidationMessage(`Request failed: ${error}`); }),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Conragtulations!',
          text: 'Account upgrade successful.',
        }).then(() => {
          getUserMetrics(userId);
          getUserMembership(userId);
        });
      }
    });
  };

  const handleCounterClick = (section) => {
    setModalSection(section);
    setShowModal(true);
  };

  const humanFileSize = (bytes, si = false, dp = 1) => {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
      return `${bytes} B`;
    }

    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
      // eslint-disable-next-line no-param-reassign
      bytes /= thresh;
      u += 1;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return `${bytes.toFixed(dp)} ${units[u]}`;
  };

  return (
    <>
      <div className="dashboard-page">
        <div className="content-wrapper">
          {permission?.Dashboard?.includes('dashboard:view') ? (
            <div className="content">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="title">
                    {(metrics.membership_type) ? `${metrics.membership_type} Account - ` : ''}
                    Dashboard
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className={(metrics.membership_type_name === 'demo') ? 'col-8 dashboard-panel m-3' : 'col dashboard-panel m-3'}>
                  <div className="row dashboard-panel-header-row">
                    <div className="col">
                      <h1 className="title">
                        {`Hello, ${firstName}`}
                      </h1>
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col">
                      Welcome to the CurrikiStudio Dashboard. Here you will find metrics and general information about your account.
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col">
                      <div className="row">
                        <div className="col">
                          <PieChart width={200} height={200}>
                            <Pie data={storageData} innerRadius={50} outerRadius={75}>
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
                            <label>Total Available:</label>
                            {humanFileSize(metrics.total_storage)}
                            <br />
                            <label>Total Used:</label>
                            {humanFileSize(metrics.used_storage)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="row">
                        <div className="col">
                          <PieChart width={200} height={200}>
                            <Pie data={bandwidthData} innerRadius={50} outerRadius={75}>
                              {bandwidthData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                              <Label value={usedBandwidthPercentage} position="center" />
                            </Pie>
                          </PieChart>
                        </div>
                        <div className="col">
                          <h1 className="title">Bandwidth</h1>
                          <p>
                            <label>Total Available:</label>
                            {humanFileSize(metrics.total_bandwidth)}
                            <br />
                            <label>Total Used:</label>
                            {humanFileSize(metrics.used_bandwidth)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label>Current Plan:</label>
                      {metrics.membership_type}
                    </div>
                    <div className="col text-right">
                      {metrics.membership_type_name === 'demo' && (
                        <a className="btn btn-primary submit mr-5" onClick={handleUpgradeClick}>Upgrade Now</a>
                      )}
                    </div>
                  </div>
                </div>
                {metrics.membership_type_name === 'demo' && (
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
                            <a className="btn btn-primary submit" onClick={handleUpgradeClick}>Upgrade to Basic Account</a>
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
                )}
              </div>
              <div className="row metrics-counters">
                <div className="col dashboard-panel m-3">
                  <div className="row dashboard-panel-header-row">
                    <div className="col">
                      <h1 className="title">Projects</h1>
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col">
                      <span className="count" onClick={() => handleCounterClick('project-count')}>{metrics.project_count}</span>
                      <label>COUNT</label>
                    </div>
                    <div className="col">
                      <span>{metrics.project_views}</span>
                      <label>VIEWS</label>
                    </div>
                    <div className="col">
                      <span className="count" onClick={() => handleCounterClick('project-shared-count')}>{metrics.project_shares}</span>
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
                    <div className="col">
                      <span className="count" onClick={() => handleCounterClick('playlist-count')}>{metrics.playlist_count}</span>
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
                    <div className="col">
                      <span className="count" onClick={() => handleCounterClick('activity-count')}>{metrics.activity_count}</span>
                      <label>COUNT</label>
                    </div>
                    <div className="col">
                      <span>{metrics.activity_views}</span>
                      <label>VIEWS</label>
                    </div>
                    <div className="col" onClick={() => handleCounterClick('activity-shared-count')}>
                      <span className="count">{metrics.activity_shares}</span>
                      <label>SHARED</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : <Alert variant="danger">You are not authorized to access Dashboard.</Alert>}

        </div>
      </div>

      {(showModal) && (
        <SlideModal modalSection={modalSection} closeModal={() => setShowModal(false)} />
      )}

      <Footer />
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
