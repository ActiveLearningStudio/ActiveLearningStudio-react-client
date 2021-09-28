import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Tab,
  Row,
  Col,
  Nav,
  Alert,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Footer from 'components/Footer';
// import Sidebar from 'components/Sidebar';
// import Header from 'components/Header';
import { getTeamPermission } from 'store/actions/team';
import { loadPlaylistAction } from 'store/actions/playlist';
import ActivityWizard from './ActivityWizard';

import 'containers/CreateActivity/style.scss';

function ActivityCreate(props) {
  const organization = useSelector((state) => state.organization);
  const { teamPermission } = useSelector((state) => state.team);
  const { selectedPlaylist } = useSelector((state) => state.playlist);
  const { permission } = organization;
  const { match } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPlaylistAction(match.params.projectId, match.params.playlistId));
  }, []);
  useEffect(() => {
    if (Object.keys(teamPermission).length === 0 && selectedPlaylist?.project?.team?.id && organization?.currentOrganization?.id) {
      dispatch(getTeamPermission(organization?.currentOrganization?.id, selectedPlaylist?.project?.team?.id));
    }
  }, [teamPermission, selectedPlaylist, organization?.currentOrganization?.id]);
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
              <Link to={`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}`}>
                <div className="back-playlist">
                  <FontAwesomeIcon icon="arrow-left" />
                  Back to Playlist
                </div>
              </Link>
            </div>
            {/* Tabs */}
            {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:edit-activity') : permission?.Activity?.includes('activity:edit')) ? (
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
            ) : <Alert variant="danger" alt="">You are not authorized to edit this activity.</Alert>}
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
