/*eslint-disable*/
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import "./previewlayout.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import HeadingThree from "utils/HeadingThree/headingthree";
import Buttons from "utils/Buttons/buttons";
import H5PEditor from "components/ResourceCard/AddResource/Editors/H5PEditorV2";
const PreviewLayoutModel = (props) => {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="preview-layout-model"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="interactive-proceed-box">
          <div className="interactive-video-tag">
            <FontAwesomeIcon icon={faVideo} className="video-icon" />
            <HeadingThree text="Interactive Video" />
          </div>
          <div className="proceed-save">
            <Buttons
              text="Proceed to save"
              className="Proceed-btn"
              onClick={() => {
                props.onHide();
                props.setSuccessMessage(true);
              }}
            />
          </div>
        </div>
        <div className="interactive-video-H5P">
          <H5PEditor />
        </div>
      </Modal.Body>
    </Modal>
  );
};

PreviewLayoutModel.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
};

PreviewLayoutModel.defaultProps = {
  show: false,
};

export default PreviewLayoutModel;
