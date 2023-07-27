/*eslint-disable*/
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { slideInRight } from "react-animations";
import Modal from "react-bootstrap/Modal";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

import MatadataForm from "./matadataForm";

import "../style.scss";

const bounceAnimation = keyframes`${slideInRight}`;
const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

function Index(props) {
  const { handleCloseProjectModal, show } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const paragraphColor = getGlobalColor(
    "--main-paragraph-text-color"
  );
  return (
    <Modal
      className="c2e-metadata-details-modal"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header
        closeButton
        onClick={() => handleCloseProjectModal(false)}
      ></Modal.Header>
      <Modal.Body>
        <div className="w-100 h-100">
          <MatadataForm
            handleCloseProjectModal={handleCloseProjectModal}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

Index.propTypes = {
  handleCloseProjectModal: PropTypes.func.isRequired,
};

export default React.memo(withRouter(Index));
