/* eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import loader from "assets/images/loader.svg";
import { useHistory } from "react-router";
import C2eCardDropdown from "./C2eCardDropdown";
import "../../Projects/ProjectCard/style.scss";
import "../../Projects/ProjectCard/projectcardstyle.scss";
import "../style.scss";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import SelectC2EModal from "./selectC2EModal";

const C2eCard = (props) => {
  const ImgLoader = () => <img src={loader} alt="" />;
  const dispatch = useDispatch();
  const history = useHistory();
  const primaryColor = getGlobalColor("--main-primary-color");
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="main-myproject-card">
        <div>
          <>
            <div
              className="myproject-card-top"
              style={{
                backgroundImage: `url(${""})`,
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="c2e-card-heading myproject-card-title">
                  <h2>C2E 1</h2>
                </div>
                <div className="myproject-card-dropdown">
                  <C2eCardDropdown
                    setModalShow={setModalShow}
                    iconColor="#ffffff"
                  />
                </div>
              </div>

              <Link to={``}>
                <div className="myproject-card-title">
                  <h2>name</h2>
                </div>
              </Link>
            </div>
          </>
        </div>
        <Link className="project-description" to={``}>
          <div className="myproject-card-detail">
            <p>text</p>
          </div>
        </Link>

        <div className="updated-date">Updated: date</div>
      </div>

      <SelectC2EModal show={modalShow} setModalShow={setModalShow} />
    </>
  );
};

C2eCard.propTypes = {
  project: PropTypes.object.isRequired,
  teamPermission: PropTypes.object,
  showDeletePopup: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
  setCreateProject: PropTypes.func.isRequired,
};

C2eCard.defaultProps = {
  teamPermission: {},
};

export default C2eCard;
