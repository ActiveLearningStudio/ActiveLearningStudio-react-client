/*eslint-disable*/
import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Modal, Tabs, Tab } from "react-bootstrap";

import logo from "assets/images/login_logo.svg";
import cross from "assets/images/cross-icon.png";

const H5PPreview = React.lazy(() => import("../../containers/H5PPreview"));

function MyVerticallyCenteredModal(props) {
  const { activity, onHide, showvideoH5p } = props;

  return (
    <Modal
      {...props}
      size="xl"
      className="video_activity"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          style={{ width: "100%" }}
          id="contained-modal-title-vcenter"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img src={logo} alt="" />
            <img
              style={{ width: "15px" }}
              src={cross}
              alt="cross"
              onClick={() => {
                if (showvideoH5p) {
                  window.H5P = undefined;

                  window.H5PEditor = undefined;

                  window.H5PIntegration = undefined;

                  window.H5PPresave = undefined;

                  window.h5peditorCopy = undefined;
                }
                onHide();
              }}
            />
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Suspense fallback={<div>Loading</div>}>
          <H5PPreview
            activityId={activity}
            tokenrequire={false}
            showvideoH5p={showvideoH5p}
          />
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
  activeType: "",
  activity: null,
};

export default MyVerticallyCenteredModal;
