/* eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import loader from "assets/images/loader.svg";
import { useHistory } from "react-router";
import C2eCardEditDropdown from "./C2eCardEditDropdown";
import "../../Projects/ProjectCard/style.scss";
import "../../Projects/ProjectCard/projectcardstyle.scss";
import "../style.scss";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import RoyaltyInformationModal from "../royaltyInformationModal";

const C2eEditCard = (props) => {
  const ImgLoader = () => <img src={loader} alt="" />;
  const dispatch = useDispatch();
  const history = useHistory();
  const primaryColor = getGlobalColor("--main-primary-color");
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="main-myproject-card c2e-edit-card">
        <div
          className="myproject-card-top bg-img "
          style={{
            backgroundImage: `url(${""})`,
          }}
        />
        <div className="px-3 py-2 w-100">
          <div className="w-100 d-flex justify-content-between align-items-center ">
            <div className="myproject-card-title">
              <h4>name</h4>
            </div>

            <div className="myproject-card-dropdown ">
              <C2eCardEditDropdown
                setModalShow={setModalShow}
                iconColor="#ffffff"
              />
            </div>
          </div>

          <div className="c2e-card-detail">
            <p>
              Within the six categories, there are over 50 learning
              activity types. These range from Interactive Video.
            </p>
          </div>

          <div className="c2e-updated-date">
            <p>Type: date</p>
            <p>Updated: date</p>
          </div>
        </div>
      </div>
      <RoyaltyInformationModal
        show={modalShow}
        setModalShow={setModalShow}
      />
    </>
  );
};

C2eEditCard.propTypes = {
  project: PropTypes.object.isRequired,
  teamPermission: PropTypes.object,
  showDeletePopup: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
  setCreateProject: PropTypes.func.isRequired,
};

C2eEditCard.defaultProps = {
  teamPermission: {},
};

export default C2eEditCard;
