/* eslint-disable */
import React from "react";
import Modal from "react-bootstrap/Modal";
import "./style.scss";
import "../Projects/style.scss";
import SearchInputMdSvg from "iconLibrary/mainContainer/SearchInputMdSvg";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import Buttons from "utils/Buttons/buttons";
import PcIcon from "../../assets/images/pc-icon.svg";
import RightArrow from "../../assets/images/right-arrow.svg";

const MoveC2EModal = ({ show, setModalShow }) => {
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <Modal
      className="c2e-move-modal"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={() => setModalShow(false)}>
        <Modal.Title id="contained-modal-title-vcenter">
          Move to C2E Title
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="my-project-cards-top-search-filter c2e-modal-search justify-content-between">
          <div className="search-bar">
            <input
              className=""
              type="text"
              placeholder="Search project"
              value={""}
            />
            <SearchInputMdSvg
              primaryColor={primaryColor}
              style={{ cursor: "pointer" }}
            />
          </div>
          <Buttons
            text="Create project"
            primary={true}
            width="auto"
            height="32px"
            onClick={() => {}}
            hover={true}
            className="mr-10"
          />
        </div>
        <div className="c2e-move-boxs">
          <div className="project-c2e-card">
            <div className="banner-img-pro-c2e">
              <img src={PcIcon} alt="stor" className="" />
            </div>
            <div className="">
              <h3>Store 1</h3>
              <p className="mb-2">
                Our partnerts are full of ideas on how to engage
                learners, but need the tools...and that’s where we
                come in. Curriki is on a missi...
              </p>
              <p className="mb-1">
                By: <span>mghdg hdu </span>
              </p>
              <p>
                Type: <span>mghdg hdu </span>
              </p>
            </div>
            <div className="c2e-add-btn">
              <p>Add</p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MoveC2EModal;
