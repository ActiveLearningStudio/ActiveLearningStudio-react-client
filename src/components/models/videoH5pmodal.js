/*eslint-disable*/
import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Modal, Tabs, Tab } from "react-bootstrap";

import logo from "assets/images/login_logo.svg";
import cross from "assets/images/cross-icon.png";

const H5PPreview = React.lazy(() =>
  import("../../containers/H5PPreview")
);

function MyVerticallyCenteredModal(props) {
  const { activity, onHide, showvideoH5p, activities } = props;

  return (
    <Modal
      {...props}
      size="xl"
      className="video_activity"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
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
                  // Dispose H5P
                  if (
                    window.hasOwnProperty("H5P") &&
                    window.H5P !== undefined &&
                    window.H5P.instances?.length > 0
                  ) {
                    clearTimeout(window.H5P.instances[0].bufferLoop);
                    clearTimeout(
                      window.H5P.instances[0].timeUpdateTimeout
                    );
                    if (
                      window.H5P.instances[0].video?.getPlayer() &&
                      typeof window.H5P.instances[0].video?.getPlayer()
                        .dispose === "function"
                    ) {
                      window.H5P.instances[0].video
                        ?.getPlayer()
                        ?.dispose();
                      window.H5P.instances[0].video?.nullifyPlayer();
                    }
                    window.H5PEditor = undefined;
                    window.H5P = undefined;
                    window.H5PIntegration.saveFreq = false;
                    window.H5PPresave = undefined;
                    window.h5peditorCopy = undefined;
                    setTimeout(function () {
                      if (
                        document.querySelectorAll(".modal-dialog")
                          .length === 0
                      ) {
                        document
                          .querySelectorAll(
                            "link[title='brightcove']"
                          )
                          .forEach((e) => e.remove());
                      }
                    }, 2000);
                  }
                }
                onHide();
              }}
            />
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div
          id="activity-loader-alert"
          class="alert alert-primary"
          role="alert"
          style={{ display: "none" }}
        ></div>
        <Suspense fallback={<div>Loading</div>}>
          <H5PPreview
            activityId={activity}
            tokenrequire={false}
            showvideoH5p={showvideoH5p}
            activities={activities}
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
