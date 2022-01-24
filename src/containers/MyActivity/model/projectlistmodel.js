/*eslint-disable*/
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import "./style.scss";

const ProjectListModel = (props) => {
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

      <Modal.Body style={{ display: "block !important" }}></Modal.Body>
    </Modal>
  );
};

ProjectListModel.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
};

ProjectListModel.defaultProps = {
  show: false,
};

export default ProjectListModel;
