/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import "../../Projects/ProjectCard/style.scss";
import loader from "assets/images/loader.svg";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import PublishSmSvg from "iconLibrary/dropDown/PublishSmSvg";
import DeleteSmSvg from "iconLibrary/dropDown/DeleteSmSvg";
import EditDpDnMdSvg from "iconLibrary/dropDown/EditDpDnMdSvg";
import ViewMdSvg from "iconLibrary/mainContainer/ViewMdSvg";
import ListToStoreSvg from "iconLibrary/dropDown/ListToStoreSvg";

const C2eCardEditDropdown = (props) => {
  const organization = useSelector((state) => state.organization);
  const { iconColor, setModalShow } = props;
  const ImgLoader = () => <img src={loader} alt="loader" />;
  const dispatch = useDispatch();

  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <Dropdown className="project-dropdown check d-flex  align-items-center text-added-project-dropdown">
      <Dropdown.Toggle className="project-dropdown-btn project d-flex justify-content-center align-items-center">
        <FontAwesomeIcon
          icon="ellipsis-v"
          style={{
            fontSize: "13px",
            color: "#084892",
            marginLeft: "5px",
          }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item to="#" onClick={() => setModalShow(true)}>
          <ViewMdSvg primaryColor={primaryColor} className="mr-3" />
          Preview
        </Dropdown.Item>

        <Dropdown.Item
          to="#"
          // onClick={() =>

          // }
        >
          <DeleteSmSvg
            primaryColor={primaryColor}
            className="menue-img"
          />
          Remove
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

C2eCardEditDropdown.propTypes = {
  project: PropTypes.object.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
  teamPermission: PropTypes.object,
  iconColor: PropTypes.string.isRequired,
  // setprojectPublishtoCanvas: PropTypes.func.isRequired,
  // text: propTypes.string,
};

C2eCardEditDropdown.defaultProps = {
  teamPermission: {},
};

export default C2eCardEditDropdown;
