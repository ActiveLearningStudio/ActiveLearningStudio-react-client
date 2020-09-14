import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Modal, Tabs, Tab } from 'react-bootstrap';

import logo from 'assets/images/loginlogo.png';

const H5PPreview = React.lazy(() => import('../../containers/H5PPreview'));

function MyVerticallyCenteredModal(props) {
  const { activity, activeType } = props;

  return (
    <Modal
      {...props}
      size="lg"
      className="video_activity"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img src={logo} alt="" />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Tabs defaultActiveKey={activeType} id="uncontrolled-tab-example">
          <Tab eventKey="demo" title="Demo">
            {!!activity && activity.demo_activity_id ? (
              <Suspense fallback={<div>Loading</div>}>
                <H5PPreview
                  activityId={activity.demo_activity_id.trim()}
                  tokenrequire={false}
                  showltipreview
                />
              </Suspense>
            ) : (
              <div className="stayTuned">
                <h1>Stay Tuned!</h1>
                <h5>Demo will be available Soon</h5>
              </div>
            )}
          </Tab>
          <Tab eventKey="video" title="Video">
            {!!activity && !!activity.demo_video_id ? (
              <iframe
                width="100%"
                height="400"
                src={
                  `https://www.youtube.com/embed/${
                    activity.demo_video_id.split('/').length > 0
                    && activity.demo_video_id.split('/')[activity.demo_video_id.split('/').length - 1]}`
                }
                title={activity.demo_video_id}
              />
            ) : (
              <div className="stayTuned">
                <h1>Stay Tuned!</h1>
                <h5>Video will be available Soon</h5>
              </div>
            )}
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

MyVerticallyCenteredModal.propTypes = {
  activeType: PropTypes.string,
  activity: PropTypes.object,
};

MyVerticallyCenteredModal.defaultProps = {
  activeType: '',
  activity: null,
};

export default MyVerticallyCenteredModal;
