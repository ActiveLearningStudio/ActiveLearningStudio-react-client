/*eslint-disable*/
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Modal, Tabs, Tab } from 'react-bootstrap';

import logo from 'assets/images/login_logo.svg';

const H5PPreview = React.lazy(() => import('../../containers/H5PPreview'));

function MyVerticallyCenteredModal(props) {
  const { activity } = props;

  return (
    <Modal {...props} size="lg" className="video_activity" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img src={logo} alt="" />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Tabs defaultActiveKey={'demo'} id="uncontrolled-tab-example">
          <Tab eventKey="demo" title="Demo">
            <Suspense fallback={<div>Loading</div>}>
              <H5PPreview activityId={activity} tokenrequire={false} showltipreview />
            </Suspense>
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
