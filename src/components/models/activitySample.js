import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import logo from 'assets/images/loginlogo.png';

const H5PPreview = React.lazy(() => import('../../containers/H5PPreview'));

function MyVerticallyCenteredModal(props) {
  const { activity } = props;

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
        {!!activity && (
          <Suspense fallback={<div>Loading</div>}>
            <H5PPreview
              activityId={activity}
              tokenrequire={false}
              showltipreview
            />
          </Suspense>
        )}
      </Modal.Body>
    </Modal>
  );
}

MyVerticallyCenteredModal.propTypes = {
  activity: PropTypes.object,
};

MyVerticallyCenteredModal.defaultProps = {
  activity: null,
};

export default MyVerticallyCenteredModal;
