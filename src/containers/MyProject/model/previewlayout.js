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
import { FadeDiv } from "utils";
import { useSelector, useDispatch } from "react-redux";

const PreviewLayoutModel = (props) => {
  const resource = useSelector((state) => state.resource);
  console.log(props?.formData);
  const { selectedLayout, playlist, project, activity } = useSelector(
    (state) => state.myactivities
  );
  const dispatch = useDispatch();
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="preview-layout-model"
    >
      <Modal.Header closeButton style={{ display: "block !important" }}>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ display: "block !important" }}>
        <div className="interactive-video-H5P">
          <H5PEditor
            playlistId={playlist.id}
            h5pLib={activity?.h5p_content?.h5pLib || selectedLayout?.h5pLib}
            h5pLibType={activity?.type || selectedLayout?.type}
            payload={""}
            formData={props?.formData}
            projectId={project}
            h5pParams={activity?.h5p_content?.parameters}
            hide={props.onHide}
          />
        </div>
        <div className="interactive-btns">
          <div className="cancel">
            <span
              onClick={() => {
                props.onHide();
              }}
            >
              Cancel
            </span>
          </div>
          <div className="save-close">
            <Buttons
              text="Save & Close"
              width="151px"
              secondary={true}
              onClick={() => {
                props.onHide();
                dispatch({
                  type: "SET_ACTIVE_ACTIVITY_SCREEN",
                  payload: "",
                });
              }}
            />
            <Buttons
              text="Save"
              width="97px"
              className="save-btn"
              onClick={() => {
                props.onHide();
                props.setSuccessMessage(true);
              }}
            />
          </div>
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
