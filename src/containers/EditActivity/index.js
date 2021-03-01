import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Tab,
  Row,
  Col,
  Nav,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Footer from 'components/Footer';
// import Sidebar from 'components/Sidebar';
// import Header from 'components/Header';
import { loadPlaylistAction } from 'store/actions/playlist';
import ActivityWizard from './ActivityWizard';

import 'containers/CreateActivity/style.scss';

function ActivityCreate(props) {
  const organization = useSelector((state) => state.organization);
  const { match } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPlaylistAction(match.params.projectId, match.params.playlistId));
  }, []);
  return (
    <>
      <div>
        <div className="content-wrapper create-activity">
          <div className="content">
            {/* header */}
            <div className="intro-header">
              <div className="title-line">
                <h2>Edit Resource</h2>
                <div className="line" />
              </div>
              <Link to={`/org/${organization.activeOrganization?.domain}/project/${match.params.projectId}`}>
                <div className="back-playlist">
                  <FontAwesomeIcon icon="arrow-left" />
                  Back to Playlist
                </div>
              </Link>
            </div>
            {/* Tabs */}
            <Tab.Container id="left-tabs-example" defaultActiveKey="edit">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="edit">
                        <FontAwesomeIcon icon="edit" />
                        Edit Activity
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="edit">
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
