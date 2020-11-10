import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Tab,
  Row,
  Col,
  Nav,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import ActivityWizard from './ActivityWizard';
import UploadActivity from './UploadActivity';

import './style.scss';

function ActivityCreate(props) {
  const { match } = props;
  return (
    <>
      <Header {...props} />
      <div className="main-content-wrapper">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
        <div className="content-wrapper create-activity">
          <div className="content">
            {/* header */}
            <div className="intro-header">
              <div className="title-line">
                <h2>Create New Resource</h2>
                <div className="line" />
              </div>
              <Link to={`/project/${match.params.projectId}`}>
                <div className="back-playlist">
                  <FontAwesomeIcon icon="arrow-left" />
                  Back to Playlist
                </div>
              </Link>
            </div>
            {/* Tabs */}
            <Tab.Container id="left-tabs-example" defaultActiveKey="search">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="search">
                        <FontAwesomeIcon icon="search" />
                        Search for an Existing Activity
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="upload">
                        <FontAwesomeIcon icon="upload" />
                        Search for an Existing Activity
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="create">
                        <FontAwesomeIcon icon="plus" />
                        Create A New Activity
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="search">
                      pl
                    </Tab.Pane>
                    <Tab.Pane eventKey="upload">
                      <UploadActivity />
                    </Tab.Pane>
                    <Tab.Pane eventKey="create">
                      <ActivityWizard />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

ActivityCreate.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(ActivityCreate);
