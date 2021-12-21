/*eslint-disable*/
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Modal, Tabs, Tab } from 'react-bootstrap';

import logo from 'assets/images/login_logo.svg';

const H5PPreview = React.lazy(() => import('../../containers/H5PPreview'));

function MyVerticallyCenteredModal(props) {
  const { activity } = props;

  return (
    <Modal {...props} size="xl" className="video_activity" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img src={logo} alt="" />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Suspense fallback={<div>Loading</div>}>
          <H5PPreview activityId={activity} tokenrequire={false} showvideoH5p />
        </Suspense>
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
