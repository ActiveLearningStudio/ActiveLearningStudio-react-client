/* eslint-disable */
import React from "react";
import Modal from "react-bootstrap/Modal";
import "../style.scss";
import "../../Projects/style.scss";
import SearchInputMdSvg from "iconLibrary/mainContainer/SearchInputMdSvg";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import Buttons from "utils/Buttons/buttons";
import PcIcon from "../../../assets/images/pc-icon.svg";
import RightArrow from "../../../assets/images/right-arrow.svg";

const SelectC2EModal = ({ show, setModalShow }) => {
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <Modal
      className="c2e-store-modal"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={() => setModalShow(false)}>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Store to List C2E
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="my-project-cards-top-search-filter c2e-modal-search">
          <div className="search-bar">
            <input
              className=""
              type="text"
              placeholder="Search Store"
              value={""}
            />
            <SearchInputMdSvg
              primaryColor={primaryColor}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="c2e-store-card">
          <div className="si-card">
            <div className="banner-img">
              <img src={PcIcon} alt="stor" className="" />
            </div>
            <h3>Store 1</h3>
            <p>item: 45 </p>
            <p>View: 43354</p>
            <div className="ml-auto mt-2 d-flex justify-content-end">
              <img
                src={RightArrow}
                alt="arrow"
                className="right-arrow"
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Buttons
          text="Cancel"
          secondary={true}
          width="86px"
          height="32px"
          onClick={() => setModalShow(false)}
          hover={true}
          className="ml-3"
        />
        <Buttons
          text="Save"
          primary={true}
          width="86px"
          height="32px"
          onClick={() => {}}
          hover={true}
          className="mr-10"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default SelectC2EModal;
