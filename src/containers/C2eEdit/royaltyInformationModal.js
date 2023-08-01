/* eslint-disable */
import React from "react";
import Modal from "react-bootstrap/Modal";
import "./style.scss";
import "../Projects/style.scss";

import { getGlobalColor } from "containers/App/DynamicBrandingApply";

const RoyaltyInformationModal = () => {
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <Modal
      className="c2e-royalty-modal"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={() => setModalShow(false)}>
        <Modal.Title id="contained-modal-title-vcenter">
          Royalty Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Royalty-Based Content</p>
        <div className="c2e-royalty-modal-detail">
          <table>
            <tr>
              <th className="left-td-border">Name</th>
              <th>Details</th>
            </tr>
            <tr>
              <td className="left-td-border">
                <p>Royalty Agreement Number</p>
              </td>
              <td>LSC-Pub-123456789</td>
            </tr>
          </table>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RoyaltyInformationModal;
